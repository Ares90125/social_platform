import React, { useEffect, useState } from 'react';
import {
  ClickAwayListener,
  Paper,
  Popper,
  Typography,
  Box,
  Button,
  Chip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ButtonOutlined } from '../../../../../../form';
import { CampaignGroupAndTaskDetails } from '../../../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { styles } from './Filter.styles';
import { CommunityManager } from '../../../../../../../graphs/getCommunityManagers';
import {
  groupTaskStatusOptions,
  primaryChannelOptions,
  paymentStatusOptions,
  assetsProgressOptions,
  assetsStatusOptions,
  ownerOptions,
  postTypeFilters,
} from '../../cellsOptions';
import { FilterCheckbox } from './FilterCheckbox';

type PopperState = {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
};

type FilterProps = {
  setFilteredCommunities: React.Dispatch<
    React.SetStateAction<CampaignGroupAndTaskDetails[] | undefined>
  >;
  communityManagers: CommunityManager[] | undefined;
  communities: CampaignGroupAndTaskDetails[] | undefined;
};
export type ActiveFilters = {
  groupTaskStatus: string[];
  communityManagerId: string[];
  primaryChannel: string[];
  paymentStatus: string[];
  assetsProgress: string[];
  campaignAssetsStatus: string[];
  owner: string[];
  postType: string[];
};

const tabs = {
  groupTaskStatus: 'Task Status',
  communityManagerId: 'Community Manager',
  primaryChannel: 'Primary Channel',
  paymentStatus: 'Payment Status',
  assetsProgress: 'Assets Progress',
  campaignAssetsStatus: 'Campaign Assets Status',
  owner: 'Owner',
  postType: 'Post Type',
};

const initialActiveFilters = {
  groupTaskStatus: [],
  communityManagerId: [],
  primaryChannel: [],
  paymentStatus: [],
  assetsProgress: [],
  campaignAssetsStatus: [],
  owner: [],
  postType: [],
};

export const Filter: React.FC<FilterProps> = ({
  setFilteredCommunities,
  communityManagers,
  communities,
}) => {
  const [popperState, setPopperState] = useState<PopperState>({
    isOpen: false,
    anchorEl: null,
  });
  const [activeTab, setActiveTab] = useState<string>(tabs.groupTaskStatus);
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(initialActiveFilters);

  const handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setPopperState({ isOpen: true, anchorEl: event.currentTarget });
  };
  const handleClose = (): void => {
    setPopperState({ isOpen: false, anchorEl: null });
  };
  const handleChange = (value: string, filter: string): void => {
    setActiveFilters((prev) =>
      prev[filter].includes(value)
        ? { ...prev, [filter]: prev[filter].filter((v) => v !== value) }
        : { ...prev, [filter]: [...prev[filter], value] },
    );
  };

  const filterCommunities = (): void => {
    if (!communities) return;

    let filteredCommunities: CampaignGroupAndTaskDetails[] = [...communities];

    if (Object.values(activeFilters).every((filter) => !filter.length)) {
      filteredCommunities = [...communities];
    } else {
      Object.entries(activeFilters).forEach((af) => {
        const [field, filters] = af;

        if (filters.length) {
          filteredCommunities = filteredCommunities.filter((c) => {
            switch (field) {
              case 'groupTaskStatus': {
                return filters.some((f) =>
                  f === 'Empty' ? !c[field] : f === c[field],
                );
              }
              case 'primaryChannel': {
                return filters.some((f) => {
                  if (f === 'whatsAppSubscribed') {
                    return (
                      c.modeOfCommunication === 'WhatsApp' &&
                      c.modeOfCommunicationVerificationStatus === 'Verified'
                    );
                  }
                  if (f === 'whatsAppNotSubscribed') {
                    return (
                      (c.modeOfCommunication === 'WhatsApp' &&
                        c.modeOfCommunicationVerificationStatus ===
                          'NotVerified') ||
                      !c.modeOfCommunicationVerificationStatus
                    );
                  }
                  if (f === 'emailSubscribed') {
                    return (
                      c.modeOfCommunication === 'Email' &&
                      c.modeOfCommunicationVerificationStatus === 'Verified'
                    );
                  }
                  if (f === 'emailNotSubscribed') {
                    return (
                      (c.modeOfCommunication === 'Email' &&
                        c.modeOfCommunicationVerificationStatus ===
                          'NotVerified') ||
                      !c.modeOfCommunicationVerificationStatus
                    );
                  }
                  return false;
                });
              }
              case 'assetsProgress': {
                return filters.some((f) => c.assetsKpis[f]);
              }
              case 'campaignAssetsStatus': {
                return filters.some((f) => f === c.assetsKpis[field]);
              }
              default: {
                return filters.some((f) => f === c[field]);
              }
            }
          });
        }
      });
    }
    setFilteredCommunities(filteredCommunities);
  };

  const renderOptions = (): JSX.Element[] => {
    const tab = Object.entries(tabs).find((el) => el[1] === activeTab)![0];

    const initialFilters = {
      groupTaskStatus: groupTaskStatusOptions,
      primaryChannel: primaryChannelOptions,
      paymentStatus: paymentStatusOptions,
      assetsProgress: assetsProgressOptions,
      campaignAssetsStatus: assetsStatusOptions,
      owner: ownerOptions,
      postType: postTypeFilters,
    };
    let Options: JSX.Element[];

    if (tab === 'communityManagerId') {
      Options =
        communityManagers?.map((option) => {
          const { id, fullname } = option;
          return (
            <FilterCheckbox
              key={id}
              value={id}
              label={fullname}
              activeFilters={activeFilters}
              handleChange={handleChange}
              filter={tab}
            />
          );
        }) || [];
    } else {
      Options = Object.entries(initialFilters[tab]).map((option) => {
        const key = option[0];
        const value = option[1] as string | { name: string; subName: string };

        return (
          <FilterCheckbox
            key={key}
            value={key}
            activeFilters={activeFilters}
            handleChange={handleChange}
            filter={tab}
            label={
              tab === 'primaryChannel' ? (
                <>
                  {typeof value === 'object' && value.name}
                  <Typography component="span" sx={styles.checkboxSpan}>
                    {typeof value === 'object' && value.subName}
                  </Typography>
                </>
              ) : (
                (value as string)
              )
            }
          />
        );
      });
    }
    return Options;
  };

  useEffect(() => {
    filterCommunities();
  }, [activeFilters]);

  return (
    <>
      <ButtonOutlined onClick={handleOpen}>
        <FilterListIcon />
        <Typography sx={{ marginLeft: '16px' }}>Filter</Typography>
        {Object.values(activeFilters).some((f) => f.length) && (
          <Chip
            sx={styles.filtersChip}
            label={Object.values(activeFilters).reduce(
              (prev, next) => prev + next.length,
              0,
            )}
          />
        )}
      </ButtonOutlined>
      <Popper
        open={popperState.isOpen}
        anchorEl={popperState.anchorEl}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={styles.popperWrapper}>
            <Box sx={styles.popperLeft}>
              {Object.values(tabs).map((tab) => (
                <Button
                  onClick={(): void => setActiveTab(tab)}
                  key={tab}
                  sx={
                    activeTab === tab
                      ? { ...styles.tabActive, ...styles.tabButton }
                      : styles.tabButton
                  }
                >
                  <Typography align="left" fontSize="14px">
                    {tab}
                  </Typography>
                </Button>
              ))}
            </Box>

            <Box sx={styles.popperRight}>{renderOptions()}</Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
