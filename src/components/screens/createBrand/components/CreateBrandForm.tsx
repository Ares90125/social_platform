import React, { useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { Box, Button as ButtonMUI, Typography } from '@mui/material';
import LandscapeRoundedIcon from '@mui/icons-material/LandscapeRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../form';
import { ImageInput, styles } from './createBrandForm.styles';
import { Colors } from '../../../../utils/enums/colors';
import {
  createBrandCredentials,
  CreateBrandInputs,
} from '../../../../graphs/createBrandCredentials';
import { getCookieByName } from '../../../../utils/helpers/cookies';
import { uploadBrandMediaUrl } from '../../../../utils/contants/media-upload';
import { useToast } from '../../../../context/toast';

const schema = yup
  .object({
    brandName: yup.string().required('Please enter brand name.'),
    communicationEmailForCredentials: yup
      .string()
      .email(
        'Please enter valid email address to recieve the brand credentials.',
      )
      .required(
        'Please enter valid email address to recieve the brand credentials.',
      ),
  })
  .required();

type CreateBrandFormType = {
  brandName: string;
  communicationEmailForCredentials: string;
  displayedImage: string;
  file: File | null;
  iconUrl: string;
};

export const CreateBrandForm: React.FC = () => {
  const { setErrorToast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<CreateBrandFormType>({
    mode: 'all',
    defaultValues: {
      brandName: '',
      communicationEmailForCredentials: '',
      displayedImage: '',
      file: null,
      iconUrl: '',
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(
    (data: CreateBrandInputs) => createBrandCredentials(data),
    {
      onSuccess: (data): void => {
        router.push(`/brands/${data.brandId}`);
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const fileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const image = e.target?.files?.[0];
    const reader = new FileReader();

    if (!image) {
      return;
    }

    setValue('file', image);
    reader.readAsDataURL(image);
    reader.onload = (): void => {
      if (typeof reader.result === 'string') {
        setValue('displayedImage', reader.result);
      }
    };
  };

  const createBrandWithImage = async (
    brandInfo: CreateBrandInputs,
  ): Promise<void> => {
    const userToken = getCookieByName('token');
    const file = getValues('file');
    const fileReader = new FileReader();

    if (!file || !userToken) {
      return;
    }

    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async function (): Promise<void> {
      const signedUrls = await axios({
        method: 'put',
        data: { type: 'image' },
        url: uploadBrandMediaUrl,
        headers: {
          authorization: userToken,
        },
      }).then((response) => response.data);

      await axios({
        method: 'put',
        url: signedUrls.signedUrl,
        data: fileReader.result,
        headers: { 'Content-Type': file.type },
      });

      mutation.mutate({ ...brandInfo, iconUrl: signedUrls.cloudfrontUrl });
    };
  };

  const onSubmit = (data: CreateBrandFormType): void => {
    const dataToSend = {
      brandName: data.brandName,
      communicationEmailForCredentials: data.communicationEmailForCredentials,
      iconUrl: '',
    };

    if (data.file) {
      createBrandWithImage(dataToSend);
      return;
    }

    mutation.mutate(dataToSend);
  };

  useEffect(() => {
    if (typeof router?.query?.brand === 'string') {
      setValue('brandName', router.query.brand);
    }
  }, [router.query.brand]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
      <Box mb={3}>
        <Controller
          name="brandName"
          control={control}
          render={({ field: { onChange, value, name } }): JSX.Element => (
            <Input
              id="brandName"
              label="Brand Name"
              onChange={onChange}
              value={value}
              name={name}
              errorText={errors.brandName?.message}
            />
          )}
        />
      </Box>
      <Box mb={4}>
        <Controller
          name="communicationEmailForCredentials"
          control={control}
          render={({ field: { onChange, value, name } }): JSX.Element => (
            <Input
              id="communicationEmailForCredentials"
              label="Please enter Email to get Brand credentials"
              onChange={onChange}
              value={value}
              name={name}
              errorText={errors.communicationEmailForCredentials?.message}
            />
          )}
        />
      </Box>
      <Box>
        {watch('displayedImage') ? (
          <Box
            sx={{
              ...styles.flexBetweenCenter,
              ...styles.uploadedImageContainer,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={styles.imageWrapper}>
                <img src={getValues('displayedImage')} alt="logo" />
              </Box>
              <Typography sx={{ fontSize: '14px', marginLeft: '10px' }}>
                Uploaded successfully!
              </Typography>
            </Box>
            <CheckCircleOutlineRoundedIcon
              sx={{ color: Colors.SUCCESS_GREEN_1 }}
            />
          </Box>
        ) : (
          <ButtonMUI
            sx={{
              ...styles.flexBetweenCenter,
              ...styles.uploadImageBtn,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LandscapeRoundedIcon
                sx={{ width: '48px', height: '48px', margin: '0 10px' }}
              />
              <Box>
                <h6>Add a logo for the brand</h6>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: Colors.EMP_BLUE_1,
                    textAlign: 'start',
                  }}
                >
                  Browse Image
                </Typography>
              </Box>
            </Box>
            <Typography component="span" sx={{ fontSize: '12px' }}>
              (optional)
            </Typography>
            <ImageInput
              onChange={fileUpload}
              title=" "
              type="file"
              id="logo"
              name="logo"
              accept=".gif,.jpg,.jpeg,.png"
            />
          </ButtonMUI>
        )}
      </Box>
      <Button type="submit" disabled={!isValid} sx={styles.submitBtn}>
        Proceed
      </Button>
    </Box>
  );
};
