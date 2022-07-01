import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { currencies } from '../../cellsOptions';
import { closeEditCell, useMutationCell } from '../../helpers';

export const SelectEditInputCell = (
  props: GridRenderCellParams,
): JSX.Element => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const apiRef = useGridApiContext();

  const brandId = router.query.id as string;
  const {
    id,
    field,
    formattedValue,
    colDef: { valueOptions },
    row: { groupId, campaignId, [field]: value },
  } = props;
  const options = valueOptions as string[];

  const cellMutation = useMutationCell(queryClient, brandId, campaignId);

  const handleChange = async (
    event: SelectChangeEvent<string>,
  ): Promise<void> => {
    const { value: newValue } = event.target;

    if (field === 'currency') {
      const previousValue = Object.entries(currencies).find(
        (c) => c[1] === formattedValue,
      )?.[0];

      if (previousValue === newValue) {
        closeEditCell(apiRef, id, field);
        return;
      }
    }
    await cellMutation.mutateAsync({
      groupId,
      campaignId,
      [field]: newValue,
    });

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
      {options?.map((option) => (
        <MenuItem value={option} key={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};
