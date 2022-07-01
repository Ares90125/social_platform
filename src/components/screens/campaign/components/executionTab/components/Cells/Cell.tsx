import { Box } from '@mui/material';
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid';
import React from 'react';

type CellProps = {
  params: GridRenderCellParams;
  children?: React.ReactNode;
  displayValue?: string;
};
const Cell: React.FC<CellProps> = ({ params, children, displayValue }) => {
  const { id, field, value } = params;
  const apiRef = useGridApiContext();

  const handleClick = (): void => {
    if (apiRef.current.isCellEditable(params)) {
      apiRef.current.startCellEditMode({ id, field });
    }
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      {children || (
        <Box className="MuiDataGrid-cellContent">
          {value || displayValue || ''}
        </Box>
      )}
    </>
  );
};

export default Cell;
