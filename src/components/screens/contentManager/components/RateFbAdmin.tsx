import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Close } from '@mui/icons-material';
import { Dialog, Rating, Stack } from '@mui/material';
import { Button } from '../../../form';
import { cmcSendRating } from '../../../../graphs/cmcSendRating';
import { useToast } from '../../../../context/toast';

type RateFbAdminProps = {
  groupId: string;
  campaignId: string;
  openRateFB: boolean;
  closeRateFbAdmin: () => void;
  handleRefetchCampaignAsset: () => void;
};

export const RateFbAdmin: React.FC<RateFbAdminProps> = ({
  groupId,
  campaignId,
  openRateFB,
  closeRateFbAdmin,
  handleRefetchCampaignAsset,
}) => {
  const { setSuccessToast, setErrorToast } = useToast();
  const [rating, setRating] = useState(5);
  const ratingMutation = useMutation(
    (data: { campaignId: string; groupId: string; rating: number }) =>
      cmcSendRating(data),
    {
      onSuccess: () => {
        setRating(5);
        closeRateFbAdmin();
        handleRefetchCampaignAsset();
        setSuccessToast();
      },
      onError: () => {
        setRating(5);
        closeRateFbAdmin();
        setErrorToast();
      },
    },
  );

  const handleChange = (_, newValue): void => {
    if (typeof newValue === 'number') {
      setRating(newValue);
    }
  };

  const handleSubmit = (): void => {
    ratingMutation.mutate({ campaignId, groupId, rating });
  };

  return (
    <Dialog open={openRateFB} onClose={closeRateFbAdmin} className="modal-sm">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Send rating to facebook admin</h5>
          <button className="modal-close-btn">
            <Close fontSize="medium" onClick={closeRateFbAdmin} />
          </button>
        </div>

        <div className="modal-body">
          <p className="label">Your rating</p>
          <Stack spacing={1}>
            <Rating
              name="size-medium"
              defaultValue={1}
              onChange={handleChange}
              size="large"
              value={rating}
            />
          </Stack>
        </div>

        <div className="modal-footer">
          <Button className="w-100 h-40" onClick={handleSubmit}>
            Send Rating
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
