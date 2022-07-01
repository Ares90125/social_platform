import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SecondaryButton, ButtonOutlined } from '..';
import { UserRole } from '../../../graphs/getUsersByRoles';

type MenuDropDownProps = {
  buttonType?: string;
  buttonText: string;
  menuItems: UserRole[];
  disabled?: boolean;
  modalType: 'copywriter' | 'designer';
  onChange: (type: 'copywriter' | 'designer') => void;
  handleValueChange: (role: UserRole) => void;
};

export const MenuDropDown: React.FC<MenuDropDownProps> = ({
  buttonType,
  buttonText,
  menuItems,
  disabled,
  onChange,
  modalType,
  handleValueChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleChange = (role: UserRole): void => {
    handleValueChange(role);
    onChange(modalType);
    handleClose();
  };

  const getButtonType = (type?: string): JSX.Element => {
    if (type === 'outlined') {
      return (
        <ButtonOutlined
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          disabled={disabled}
          sx={{ width: '100%' }}
        >
          <span
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {buttonText}
          </span>
        </ButtonOutlined>
      );
    }
    return (
      <SecondaryButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={disabled}
        sx={{ width: '100%' }}
      >
        <span
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {buttonText}
        </span>
      </SecondaryButton>
    );
  };

  return (
    <>
      {getButtonType(buttonType)}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="drop-down-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems?.map((item) => (
          <MenuItem onClick={(): void => handleChange(item)} key={item.id}>
            <span className="menu-item">
              {item.fullname} {item.email}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
