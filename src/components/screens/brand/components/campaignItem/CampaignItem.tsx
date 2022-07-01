import React, { useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { CampaignInputs } from '../../../campaign/components/detailsTab/campaign.types';
import {
  CampaignChip,
  CampaignChipActive,
  CampaignChipCompleted,
  CampaignChipDraft,
  CampaignChipPending,
  CampaignChipScheduled,
} from '../../../../chips/chips.styled';
import { CampaignStatusEnum } from '../../../../../utils/enums/campaignStatus';
import * as S from './campaignItem.styled';

const chips = {
  [CampaignStatusEnum.Draft]: CampaignChipDraft,
  [CampaignStatusEnum.PendingApproval]: CampaignChipPending,
  [CampaignStatusEnum.Scheduled]: CampaignChipScheduled,
  [CampaignStatusEnum.Active]: CampaignChipActive,
  [CampaignStatusEnum.Completed]: CampaignChipCompleted,
};

const chipNames = {
  [CampaignStatusEnum.Draft]: 'Draft',
  [CampaignStatusEnum.PendingApproval]: 'Pending...',
  [CampaignStatusEnum.Scheduled]: 'Scheduled',
  [CampaignStatusEnum.Active]: 'Active',
  [CampaignStatusEnum.Completed]: 'Completed',
};

export const CampaignItem: React.FC<CampaignInputs> = ({
  campaignName,
  status,
  startDateAtUTC,
  createdAtUTC,
  endDateAtUTC,
  campaignId,
}) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const Chip = status ? chips[status] : CampaignChip;
  const chipName = status ? chipNames[status] : status;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const moveToCampaign = (): void => {
    setAnchorEl(null);
    router.push(
      `/brands/${router.query.id}/edit-campaign/${campaignId}#communities`,
    );
  };

  return (
    <S.CampaignRow>
      <S.CampaignContent>
        <S.CampaignContentTop>
          <Image
            alt="Community icon"
            src="/icons/community-icon.svg"
            width={22}
            height={22}
          />
          <h5>{campaignName}</h5>
          <Chip>{chipName}</Chip>
        </S.CampaignContentTop>
        <p>
          {startDateAtUTC &&
            status === CampaignStatusEnum.Active &&
            `Active since ${moment(startDateAtUTC).format('D MMMM, y')}`}
          {startDateAtUTC &&
            (status === CampaignStatusEnum.Scheduled ||
              status === CampaignStatusEnum.PendingApproval) &&
            `Will start on ${moment(startDateAtUTC).format('D MMMM, y')}`}
          {createdAtUTC &&
            status === CampaignStatusEnum.Draft &&
            `In draft since ${moment(createdAtUTC).format('D MMMM, y')}`}
          {endDateAtUTC &&
            status === CampaignStatusEnum.Completed &&
            `Completed on ${moment(endDateAtUTC).format('D MMMM, y')}`}
        </p>
      </S.CampaignContent>
      <div>
        <IconButton
          id="campaign-button"
          aria-controls={open ? 'campaign-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="campaign-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'campaign-button',
          }}
        >
          <MenuItem onClick={moveToCampaign}>
            {chipName === chipNames.Draft ? 'Edit' : 'Manage'}
          </MenuItem>
        </Menu>
      </div>
    </S.CampaignRow>
  );
};
