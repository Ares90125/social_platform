import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Close } from '@mui/icons-material';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import { Button, Input } from '../../../../../form';
import { ButtonText } from '../../../../../form/button/Button';
import {
  updateCMCampaignGroup,
  UpdateCMCampaignGroupInput,
} from '../../../../../../graphs/updateCMCampaignGroup';
import { CampaignCommunityStatus } from '../../../../../../utils/enums/campaignCommunityStatus';
import {
  markCampaignTaskDone,
  MarkCampaignTaskDoneInput,
} from '../../../../../../graphs/markCampaignTaskDone';
import {
  updateCampaignTaskDetails,
  UpdateCampaignTaskInput,
} from '../../../../../../graphs/updateCampaignTaskDetails';
import { TaskStatus } from '../../../../../../utils/enums/taskStatus';
import { CampaignGroupAndTaskDetails } from '../../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { useToast } from '../../../../../../context/toast';

const fbPermLinkRegex =
  /^(https)?(:\/\/)?((www|m)\.)?facebook.com\/groups\/[a-z|A-Z|0-9|.|_]*\/(permalink|posts)\/[0-9]*[/]{0,1}$/;

type MarkAsCompleteModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  markAsCompleteInfo: {
    task: CampaignGroupAndTaskDetails | null;
  };
  handleRefetchCommunities: () => void;
};

export const MarkAsCompleteModal: React.FC<MarkAsCompleteModalProps> = ({
  isOpen,
  closeModal,
  markAsCompleteInfo,
  handleRefetchCommunities,
}) => {
  const { task } = markAsCompleteInfo;
  const { setErrorToast, setSuccessToast } = useToast();
  const [link, setLink] = useState(task?.fbPermlink || '');
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleClose = (): void => {
    setLink('');
    setError('');
    closeModal();
  };

  const updateTaskMutation = useMutation(
    (input: UpdateCampaignTaskInput) => updateCampaignTaskDetails(input),
    {
      onSuccess: () => {
        setIsFetching(false);
        handleRefetchCommunities();
        handleClose();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );
  const markCampaignTaskDoneMutation = useMutation(
    (input: MarkCampaignTaskDoneInput) => markCampaignTaskDone(input),
    {
      onSuccess: () => {
        if (
          task &&
          task?.campaignId &&
          task?.groupId &&
          task?.taskId &&
          task?.userId
        ) {
          updateTaskMutation.mutate({
            campaignId: task.campaignId,
            fbPermlink: link.trim(),
            groupId: task.groupId,
            imageUrls: task.imageUrls,
            isPlaceholder: task.isPlaceholder,
            status: TaskStatus.Completed,
            taskId: task.taskId,
            timezoneName: task.timezoneName,
            videoUrls: task.videoUrls,
            userId: task.userId,
            userName: task.userName,
          });
        }
        setSuccessToast();
      },
    },
  );
  const updateCMCgroupMutation = useMutation(
    (input: UpdateCMCampaignGroupInput) => updateCMCampaignGroup(input),
    {
      onSuccess: () => {
        if (task && task?.campaignId && task?.groupId) {
          markCampaignTaskDoneMutation.mutate({
            campaignId: task.campaignId,
            groupId: task.groupId,
          });
        }
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setLink(value);
    setError(
      fbPermLinkRegex.test(value) ? '' : 'Please enter valid group link',
    );
  };

  const handleSubmit = (): void => {
    if (!task?.groupTaskStatus) {
      handleClose();
      return;
    }

    if (task && task?.campaignId && task?.groupId) {
      setIsFetching(true);
      updateCMCgroupMutation.mutate({
        campaignId: task.campaignId,
        groupId: task.groupId,
        groupTaskStatus: CampaignCommunityStatus.TaskCompleted,
      });
    }
  };

  useEffect(() => {
    setLink(task?.fbPermlink || '');
    setError('');
  }, [task?.fbPermlink]);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #dee2e6',
            p: '16px',
          }}
        >
          <Typography
            component="h5"
            sx={{ fontSize: '20px', color: '#33334f', fontWeight: 500 }}
          >
            Asset Rejection
          </Typography>
          <IconButton>
            <Close fontSize="medium" onClick={closeModal} />
          </IconButton>
        </Box>

        <Box sx={{ p: '16px 24px 24px', borderBottom: '1px solid #dee2e6' }}>
          <Box>
            <Input
              helperText="Facebook URL*"
              helperTextPosition="top"
              value={link}
              onChange={handleLinkChange}
              placeholder="Ex: https://www.facebook.com/groups/{groupid}/permalink/{postid}"
              errorText={error}
            />
          </Box>
        </Box>

        <Box
          sx={{
            p: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <ButtonText onClick={closeModal} sx={{ mr: '20px' }}>
            Cancel
          </ButtonText>
          <Button
            disabled={!link.length || !!error.length || isFetching}
            onClick={handleSubmit}
          >
            Complete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
