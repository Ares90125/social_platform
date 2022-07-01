import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import { useMutation } from 'react-query';
import { Close } from '@mui/icons-material';
import { Button, UnicodeEditorCustom } from '../../../form';
import {
  CampaignAsset,
  CreateAssetInput,
  createCampaignGroupAsset,
} from '../../../../graphs/createCampaignGroupAsset';
import { useToast } from '../../../../context/toast';

type AddTextAssetsProps = {
  openTextAssets: boolean;
  campaignAsset: CampaignAsset;
  refetchCampaignAsset: () => void;
  closeTextAssetsModal: () => void;
};

export const AddTextAssets: React.FC<AddTextAssetsProps> = ({
  campaignAsset,
  openTextAssets,
  closeTextAssetsModal,
  refetchCampaignAsset,
}) => {
  const [value, setValue] = useState('');
  const { setErrorToast, setSuccessToast } = useToast();
  const createGroupAssetMutation = useMutation(
    (data: { campaignId: string; groupId: string; input: CreateAssetInput }) =>
      createCampaignGroupAsset(data),
    {
      onSuccess: () => {
        setValue('');
        refetchCampaignAsset();
        closeTextAssetsModal();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const handleChange = (newValue: string): void => {
    setValue(newValue);
  };

  const handleSubmit = (): void => {
    createGroupAssetMutation.mutate({
      campaignId: campaignAsset.campaignId,
      groupId: campaignAsset.groupId,
      input: {
        status: 'PendingApproval',
        type: 'text',
        value,
      },
    });
  };

  return (
    <Dialog
      open={openTextAssets}
      onClose={closeTextAssetsModal}
      className="modal-sx"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5>Create text asset</h5>
          <button className="modal-close-btn">
            <Close fontSize="medium" onClick={closeTextAssetsModal} />
          </button>
        </div>

        <div className="modal-body">
          <p className="label">Please enter a text.</p>
          <div className="form-group">
            <UnicodeEditorCustom value={value} onChange={handleChange} />
          </div>
        </div>

        <div className="modal-footer">
          <Button className="w-100 h-40" onClick={handleSubmit}>
            Add asset with this text
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
