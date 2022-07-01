import React from 'react';
import moment from 'moment';
import { useMutation } from 'react-query';
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CMCNotification } from '../../../../graphs/getCMCNotifications';
import styles from '../../../../assests/scss/content-manager.module.scss';
import { markCMCNotificationAsRead } from '../../../../graphs/markCMCNotificationAsRead';
import { useToast } from '../../../../context/toast';

type NotificationListProps = {
  notifications?: CMCNotification[];
  selectedNotification: string;
  handleRefetchNotificaions: () => void;
  handleSelectNotivication: (notification: CMCNotification) => void;
};

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  selectedNotification,
  handleSelectNotivication,
  handleRefetchNotificaions,
}) => {
  const { setErrorToast, setSuccessToast } = useToast();
  const readNotificationMutation = useMutation(
    (data: { notificationId: string }) =>
      markCMCNotificationAsRead(data.notificationId),
    {
      onSuccess: () => {
        handleRefetchNotificaions();
        setSuccessToast();
      },
      onError: setErrorToast,
    },
  );

  const handleReadNotification = (notificationId: string): void => {
    readNotificationMutation.mutate({ notificationId });
  };

  return (
    <div className={styles.notification_box_wrap}>
      {!notifications?.length && 'No notifications'}
      {notifications?.map((notification) => (
        <div
          className={`${styles.notification} ${
            selectedNotification === notification.id
              ? styles.activeNotification
              : ''
          }`}
          key={notification.id}
        >
          <div className={styles.icon_wrap}>
            <CheckCircleIcon fontSize="small" />
          </div>
          <div className={styles.notification_body}>
            <div className={styles.notification_body_header}>
              <span>{moment(notification.timestamp).fromNow()}</span>
              <IconButton
                onClick={(): void => handleReadNotification(notification.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
            <h6
              className={styles.notification_title}
              onClick={(): void => handleSelectNotivication(notification)}
            >
              {notification.message}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};
