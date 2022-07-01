import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';

export const SearchResultsWrapper = styled.div`
  padding: 8px 0;
  border: 1px solid ${Colors.BORDERS_GREY};
  box-shadow: 0 3px 6px #0000001f;
  border-radius: 4px;
  width: 100%;
  position: absolute;
  left: 0;
  background: ${Colors.WHITE};
  z-index: 1;
  top: calc(100% + 3px);
`;

export const SearchResultsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const SearchResultsItem = styled.li<{ primary?: boolean }>`
  font-size: 14px;
  line-height: 16px;
  padding: 8px 16px;
  color: ${({ primary }): string => (primary ? '#3654ff' : Colors.PRIMARY_1)};
  font-weight: ${({ primary }): number => (primary ? 500 : 400)};
  word-break: break-word;
`;
