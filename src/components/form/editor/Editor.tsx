import React from 'react';
import ErrorTextWrapper from '../errorText/ErrorTextWrapper';
import { HelperText } from '../helperText/HelperText';
import { StylizedEditor } from './editor.styled';

type EditorProps = {
  id: string;
  value: string;
  onChange: () => void;
  placeholder?: string;
  helperText?: React.ReactNode;
  errorText?: string;
};

const quillConfig = [
  [
    'bold',
    'italic',
    'link',
    'image',
    'video',
    { list: 'ordered' },
    { list: 'bullet' },
  ],
];

export const Editor: React.FC<EditorProps> = ({
  id,
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
}) => (
  <ErrorTextWrapper errorText={errorText}>
    {helperText && <HelperText error={!!errorText}>{helperText}</HelperText>}
    <StylizedEditor
      theme="snow"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={{ toolbar: quillConfig }}
    />
  </ErrorTextWrapper>
);
