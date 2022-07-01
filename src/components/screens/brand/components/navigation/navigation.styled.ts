import styled from 'styled-components';
import { Colors } from '../../../../../utils/enums/colors';

export const NavigationWrapper = styled.div`
  padding: 0 15px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${Colors.PRIMARY_3};
  margin-top: -10px;
`;
export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
`;

export const BrandsWrapper = styled.div`
  position: relative;
`;

export const BrandInfo = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  figure {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${Colors.PRIMARY_3};
    margin: 0;
    background: ${Colors.WHITE};

    img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 50px;
    }
  }

  p {
    margin: 0 0 0 10px;
    opacity: 0.8;
    color: ${Colors.PRIMARY_1};
    font-weight: 600;
    font-size: 16px;
  }
`;

export const OtherBrandsWrapper = styled.ul`
  max-height: 300px;
  overflow: auto;
  background: ${Colors.WHITE};
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  padding: 8px 0;
  font-size: 1rem;
  text-align: left;
  list-style: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  margin: 0;

  li {
    color: ${Colors.PRIMARY_1};
    font-size: 13px;

    &:hover {
      background-color: #e9ecef;
    }

    a {
      display: block;
      padding: 7px 10px;
    }
  }
`;
