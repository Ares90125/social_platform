import styled from 'styled-components';
import { Popper, tooltipClasses } from '@mui/material';
import { Colors } from '../../utils/enums/colors';

export const StylizedPopper = styled(Popper)`
  .${tooltipClasses.tooltip} {
    color: ${Colors.WHITE};
    padding: 12px;
    font-size: 13px;
    text-align: center;
    font-weight: 400;
    line-height: 16px;
    background-color: rgba(51, 51, 79, 0.9);
    box-shadow: 0 2px 4px rgb(41 41 64 / 20%);
    border-radius: 5px;
  }
`;
