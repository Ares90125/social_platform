import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useAuth } from '../../../../../../../context/auth';
import { useToast } from '../../../../../../../context/toast';
import { paymentStatusOptions } from '../../cellsOptions';
import { closeEditCell, useMutationCell } from '../../helpers';

export const PaymentStatusEditCell = (
  props: GridRenderCellParams,
): JSX.Element => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const apiRef = useGridApiContext();
  const { userConvo } = useAuth();
  const { setErrorToast } = useToast();

  const brandId = router.query.id as string;
  const {
    id,
    field,
    row: { groupId, campaignId, [field]: value, pricing },
  } = props;

  const cellMutation = useMutationCell(queryClient, brandId, campaignId);

  const handleChange = async (
    event: SelectChangeEvent<string>,
  ): Promise<void> => {
    const { value: newValue } = event.target;

    if (
      userConvo?.userRole === 'finance' ||
      (userConvo?.userRole !== 'finance' && newValue === 'ReadyForPayment')
    ) {
      const values = {
        groupId,
        campaignId,
        [field]: newValue,
      };

      if (newValue === 'Done') {
        values.paymentAmountPaid = pricing;
      }

      await cellMutation.mutateAsync(values);
    } else {
      setErrorToast(
        'For non finance team available update only from Not Paid to Ready For Payment',
      );
    }
    closeEditCell(apiRef, id, field);
  };

  const handleClose = (): void => {
    closeEditCell(apiRef, id, field);
  };

  return (
    <Select
      onChange={handleChange}
      value={value}
      fullWidth
      defaultOpen
      onClose={handleClose}
    >
      {Object.entries(paymentStatusOptions).map((option) => (
        <MenuItem value={option[0]} key={option[1]}>
          {option[1]}
        </MenuItem>
      ))}
    </Select>
  );
};
