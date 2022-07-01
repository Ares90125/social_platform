/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Grid, Switch } from '@mui/material';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { KeyFindingModal } from './modals/KeyFindingModal';

type KeyFindingsProp = {
  content: string;
  visible?: Boolean | null;
  supportText: string;
  updateSupportText: Function;
  handleUpdateContent: Function;
};

const KeyFindings: React.FC<KeyFindingsProp> = ({
  content,
  visible,
  supportText,
  updateSupportText,
  handleUpdateContent,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [hideEditing, setHideFinding] = React.useState(true);
  const [keyFindingText, setKeyFindingText] = React.useState(content);
  const [contentVisible, setContentVisible] = React.useState<
    boolean | undefined
  >(visible as boolean);

  const [hideEditSupportText, setHideEditSupportText] = React.useState(true);
  const [localSupportText, setSupportText] = useState(supportText);

  useEffect(() => {
    setContentVisible(visible as boolean);
  }, [visible]);

  const showEditing = () => {
    setHideFinding(false);
  };
  const showEditSupportingText = () => {
    setHideEditSupportText(false);
  };
  const saveSupportText = () => {
    setHideEditSupportText(true);
    updateSupportText(localSupportText);
  };
  const cancelSupportText = () => {
    setHideEditSupportText(true);
  };

  const handleUpdate = (newContent) => {
    setHideFinding(true);
    setKeyFindingText(newContent);
    handleUpdateContent(newContent);
  };

  return (
    <Grid
      className={styles.phase_card}
      sx={{ paddingTop: '32px' }}
      id="keyFindings"
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
                  Key Findings
                </Grid>
                <Grid item onClick={showEditing} className={styles.edit}>
                  Edit
                </Grid>
                <Grid item onClick={showEditing} sx={{ marginTop: '2px' }}>
                  <img className={styles.pen} src="/images/pen.jpg" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: '-7px' }}>
              <Switch {...label} checked={contentVisible} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.span}>
          <Grid item className={styles.span}>
            {keyFindingText && (
              <div dangerouslySetInnerHTML={{ __html: keyFindingText! }} />
            )}
          </Grid>
        </Grid>
        <Grid item>
          {hideEditSupportText ? (
            <div>
              {localSupportText === '' ? (
                <Grid
                  className={styles.add_key}
                  onClick={showEditSupportingText}
                >
                  + Add supporting text
                </Grid>
              ) : (
                <>
                  <Grid item className={styles.font}>
                    <div
                      dangerouslySetInnerHTML={{ __html: localSupportText }}
                    />
                  </Grid>
                  <Grid
                    item
                    onClick={showEditSupportingText}
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
                    value={localSupportText}
                    onChange={(e) => setSupportText(e.target.value)}
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
                        onClick={saveSupportText}
                      >
                        Save
                      </button>
                    </Grid>
                    <Grid item>
                      <button
                        className={clsx(styles.cancel, styles.button)}
                        onClick={cancelSupportText}
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
      {!hideEditing && (
        <KeyFindingModal
          content={keyFindingText}
          handleClose={() => setHideFinding(true)}
          handleUpdate={handleUpdate}
        />
      )}
    </Grid>
  );
};

export default KeyFindings;
