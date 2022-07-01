import React, { useState } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box } from '@mui/material';
import { communityAdminStyles as styles } from '../styles';
import { Tooltip } from '../../../../../../tooltip/Tooltip';
import { AddContactsModal } from '../AddContactsModal/AddContactsModal';

type CommunityAdminCellProps = {
  params: GridRenderCellParams;
};

export const CommunityAdminCell: React.FC<CommunityAdminCellProps> = ({
  params,
}) => {
  const {
    value,
    row: {
      modeOfCommunication,
      communityAdminId,
      communityManager,
      communityAdminContact: contacts,
      modeOfCommunicationVerificationStatus: verificationStatus,
    },
  } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iconClickHandler = (): void => {
    if (verificationStatus === 'Verified' && contacts) {
      if (modeOfCommunication === 'Email') {
        window?.open(`https://mail.google.com/mail/u/0/#search/${contacts}`);
      } else {
        window?.open(
          `https://api.whatsapp.com/send/?phone=${contacts.replace(
            /\s/,
            '',
          )}&text&app_absent=0`,
        );
      }
    }
    if (verificationStatus === null) setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };
  return (
    <>
      {value && value !== 'pick a value' && (
        <Tooltip
          title={
            modeOfCommunication === 'Email' ? (
              <Box sx={styles.tooltipBox}>
                <span>Contact on Email</span>
                <span>{contacts ? `${contacts}` : 'add email'}</span>
                {verificationStatus === 'VerificationSent' && (
                  <span style={styles.iconTextPending}>
                    Pending Verification
                  </span>
                )}
              </Box>
            ) : (
              <Box sx={styles.tooltipBox}>
                <span>Contact on WhatsApp</span>
                <span>{contacts ? `+${contacts}` : 'add number'}</span>
                {verificationStatus === 'VerificationSent' && (
                  <span style={styles.iconTextPending}>
                    Pending Verification
                  </span>
                )}
              </Box>
            )
          }
        >
          {modeOfCommunication === 'Email' ? (
            <MailOutlineIcon
              sx={
                verificationStatus === 'Verified'
                  ? styles.iconVerified
                  : styles.icon
              }
              onClick={iconClickHandler}
            />
          ) : (
            <WhatsAppIcon
              sx={
                verificationStatus === 'Verified'
                  ? styles.iconVerified
                  : styles.icon
              }
              onClick={iconClickHandler}
            />
          )}
        </Tooltip>
      )}
      <Box className="MuiDataGrid-cellContent">{value}</Box>
      {isModalOpen && (
        <AddContactsModal
          open={isModalOpen}
          closeModal={closeModal}
          communityAdminId={communityAdminId}
          communityManagerName={communityManager}
          modeOfCommunication={modeOfCommunication}
        />
      )}
    </>
  );
};
