import React from 'react';
import { Typography, Box, Radio, RadioGroup } from '@mui/material';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';

const GROUP_QUALIFICATIONS = [
  {
    value: 'all',
    label: 'All',
    desc: 'No filter on monetization frequency',
  },
  {
    value: 'FrequentlyMonetized',
    label: 'Frequently Monetized',
    desc: '3+ campaigns completed in last 90 days',
  },
  {
    value: 'LessFrequentlyMonetized',
    label: 'Less Frequently Monetized',
    desc: '1-2 compaigns completed in last 90 days',
  },
  {
    value: 'NotMonetized',
    label: 'Not Monetized',
    desc: 'No compaigns completed in last 90 days',
  },
];

type GroupQualificationProps = {
  value?: string;
  changeFilter: (
    filterName: keyof CommunityDiscoveryInput,
    value: CommunityDiscoveryInput[typeof filterName],
  ) => void;
};

export const GroupQualification: React.FC<GroupQualificationProps> = ({
  value,
  changeFilter,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeFilter(
      'groupQualification',
      e.target.value === 'all' ? undefined : e.target.value,
    );
  };

  return (
    <Box sx={{ mb: 3, mt: 2 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        Group qualification
      </Typography>
      <Box>
        <RadioGroup value={value || 'all'} onChange={handleChange}>
          {GROUP_QUALIFICATIONS.map((qualification) => (
            <Box
              key={qualification.value}
              sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}
            >
              <Radio
                value={qualification.value}
                sx={{ padding: '2px 9px 2px 0' }}
              />
              <Box>
                <Typography variant="subtitle1">
                  {qualification.label}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'light' }}>
                  {qualification.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </RadioGroup>
      </Box>
    </Box>
  );
};
