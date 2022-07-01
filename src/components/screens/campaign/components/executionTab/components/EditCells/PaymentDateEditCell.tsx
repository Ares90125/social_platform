import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { TextField } from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useAuth } from '../../../../../../../context/auth';
import { useToast } from '../../../../../../../context/toast';
import { closeEditCell, useMutationCell } from '../../helpers';

export const PaymentDateEditInputCell = (
  params: GridRenderCellParams,
): JSX.Element => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const apiRef = useGridApiContext();
  const { userConvo } = useAuth();
  const { setErrorToast } = useToast();
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
  ): Promise<void> => {
    if (date && moment(date as any).isValid()) {
      if (userConvo?.userRole === 'finance') {
        cellMutation.mutate({
          groupId,
          campaignId,
          [field]: date,
        });
      } else {
        setErrorToast('Update of payment date available only for finance team');
      }
      closeEditCell(apiRef, id, field);
    }
  };
  const handleClose = (): void => {
    closeEditCell(apiRef, id, field);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        open
        value={value}
        onChange={handleChange}
        onClose={handleClose}
        renderInput={(props): JSX.Element => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};
