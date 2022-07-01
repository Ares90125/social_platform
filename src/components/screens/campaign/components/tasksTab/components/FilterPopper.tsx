import React, { useState } from 'react';
import { Box, Button, Popper, Paper, ClickAwayListener } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { headerStyles } from '../tasksTab.styles';

type FilterPopperProps = {
  buttonText: string;
  children: React.ReactNode;
};

export const FilterPopper: React.FC<FilterPopperProps> = ({
  buttonText,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(
    null,
  );

  const handleOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setAnchorEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        sx={headerStyles.button}
      >
        {buttonText}
      </Button>
      <Popper placement="bottom-start" open={isOpen} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={headerStyles.filterPopper}>{children}</Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};
