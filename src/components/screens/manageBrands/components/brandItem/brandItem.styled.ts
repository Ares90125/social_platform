import styled from 'styled-components';

export const BrandItemWrapper = styled.div`
  width: 260px;
  background: #fff;
  box-shadow: 0 2px 3px #00000008;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin: 0 16px 16px 0;
  cursor: pointer;
`;

export const BrandImage = styled.figure`
  margin: 0;
  border: 4px solid #f4f6f8;
  height: 60px;
  width: 60px;
  padding: 5px;
  position: relative;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 50px;
  }
`;

export const BrandName = styled.p`
  font-size: 16px;
  color: #33334f;
  margin: 0 0 0 12px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
