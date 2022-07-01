import styled from 'styled-components';
import {
  FormControl as FormControlMUI,
  InputLabel as InputLabelMUI,
  FormHelperText as FormHelperTextMUI,
  OutlinedInput as OutlinedInputMUI,
  inputLabelClasses,
  formHelperTextClasses,
  outlinedInputClasses,
} from '@mui/material';
import { Colors } from '../../../utils/enums/colors';

export const InputWrapper = styled.div`
  width: 100%;
`;

export const FormControl = styled(FormControlMUI)`
  width: 100%;
`;

export const InputLabel = styled(InputLabelMUI)`
  color: rgba(113, 113, 166, 0.7);

  &.${inputLabelClasses.error} {
    color: ${Colors.ERROR_TEXT};
  }
`;

export const FormHelperText = styled(FormHelperTextMUI)`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${Colors.BLACK_70};
  margin: 8px 0;

  &.${formHelperTextClasses.error} {
    color: ${Colors.ERROR_TEXT};
  }
`;

export const OutlinedInput = styled(OutlinedInputMUI)`
  background: #fff;
  width: 100%;
  &.${outlinedInputClasses.error} {
    fieldset {
      border-color: ${Colors.ERROR_TEXT} !important;
    }
  }
`;
