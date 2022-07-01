import React, { useState } from 'react';
import {
  Popper,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { tableStyles } from '../tasksTab.styles';

type TablePopperProps = {
  openEditModal: () => void;
};

export const TablePopper: React.FC<TablePopperProps> = ({ openEditModal }) => {
  const [isEditPopperOpen, setIsEditPopperOpen] = useState<boolean>(false);
  const [editPopperAnchor, setEditPopperAnchor] =
    useState<null | SVGSVGElement>(null);

  const handleOpenEditPopper = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ): void => {
    setEditPopperAnchor(e.currentTarget);
    setIsEditPopperOpen(!isEditPopperOpen);
  };

  const handleCloseEditPopper = (): void => {
    setIsEditPopperOpen(false);
  };

  return (
    <>
      <MoreVertIcon
        className="no-edit-modal"
        sx={tableStyles.editIcon}
        onClick={handleOpenEditPopper}
      />
      <Popper
        open={isEditPopperOpen}
        placement="bottom-end"
        anchorEl={editPopperAnchor}
      >
        <ClickAwayListener onClickAway={handleCloseEditPopper}>
          <Paper>
            <MenuList sx={tableStyles.editPopper.menu}>
              <MenuItem
                sx={tableStyles.editPopper.item}
                onClick={(): void => {
                  openEditModal();
                  handleCloseEditPopper();
                }}
              >
                Edit task
              </MenuItem>
            </MenuList>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
