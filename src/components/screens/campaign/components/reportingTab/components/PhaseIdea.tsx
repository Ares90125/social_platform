/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { Grid, Switch } from '@mui/material';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { PhaseIdeaModal } from './modals/PhaseIdeaModal';

export type IUpdatedPhaseIdeaValues = {
  content: string;
  supportingText?: string;
  visibleToBrand: Boolean;
};

type PhaseIdeaProps = {
  campaign?: CampaignInputs;
  handleUpdateContent: Function;
  visible?: Boolean | null;
};

const PhaseIdea: React.FC<PhaseIdeaProps> = ({
  campaign,
  handleUpdateContent,
  visible,
}) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [showEditModal, setShowEditModal] = useState(false);
  const [content, setContent] = useState(campaign?.phaseIdea);
  const [contentVisible, setContentVisible] = useState(visible as boolean);

  useEffect(() => {
    console.log('phase idea visible', visible);
    setContentVisible(visible as boolean);
  }, [visible]);

  const showModal = () => {
    setShowEditModal(true);
  };

  const handleUpdate = (result) => {
    setContent(result);
    setShowEditModal(false);
    handleUpdateContent(result);
  };

  return (
    <Grid
      className={styles.phase_card}
      sx={{ paddingTop: '32px' }}
      id="phaseIdea"
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
                  Phase Idea
                </Grid>
                <Grid item onClick={showModal} className={styles.edit}>
                  Edit
                </Grid>
                <Grid item onClick={showModal} sx={{ marginTop: '2px' }}>
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
            The major focus areas and plan for the campaign
          </Grid>
        </Grid>
        <Grid item className={styles.title}>
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </Grid>
      </Grid>
      {showEditModal && (
        <PhaseIdeaModal
          handleClose={() => setShowEditModal(false)}
          content={content}
          handleUpdate={handleUpdate}
        />
      )}
    </Grid>
  );
};

export default PhaseIdea;
