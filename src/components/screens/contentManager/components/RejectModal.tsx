import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Close } from '@mui/icons-material';
import { Dialog, TextareaAutosize } from '@mui/material';
import { Button } from '../../../form';
import {
  UpdateAssetInput,
  updateCampaignGroupAssetsByIds,
} from '../../../../graphs/updateCampaignGroupAssetsByIds';
import { CampaignAsset } from '../../../../graphs/createCampaignGroupAsset';
import { CampaignAssetItem } from '../../../../graphs/getCampaignAssetsByCampaignId';
import { useToast } from '../../../../context/toast';

type RejectModalProps = {
  openTextAssets: boolean;
  asset: CampaignAssetItem;
  campaignAsset: CampaignAsset;
  refetchCampaignAsset: () => void;
  closeModal: () => void;
};
export const RejectModal: React.FC<RejectModalProps> = ({
  asset,
  campaignAsset,
  openTextAssets,
  closeModal,
  refetchCampaignAsset,
}) => {
  const [value, setValue] = useState('');
  const { setSuccessToast, setErrorToast } = useToast();
  const updateGroupAssetMutation = useMutation(
    (data: { campaignId: string; groupId: string; input: UpdateAssetInput }) =>
      updateCampaignGroupAssetsByIds(data),
    {
      onSuccess: () => {
        setValue('');
        refetchCampaignAsset();
        closeModal();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (): void => {
    updateGroupAssetMutation.mutate({
      campaignId: campaignAsset.campaignId,
      groupId: campaignAsset.groupId,
      input: {
        status: 'Declined',
        id: asset.id,
        rejectReason: value,
        value: asset.value,
      },
    });
  };

  return (
    <Dialog open={openTextAssets} onClose={closeModal} className="modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Asset Rejection</h5>
          <button className="modal-close-btn">
            <Close fontSize="medium" onClick={closeModal} />
          </button>
        </div>

        <div className="modal-body">
          <p className="label">
            Please enter a comment which will be send to the group admin.
          </p>
          <div className="form-group">
            <TextareaAutosize
              onChange={handleChange}
              minRows={15}
              value={value}
              style={{
                width: '100%',
                border: '1px solid #e0e0e5',
                fontFamily: 'Roboto',
                padding: '5px',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>

        <div className="modal-footer">
          <Button className="w-100 h-40" onClick={handleSubmit}>
            Send to the group admin
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
