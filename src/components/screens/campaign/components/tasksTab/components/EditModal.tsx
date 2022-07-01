import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Paper,
  Box,
  Divider,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextareaAutosize,
  IconButton,
  ClickAwayListener,
} from '@mui/material';
import moment from 'moment';
import Loadable from 'react-loadable';
import { BaseEmoji } from 'emoji-mart';
import { useMutation } from 'react-query';
import Lightbox from 'react-image-lightbox';
import { EmojiEmotions } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { modalStyles } from '../tasksTab.styles';
import {
  BasicDateTimePicker,
  HelperText,
  Input,
  Select,
} from '../../../../../form';
import { EditModalState } from '../TasksTab';
import { postTypes, timeZones } from '../../detailsTab/defaultFormValues';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { Tooltip } from '../../../../../tooltip/Tooltip';
import {
  createCampaignTask,
  CreateCampaignTaskInput,
} from '../../../../../../graphs/createCampaignTask';
import { PostContentType } from '../../../../../../utils/enums/postContentType';
import { TaskType } from '../../../../../../utils/enums/taskTypeEnum';
import { UploadFiles } from './UploadFiles';
import {
  updateCampaignTaskDetails,
  UpdateCampaignTaskInput,
} from '../../../../../../graphs/updateCampaignTaskDetails';
import {
  updateCMCampaignGroup,
  UpdateCMCampaignGroupInput,
} from '../../../../../../graphs/updateCMCampaignGroup';
import { CampaignCommunityStatus } from '../../../../../../utils/enums/campaignCommunityStatus';
import { getCookieByName } from '../../../../../../utils/helpers/cookies';
import { uploadContentManagerMediaUrl } from '../../../../../../utils/contants/media-upload';
import { useToast } from '../../../../../../context/toast';
import { ModalHeader } from '../../../../../ui/ModalHeader';

const EmojiPicker = Loadable({
  loader: () => import('./EmojiPicker'),
  loading: () => <div>Loading...</div>,
});

const basicTypes = ['Text', 'Video', 'Image', 'Photo', 'Album'];

type EditModalProps = {
  modalState: EditModalState;
  closeModal: () => void;
  campaign?: CampaignInputs;
  handleRefetchCommunities: () => void;
};

export const EditModal: React.FC<EditModalProps> = ({
  modalState,
  closeModal,
  campaign,
  handleRefetchCommunities,
}) => {
  const { community } = modalState;
  const { setErrorToast, setSuccessToast } = useToast();
  const [gallery, setGallery] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [imageFiles, setImageFiles] = useState<(File | string)[]>(
    community?.imageUrls ? [...community.imageUrls] : [],
  );
  const [videoFiles, setVideoFiles] = useState<(File | string)[]>(
    community?.videoUrls ? [...community.videoUrls] : [],
  );
  const [previewImage, setPreviewImage] = useState<
    { src: string; type: string }[]
  >([]);
  const [isShowEmoji, setIsShowEmoji] = useState(false);

  const {
    watch,
    getValues,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      groupName: community?.groupName || '',
      title: community?.title || campaign?.taskTitle || '',
      groupAdmin: community?.communityAdminName || '',
      startDate: community?.defaultTaskDate || '',
      timezoneName: community?.timezone || '',
      postType:
        (community?.postType &&
          (basicTypes.includes(community.postType)
            ? 'Text'
            : community.postType)) ||
        postTypes[0],
      period: community?.period || campaign?.campaignPeriod || '',
      postMessage: community?.text || '',
    },
  });

  const updateCMCgroup = useMutation(
    (input: UpdateCMCampaignGroupInput) => updateCMCampaignGroup(input),
    {
      onSuccess: () => {
        handleRefetchCommunities();
        closeModal();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );
  const createTaskMutation = useMutation(
    (input: CreateCampaignTaskInput) => createCampaignTask(input),
    {
      onSuccess: ([task]) => {
        if (!campaign) {
          return;
        }

        updateCMCgroup.mutate({
          campaignId: task.campaignId,
          groupId: task.groupId,
          groupTaskStatus:
            campaign.status &&
            campaign.status !== 'Draft' &&
            campaign.status !== 'PendingApproval'
              ? CampaignCommunityStatus.TaskRequestSent
              : CampaignCommunityStatus.TaskCreated,
        });
        setSuccessToast();
        setIsFetching(false);
      },
      onError: () => {
        setErrorToast();
      },
    },
  );
  const updateTaskMutation = useMutation(
    (input: UpdateCampaignTaskInput) => updateCampaignTaskDetails(input),
    {
      onSuccess: () => {
        handleRefetchCommunities();
        closeModal();
        setIsFetching(false);
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const handleImageFiles = (images: (File | string)[]): void => {
    setImageFiles([...images]);
  };

  const handleVideoFiles = (videos: (File | string)[]): void => {
    setVideoFiles([...videos]);
  };

  const handlePreviews = (previews: { src: string; type: string }[]): void => {
    setPreviewImage([...previews]);
  };

  const closeEmoji = (): void => {
    setIsShowEmoji(false);
  };
  const toggleEmoji = (): void => {
    setIsShowEmoji(!isShowEmoji);
  };

  const readAsDataURL = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsArrayBuffer(file);
      fr.onerror = reject;
      fr.onload = (): void => {
        resolve(fr.result);
      };
    });

  const getCloudfrontUrl = async (
    fileReaderResult: string | ArrayBuffer | null,
    type: 'image' | 'video',
    userToken: string,
  ): Promise<string> => {
    const signedUrlsResponse = await axios({
      method: 'put',
      data: { type },
      url: uploadContentManagerMediaUrl,
      headers: {
        authorization: userToken,
      },
    });
    const signedUrls = signedUrlsResponse.data;

    await axios({
      method: 'put',
      url: signedUrls.signedUrl,
      data: fileReaderResult,
      headers:
        type === 'image'
          ? { 'Content-Type': 'image/png' }
          : { 'Content-Type': 'video/mp4' },
    });

    return signedUrls.cloudfrontUrl;
  };

  const processFilesForUrls = async (
    type: 'image' | 'video',
    files: (File | string)[],
  ): Promise<string[] | void> => {
    const filesToAdd: File[] = [];
    const urls: string[] = [];
    const userToken = getCookieByName('token');

    if (!userToken) {
      return;
    }

    files.forEach((file) => {
      if (typeof file === 'string') {
        urls.push(file);

        return;
      }

      filesToAdd.push(file);
    });

    const buffers = await Promise.all(
      filesToAdd.map((file) => readAsDataURL(file)),
    );
    const newUrsl = await Promise.all(
      buffers.map((buffer) => getCloudfrontUrl(buffer, type, userToken)),
    );

    return [...urls, ...newUrsl];
  };

  const handleSubmit = async (): Promise<void> => {
    if (!campaign?.brandId || !campaign?.campaignId) {
      return;
    }

    setIsFetching(true);

    const [newImageUrls = [], newVideoUrls = []] = await Promise.all([
      processFilesForUrls('image', imageFiles),
      processFilesForUrls('video', videoFiles),
    ]);

    if (
      !community?.groupId ||
      !community?.groupName ||
      !community?.communityAdminId ||
      !community?.communityAdminName
    ) {
      return;
    }

    if (!community.taskId) {
      const createTaskInput: CreateCampaignTaskInput = {
        brandId: campaign.brandId,
        campaignTasks: [
          {
            campaignId: campaign.campaignId,
            groupId: community.groupId,
            groupName: community.groupName,
            imageUrls: newImageUrls,
            isPlaceholder: false,
            period: getValues('period'),
            postType:
              (newImageUrls.length > 1 && PostContentType.Album) ||
              (newImageUrls.length === 1 && PostContentType.Photo) ||
              (newVideoUrls.length > 0 && PostContentType.Video) ||
              PostContentType.Text,
            text: getValues('postMessage'),
            timezoneName: getValues('timezoneName'),
            title: getValues('title'),
            toBePerformedByUTC: moment.utc().toISOString(),
            type: TaskType.Post,
            userId: community.communityAdminId,
            userName: community.communityAdminName,
            videoUrls: newVideoUrls,
          },
        ],
      };

      createTaskMutation.mutate(createTaskInput);
      return;
    }

    const updateTaskInput: UpdateCampaignTaskInput = {
      campaignId: campaign.campaignId,
      groupId: community.groupId,
      groupName: community.groupName,
      imageUrls: newImageUrls,
      isPlaceholder: false,
      period: getValues('period'),
      postType:
        (newImageUrls.length > 1 && PostContentType.Album) ||
        (newImageUrls.length === 1 && PostContentType.Photo) ||
        (newVideoUrls.length > 0 && PostContentType.Video) ||
        PostContentType.Text,
      text: getValues('postMessage'),
      timezoneName: getValues('timezoneName'),
      title: getValues('title'),
      toBePerformedByUTC: moment.utc().toISOString(),
      userId: community.communityAdminId,
      userName: community.communityAdminName,
      videoUrls: newVideoUrls,
      taskId: community.taskId,
      fbPermlink: community.fbPermlink,
    };

    updateTaskMutation.mutate(updateTaskInput);
  };

  const handleGallery = (photoIndex: number): void => {
    setGallery({ isOpen: true, photoIndex });
  };

  useEffect(() => {
    const images = imageFiles.filter(
      (image) => typeof image === 'string',
    ) as string[];
    const videos = videoFiles.filter(
      (video) => typeof video === 'string',
    ) as string[];

    setPreviewImage([
      ...images.map((image) => ({
        src: image,
        type: 'image',
      })),
      ...videos.map((video) => ({
        src: video,
        type: 'video',
      })),
    ]);
  }, []);

  return (
    <>
      <Modal open={modalState.isOpen} onClose={closeModal}>
        <Paper sx={modalStyles.container}>
          <ModalHeader
            text="Edit task"
            closeModal={closeModal}
            sx={{ padding: '16px 30px' }}
          />
          <Divider />
          <Box>
            <Box sx={{ padding: '16px 30px' }}>
              <Tooltip
                title="Task details can only be edited from Execution tab. Only content can be added here."
                placement="bottom"
              >
                <Box mb={2}>
                  <Controller
                    name="groupName"
                    control={control}
                    render={({
                      field: { onChange, value, name },
                    }): JSX.Element => (
                      <Input
                        id="groupName"
                        disabled
                        value={value}
                        name={name}
                        helperText="Group Name*"
                        helperTextPosition="top"
                        placeholder="Enter title"
                        onChange={onChange}
                        errorText={errors.groupName?.message}
                      />
                    )}
                  />
                </Box>
              </Tooltip>

              <Box mb={2}>
                <Controller
                  name="title"
                  control={control}
                  render={({
                    field: { onChange, value, name },
                  }): JSX.Element => (
                    <Input
                      id="title"
                      value={value}
                      name={name}
                      helperText="Title*"
                      helperTextPosition="top"
                      placeholder="Enter title"
                      onChange={onChange}
                      errorText={errors.groupName?.message}
                    />
                  )}
                />
              </Box>
              <Tooltip
                title="Task details can only be edited from Execution tab. Only content can be added here."
                placement="bottom"
              >
                <Box mb={2}>
                  <Controller
                    name="groupAdmin"
                    control={control}
                    render={({
                      field: { onChange, value, name },
                    }): JSX.Element => (
                      <Select
                        disabled
                        id="groupAdmin"
                        name={name}
                        value={value}
                        helperText="Assign task to group admin/moderator*"
                        onChange={onChange}
                        items={
                          community?.communityAdminName
                            ? [community?.communityAdminName]
                            : []
                        }
                      />
                    )}
                  />
                </Box>
              </Tooltip>
              <Tooltip
                title="Task details can only be edited from Execution tab. Only content can be added here."
                placement="bottom"
              >
                <Box mb={2}>
                  <HelperText>Date &#38; Time *</HelperText>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({
                      field: { onChange, value, name },
                    }): JSX.Element => (
                      <BasicDateTimePicker
                        id="startDate"
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled
                      />
                    )}
                  />
                </Box>
              </Tooltip>
              <Tooltip
                title="Task details can only be edited from Execution tab. Only content can be added here."
                placement="bottom"
              >
                <Box mb={2}>
                  <Controller
                    name="timezoneName"
                    control={control}
                    render={({
                      field: { onChange, value, name },
                    }): JSX.Element => (
                      <Select
                        disabled
                        id="timezoneName"
                        name={name}
                        value={value}
                        onChange={onChange}
                        helperText="TimeZone *"
                        items={timeZones}
                      />
                    )}
                  />
                </Box>
              </Tooltip>
              <Box mb={2}>
                <Controller
                  name="period"
                  control={control}
                  render={({
                    field: { onChange, value, name },
                  }): JSX.Element => (
                    <Input
                      value={value}
                      name={name}
                      helperText="Campaign period*"
                      helperTextPosition="top"
                      placeholder="E.g. Prelaunch, Phase 1"
                      onChange={onChange}
                      errorText={errors.groupName?.message}
                    />
                  )}
                />
              </Box>
              <Box mb={2}>
                <Controller
                  name="postType"
                  control={control}
                  render={({
                    field: { onChange, value, name },
                  }): JSX.Element => (
                    <RadioGroup
                      row
                      onChange={onChange}
                      value={value}
                      name={name}
                      id="postType"
                    >
                      <FormControlLabel
                        value="Text"
                        control={<Radio />}
                        label="Basic"
                      />
                      <FormControlLabel
                        value="LiveVideo"
                        control={<Radio />}
                        label="Live Video"
                      />
                      <FormControlLabel
                        value="MultiVideo"
                        control={<Radio />}
                        label="Multi Video"
                      />
                      <FormControlLabel
                        value="VideoImage"
                        control={<Radio />}
                        label="Video + Images"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>
              {watch('postType') !== PostContentType.Text && (
                <Box sx={modalStyles.form.noteSection} p={2}>
                  <Typography sx={{ fontSize: '14px' }}>
                    <strong>Note:</strong>
                    {watch('postType') === PostContentType.LiveVideo &&
                      'Live Video posts'}
                    {watch('postType') === PostContentType.MultiVideo ||
                      (watch('postType') === PostContentType.VideoImage &&
                        'This type of posts')}
                    are not supported by Convosight. You can still create a
                    placeholder task for tracking. The group admin will not see
                    this task. You can come later and associate the facebook
                    permalink of the actual post with this task for tracking in
                    the report
                  </Typography>
                </Box>
              )}
            </Box>
            {watch('postType') === PostContentType.Text && (
              <Box sx={modalStyles.form.briedSection}>
                <Controller
                  name="postMessage"
                  control={control}
                  render={({
                    field: { onChange, value, name },
                  }): JSX.Element => (
                    <TextareaAutosize
                      onChange={onChange}
                      value={value}
                      id={name}
                      placeholder="Start typing your post..."
                      style={{
                        width: '100%',
                        resize: 'none',
                        background: '#fff',
                        padding: '16px',
                        borderRadius: '10px',
                        fontSize: '16px',
                        color: '#33334f',
                        height: '270px',
                        outline: 'none',
                        border: '1px solid #e0e0e5',
                      }}
                    />
                  )}
                />
                <Box sx={modalStyles.form.actions}>
                  <Box sx={modalStyles.form.emojiWrapper}>
                    <IconButton onClick={toggleEmoji}>
                      <EmojiEmotions />
                    </IconButton>
                    {isShowEmoji && (
                      <ClickAwayListener onClickAway={closeEmoji}>
                        <Box sx={modalStyles.form.emojiWindow}>
                          <EmojiPicker
                            onEmojiSelect={(emoji: BaseEmoji): void => {
                              setValue(
                                'postMessage',
                                getValues('postMessage') + emoji.native,
                              );
                            }}
                          />
                        </Box>
                      </ClickAwayListener>
                    )}
                  </Box>
                  <UploadFiles
                    imageFiles={imageFiles}
                    videoFiles={videoFiles}
                    previewImage={previewImage}
                    handleImageFiles={handleImageFiles}
                    handleVideoFiles={handleVideoFiles}
                    handlePreviews={handlePreviews}
                    handleGallery={handleGallery}
                  />
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={modalStyles.bottom.container}>
            <Button sx={modalStyles.bottom.cancelBtn} onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={isFetching || !community?.groupTaskStatus}
              sx={modalStyles.bottom.saveBtn}
              onClick={handleSubmit}
            >
              {isFetching ? 'Saving...' : 'Save'}
            </Button>
          </Box>
        </Paper>
      </Modal>
      {gallery.isOpen && (
        <Lightbox
          reactModalStyle={{
            overlay: {
              zIndex: 9999,
            },
          }}
          mainSrc={previewImage[gallery.photoIndex].src}
          nextSrc={
            previewImage[(gallery.photoIndex + 1) % previewImage.length].src
          }
          prevSrc={
            previewImage[
              (gallery.photoIndex + previewImage.length - 1) %
                previewImage.length
            ].src
          }
          onCloseRequest={(): void => {
            setGallery({ isOpen: false, photoIndex: 0 });
          }}
          onMovePrevRequest={(): void => {
            setGallery({
              ...gallery,
              photoIndex:
                (gallery.photoIndex + previewImage.length - 1) %
                previewImage.length,
            });
          }}
          onMoveNextRequest={(): void => {
            setGallery({
              ...gallery,
              photoIndex: (gallery.photoIndex + 1) % previewImage.length,
            });
          }}
        />
      )}
    </>
  );
};
