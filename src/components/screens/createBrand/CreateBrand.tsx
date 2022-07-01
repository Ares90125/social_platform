import React from 'react';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import { AuthLayout } from '../../layouts/authLayout/AuthLayout';
import { AddNewBrand, AddNewBrandWrapper } from './createBrand.styled';
import { CreateBrandForm } from './components/CreateBrandForm';

export const CreateBrandScreen: React.FC = () => (
  <AuthLayout>
    <AddNewBrandWrapper>
      <AddNewBrand>
        <Link href="/manage-brands">
          <a>
            <ArrowBack fontSize="small" />
            <span>Back</span>
          </a>
        </Link>
        <h1>Add new Brand</h1>
        <h5>Brand name will be used to list this out on ‘Brands’ page</h5>
        <h6>
          Brand username will be taken from brand name, after removing all the
          special character and replacing spaces with '_'.
        </h6>
        <CreateBrandForm />
      </AddNewBrand>
    </AddNewBrandWrapper>
  </AuthLayout>
);
