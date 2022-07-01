import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, ClickAwayListener } from '@mui/material';
import { ButtonOutlined } from '../../button/Button';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface EmojiComponentProps {
  insertText: Function;
}

export const EmojiComponent: React.FC<EmojiComponentProps> = ({
  insertText,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const onEmojiClick = (event: any, emojiObject: any): void => {
    event.preventDefault();
    insertText(emojiObject.emoji);
  };

  const openEmoji = (): void => {
    setIsOpened(true);
  };

  const closeEmoji = (): void => {
    setIsOpened(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <ButtonOutlined onClick={openEmoji}>😀</ButtonOutlined>
      {isOpened && (
        <ClickAwayListener onClickAway={closeEmoji}>
          <Box
            sx={{
              position: 'absolute',
              top: '-260px',
              right: '0',
              maxHeight: '340px',
              overflowY: 'auto',
            }}
          >
            <Picker onEmojiClick={onEmojiClick} disableAutoFocus native />
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};
