import { Colors } from '../../../../../../utils/enums/colors';

export const communityAdminStyles = {
  tooltipBox: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
  },
  icon: {
    marginRight: '8px',
    width: '18px',
    height: '18px',
    color: Colors.BLACK_40,
    zIndex: 1,
  },
  iconVerified: {
    marginRight: '8px',
    width: '18px',
    height: '18px',
    color: Colors.EMP_BLUE_2,
    zIndex: 1,
  },
  iconTextPending: {
    color: Colors.ERROR_RED,
  },
};
export const requireAssetModalStyles = {
  textarea: {
    width: '100%',
    backgroundColor: Colors.DIVIDER_GREY,
    height: '200px',
    overflow: 'auto',
    resize: 'vertical',
    padding: '8px',
    border: 'none',
    borderRadius: '8px',
  },
};

export const normalizedNumberInput = {
  'input::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 'none',
  },
  'input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 'none',
  },
  'input[type=number]': {
    MozAppearance: 'textfield',
  },
};
export const modalStyles = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    margin: '0 auto',
    maxHeight: '90%',
  },
  bottomBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderTop: `1px solid ${Colors.BORDERS_GREY}`,
  },
};
