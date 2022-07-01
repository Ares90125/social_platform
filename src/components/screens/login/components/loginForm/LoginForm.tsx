import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton } from '@mui/material';
import {
  ArrowForward,
  Info,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Input, Spinner } from '../../../../form';
import { Tooltip } from '../../../../tooltip/Tooltip';
import {
  LoginButton,
  LoginButtonIcon,
  LoginErrorText,
  PasswordWrapper,
} from './loginForm.styled';
import { LoginFormInputs } from './loginForm.types';
import { useAuth } from '../../../../../context/auth';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export const LoginForm: React.FC = () => {
  const { handleUser, loading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: LoginFormInputs): void => {
    handleUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value, name } }): JSX.Element => (
          <Input
            sx={{ marginBottom: '10px' }}
            id="email"
            label="Email"
            icon={
              <Tooltip
                title={
                  <>
                    Email should be in the format
                    <br />
                    mail@domain.com
                  </>
                }
                placement="top"
              >
                <Info />
              </Tooltip>
            }
            onChange={onChange}
            value={value}
            name={name}
            errorText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value, name } }): JSX.Element => (
          <PasswordWrapper>
            <Input
              sx={{ marginBottom: '10px' }}
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              onChange={onChange}
              value={value}
              name={name}
              errorText={errors.password?.message}
            />
          </PasswordWrapper>
        )}
      />
      {error && <LoginErrorText>{error}</LoginErrorText>}
      {loading ? (
        <Spinner
          spinnerWrapperProps={{
            style: { margin: '25px 0 0', height: '56px' },
          }}
        />
      ) : (
        <LoginButton type="submit" disabled={!isValid}>
          Login
          <LoginButtonIcon>
            <ArrowForward />
          </LoginButtonIcon>
        </LoginButton>
      )}
    </form>
  );
};
