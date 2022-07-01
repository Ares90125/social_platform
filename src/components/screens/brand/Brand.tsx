import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getAllBrands } from '../../../graphs/brands';
import { AuthLayout } from '../../layouts/authLayout/AuthLayout';
import { TabsLayout } from '../../layouts/tabsLayout/TabsLayout';
import { Navigation } from './components/navigation/Navigation';
import { LoadingLayout } from '../../layouts/loadingLayout/LoadingLayout';
import { Content } from './components/content/Content';
import { BrandTab } from '../manageBrands/components/brandTab/BrandTab';
import { getAllCampaigns } from '../../../graphs/campaigns';
import { CampaignList } from './components/campaignList/CampaignList';
import { CampaignInputs } from '../campaign/components/detailsTab/campaign.types';
import { groupedCampaignsInitial, GroupedCampaignsType } from './brandInitial';
import {
  CampaignStatusEnum,
  CampaignStatusExtended,
} from '../../../utils/enums/campaignStatus';

const getCampaignsByStatus = (
  campaigns?: CampaignInputs[],
): GroupedCampaignsType => {
  if (!campaigns) return groupedCampaignsInitial;

  const groupedCampaigns = { ...groupedCampaignsInitial };
  groupedCampaigns.All.campaigns = _.groupBy(campaigns, (campaign) =>
    moment(campaign.startDateAtUTC).format('MMMM, YYYY'),
  );
  groupedCampaigns.All.length = campaigns.length;

  Object.keys(groupedCampaigns).forEach((status) => {
    if (status === CampaignStatusExtended.All) return;

    const s = status as CampaignStatusEnum;
    const filtredCampaigns = campaigns.filter((c) => c.status === status);

    groupedCampaigns[s].campaigns = _.groupBy(filtredCampaigns, (campaign) =>
      moment(campaign.startDateAtUTC).format('MMMM, YYYY'),
    );
    groupedCampaigns[s].length = filtredCampaigns.length;
  });

  return groupedCampaigns;
};

export const Brand: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { data: brands, isLoading } = useQuery('brands', getAllBrands);
  const activeBrand = brands?.filter((brand) => brand && brand.id === id)[0];
  const { data: campaigns, isLoading: isLoadingCampaigns } = useQuery(
    `brand-${activeBrand?.id}`,
    () => getAllCampaigns(activeBrand?.id),
  );
  const groupedCampaigns = getCampaignsByStatus(campaigns);
  const tabs = Object.values(groupedCampaigns).map(
    ({ length, tabName, campaigns: c }) => ({
      value: tabName,
      tabContent: <BrandTab label={tabName} key={tabName} chipLabel={length} />,
      tabPanelContent: <CampaignList key={tabName} groupedCampaigns={c} />,
    }),
  );

  return (
    <AuthLayout>
      <LoadingLayout isLoading={isLoading || isLoadingCampaigns}>
        <TabsLayout
          topSection={
            <>
              <Navigation
                brands={brands?.filter((b) => b)}
                activeBrand={activeBrand}
              />
              <Content />
            </>
          }
          tabs={tabs}
        />
      </LoadingLayout>
    </AuthLayout>
  );
};
