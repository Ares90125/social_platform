import React from 'react';
import { Modal, Paper } from '@mui/material';
import { ModalHeader } from '../../../../../../ui/ModalHeader';
import { modalStyles } from '../styles';
import { WhatsAppForm } from './WhatsAppForm';
import { EmailForm } from './EmailForm';

type AddContactsModalProps = {
  closeModal: () => void;
  open: boolean;
  communityAdminId: string;
  communityManagerName: string;
  modeOfCommunication: 'Email' | 'WhatsApp';
};

export const AddContactsModal: React.FC<AddContactsModalProps> = ({
  modeOfCommunication,
  communityAdminId,
  communityManagerName,
  closeModal,
  open,
}) => (
  <Modal open={open}>
    <Paper sx={{ ...modalStyles.container, maxWidth: '500px' }}>
      <ModalHeader
        closeModal={closeModal}
        text={`Add ${
          modeOfCommunication === 'Email' ? 'Email' : 'WhatsApp Number'
        }`}
      />
      {modeOfCommunication === 'Email' ? (
        <EmailForm
          communityAdminId={communityAdminId}
          communityManagerName={communityManagerName}
          closeModal={closeModal}
        />
      ) : (
        <WhatsAppForm
          communityAdminId={communityAdminId}
          communityManagerName={communityManagerName}
          closeModal={closeModal}
        />
      )}
    </Paper>
  </Modal>
);
