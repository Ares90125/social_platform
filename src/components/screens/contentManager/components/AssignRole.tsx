import React, { useState } from 'react';
import { Dialog, TextareaAutosize } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Button } from '../../../form';
import {
  CampaignAsset,
  CampaignAssetItem,
} from '../../../../graphs/getCampaignAssetsByCampaignId';
import { UpdateAssetInput } from '../../../../graphs/updateCampaignGroupAssetsByIds';
import { UserRole } from '../../../../graphs/getUsersByRoles';

type AssignRoleProps = {
  open: boolean;
  type: 'copywriter' | 'designer' | '';
  campaignAsset: CampaignAsset;
  closeModal: () => void;
  updateGroupAsset: (input: {
    campaignId: string;
    groupId: string;
    input: UpdateAssetInput;
  }) => void;
  selectedRole: { userRole: UserRole | null; asset: CampaignAssetItem | null };
};

export const AssignRole: React.FC<AssignRoleProps> = ({
  open,
  type,
  campaignAsset,
  closeModal,
  updateGroupAsset,
  selectedRole,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (): void => {
    if (
      !campaignAsset?.campaignId ||
      !campaignAsset?.groupId ||
      !selectedRole.asset ||
      !selectedRole.userRole
    ) {
      return;
    }

    updateGroupAsset({
      campaignId: campaignAsset.campaignId,
      groupId: campaignAsset.groupId,
      input: {
        assignedContentUserId: selectedRole.userRole.id,
        id: selectedRole.asset.id,
        rejectReason: value,
        status: selectedRole.asset.status,
        value: selectedRole.asset.value,
      },
    });

    setValue('');
    closeModal();
  };

  return (
    <Dialog open={open} onClose={closeModal} className="modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5>Assign Role</h5>
          <button className="modal-close-btn">
            <Close fontSize="medium" onClick={closeModal} />
          </button>
        </div>

        <div className="modal-body">
          <p className="label">
            Please enter a comment which will be send to {type}.
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
            Send to {type}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
