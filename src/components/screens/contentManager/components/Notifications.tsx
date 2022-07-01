import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { IconButton } from '@mui/material';
import { Cached as CachedIcon } from '@mui/icons-material';
import {
  CMCNotification,
  CMCNotificationInput,
  getCMCNotifications,
} from '../../../../graphs/getCMCNotifications';
import { NotificationList } from './NotificationList';
import { ComboBox, Button, Spinner } from '../../../form';
import styles from '../../../../assests/scss/content-manager.module.scss';
import { useToast } from '../../../../context/toast';

type NotificationsPeriodType = {
  value: number;
  name: string;
};

const notificationsPeriod: NotificationsPeriodType[] = [
  { value: 15000, name: 'Every 15 sec' },
  { value: 30000, name: 'Every 30 sec' },
  { value: 60000, name: 'Every 1 min' },
  { value: 300000, name: 'Every 5 min' },
  { value: 900000, name: 'Every 15 min' },
  { value: 3600000, name: 'Every 60 min' },
  { value: 86400000, name: 'Manual Refresh' },
];

type NotificationsProps = {
  campaignId?: string;
  selectedNotification: string;
  handleSelectNotivication: (notification: CMCNotification) => void;
};

export const NotificationsComponent: React.FC<NotificationsProps> = ({
  campaignId,
  selectedNotification,
  handleSelectNotivication,
}) => {
  const { setErrorToast } = useToast();
  const [notifications, setNotifications] = useState<CMCNotification[]>([]);
  const [notificationsFilter, setNotificationFilter] =
    useState<CMCNotificationInput>({
      type: 'asset',
    });
  const [selectedNotificationPeriod, setSelectedNotificationPeriod] =
    useState<NotificationsPeriodType>({ value: 300000, name: 'Every 5 min' });

  const {
    refetch: refetchNotifications,
    isLoading: isLoadingNotifications,
    isFetching: isFetchingNotifications,
  } = useQuery(
    `notifications-${campaignId || 'default'}`,
    () => getCMCNotifications(notificationsFilter),
    {
      retry: false,
      enabled: false,
      refetchInterval: selectedNotificationPeriod.value,
      onSuccess: (data) => {
        setNotifications(data);
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const handleNotificationPeriodChange = (
    newValue: NotificationsPeriodType,
  ): void => {
    setSelectedNotificationPeriod(newValue);
  };

  const handleChangeNotificationFilter = (
    filter: CMCNotificationInput,
  ): void => {
    setNotificationFilter({ ...filter });
  };

  const handleRefetchNotificaions = (): void => {
    refetchNotifications();
  };

  useEffect(handleRefetchNotificaions, [notificationsFilter]);

  return (
    <div className={styles.sidebar_notifications_wrapper}>
      <div className={styles.selector}>
        <div className={styles.selector_heading}>
          <span>Select notifications frequency</span>
          {selectedNotificationPeriod.name === 'Manual Refresh' && (
            <IconButton onClick={handleRefetchNotificaions}>
              <CachedIcon />
            </IconButton>
          )}
        </div>
        <ComboBox<NotificationsPeriodType>
          keyField="value"
          options={notificationsPeriod}
          value={selectedNotificationPeriod}
          handleChange={handleNotificationPeriodChange}
        />
      </div>

      <div className={styles.notifications_actions}>
        <Button
          disabled={isLoadingNotifications || isFetchingNotifications}
          className={notificationsFilter.type === 'asset' ? styles.active : ''}
          onClick={(): void => {
            handleChangeNotificationFilter({
              ...notificationsFilter,
              type: 'asset',
            });
          }}
        >
          Assets
        </Button>
        <Button
          disabled={isLoadingNotifications || isFetchingNotifications}
          className={
            notificationsFilter.type === 'support' ? styles.active : ''
          }
          onClick={(): void => {
            handleChangeNotificationFilter({
              ...notificationsFilter,
              type: 'support',
            });
          }}
        >
          Support
        </Button>
      </div>
      <div className={styles.notifications_actions}>
        <Button
          disabled={isLoadingNotifications || isFetchingNotifications}
          className={!notificationsFilter.campaignId ? styles.active : ''}
          onClick={(): void => {
            if (notificationsFilter?.campaignId) {
              const { campaignId: cid, ...rest } = notificationsFilter;

              handleChangeNotificationFilter({ ...rest });
            }
          }}
        >
          All
        </Button>
        <Button
          disabled={isLoadingNotifications || isFetchingNotifications}
          className={notificationsFilter.campaignId ? styles.active : ''}
          onClick={(): void => {
            if (campaignId) {
              handleChangeNotificationFilter({
                ...notificationsFilter,
                campaignId,
              });
            }
          }}
        >
          Campaign
        </Button>
      </div>
      {isLoadingNotifications || isFetchingNotifications ? (
        <Spinner spinnerWrapperProps={{ style: { marginTop: '20px' } }} />
      ) : (
        <NotificationList
          notifications={notifications}
          selectedNotification={selectedNotification}
          handleSelectNotivication={handleSelectNotivication}
          handleRefetchNotificaions={handleRefetchNotificaions}
        />
      )}
    </div>
  );
};

const arePropsEqual = (
  prevProps: NotificationsProps,
  nextProps: NotificationsProps,
): boolean =>
  prevProps.campaignId === nextProps.campaignId &&
  prevProps.selectedNotification === nextProps.selectedNotification;

export const Notifications = React.memo(NotificationsComponent, arePropsEqual);
