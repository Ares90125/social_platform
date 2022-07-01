import React, { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { getCommunityAdmins } from '../../../../../../../graphs/getCommunityAdmins';
import { communityAdminStyles as styles } from '../styles';
import { closeEditCell, useMutationCell } from '../../helpers';
import { useToast } from '../../../../../../../context/toast';

type SelectOptions = {
  id: string;
  fullname: string;
  cmcTrained?: boolean;
  performanceTrained?: boolean;
  modeOfCommunication?: string;
  verificationStatus?: string;
};
const defaultOption = { id: '', fullname: '---' };

export const CommunityAdminEditCell = (
  props: GridRenderCellParams,
): JSX.Element => {
  const router = useRouter();
  const apiRef = useGridApiContext();
  const queryClient = useQueryClient();
  const { setErrorToast } = useToast();
  const inputRef = useRef<HTMLInputElement>();
  const brandId = router.query.id as string;
  const {
    id,
    field,
    formattedValue,
    row: { groupId, campaignId, [field]: communityAdminId },
  } = props;

  const { data: communitiesAdmin } = useQuery(
    `community-admins-${groupId}`,
    () => getCommunityAdmins({ groupId }),
    {
      onError: () => {
        setErrorToast(
          'Something went wrong while fetching community admin list.\nPlease try again in sometime!',
        );
      },
    },
  );

  const cellMutation = useMutationCell(queryClient, brandId, campaignId);

  const [inputValue, setInputValue] = useState<string>(
    communitiesAdmin?.find((ca) => ca.id === communityAdminId)?.fullname || '',
  );
  const [selectValue, setSelectValue] = useState<string>(
    communityAdminId || '',
  );

  const selectOptions: readonly SelectOptions[] = communitiesAdmin
    ? [
        defaultOption,
        ...communitiesAdmin.map((ca) => ({
          id: ca.id,
          fullname: ca.fullname,
          cmcTrained: ca.cmcTrained,
          performanceTrained: ca.performanceTrained,
          modeOfCommunication: ca.modeOfCommunication,
          verificationStatus: ca.modeOfCommunicationVerificationStatus,
        })),
      ]
    : [defaultOption];

  const handleChange = async (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ): Promise<void> => {
    setSelectValue(value || '');

    const previousValue = communitiesAdmin?.find(
      (cm) => cm.fullname === formattedValue,
    )?.id;

    if (value !== previousValue) {
      await cellMutation.mutateAsync({
        groupId,
        campaignId,
        communityAdminId: value === '' ? null : value,
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
          <MenuItem
            value={currentOption.id}
            {...params}
            sx={{ maxWidth: '100%' }}
          >
            {currentOption.modeOfCommunication === 'Email' ? (
              <MailOutlineIcon
                sx={
                  currentOption.verificationStatus === 'Verified'
                    ? styles.iconVerified
                    : styles.icon
                }
              />
            ) : (
              <WhatsAppIcon
                sx={
                  currentOption.verificationStatus === 'Verified'
                    ? styles.iconVerified
                    : styles.icon
                }
              />
            )}
            <Box sx={{ whiteSpace: 'normal' }}>
              <Box>{currentOption.fullname}</Box>
              <span>{currentOption.cmcTrained && '(CMC trained)'}</span>
              <span>
                {currentOption.performanceTrained && '(Performance trained)'}
              </span>
            </Box>
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
