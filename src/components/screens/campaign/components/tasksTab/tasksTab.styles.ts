import { Colors } from '../../../../../utils/enums/colors';

export const commonStyles = {
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexCenterCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    boxShadow: '0 2px 6px #0000001a',
    WebkitBorderRadius: '10px',
    marginBottom: '30px',
  },
  select: {
    fontSize: '14px',
    '.MuiSelect-select': {
      minWidth: '100px',
    },
  },
  backgroundBox: {
    background: 'rgba(244,246,248,.6)',
  },
  icon: {
    color: Colors.PRIMARY_1,
    opacity: '.5',
    width: '15px',
    height: '15px',
  },
};

export const headerStyles = {
  chip: {
    minWidth: '30px',
    marginLeft: '5px',
    height: '20px',
  },
  box: {
    padding: '16px 16px 16px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: '3px',
    transform: 'rotate(180deg)',
  },
  button: {
    margin: '0 15px',
    textTransform: 'none',
    color: Colors.BLACK_70,
    backgroundColor: Colors.WHITE,
    border: `1px solid ${Colors.BLACK_70}`,
    '&:hover': {
      border: `1px solid ${Colors.BLACK}`,
      backgroundColor: Colors.WHITE,
    },
  },
  filterPopper: {
    padding: '5px',
    minWidth: '200px',
    boxShadow: '0 2px 4px #0000003d, 0 2px 8px #0000001f',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    '.MuiInput-input': {
      width: '248px',
      backgroundColor: Colors.WHITE,
      fontSize: '14px',
      padding: '8px 12px',
      border: '1px solid #ddddf9',
      borderRadius: '3px',
    },
    '&.Mui-focused .MuiInput-input': {
      border: `1px solid ${Colors.BLACK}`,
    },
  },
};

export const tableStyles = {
  headCell: {
    fontSize: '12px',
  },
  groupIcon: {
    marginRight: '10px',
    width: '18px',
    height: '18px',
  },
  editIcon: {
    transition: 'color .2s',
    '&:hover': {
      color: '#0056b3',
    },
  },
  editPopper: {
    menu: {
      padding: '0px',
      minWidth: '105px',
    },
    item: {
      padding: '12px',
      fontSize: '14px',
    },
  },
};

export const modalStyles = {
  container: {
    position: 'relative',
    margin: '20px auto',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90%',
    overflowY: 'auto',
  },
  form: {
    briedSection: {
      backgroundColor: Colors.BG_GREY,
      padding: '30px',
    },
    noteSection: {
      backgroundColor: Colors.BG_GREY,
    },
    emojiWrapper: {
      position: 'relative',
    },
    emojiWindow: {
      position: 'absolute',
      left: '40px',
      bottom: 0,
      zIndex: 10,
    },
    actions: {
      display: 'flex',
      mt: '10px',
    },
  },

  bottom: {
    container: {
      borderTop: `1px solid ${Colors.BLACK_20}`,
      zIndex: 1,
      backgroundColor: Colors.WHITE,
      position: 'sticky',
      bottom: 0,
      left: 0,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0.75rem',
    },
    cancelBtn: {
      margin: '0 10px',
      textTransform: 'none',
      color: Colors.BLACK_50,
      fontWeight: 400,
      '&:hover': {
        background: 'transparent',
      },
    },
    saveBtn: {
      backgroundColor: Colors.EMP_BLUE_1,
      color: Colors.WHITE,
    },
  },
};
