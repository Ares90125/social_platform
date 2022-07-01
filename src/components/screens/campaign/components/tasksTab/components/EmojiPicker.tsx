import React, { useEffect, useRef } from 'react';
import data from '@emoji-mart/data';
import { Picker, BaseEmoji } from 'emoji-mart';

type EmojiPickerProps = {
  onEmojiSelect: (emoji: BaseEmoji) => void;
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore: Because
    // eslint-disable-next-line no-new
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
};

export default EmojiPicker;
