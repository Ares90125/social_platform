import {
  GridEditInputCell,
  GridRenderCellParams,
  useGridApiContext,
} from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useAuth } from '../../../../../../../context/auth';
import { useToast } from '../../../../../../../context/toast';
import { closeEditCell, useMutationCell } from '../../helpers';
import { normalizedNumberInput } from '../styles';

export const PaymentEditCell = (params: GridRenderCellParams): JSX.Element => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const apiRef = useGridApiContext();
  const { userConvo } = useAuth();
  const { setErrorToast } = useToast();

  const brandId = router.query.id as string;
  const {
    id,
    field,
    formattedValue,
    row: { groupId, campaignId },
  } = params;

  const cellMutation = useMutationCell(queryClient, brandId, campaignId);

  const updateInput = (newValue: string | null): void => {
    if (newValue === formattedValue || (!newValue && !formattedValue)) {
      return;
    }
    if (userConvo?.userRole === 'finance') {
      cellMutation.mutate({
        groupId,
        campaignId,
        [field]: newValue,
      });
    } else {
      setErrorToast(
        <>
          Update of
          {field === 'paymentRemarks'
            ? ' payment remarks '
            : ' payment amount paid '}
          available only for finance team
        </>,
      );
    }
    closeEditCell(apiRef, id, field);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const newValue =
      event.target.value === '' ? null : event.target.value.trim();
    updateInput(newValue);
  };

  const handleSubmitOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const newValue = input.value === '' ? null : input.value;

      updateInput(newValue);
    }
  };

  return (
    <GridEditInputCell
      {...params}
      onBlur={handleBlur}
      onKeyDown={handleSubmitOnEnter}
      sx={normalizedNumberInput}
    />
  );
};
