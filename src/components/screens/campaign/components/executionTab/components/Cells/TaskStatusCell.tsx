import { GridRenderCellParams } from '@mui/x-data-grid';
import { Colors } from '../../../../../../../utils/enums/colors';
import { groupTaskStatusOptions } from '../../cellsOptions';

const orange = {
  color: Colors.ORANGE_DARK,
  statuses: [
    groupTaskStatusOptions.CampaignBriefSent,
    groupTaskStatusOptions.TaskCreated,
  ],
};
const green = {
  color: Colors.CONFIRMATION_GREEN,
  statuses: [
    groupTaskStatusOptions.CampaignAccepted,
    groupTaskStatusOptions.TaskScheduled,
    groupTaskStatusOptions.TaskCompleted,
    groupTaskStatusOptions.ContentApproved,
    groupTaskStatusOptions.PaymentSent,
  ],
};
const red = {
  color: Colors.ERROR_RED,
  statuses: [
    groupTaskStatusOptions.TaskFailed,
    groupTaskStatusOptions.TaskDeclined,
    groupTaskStatusOptions.TaskPaused,
  ],
};

export const TaskStatusCell = (params: GridRenderCellParams): JSX.Element => {
  const { value } = params;

  const getTaskColor = (): string => {
    if (red.statuses.includes(value)) return red.color;
    if (green.statuses.includes(value)) return green.color;
    if (orange.statuses.includes(value)) return orange.color;

    if (value === groupTaskStatusOptions.TaskRequestSent) {
      return Colors.BLACK_40;
    }
    return 'inherit';
  };

  return <span style={{ color: getTaskColor() }}>{value}</span>;
};
