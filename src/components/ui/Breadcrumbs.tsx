import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs as BreadcrumbsMUI, Typography } from '@mui/material';
import { CampaignInputs } from '../screens/campaign/components/detailsTab/campaign.types';
import { BrandSchema } from '../../api/Brand/BrandSchema';

type BreadcrumbsProps = {
  campaign?: CampaignInputs;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ campaign }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const breadcrumbs = [
    <Link key="1" href="/manage-brands">
      <a>Brands</a>
    </Link>,
  ];

  if (campaign) {
    breadcrumbs.push(
      <Link key="2" href={`/brands/${campaign.brandId}`}>
        <a>{campaign.brandName}</a>
      </Link>,
      <Link key="3" href={`/brands/${campaign.brandId}`}>
        <a>Campaigns</a>
      </Link>,
      <Typography key="3" sx={{ fontSize: '12px' }}>
        {campaign.campaignName}
      </Typography>,
    );
  } else {
    const brands = queryClient.getQueryData<BrandSchema[]>('brands');
    const activeBrand = brands?.filter(
      (brand) => brand && brand.id === router.query.id,
    )[0];

    if (activeBrand) {
      breadcrumbs.push(
        <Link key="2" href={`/brands/${activeBrand.id}`}>
          <a>{activeBrand.name}</a>
        </Link>,
        <Link key="3" href={`/brands/${activeBrand.id}`}>
          <a>Campaigns</a>
        </Link>,
      );
    }
  }

  return (
    <BreadcrumbsMUI
      separator={<NavigateNextIcon sx={{ fontSize: '12px' }} />}
      aria-label="breadcrumb"
      sx={{ fontSize: '12px', mb: '10px' }}
    >
      {breadcrumbs}
    </BreadcrumbsMUI>
  );
};
