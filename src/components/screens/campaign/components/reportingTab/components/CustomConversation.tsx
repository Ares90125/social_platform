/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../../../../../assests/scss/campaign.module.scss';

const customOption = {
  chart: {
    type: 'bar',
    height: '200px',
  },
  title: {
    text: null,
  },
  xAxis: {
    categories: ['Buying intent', 'Recommendations', 'Usage'],
    title: {
      text: null,
    },
    gridLineWidth: 0,
    alignTicks: 'true',
    labels: {
      useHTML: true,
      style: {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#9999A7',
      },
    },
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  yAxis: {
    gridLineWidth: 0,
    lineWidth: 1,
    min: 0,
    title: {
      text: null,
    },
    labels: {
      overflow: 'justify',
    },
    tickPositions: [0, 30, 60, 90, 120, 150, 180, 210, 240],
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
      },
      colorByPoint: null,
    },
    series: { borderRadius: '5px' },
  },
  series: [
    {
      color: '#F7B6D2',
      data: [156, 200, 220],
      dataLabels: {
        enabled: true,
        align: 'right',
        x: -200,
        style: {
          fontSize: '12px',
          fontFamily: 'helvetica, arial, sans-serif',
          textShadow: false,
          lineHeight: '14px',
          fontWeight: 500,
        },
      },
    },
  ],
};

const CustomConversation: React.FC = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [wordText, setWordText] = useState('');
  const [open, setOpen] = React.useState(false);
  const [customw, setCustomw] = useState(true);
  const [customSpan, setCustomSpan] = useState(
    'Top keywords that were trending before and during the campaign',
  );
  const [customSpanCancel, setCustomSpanCancel] = useState('');
  const [conversations, setConversations] = useState(true);
  const [conversationsText, setConversationsText] = useState('');
  const [conversationsTextCancel, setConversationsTextCancel] = useState('');
  const [custom, setCustom] = useState([{ name: '', title: '' }]);
  const [addHidde, setAddHidden] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addCustomSpan = () => {
    setCustomw(false);
  };
  const changeCustomSpan = (e) => {
    setCustomSpanCancel(e.target.value);
  };
  const saveCustomSpan = () => {
    setCustomSpan(customSpanCancel);
    setCustomw(true);
  };
  const cancelCustomSpan = () => {
    setCustomw(true);
  };
  const addConversationsText = () => {
    setConversations(false);
  };
  const changeConversationsText = (e) => {
    setConversationsTextCancel(e.target.value);
  };
  const saveConversationsText = () => {
    setConversationsText(conversationsTextCancel);
    setConversations(true);
  };
  const cancelConversationsText = () => {
    setConversations(true);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  const addAnother = () => {
    setCustom([...custom, { name: '', title: '' }]);
    if (custom.length === 4) {
      setAddHidden(true);
    }
  };
  const deleteCustom = (index) => {
    console.log(index);
  };
  const changeTypeKey = (e, index) => {
    console.log(e.target.value, index);
  };
  const changeBucketTexterea = (e, index) => {
    console.log(e.target.value, index);
    console.log(custom[index]);
    // if([custom.length].includes(index)){
    //   custom.fil)
    // }
  };

  return (
    <>
      <Grid
        className={styles.phase_card}
        sx={{ paddingTop: '32px' }}
        id="customConversation"
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <Grid
              container
              sx={{ width: '820px' }}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item className={styles.num}>
                    Custom Conversations
                  </Grid>
                  <Grid item onClick={addCustomSpan} className={styles.edit}>
                    Edit
                  </Grid>
                  <Grid item onClick={addCustomSpan} sx={{ marginTop: '2px' }}>
                    <img className={styles.pen} src="/images/pen.jpg" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ marginTop: '-7px' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item sx={{ marginTop: '2px' }}>
                    <img
                      style={{ cursor: 'pointer' }}
                      src="/images/trash.jpg"
                    />
                  </Grid>
                  <Grid item className={styles.delete}>
                    Delete Custom Conversation
                  </Grid>
                  <Grid item>
                    <Switch {...label} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={styles.span}>
            {customw ? (
              <Grid item className={styles.span}>
                {customSpan === '' ? (
                  <Grid className={styles.add} onClick={addCustomSpan}>
                    + Add supporting text
                  </Grid>
                ) : (
                  customSpan
                )}
              </Grid>
            ) : (
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <textarea
                      onChange={changeCustomSpan}
                      value={customSpan}
                      className={styles.textarea}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <button
                          className={clsx(styles.saveh, styles.button)}
                          onClick={saveCustomSpan}
                        >
                          Save
                        </button>
                      </Grid>
                      <Grid item>
                        <button
                          className={clsx(styles.cancelh, styles.button)}
                          onClick={cancelCustomSpan}
                        >
                          Cancel
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item sx={{ width: '816px' }}>
            <HighchartsReact highcharts={Highcharts} options={customOption} />
          </Grid>
          <Grid item>
            {conversations ? (
              <div>
                {conversationsText === '' ? (
                  <Grid
                    className={styles.add_key}
                    onClick={addConversationsText}
                  >
                    + Add supporting text
                  </Grid>
                ) : (
                  <>
                    <Grid item className={styles.font}>
                      {conversationsText}
                    </Grid>
                    <Grid
                      item
                      onClick={addConversationsText}
                      className={styles.twoedit}
                      sx={{ marginBottom: '20px' }}
                    >
                      <img className={styles.pen} src="/images/pen.jpg" />
                      <span style={{ lineHeight: '40px' }}>Edit Text</span>
                    </Grid>
                  </>
                )}
              </div>
            ) : (
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <textarea
                      onChange={changeConversationsText}
                      value={wordText}
                      className={styles.textarea}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <button
                          className={clsx(styles.saveh, styles.button)}
                          onClick={saveConversationsText}
                        >
                          Save
                        </button>
                      </Grid>
                      <Grid item>
                        <button
                          className={clsx(styles.cancelh, styles.button)}
                          onClick={cancelConversationsText}
                        >
                          Cancel
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className={styles.custom_card} onClick={handleClickOpen}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <img src="/images/add.jpg" />
          </Grid>
          <Grid item>
            <span className={styles.add_custom}>Add Custom Conversation</span>
          </Grid>
        </Grid>
      </Grid>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Custom Conversation
        </BootstrapDialogTitle>
        <Grid className={styles.line} />
        <Grid
          container
          className={styles.customized_dialog}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item sx={{ marginBottom: '32px' }}>
            <input
              style={{ height: '40px' }}
              placeholder="Define title for the section"
              className={styles.input}
            />
          </Grid>
          <Grid item sx={{ marginBottom: '41px' }}>
            <textarea
              style={{ height: '80px' }}
              placeholder="Define subtitle for the section"
              className={styles.input}
            />
          </Grid>
          <Grid item sx={{ marginBottom: '8px' }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item className={styles.bucket}>
                <span className={styles.span}>Bucket name</span>
              </Grid>
              <Grid item className={styles.keywords}>
                <span className={styles.span}>Keywords/phrases to track</span>
              </Grid>
              <Grid item className={styles.visibility}>
                <span className={styles.span}>Visibility to Brand</span>
              </Grid>
            </Grid>
          </Grid>
          {custom.map((item, index) => (
            <Grid item key={index}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid key={index} item sx={{ marginTop: '11.67px' }}>
                  <img
                    src="/images/ban.jpg"
                    onClick={() => {
                      deleteCustom(index);
                    }}
                  />
                </Grid>
                <Grid item>
                  <input
                    onChange={(e) => {
                      changeTypeKey(e, index);
                    }}
                    key={index}
                    className={styles.bucket_input}
                    placeholder="Type a keyword"
                  />
                </Grid>
                <Grid item>
                  <textarea
                    onChange={(e) => {
                      changeBucketTexterea(e, index);
                    }}
                    key={index}
                    className={styles.bucket_textarea}
                    placeholder="Define the keywords/phrases to track. The system will append keyword transformations to the same."
                  />
                </Grid>
                <Grid item>
                  <Switch
                    sx={{ marginLeft: '50px' }}
                    {...label}
                    defaultChecked
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item className={styles.add_another} hidden={addHidde}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <img src="/images/add.jpg" />
              </Grid>
              <Grid item className={styles.another} onClick={addAnother}>
                Add another bucket (upto 5)
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <button className={styles.button} onClick={handleClose}>
            Save
          </button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default CustomConversation;
