import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ButtonOutlined } from '../..';

interface FormatButtonsProps {
  onFormatClick: Function;
}

const formats = [
  ['normal', ' Normal abc'],
  ['sansBold', 'Bold (Sans) 𝗮𝗯𝗰'],
  ['sansItalic', 'Italic (Sans) 𝘢𝘣𝘤'],
  ['sansBoldItalic', 'Bold Italic (Sans) 𝙖𝙗𝙘'],
  ['bold', 'Bold (Serif) 𝐚𝐛𝐜'],
  ['italic', 'Italic (Serif) 𝑎𝑏𝑐'],
  ['boldItalic', 'Bold Italic (Serif) 𝒂𝒃𝒄'],
  ['script', 'Script 𝒶𝒷𝒸'],
  ['scriptBold', 'Script Bold 𝓪𝓫𝓬'],
  ['fraktur', 'Fraktur 𝔞𝔟𝔠'],
  ['frakturBold', 'Frak Bold 𝖆𝖇𝖈'],
  ['monospace', 'Monospace 𝚊𝚋𝚌'],
  ['doublestruck', 'Double 𝕒𝕓𝕔'],
  // ['circled', 'Circled ⓐⓑⓒ'],
  // ['inverseCircled', 'Circle 2 🅐🅑🅒 (CAPS)'],
  // ['squared', 'Squared 🄰🄱🄲 (CAPS)']
];

export const FormatButtons: React.FC<FormatButtonsProps> = ({
  onFormatClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonOutlined
        onClick={(): void => {
          onFormatClick('normal');
        }}
        onMouseDown={(e): void => {
          e.preventDefault();
        }}
      >
        Regular
      </ButtonOutlined>
      <ButtonOutlined
        onClick={(): void => {
          onFormatClick('sansBold');
        }}
        onMouseDown={(e): void => {
          e.preventDefault();
        }}
      >
        𝐁
      </ButtonOutlined>
      <ButtonOutlined
        onClick={(): void => {
          onFormatClick('sansItalic');
        }}
        onMouseDown={(e): void => {
          e.preventDefault();
        }}
      >
        𝒊
      </ButtonOutlined>
      <ButtonOutlined onClick={handleClick}>
        <span>More...</span>
      </ButtonOutlined>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="drop-down-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {formats?.map(([format, display]) => (
          <MenuItem
            key={`fdd_${format}`}
            onClick={(): void => {
              onFormatClick(format);
              handleClose();
            }}
          >
            <span className="menu-item">{display}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
