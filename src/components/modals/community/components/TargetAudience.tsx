import React, { useState } from 'react';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
} from '@mui/material';
import { targetAudienceFilters, membersMatchingCriteria } from '../filters';
import { Input } from '../../../form';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

const initialValues: FormState = {
  ageRange: [],
  gender: [],
  memberMatchingCriteria: '',
  memberMatchingRange: '',
  min: '',
  max: '',
};

type TargetAudienceProps = {
  values: CommunityDiscoveryInput;
  changeFilter: (filters: CommunityDiscoveryInput) => void;
};

type FormState = {
  ageRange: string[];
  gender: string[];
  memberMatchingCriteria: string;
  memberMatchingRange: string;
  min: string;
  max: string;
};

const isCheckboxesHaveValue = (formValues: FormState): boolean =>
  !formValues.gender.length && !formValues.ageRange.length;

export const TargetAudience: React.FC<TargetAudienceProps> = ({
  values,
  changeFilter,
}) => {
  const [formValues, setFormValues] = useState<FormState>(initialValues);

  const changeFormState = (
    name: string,
    value: string,
    checked?: boolean,
  ): FormState => {
    const updatedValues = {
      ...formValues,
    };

    if (Array.isArray(formValues[name])) {
      const updatedField = checked
        ? [...formValues[name], value]
        : formValues[name].filter((v) => v !== value);

      updatedValues[name] = updatedField;
    }

    if (typeof formValues[name] === 'string') {
      updatedValues[name] = value;
    }

    if (
      name === 'memberMatchingCriteria' ||
      isCheckboxesHaveValue(updatedValues)
    ) {
      updatedValues.min = '';
      updatedValues.max = '';
      updatedValues.memberMatchingRange = '';
    }

    if ((name === 'min' || name === 'max') && !value.length) {
      updatedValues.memberMatchingRange = '';
    }

    if (updatedValues.min.length && updatedValues.max.length) {
      updatedValues.memberMatchingRange = `${updatedValues.min}-${updatedValues.max}`;
    }

    setFormValues({ ...updatedValues });
    return updatedValues;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = e.target;
    const updatedValues = changeFormState(name, value, checked);

    if (updatedValues.memberMatchingRange.length) {
      const filtersToUpdate: CommunityDiscoveryInput = {};

      filtersToUpdate.memberMatchingCriteria =
        updatedValues.memberMatchingCriteria;
      filtersToUpdate.memberMatchingRange = updatedValues.memberMatchingRange;

      if (updatedValues.ageRange.length) {
        filtersToUpdate.ageRange = [...updatedValues.ageRange];
      }

      if (updatedValues.gender.length) {
        filtersToUpdate.gender = [...updatedValues.gender];
      }
      changeFilter({ ...values, ...filtersToUpdate });
    } else {
      const {
        ageRange,
        gender,
        memberMatchingCriteria,
        memberMatchingRange,
        ...rest
      } = { ...values };
      changeFilter({ ...rest });
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Target Audience
      </Typography>
      <Box>
        {targetAudienceFilters.map((group) => (
          <FormGroup key={group.id} sx={{ mb: 2 }}>
            <Typography variant="subtitle2">{group.label}</Typography>
            {group.data.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                name={group.inputName}
                label={item.displayName}
                control={<Checkbox onChange={handleChange} />}
              />
            ))}
          </FormGroup>
        ))}
        <FormControl>
          <Typography variant="subtitle2">
            {membersMatchingCriteria.label}
          </Typography>
          <RadioGroup name={membersMatchingCriteria.inputName}>
            {membersMatchingCriteria.data.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={
                  <Radio
                    onChange={handleChange}
                    disabled={isCheckboxesHaveValue(formValues)}
                  />
                }
                label={item.displayName}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            borderTop: '1px dashed #ebebed',
            display: 'flex',
            flexFlow: 'row nowrap',
            pt: '5px',
            alignItems: 'center',
          }}
        >
          <Input
            name="min"
            placeholder="min"
            onBlur={handleChange}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              changeFormState(e.target.name, e.target.value);
            }}
            size="small"
            type="number"
            min="0"
            max={
              formValues.memberMatchingCriteria === 'Percentage'
                ? '100'
                : undefined
            }
            icon={
              formValues.memberMatchingCriteria === 'Percentage' && (
                <span>%</span>
              )
            }
            value={formValues.min}
            disabled={isCheckboxesHaveValue(formValues)}
          />
          <Box sx={{ margin: '0 5px', fontSize: '16px' }}> - </Box>
          <Input
            name="max"
            placeholder="max"
            onBlur={handleChange}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              changeFormState(e.target.name, e.target.value);
            }}
            disabled={isCheckboxesHaveValue(formValues)}
            size="small"
            type="number"
            min="0"
            max={
              formValues.memberMatchingCriteria === 'Percentage'
                ? '100'
                : undefined
            }
            icon={
              formValues.memberMatchingCriteria === 'Percentage' && (
                <span>%</span>
              )
            }
            value={formValues.max}
          />
        </Box>
      </Box>
    </Box>
  );
};
