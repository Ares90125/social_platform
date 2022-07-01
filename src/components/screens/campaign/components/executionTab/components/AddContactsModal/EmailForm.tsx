import React from 'react';
import { Box } from '@mui/material';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../../../../form';
import {
  triggerNotificationsForWAorEmailUpdate,
  TriggerNotificationsForWAorEmailUpdateInput,
} from '../../../../../../../graphs/triggerNotificationsForWAorEmailUpdate';
import { useToast } from '../../../../../../../context/toast';

type EmailFormProps = {
  communityAdminId: string;
  communityManagerName: string;
  closeModal: () => void;
};
type FormInput = { email: string };

const schema = yup.object({
  email: yup.string().email().required(),
});

export const EmailForm: React.FC<EmailFormProps> = ({
  communityAdminId,
  communityManagerName,
  closeModal,
}) => {
  const { setErrorToast, setSuccessToast } = useToast();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'all',
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
  });
  const mutation = useMutation(
    (data: TriggerNotificationsForWAorEmailUpdateInput) =>
      triggerNotificationsForWAorEmailUpdate(data),
    {
      onSuccess: () => {
        closeModal();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );
  const onSubmit = (data: FormInput): void => {
    mutation.mutate({
      channel: 'Email',
      email: data.email,
      communityAdminId,
      communityManagerName,
    });
  };
  return (
    <Box p={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={3} sx={{ display: 'flex' }}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, name } }): JSX.Element => (
            <Input
              id="email"
              placeholder="Enter Email"
              onChange={onChange}
              value={value}
              name={name}
            />
          )}
        />
      </Box>
      <Button
        fullWidth
        type="submit"
        disabled={!!errors.email || !getValues('email').length}
      >
        Update
      </Button>
    </Box>
  );
};
