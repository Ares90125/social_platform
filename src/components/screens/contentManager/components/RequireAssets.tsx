import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import { useMutation } from 'react-query';
import { Close } from '@mui/icons-material';
import { Button } from '../../../form';
import { useToast } from '../../../../context/toast';
import {
  requireAssetReminder,
  RequireAssetReminderArgs,
} from '../../../../graphs/requireAssetReminder';

type RequireAssetsProps = {
  open: boolean;
  groupId: string;
  campaignId: string;
  closeRequireAssetsModal: () => void;
};

export const RequireAssets: React.FC<RequireAssetsProps> = ({
  open,
  groupId,
  campaignId,
  closeRequireAssetsModal,
}) => {
  const [message, setMessage] = useState('');
  const { setSuccessToast, setErrorToast } = useToast();
  const assetsMutation = useMutation(
    (data: RequireAssetReminderArgs) => requireAssetReminder(data),
    {
      onSuccess: () => {
        closeRequireAssetsModal();
        setMessage('');
        setSuccessToast();
      },
      onError: () => {
        closeRequireAssetsModal();
        setMessage('');
        setErrorToast();
      },
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  const handleSubmit = (): void => {
    if (message.trim().length > 0) {
      assetsMutation.mutate({
        groupId,
        campaignId,
        message,
      });
    }
  };

  return (
    <Dialog open={open} onClose={closeRequireAssetsModal} className="modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Require asset</h5>
          <button className="modal-close-btn">
            <Close fontSize="medium" onClick={closeRequireAssetsModal} />
          </button>
        </div>

        <div className="modal-body">
          <p className="label">Please enter a comment of asset requirement.</p>
          <div className="form-group">
            <textarea
              placeholder="Enter your comments..."
              className="convo-input"
              value={message}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <Button className="w-100 h-40" onClick={handleSubmit}>
            Require asset
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
