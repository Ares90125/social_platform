import React from 'react';
import { Box } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import moment from 'moment';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Tooltip } from '../../../../../../tooltip/Tooltip';
import { Colors } from '../../../../../../../utils/enums/colors';

type PostingTimeCellProps = {
  params: GridRenderCellParams;
};

export const PostingTimeCell: React.FC<PostingTimeCellProps> = ({ params }) => {
  const {
    value,
    row: { startDateAtUTC, endDateAtUTC },
  } = params;

  const isDateInPast = moment(value).isBefore(moment());
  const isDateOutOfRange =
    moment(value).isAfter(moment(endDateAtUTC)) ||
    moment(value).isBefore(moment(startDateAtUTC)) ||
    (!endDateAtUTC && !startDateAtUTC && moment(value).isValid());

  return (
    <>
      <Box className="MuiDataGrid-cellContent">{value}</Box>
      {(isDateOutOfRange || isDateInPast) && (
        <Tooltip
          title={
            isDateInPast
              ? 'Posting Time is in past'
              : 'Posting Time is outside the selected Campaign Dates range'
          }
        >
          <ErrorOutlineIcon
            sx={{
              width: '16px',
              height: '16px',
              color: Colors.ERROR_RED,
              zIndex: 1,
            }}
          />
        </Tooltip>
      )}
    </>
  );
};
