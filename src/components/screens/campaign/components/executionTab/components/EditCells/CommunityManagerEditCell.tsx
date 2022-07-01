import React, { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAllCommunityManagers } from '../../../../../../../graphs/getCommunityManagers';
import {
  UpdateGroupInput,
  updateGroups,
} from '../../../../../../../graphs/updateGroups';
import { useToast } from '../../../../../../../context/toast';
import { closeEditCell } from '../../helpers';

type SelectOptions = {
  id: string;
  fullname: string;
};
const defaultOption = { id: '', fullname: '---' };

export const CommunityManagerEditCell = (
  props: GridRenderCellParams,
): JSX.Element => {
  const router = useRouter();
  const apiRef = useGridApiContext();
  const queryClient = useQueryClient();
  const { setSuccessToast, setErrorToast } = useToast();
  const inputRef = useRef<HTMLInputElement>();
  const brandId = router.query.id as string;
  const {
    id,
    field,
    formattedValue,
    row: { groupId, campaignId, [field]: communityManagerId },
  } = props;

  const { data: communityManagers } = useQuery(
    'get-community-managers',
    getAllCommunityManagers,
  );
  const managerMutation = useMutation(
    (data: UpdateGroupInput) => updateGroups(data),
    {
      onSuccess: (): void => {
        queryClient.invalidateQueries(`brands-${brandId}-${campaignId}`);
        setSuccessToast('Community manager is successfuly updated');
      },
      onError: (): void => {
        setErrorToast();
      },
    },
  );

  const [inputValue, setInputValue] = useState<string>(
    communityManagers?.find((cm) => cm.id === communityManagerId)?.fullname ||
      '',
  );
  const [selectValue, setSelectValue] = useState<string>(
    communityManagerId || '',
  );

  const selectOptions: readonly SelectOptions[] = communityManagers
    ? [
        defaultOption,
        ...communityManagers.map((ca) => ({
          id: ca.id,
          fullname: ca.fullname,
        })),
      ]
    : [defaultOption];

  const handleChange = async (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ): Promise<void> => {
    setSelectValue(value || '');

    const previousValue = communityManagers?.find(
      (cm) => cm.fullname === formattedValue,
    )?.id;

    if (value !== previousValue) {
      await managerMutation.mutateAsync({
        id: groupId,
        defaultCommunityManager: value === '' ? null : value,
      });
    }

    closeEditCell(apiRef, id, field);
  };

  const handleClose = (): void => {
    closeEditCell(apiRef, id, field);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Autocomplete
      fullWidth
      disableClearable
      openOnFocus
      forcePopupIcon={false}
      value={selectValue}
      inputValue={inputValue}
      onChange={handleChange}
      onClose={handleClose}
      onInputChange={(_, value): void => {
        setInputValue(value);
      }}
      options={selectOptions.map((o) => o.id)}
      getOptionLabel={
        (option): string =>
          selectOptions.find((o) => o.id === option)?.fullname || ''
        // eslint-disable-next-line react/jsx-curly-newline
      }
      renderOption={(params, option: any): JSX.Element => {
        const currentOption = selectOptions.filter((o) => o.id === option)[0];
        return (
          <MenuItem value={currentOption.id} {...params}>
            {currentOption.fullname}
          </MenuItem>
        );
      }}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          fullWidth
          inputRef={inputRef}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ fontSize: '18px' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
