import React, { useEffect } from 'react';
import {
  Control,
  Controller,
  Path,
  PathValue,
  UseFormSetValue,
  UnpackNestedValue,
  UseFormClearErrors,
} from 'react-hook-form';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { HelperText } from '../helperText/HelperText';
import { CampaignInputs } from '../../screens/campaign/components/detailsTab/campaign.types';

import ErrorTextWrapper from '../errorText/ErrorTextWrapper';

type MultiCheckboxProps<T> = {
  options: string[];
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  name: Path<T>;
  helperText?: string;
  errorText?: string;
  values: string[];
  clearErrors: UseFormClearErrors<CampaignInputs>;
};

export function MultiCheckbox<T>({
  options,
  setValue,
  control,
  name,
  helperText,
  errorText,
  values,
  clearErrors,
}: MultiCheckboxProps<T>): JSX.Element {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    let updatedValues: string[] = [];

    if (values.indexOf(value) !== -1) {
      updatedValues = values.filter((item) => item !== value);
    } else {
      updatedValues = [...values, value];
    }

    setValue(name, updatedValues as UnpackNestedValue<PathValue<T, Path<T>>>);
  };

  useEffect(() => {
    if (values.length) clearErrors(name as any);
  }, [values.length]);

  return (
    <ErrorTextWrapper errorText={errorText} sx={{ width: '100%' }}>
      {helperText && <HelperText error={!!errorText}>{helperText}</HelperText>}
      <Grid container>
        {options.map((option) => (
          <Grid item xs={6} key={option}>
            <Controller
              name={name}
              control={control}
              render={(): JSX.Element => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.includes(option)}
                      onChange={handleCheck}
                      value={option}
                    />
                  }
                  label={option}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
    </ErrorTextWrapper>
  );
}
