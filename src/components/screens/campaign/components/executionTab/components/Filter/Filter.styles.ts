import { Colors } from '../../../../../../../utils/enums/colors';

export const styles = {
  filtersChip: {
    background: Colors.RED_BG,
    borderRadius: '10px',
    color: Colors.ERROR_RED,
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '500',
    minWidth: '24px',
    marginLeft: '8px',
    height: '20px',
    cursor: 'pointer',
  },
  popperWrapper: {
    display: 'flex',
    padding: '8px',
    width: '380px',
  },
  popperLeft: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '8px',
  },
  popperRight: {
    width: '50%',
    paddingLeft: '8px',
    borderLeft: `1px solid ${Colors.DIVIDER_GREY}`,
  },
  tabButton: {
    textTransform: 'none',
    color: Colors.BLACK,
    justifyContent: 'flex-start',
  },
  tabActive: {
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
  checkboxWrapper: {
    marginRight: '0',
    span: {
      fontSize: '14px',
      lineHeight: '16px',
    },
  },
  checkboxSpan: {
    marginTop: '2px',
    display: 'block',
    fontSize: '12px !important',
  },
};
