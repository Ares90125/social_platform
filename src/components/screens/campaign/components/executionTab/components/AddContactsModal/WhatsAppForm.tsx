import React, { useState } from 'react';
import { Box } from '@mui/material';
import IntlTelInput, { CountryData } from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { useMutation } from 'react-query';
import {
  triggerNotificationsForWAorEmailUpdate,
  TriggerNotificationsForWAorEmailUpdateInput,
} from '../../../../../../../graphs/triggerNotificationsForWAorEmailUpdate';
import { Button } from '../../../../../../form';
import cls from './AddContactsModal.module.scss';
import { useToast } from '../../../../../../../context/toast';

type WatsAppFormProps = {
  communityAdminId: string;
  communityManagerName: string;
  closeModal: () => void;
};

export const WhatsAppForm: React.FC<WatsAppFormProps> = ({
  communityAdminId,
  communityManagerName,
  closeModal,
}) => {
  const { setErrorToast, setSuccessToast } = useToast();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [countryData, setCountryData] = useState({
    mobileDialCode: '',
    mobileCountryCode: '',
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
  const setNewCoutryData = (selectedCountryData: CountryData): void => {
    const { dialCode, iso2 } = selectedCountryData;
    setCountryData({
      mobileDialCode: dialCode || '',
      mobileCountryCode: iso2?.toUpperCase() || '',
    });
  };
  const inputHandler = (
    isValid: boolean,
    value: string,
    selectedCountryData: CountryData,
  ): void => {
    setMobileNumber(value.replace(/[^\d.]/g, ''));
    setIsNumberValid(isValid);
    if (!countryData.mobileCountryCode || !countryData.mobileDialCode) {
      setNewCoutryData(selectedCountryData);
    }
  };
  const selectHandler = (
    currentNumber: string,
    selectedCountryData: CountryData,
    fullNumber: string,
    isValid: boolean,
  ): void => {
    setIsNumberValid(isValid);
    setNewCoutryData(selectedCountryData);
  };
  const onSubmit = (): void => {
    const { mobileDialCode, mobileCountryCode } = countryData;
    mutation.mutate({
      channel: 'WhatsApp',
      communityAdminId,
      communityManagerName,
      mobileCountryCode,
      mobileDialCode,
      mobileNumber,
    });
  };
  return (
    <Box p={2} component="form">
      <Box mb={3} sx={{ display: 'flex' }}>
        <IntlTelInput
          preferredCountries={[]}
          onPhoneNumberChange={inputHandler}
          onSelectFlag={selectHandler}
          value={mobileNumber}
          containerClassName={`intl-tel-input ${cls.container}`}
          inputClassName={cls.input}
        />
      </Box>
      <Button
        fullWidth
        type="submit"
        onClick={onSubmit}
        disabled={!isNumberValid}
      >
        Update
      </Button>
    </Box>
  );
};
