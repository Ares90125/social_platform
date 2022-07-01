import React, { useState } from 'react';
import { Button, ClickAwayListener, Paper, Popper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ButtonOutlined } from '../../../../../../form';
import { EditModalState } from '../../ExecutionTab';

type EditGroupButtonProps = {
  setEditModalState: React.Dispatch<React.SetStateAction<EditModalState>>;
};
type PopperState = {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
};

export const editGroupsOptions = {
  modeOfCommunication: 'Primary Channel',
  сommunityManager: 'Community Manager',
  cohort: 'Cohort',
  pricing: 'Pricing',
  defaultTaskDate: 'Posting Time',
  timezone: 'Posting Timezone',
  paymentStatus: 'Payment Status',
  paymentRemarks: ' Payment Remarks ',
  paymentAmountPaid: 'Payment Amount Paid',
  paymentDate: 'Payment Date',
};

export const EditGroupsButton: React.FC<EditGroupButtonProps> = ({
  setEditModalState,
}) => {
  const [popperState, setPopperState] = useState<PopperState>({
    isOpen: false,
    anchorEl: null,
  });
  const handlePopperOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setPopperState({
      isOpen: true,
      anchorEl: e.currentTarget,
    });
  };
  const handlePopperClose = (): void => {
    setPopperState({
      isOpen: false,
      anchorEl: null,
    });
  };
  const handleOpenModal = (key: string, label: string): void => {
    handlePopperClose();
    setEditModalState({ isOpen: true, option: { key, label } });
  };
  return (
    <>
      <ButtonOutlined
        onClick={handlePopperOpen}
        sx={{ textTransform: 'none', mr: '10px' }}
        endIcon={<ArrowDropDownIcon />}
      >
        Edit
      </ButtonOutlined>
      <Popper
        open={popperState.isOpen}
        anchorEl={popperState.anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handlePopperClose}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '170px',
              pt: '8px',
              pb: '8px',
            }}
          >
            {Object.entries(editGroupsOptions).map((option) => {
              const [key, label] = option;
              return (
                <Button
                  key={key}
                  onClick={(): void => handleOpenModal(key, label)}
                  sx={{
                    textTransform: 'none',
                    color: '#000',
                    justifyContent: 'flex-start',
                    fontWeight: 400,
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
