import React, { useState } from 'react';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from 'react-query';
import _ from 'lodash';
import {
  UpdateCampaignGroupInput,
  updateCMCampaignGroups,
} from '../../../../../../../graphs/updateCMCampaignGroups';
import { editGroupsOptions } from './EditGroupsButton';
import { SelectInput } from './ModalInputs/Select';
import { EditModalState } from '../../ExecutionTab';
import { CommunityManager } from '../../../../../../../graphs/getCommunityManagers';
import {
  UpdateGroupInput,
  updateGroups,
} from '../../../../../../../graphs/updateGroups';
import { RadioInput } from './ModalInputs/Radio';
import {
  UpdateCampaignGroupModeOfCommunicationInput,
  updateCMCampaignGroupsModeOfCommunication,
} from '../../../../../../../graphs/updateCMCampaignGroupsModeOfCommunication';
import { CampaignGroupAndTaskDetails } from '../../../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { TextInput } from './ModalInputs/TextInput';
import { DateInput } from './ModalInputs/DateInput';
import { modalStyles } from '../styles';
import { PricingInput } from './ModalInputs/PricingInput';
import { useToast } from '../../../../../../../context/toast';
import { ModalHeader } from '../../../../../../ui/ModalHeader';

type EditGroupsModalProps = {
  communities: CampaignGroupAndTaskDetails[] | undefined;
  brandId: string | undefined;
  campaignId: string | undefined;
  selectionModel: GridSelectionModel;
  editModalState: EditModalState;
  communityManagers: CommunityManager[] | undefined;
  setEditModalState: React.Dispatch<React.SetStateAction<EditModalState>>;
};

export const EditGroupsModal: React.FC<EditGroupsModalProps> = ({
  communities,
  brandId,
  campaignId,
  selectionModel,
  editModalState,
  communityManagers,
  setEditModalState,
}) => {
  const { isOpen, option } = editModalState;
  const { key, label } = option!;

  const [value, setValue] = useState<string>('');
  const [additionalValue, setAdditionalValue] = useState<string>('');
  const queryClient = useQueryClient();
  const { setErrorToast, setSuccessToast } = useToast();

  const mutationParams = {
    onSuccess: (): void => {
      queryClient.invalidateQueries(`brands-${brandId}-${campaignId}`);
      setEditModalState({ isOpen: false, option: null });
      setSuccessToast();
    },
    onError: (): void => {
      setErrorToast();
    },
  };
  const campaignGroupsMutation = useMutation(
    (data: UpdateCampaignGroupInput[]) => updateCMCampaignGroups(data),
    mutationParams,
  );
  const managersMutation = useMutation(
    (data: UpdateGroupInput) => updateGroups(data),
    mutationParams,
  );
  const communicationMutation = useMutation(
    (data: UpdateCampaignGroupModeOfCommunicationInput[]) =>
      updateCMCampaignGroupsModeOfCommunication(data),
    mutationParams,
  );

  const handleCloseModal = (): void => {
    setEditModalState({ isOpen: false, option: null });
  };
  // TODO: fix any types
  function handleUpdate(
    mutation: any,
    dataToUpdate:
      | UpdateCampaignGroupModeOfCommunicationInput[]
      | UpdateCampaignGroupInput[],
  ): void {
    const chunks = _.chunk(dataToUpdate, 25);

    Promise.all(chunks.map((chunk) => mutation.mutateAsync(chunk)));
  }

  const handleSubmit = (): void => {
    switch (label) {
      case editGroupsOptions.сommunityManager: {
        selectionModel.forEach((groupId) => {
          managersMutation.mutate({
            id: groupId as string,
            defaultCommunityManager: value === '' ? null : value,
          });
        });
        break;
      }
      case editGroupsOptions.modeOfCommunication: {
        handleUpdate(
          communicationMutation,
          selectionModel.map(
            (groupId): UpdateCampaignGroupModeOfCommunicationInput => {
              const communityAdminId = communities?.find(
                (c) => c.groupId === groupId,
              )?.communityAdminId;
              return {
                campaignId: campaignId!,
                groupId: groupId as string,
                communityAdminId: communityAdminId || '',
                modeOfCommunication: value,
              };
            },
          ),
        );
        break;
      }
      case editGroupsOptions.pricing: {
        handleUpdate(
          campaignGroupsMutation,
          selectionModel.map(
            (groupId): UpdateCampaignGroupInput => ({
              campaignId: campaignId!,
              groupId: groupId as string,
              pricing: value,
              currency: additionalValue,
            }),
          ),
        );
        break;
      }
      case editGroupsOptions.paymentStatus: {
        if (!campaignId) return;

        handleUpdate(
          campaignGroupsMutation,
          selectionModel.map((groupId): UpdateCampaignGroupInput => {
            let values: {
              groupId: string;
              campaignId: string;
              paymentStatus: string;
              paymentAmountPaid?: string | null;
            } = {
              groupId: groupId as string,
              campaignId,
              paymentStatus: value,
            };

            if (value === 'Done') {
              const pricing: string | null | undefined = communities
                ?.find((c) => c.groupId === groupId.toString())
                ?.pricing?.toString();
              values = {
                ...values,
                paymentAmountPaid: typeof pricing === 'string' ? pricing : null,
              };
            }

            return values;
          }),
        );
        break;
      }
      default: {
        handleUpdate(
          campaignGroupsMutation,
          selectionModel.map(
            (groupId): UpdateCampaignGroupInput => ({
              campaignId: campaignId!,
              groupId: groupId as string,
              [key]: value,
            }),
          ),
        );
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Paper sx={{ ...modalStyles.container, maxWidth: '500px' }}>
        <ModalHeader text={`Set ${label}`} closeModal={handleCloseModal} />
        <Box sx={{ padding: '16px' }}>
          <Typography sx={{ mb: '8px' }}>Set {label}</Typography>
          <Box mb={2} mt={2}>
            {(label === editGroupsOptions.timezone ||
              label === editGroupsOptions.сommunityManager ||
              label === editGroupsOptions.paymentStatus) && (
              <SelectInput
                currentTab={option!}
                value={value}
                setValue={setValue}
                communityManagers={communityManagers}
              />
            )}
            {(label === editGroupsOptions.cohort ||
              label === editGroupsOptions.modeOfCommunication) && (
              <RadioInput
                currentTab={option!}
                value={value}
                setValue={setValue}
              />
            )}
            {(label === editGroupsOptions.paymentRemarks ||
              label === editGroupsOptions.paymentAmountPaid) && (
              <TextInput
                currentTab={option!}
                value={value}
                setValue={setValue}
              />
            )}
            {(label === editGroupsOptions.paymentDate ||
              label === editGroupsOptions.defaultTaskDate) && (
              <DateInput value={value} setValue={setValue} />
            )}
            {label === editGroupsOptions.pricing && (
              <PricingInput
                value={value}
                setValue={setValue}
                additionalValue={additionalValue}
                setAdditionalValue={setAdditionalValue}
              />
            )}
          </Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={
              label === editGroupsOptions.pricing
                ? !value || !additionalValue
                : !value
            }
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
