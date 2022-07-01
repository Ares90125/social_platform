import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { listCampaignGroupsAndTasksDetails } from '../../../graphs/listCampaignGroupsAndTasksDetails';
import { CampaignStatusEnum } from '../../../utils/enums/campaignStatus';
import { AuthLayout } from '../../layouts/authLayout/AuthLayout';
import { LoadingLayout } from '../../layouts/loadingLayout/LoadingLayout';
import { TabsLayout } from '../../layouts/tabsLayout/TabsLayout';
import { BrandTab } from '../manageBrands/components/brandTab/BrandTab';
import { Content } from './components/content/Content';
import { CampaignInputs } from './components/detailsTab/campaign.types';
import { DetailsTab } from './components/detailsTab/DetailsTab';
import { ExecutionTab } from './components/executionTab/ExecutionTab';
import { SelectionTab } from './components/selectionTab/SelectionTab';
import ReportingTab from './components/reportingTab/ReportingTab';
import { TasksTab } from './components/tasksTab/TasksTab';

type CampaignProps = {
  campaign?: CampaignInputs;
  isLoading?: boolean;
};
type Tab = {
  value: string;
  tabContent: React.ReactNode;
  tabPanelContent: React.ReactNode;
  disabled?: boolean;
};

export const Campaign: React.FC<CampaignProps> = ({
  campaign,
  isLoading = false,
}) => {
  const router = useRouter();
  const defaultTab = router.asPath.split('#')[1];
  const {
    data: communities,
    refetch,
    isLoading: isLoadingCommunities,
  } = useQuery(
    `brands-${campaign?.brandId}-${campaign?.campaignId}`,
    () => {
      if (campaign?.campaignId && campaign?.brandId) {
        return listCampaignGroupsAndTasksDetails(
          campaign.campaignId,
          campaign.brandId,
        );
      }
    },
    {
      enabled: !!campaign?.brandId && !!campaign?.campaignId,
    },
  );

  const handleRefetchCommunities = (): void => {
    refetch();
  };

  const getTabs = (): Tab[] => {
    let tabs: Tab[] = [
      {
        value: 'communities',
        tabContent: (
          <BrandTab
            label="Selection"
            chipLabel={communities?.length}
            key="Selection"
          />
        ),
        tabPanelContent: (
          <LoadingLayout isLoading={isLoadingCommunities}>
            <SelectionTab
              key="Selection"
              communities={communities}
              campaign={campaign}
            />
          </LoadingLayout>
        ),
      },
      {
        disabled: !campaign,
        value: 'execution',
        tabContent: 'Execution',
        tabPanelContent: (
          <LoadingLayout isLoading={isLoadingCommunities}>
            <ExecutionTab
              key="Execution"
              communities={communities}
              campaign={campaign}
              handleRefetchCommunities={handleRefetchCommunities}
            />
          </LoadingLayout>
        ),
      },
      {
        disabled: !campaign,
        value: 'tasks',
        tabContent: 'Tasks',
        tabPanelContent: (
          <LoadingLayout isLoading={isLoadingCommunities}>
            <TasksTab
              key="Tasks"
              campaign={campaign}
              communities={communities}
              handleRefetchCommunities={handleRefetchCommunities}
            />
          </LoadingLayout>
        ),
      },
    ];
    tabs =
      campaign?.status === CampaignStatusEnum.Completed
        ? tabs
        : [
            {
              value: 'details',
              tabContent: 'Details',
              tabPanelContent: <DetailsTab key="Details" campaign={campaign} />,
            },
            ...tabs,
          ];
    return campaign
      ? [
          ...tabs,
          {
            value: 'report',
            tabContent: 'Reporting',
            tabPanelContent: <ReportingTab key="Reporting" campaign={campaign} />,
          },
        ]
      : tabs;
  };

  return (
    <AuthLayout>
      <LoadingLayout isLoading={isLoading}>
        <TabsLayout
          defaultTab={defaultTab}
          sticky
          topSection={<Content campaign={campaign} />}
          tabs={getTabs()}
          isFullWidth
          fullWidthTabs={['communities', 'execution', 'tasks', 'report']}
        />
      </LoadingLayout>
    </AuthLayout>
  );
};
