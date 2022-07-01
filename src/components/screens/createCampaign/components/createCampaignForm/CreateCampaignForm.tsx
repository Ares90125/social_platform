import React from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../../form';
import { CreateCampaignInputs } from './createCampaignForm.types';
import { CreateCampaignFormWrapper } from './createCampaignForm.styled';

const schema = yup
  .object({
    campaignName: yup.string().required('Campaign Name is required'),
  })
  .required();

export const CreateCampaignForm: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<CreateCampaignInputs>({
    mode: 'all',
    defaultValues: {
      campaignName: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CreateCampaignInputs): void => {
    if (data.campaignName?.length > 0) {
      router.push(`/brands/${router.query.id}/new?name=${data.campaignName}`);
    }
  };

  return (
    <CreateCampaignFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="campaignName"
        control={control}
        render={({ field: { onChange, value, name } }): JSX.Element => (
          <Input
            id="campaignName"
            label="Campaign Name"
            onChange={onChange}
            value={value}
            name={name}
            errorText={errors.campaignName?.message}
          />
        )}
      />
      <Button type="submit" disabled={!isValid}>
        Next
      </Button>
    </CreateCampaignFormWrapper>
  );
};
