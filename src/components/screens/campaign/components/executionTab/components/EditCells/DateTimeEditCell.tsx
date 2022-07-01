import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { TextField } from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { closeEditCell, useMutationCell } from '../../helpers';

export const DateTimeEditInputCell = (
  params: GridRenderCellParams,
): JSX.Element => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const apiRef = useGridApiContext();
  const brandId = router.query.id as string;
  const {
    id,
    value,
    field,
    row: { groupId, campaignId },
  } = params;

  const cellMutation = useMutationCell(queryClient, brandId, campaignId);

  const handleChange = async (
    date: React.ChangeEvent<HTMLInputElement> | null,
    keyboardInputValue: string | undefined,
  ): Promise<void> => {
    if (keyboardInputValue && moment(date as any).isValid()) {
      cellMutation.mutate({
        groupId,
        campaignId,
        [field]: date,
      });

      closeEditCell(apiRef, id, field);
    }
  };
  const onAccept = async (
    date: React.ChangeEvent<HTMLInputElement> | null,
  ): Promise<void> => {
    if (date && moment(date as any).isValid()) {
      cellMutation.mutate({
        groupId,
        campaignId,
        [field]: date,
      });

      closeEditCell(apiRef, id, field);
    }
  };
  const handleClose = (): void => {
    closeEditCell(apiRef, id, field);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        open
        disablePast
        value={value}
        onAccept={onAccept}
        onChange={handleChange}
        onClose={handleClose}
        renderInput={(props): JSX.Element => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};
