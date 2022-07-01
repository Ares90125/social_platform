import dynamic from 'next/dynamic';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const StylizedEditor = styled(ReactQuill)`
  display: flex;
  flex-flow: column-reverse;

  .ql-toolbar.ql-snow {
    background: #f4f6f8;
    border: 1px solid #e0e0e5;
    border-top: 0;
    border-radius: 0 0 3px 3px;
    padding: 12px;
  }
  .ql-editor.ql-blank::before {
    font-style: normal;
  }
  .ql-container.ql-snow {
    background: #fff;
    border: 1px solid #e0e0e5 !important;
    box-shadow: inset 0 2px 2px rgb(221 221 249 / 40%);
    border-radius: 3px 3px 0 0;
    padding: 0;
    height: 200px;
    color: #33334f;
    font-style: normal;
    font-size: 16px;
  }
`;
