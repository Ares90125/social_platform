import React, { useRef } from 'react';
import { EditorState } from 'react-unicode-editor';
import { FormatButtons } from './components/FormatButtons';
import { EmojiComponent } from './components/EmojiComponent';

const UnicodeEditor = React.lazy(() => import('react-unicode-editor'));

type UnicodeEditorCustomProps = {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};

export const UnicodeEditorCustom: React.FC<UnicodeEditorCustomProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  // @ts-ignore: Because
  const editorRef = useRef<UnicodeEditor>(null);

  const handleEmojiClick = (text: string): void => {
    if (editorRef.current) editorRef.current.addText(text);
  };

  const handleFormatClick = (format: string): void => {
    if (editorRef?.current) editorRef.current.format(format);
  };

  const handleEditorChange = (newValue: EditorState): void => {
    onChange(newValue.toString());
  };

  const editorStyles: React.CSSProperties = {
    height: 256,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: '#d6d6dc',
    outlineColor: '#d6d6dc',
    opacity: disabled ? '90%' : undefined,
    marginBottom: 2,
    overflowY: 'auto',
    maxWidth: 344,
  };

  const css = `
    .unicode-editor-actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <React.Suspense fallback={<p>loading...</p>}>
        <div>
          <UnicodeEditor
            onChange={handleEditorChange}
            startValue={[value]}
            disableContextMenu={false}
            ref={editorRef}
            style={editorStyles}
            disabled={disabled}
            debounce={false}
            className="unicode-editor"
          />
        </div>
      </React.Suspense>

      <div className="unicode-editor-actions">
        <FormatButtons onFormatClick={handleFormatClick} />
        <EmojiComponent insertText={handleEmojiClick} />
      </div>
    </>
  );
};
