import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowBack } from '@mui/icons-material';
import { AuthLayout } from '../../layouts/authLayout/AuthLayout';
import { AddNewCampaign, AddNewCampaignWrapper } from './createCampaign.styled';
import { CreateCampaignForm } from './components/createCampaignForm/CreateCampaignForm';

export const CreateCampaignScreen: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout>
      <AddNewCampaignWrapper>
        <AddNewCampaign>
          <Link href={`/brands/${router.query.id}`}>
            <a>
              <ArrowBack fontSize="small" />
              <span>Back</span>
            </a>
          </Link>
          <h1>Name new campaign</h1>
          <h6>The campaign name is shown in your reports.</h6>
          <CreateCampaignForm />
        </AddNewCampaign>
      </AddNewCampaignWrapper>
    </AuthLayout>
  );
};
