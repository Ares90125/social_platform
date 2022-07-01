import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Box,
  Link,
  Typography,
  Collapse,
} from '@mui/material';
import moment from 'moment';
import { useMutation } from 'react-query';
import GroupsIcon from '@mui/icons-material/Groups';
import { tableStyles, commonStyles } from '../tasksTab.styles';
import { CampaignGroupAndTaskDetails } from '../../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { EditModalState } from '../TasksTab';
import { TablePopper } from './TablePopper';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { getTaskStatus } from '../../../../../../utils/helpers/getTaskStatus';
import { CampaignCommunityStatus } from '../../../../../../utils/enums/campaignCommunityStatus';
import {
  markDeleteCampaignTask,
  MarkDeleteCampaignTaskInput,
} from '../../../../../../graphs/markDeleteCampaignTask';
import {
  brandApproveCampaign,
  BrandApproveCampaignInput,
} from '../../../../../../graphs/brandApproveCampaign';
import { TypeIcon } from './TypeIcon';
import { useToast } from '../../../../../../context/toast';

enum TaskTypes {
  VideoImage = 'Video + Images',
  LiveVideo = 'Live video',
  MultiVideo = 'Multiple videos',
}

type TableTaskRowProps = {
  campaign?: CampaignInputs;
  openEditModal: (editableTask: EditModalState['community']) => void;
  openMarkModal: () => void;
  task: CampaignGroupAndTaskDetails;
  handleRefetchCommunities: () => void;
  handleGallery: (images: string[], photoIndex: number) => void;
};

export const TableTaskRow: React.FC<TableTaskRowProps> = ({
  campaign,
  task,
  openEditModal,
  openMarkModal,
  handleRefetchCommunities,
  handleGallery,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setErrorToast, setSuccessToast } = useToast();

  const deleteTaskMutation = useMutation(
    (input: MarkDeleteCampaignTaskInput) => markDeleteCampaignTask(input),
    {
      onSuccess: () => {
        handleRefetchCommunities();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const brandApproveMutation = useMutation(
    (input: BrandApproveCampaignInput) => brandApproveCampaign(input),
    {
      onSuccess: () => {
        handleRefetchCommunities();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const handleOpenEditModal = (
    e: React.MouseEvent<HTMLTableRowElement | HTMLLIElement, MouseEvent>,
    community: CampaignGroupAndTaskDetails,
  ): void => {
    const { target } = e;

    if (
      target instanceof Element &&
      !target.classList.contains('no-edit-modal')
    ) {
      openEditModal(community);
    }
  };

  const handleCollapse = (
    e: React.MouseEvent<HTMLTableRowElement | HTMLLIElement, MouseEvent>,
  ): void => {
    const { target } = e;

    if (
      target instanceof Element &&
      !target.classList.contains('no-edit-modal')
    ) {
      setIsOpen(!isOpen);
    }
  };

  const getStatusColor = (status: CampaignCommunityStatus): string => {
    switch (status) {
      case CampaignCommunityStatus.TaskCompleted:
        return '#27ae60';
      case CampaignCommunityStatus.TaskCreated:
        return '#ff8a1e';
      default:
        return '#adadb9';
    }
  };

  return (
    <>
      <TableRow
        key={task.id}
        hover
        sx={{ cursor: 'pointer' }}
        onClick={
          !task.groupTaskStatus && !task.text
            ? (e): void => {
                handleOpenEditModal(e, task);
              }
            : handleCollapse
        }
      >
        <TableCell>
          <Box sx={{ ...commonStyles.flexAlignCenter }}>
            <GroupsIcon
              sx={{ ...commonStyles.icon, ...tableStyles.groupIcon }}
            />
            <Box>
              {task.text && (
                <p>
                  {task.text.substring(0, 100) +
                    (task.text.length > 100 ? '...' : '')}
                </p>
              )}
              {task.groupName}{' '}
              {(task?.imageUrls?.length || 0) +
                (task?.videoUrls?.length || 0) || ''}
            </Box>
          </Box>
        </TableCell>
        <TableCell>{task.title || campaign?.taskTitle || ''}</TableCell>
        <TableCell>{task.communityAdminName}</TableCell>
        <TableCell>
          <Box
            sx={{
              background: '#f4f6f8',
              padding: '6px 10px',
              borderRadius: '30px',
              fontWeight: 400,
              fontSize: '14px',
              textAlign: 'center',
              display: 'inline-block',
            }}
          >
            <TypeIcon type={task.postType} />{' '}
            {TaskTypes[task.postType] || task.postType}
          </Box>
        </TableCell>
        <TableCell>{task.period || campaign?.campaignPeriod || ''}</TableCell>
        <TableCell>
          {task.toBePerformedByUTC && (
            <>
              {moment(task.toBePerformedByUTC).format('D MMM yyyy')}
              <br />
              {moment(task.toBePerformedByUTC).format('hh:mm a')}
            </>
          )}
          {!task.toBePerformedByUTC && task.defaultTaskDate && (
            <>
              {moment(task.defaultTaskDate).format('D MMM yyyy')}
              <br />
              {moment(task.defaultTaskDate).format('hh:mm a')}
            </>
          )}
          {!task.toBePerformedByUTC &&
            !task.defaultTaskDate &&
            campaign?.defaultTaskDate && (
              <>
                {moment(campaign.defaultTaskDate).format('D MMM yyyy')}
                <br />
                {moment(campaign.defaultTaskDate).format('hh:mm a')}
              </>
            )}
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Box sx={{ mr: '10px' }}>
              <Typography
                paragraph
                sx={{
                  fontSize: '12px',
                  lineHeight: '14px',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  color: getStatusColor(task.groupTaskStatus),
                  mb: '5px',
                }}
              >
                {getTaskStatus(task.groupTaskStatus)}
              </Typography>
              {task?.fbPermlink?.length && (
                <Link
                  sx={{
                    fontSize: '12px',
                    mt: '15px',
                    display: 'block',
                    textDecoration: 'none',
                    color: '#0065ff',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  className="no-edit-modal"
                  href={task.fbPermlink}
                  target="_blank"
                >
                  View Post
                </Link>
              )}
              {task.groupTaskStatus &&
                task.groupTaskStatus !==
                  CampaignCommunityStatus.TaskCompleted && (
                  <Link
                    sx={{
                      fontSize: '12px',
                      textDecoration: 'none',
                      color: '#0065ff',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                    className="no-edit-modal"
                    onClick={openMarkModal}
                  >
                    Mark as complete
                  </Link>
                )}
            </Box>
            {task.groupTaskStatus &&
              task.groupTaskStatus !==
                CampaignCommunityStatus.TaskCompleted && (
                <Box>
                  <Link
                    sx={{
                      fontSize: '12px',
                      textDecoration: 'none',
                      color: '#0065ff',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                    className="no-edit-modal"
                    onClick={(): void => {
                      if (task?.campaignId && task?.groupId) {
                        deleteTaskMutation.mutate({
                          campaignId: task.campaignId,
                          groupId: task.groupId,
                        });
                      }
                    }}
                  >
                    Delete task
                  </Link>
                  {task.groupTaskStatus ===
                    CampaignCommunityStatus.TaskCreated && (
                    <Link
                      sx={{
                        fontSize: '12px',
                        mt: '15px',
                        display: 'block',
                        textDecoration: 'none',
                        color: '#0065ff',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                      className="no-edit-modal"
                      onClick={(): void => {
                        if (task?.campaignId && task?.groupId) {
                          brandApproveMutation.mutate({
                            campaignId: task.campaignId,
                            groupId: task.groupId,
                          });
                        }
                      }}
                    >
                      Brand approve
                    </Link>
                  )}
                </Box>
              )}
          </Box>
        </TableCell>
        <TableCell align="center" className="no-edit-modal">
          {((task.groupTaskStatus !== CampaignCommunityStatus.TaskCompleted &&
            task.groupTaskStatus !== CampaignCommunityStatus.TaskScheduled) ||
            !campaign) && (
            <TablePopper openEditModal={(): void => openEditModal(task)} />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ p: '16px' }}>
              {task?.text?.length && (
                <Typography paragraph>{task.text}</Typography>
              )}
              {task?.imageUrls?.length && (
                <Box sx={{ display: 'flex' }}>
                  {task.imageUrls.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={image}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                      onClick={(): void => handleGallery(task.imageUrls, index)}
                    />
                  ))}
                </Box>
              )}
              {task?.videoUrls?.length && (
                <Box sx={{ display: 'flex' }}>
                  {task.videoUrls.map((video, index) => (
                    <video
                      key={video}
                      controls={false}
                      height="70"
                      width="70"
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                      onClick={(): void => handleGallery(task.videoUrls, index)}
                    >
                      <track kind="captions" />
                      <source src={video} />
                    </video>
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
