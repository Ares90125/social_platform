import React, { useState } from 'react';
import { Box, TextareaAutosize, Typography } from '@mui/material';
import { CommunityDiscoveryInput } from '../../../../graphs/communityDiscoveryAPI';
import { Input } from '../../../form';

type TextFiltersProps = {
  maxFollowers?: number | null;
  maxPostEngagement?: number | null;
  values: CommunityDiscoveryInput;
  changeFilter: (
    filterName: keyof CommunityDiscoveryInput,
    value: CommunityDiscoveryInput[typeof filterName],
  ) => void;
  changeSomeFilters: (filters: CommunityDiscoveryInput) => void;
};

const regExp = /\n|,{1,}/gim;

export const TextFilters: React.FC<TextFiltersProps> = ({
  values,
  changeFilter,
  changeSomeFilters,
  maxFollowers,
  maxPostEngagement,
}) => {
  const [formState, setFormState] = useState({
    followersMin: '',
    followersMax: maxFollowers ? `${maxFollowers}` : '',
    postEngagementMin: '',
    postEngagementMax: maxPostEngagement ? `${maxPostEngagement}` : '',
    fbGroupId: '',
    convosightId: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value, name } = e.target;

    setFormState({
      ...formState,
      [name]: name === 'convosightId' ? value.replaceAll(regExp, ',') : value,
    });
  };

  const handleConvosightKeyUp = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    const communities = formState.convosightId
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    if (e?.key === 'Enter' && communities.length) {
      changeFilter('communityIds', communities);
    }

    if (!communities.length) {
      const { communityIds, ...otherFilters } = values;
      changeSomeFilters({ ...otherFilters });
    }
  };

  const handleFollowersBlur = (): void => {
    if (formState.followersMin.length && formState.followersMax.length) {
      changeFilter(
        'memberCount',
        `${formState.followersMin}-${formState.followersMax}`,
      );
    } else {
      changeFilter('memberCount', `0-${formState.followersMax}`);
    }
  };

  const handlePostsBlur = (): void => {
    if (
      formState.postEngagementMin.length &&
      formState.postEngagementMax.length
    ) {
      changeFilter(
        'postsEngagementRateLastNinetyDays',
        `${formState.postEngagementMin}-${formState.postEngagementMax}`,
      );
    } else {
      changeFilter(
        'postsEngagementRateLastNinetyDays',
        `0-${formState.followersMax}`,
      );
    }
  };

  const handleGroupIdBlur = (): void => {
    if (formState.fbGroupId) {
      changeFilter('fbGroupId', formState.fbGroupId);
    } else {
      changeFilter('fbGroupId', '');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        Select followers count
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          pt: '5px',
          alignItems: 'center',
          mb: '10px',
        }}
      >
        <Input
          name="followersMin"
          onChange={handleChange}
          onBlur={handleFollowersBlur}
          size="small"
          type="number"
          min="0"
          value={formState.followersMin}
        />
        <Box sx={{ margin: '0 5px', fontSize: '16px' }}> - </Box>
        <Input
          name="followersMax"
          onChange={handleChange}
          onBlur={handleFollowersBlur}
          size="small"
          type="number"
          min="0"
          value={formState.followersMax || `${maxFollowers}`}
        />
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        Post Engagement
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          pt: '5px',
          alignItems: 'center',
          mb: '10px',
        }}
      >
        <Input
          name="postEngagementMin"
          onChange={handleChange}
          onBlur={handlePostsBlur}
          size="small"
          type="number"
          min="0"
          value={formState.postEngagementMin}
        />
        <Box sx={{ margin: '0 5px', fontSize: '16px' }}> - </Box>
        <Input
          name="postEngagementMax"
          onChange={handleChange}
          onBlur={handlePostsBlur}
          size="small"
          type="number"
          min="0"
          value={formState.postEngagementMax || `${maxPostEngagement}`}
        />
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        FB Group ID
      </Typography>
      <Box
        sx={{
          pt: '5px',
          mb: '10px',
        }}
      >
        <Input
          name="fbGroupId"
          onChange={handleChange}
          onBlur={handleGroupIdBlur}
          size="small"
          value={formState.fbGroupId}
        />
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        Convosight ID
      </Typography>
      <Box
        sx={{
          pt: '5px',
          mb: '10px',
        }}
      >
        <TextareaAutosize
          name="convosightId"
          onChange={handleChange}
          onKeyUp={handleConvosightKeyUp}
          minRows={5}
          value={formState.convosightId}
          style={{
            width: '100%',
            border: '1px solid #e0e0e5',
            fontFamily: 'Roboto',
            padding: '5px',
            borderRadius: '4px',
          }}
        />
      </Box>
    </Box>
  );
};
