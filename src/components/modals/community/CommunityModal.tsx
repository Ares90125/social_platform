import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { useQuery } from 'react-query';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, IconButton, Toolbar, AppBar } from '@mui/material';
import { GroupQualification } from './components/GroupQualification';
import { Category } from './components/Category';
import { TargetAudience } from './components/TargetAudience';
import { DataList } from './components/DataList';
import {
  communityDiscoveryAPI,
  CommunityDiscoveryInput,
} from '../../../graphs/communityDiscoveryAPI';
import { communityDiscoveryFilters } from '../../../graphs/communityDiscoveryFilters';
import { communityFilters, initialFilterValues } from './filters';
import { FilterApi } from './components/FilterApi';
import { TextFilters } from './components/TextFilters';
import { CheckboxFilters } from './components/CheckboxFilters';
import { RadioFilters } from './components/RadioFilters';
import { Header } from './components/Header';
import { CampaignInputs } from '../../screens/campaign/components/detailsTab/campaign.types';
import { NormalizedCommunity } from '../../../graphs/listCampaignGroupsAndTasksDetails';

type CommunityModalProps = {
  handleClose: () => void;
  normalizedCommunities: NormalizedCommunity[];
  campaign?: CampaignInputs;
};

const Sidebar = styled(Box)({
  width: '300px',
  padding: '16px',
  borderRight: '1px solid #ccc',
  overflowY: 'auto',
  height: 'calc(100vh - 133px)',
});

export const CommunityModal: React.FC<CommunityModalProps> = ({
  handleClose,
  normalizedCommunities,
  campaign,
}) => {
  const [filterValues, setFilterValues] = useState<CommunityDiscoveryInput>({
    ...initialFilterValues,
  });
  const {
    data: communitiesModal,
    isLoading,
    isFetching,
    refetch,
  } = useQuery('communities-modal', () => communityDiscoveryAPI(filterValues));
  const { data: filtersFromApi } = useQuery(
    'filters-from-api',
    communityDiscoveryFilters,
  );
  const apiFilters = {
    ...communityFilters,
    'Group location (country)': {
      ...communityFilters['Group location (country)'],
      data: [
        'IN',
        'US',
        'SG',
        'IA',
        'PH',
        'GB',
        ...((filtersFromApi?.countries?.filter(
          (country) =>
            typeof country === 'string' &&
            country !== 'IN' &&
            country !== 'US' &&
            country !== 'SG' &&
            country !== 'IA' &&
            country !== 'PH' &&
            country !== 'GB',
        ) as string[]) || ['']),
      ],
    },
  };

  const changeFilter = (
    filterName: keyof CommunityDiscoveryInput,
    value: CommunityDiscoveryInput[typeof filterName],
  ): void => {
    setFilterValues({ ...filterValues, [filterName]: value });
  };

  const changeSomeFilters = (filters: CommunityDiscoveryInput): void => {
    setFilterValues({ ...filters });
  };

  useEffect(() => {
    refetch();
  }, [filterValues]);

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Box
      sx={{
        background: '#fff',
        zIndex: 10,
        position: 'absolute',
        top: '50px',
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <AppBar color="transparent" sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Select communities
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <Sidebar>
          <Typography variant="subtitle2" component="span">
            Filters
          </Typography>
          <GroupQualification
            value={filterValues.groupQualification}
            changeFilter={changeFilter}
          />
          <Category values={filterValues} changeFilter={changeSomeFilters} />
          <TargetAudience
            values={filterValues}
            changeFilter={changeSomeFilters}
          />
          {Object.entries(apiFilters)?.map(([key, filterInfo]) => (
            <FilterApi
              key={key}
              label={key}
              withSearch={filterInfo.withSearch}
              items={filterInfo.data}
              filterValues={filterValues}
              changeSomeFilters={changeSomeFilters}
              values={(filterValues?.[filterInfo.filterName] || []) as string[]}
              filterName={filterInfo.filterName}
            />
          ))}
          {filtersFromApi && (
            <TextFilters
              values={filterValues}
              changeFilter={changeFilter}
              changeSomeFilters={changeSomeFilters}
              maxFollowers={filtersFromApi?.maxMemberCount}
              maxPostEngagement={
                filtersFromApi?.maxPostsEngagementRateLastNinetyDays
              }
            />
          )}
          <CheckboxFilters
            filterValues={filterValues}
            changeSomeFilters={changeSomeFilters}
          />
          <RadioFilters
            filterValues={filterValues}
            changeSomeFilters={changeSomeFilters}
          />
        </Sidebar>
        <Box sx={{ p: 3, width: 'calc(100% - 300px)' }}>
          <Header
            filterValues={filterValues}
            changeFilter={changeFilter}
            changeSomeFilters={changeSomeFilters}
            totalItems={communitiesModal?.eligibleCommunitiesCount || 0}
          />
          <DataList
            handleCloseModal={handleClose}
            communities={
              communitiesModal?.selectedCommunities?.map((v) => ({
                ...v,
                id: v.groupId,
              })) || []
            }
            isLoading={isLoading || isFetching}
            selectedCommunityIds={
              normalizedCommunities
                .filter((c) => typeof c.groupId === 'string')
                .map((c) => c.groupId) as string[]
            }
            normalizedCommunities={normalizedCommunities}
            campaign={campaign}
            monetizableGroupsHavingCampaignTaskToPerformThisMonth={
              communitiesModal?.monetizableGroupsHavingCampaignTaskToPerformThisMonth ||
              0
            }
            nonMonetizableGroupsHavingCampaignTaskToPerformThisMonth={
              communitiesModal?.nonMonetizableGroupsHavingCampaignTaskToPerformThisMonth ||
              0
            }
            totalMonetizableGroups={
              communitiesModal?.totalMonetizableGroups || 0
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
