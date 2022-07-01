import styled, { keyframes } from 'styled-components';
import { Colors } from '../../../../../../../utils/enums/colors';

const getColorByStatus = (
  ready: boolean,
  approved: boolean,
  brandProposalSent: boolean,
): string => {
  if (ready) return Colors.EMP_BLUE_1;
  if (approved) return Colors.CONFIRMATION_GREEN;
  if (brandProposalSent) return Colors.ORANGE_DARK;
  return Colors.BLACK_40;
};

const bubble = keyframes`
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
`;

export const TooltipIcon = styled.div<{
  ready: boolean;
  approved: boolean;
  brandProposalSent: boolean;
}>`
  height: 10px;
  width: 10px;
  min-width: 10px;
  border-radius: 10px;
  margin-right: 8px;
  position: relative;
  background-color: ${({ ready, approved, brandProposalSent }): string =>
    getColorByStatus(ready, approved, brandProposalSent)};

  &:before {
    position: absolute;
    height: 16px;
    width: 16px;
    content: '';
    left: -3px;
    top: -3px;
    opacity: 0.25;
    border-radius: 8px;
    animation: 2s ${bubble} linear infinite;
    background-color: ${({ ready, approved, brandProposalSent }): string =>
      getColorByStatus(ready, approved, brandProposalSent)};
  }
`;

export const styles = {
  wrapper: {
    position: 'absolute',
    top: '-56px',
    right: '0',
    color: Colors.BLACK_70,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: '12px',
    lineHeight: '14px',
  },
  button: {
    fontSize: '12px',
    padding: 0,
    fontWeight: 500,
    color: Colors.EMP_BLUE_1,
    paddingLeft: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};
