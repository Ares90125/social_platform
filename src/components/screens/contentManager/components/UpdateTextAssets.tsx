import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { useMutation } from 'react-query';
import { Close } from '@mui/icons-material';
import {
  UpdateAssetInput,
  updateCampaignGroupAssetsByIds,
} from '../../../../graphs/updateCampaignGroupAssetsByIds';
import { Button, UnicodeEditorCustom } from '../../../form';
import { CampaignAsset } from '../../../../graphs/createCampaignGroupAsset';
import { useToast } from '../../../../context/toast';

type UpdateTextAssetsProps = {
  id: string;
  defaultValue: string;
  openTextAssets: boolean;
  campaignAsset: CampaignAsset;
  refetchCampaignAsset: () => void;
  closeTextAssetsModal: () => void;
};
export const UpdateTextAssets: React.FC<UpdateTextAssetsProps> = ({
  id,
  defaultValue,
  campaignAsset,
  openTextAssets,
  closeTextAssetsModal,
  refetchCampaignAsset,
}) => {
  const [value, setValue] = useState(defaultValue || '');
  const { setSuccessToast, setErrorToast } = useToast();
  const updateGroupAssetMutation = useMutation(
    (data: { campaignId: string; groupId: string; input: UpdateAssetInput }) =>
      updateCampaignGroupAssetsByIds(data),
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
    updateGroupAssetMutation.mutate({
      campaignId: campaignAsset.campaignId,
      groupId: campaignAsset.groupId,
      input: { status: 'PendingApproval', id, value },
    });
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Dialog
      open={openTextAssets}
      onClose={closeTextAssetsModal}
      className="modal-sx"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5>Please edit text.</h5>
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
            Update text
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
