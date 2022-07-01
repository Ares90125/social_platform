import styled from 'styled-components';
import { Colors } from '../../../../utils/enums/colors';

export const ImageInput = styled.input`
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
`;

export const styles = {
  form: {
    margin: '30px auto 0',
  },
  flexBetweenCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadImageBtn: {
    color: Colors.BLACK_40,
    textTransform: 'none',
    border: `1px dashed ${Colors.BORDERS_GREY}`,
    position: 'relative',
    width: '100%',
    height: '72px',
    background: Colors.WHITE,
    '&:hover': {
      background: Colors.WHITE,
    },
  },
  uploadedImageContainer: {
    padding: '12px 16px',
    width: '100%',
    height: '72px',
    background: Colors.WHITE,
    border: `2px solid ${Colors.EMP_BLUE_1}`,
    borderRadius: '6px',
  },
  imageWrapper: {
    border: `2px solid ${Colors.DIVIDER_GREY}`,
    borderRadius: '6px',
    overflow: 'hidden',
    height: '48px',
    width: '48px',
    img: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  submitBtn: {
    margin: '30px auto 0',
    height: '40px',
    width: '160px',
    background: 'rgba(51,51,79,.1)',
    fontWeight: 500,
    fontSize: '15px',
    padding: '5px 30px',
  },
};
