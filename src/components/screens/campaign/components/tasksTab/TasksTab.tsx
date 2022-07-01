import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  Tooltip,
  Input,
  Link,
  FormControlLabel,
  Checkbox,
  InputLabel,
} from '@mui/material';
import moment from 'moment';
import { utils, writeFile } from 'xlsx';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { commonStyles, headerStyles } from './tasksTab.styles';
import { FilterPopper } from './components/FilterPopper';
import { CampaignGroupAndTaskDetails } from '../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { Table } from './components/Table';
import {
  FilterChecbox,
  defaultTypeFilters,
  defaultStatusFilters,
} from './filters';
import { EditModal } from './components/EditModal';
import { CampaignInputs } from '../detailsTab/campaign.types';
import { MarkAsCompleteModal } from './components/MarkAsCompleteModal';
import { CampaignDetailsColumns, campaignTaskColumnNames } from './xlsx.helper';
import { getCampaignMedia } from '../../../../../graphs/getCampaignMedia';
import 'react-image-lightbox/style.css';

enum DefaultExportValues {
  XLSX = 'Export .xlsx',
  MEDIA = 'Export media',
}

type TasksTabProps = {
  communities?: CampaignGroupAndTaskDetails[];
  campaign?: CampaignInputs;
  handleRefetchCommunities: () => void;
};

export type EditModalState = {
  isOpen: boolean;
  community: CampaignGroupAndTaskDetails | null;
};

export const TasksTab: React.FC<TasksTabProps> = ({
  communities,
  campaign,
  handleRefetchCommunities,
}) => {
  const [isMarkModalOpened, setIsMarkModalOpened] = useState(false);
  const [typeFilters, setTypeFilters] =
    useState<FilterChecbox[]>(defaultTypeFilters);
  const [statusFilters, setStatusFilters] =
    useState<FilterChecbox[]>(defaultStatusFilters);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [sortedTasks, setSortedTasks] = useState<CampaignGroupAndTaskDetails[]>(
    [],
  );
  const [editModalState, setEditModalState] = useState<EditModalState>({
    isOpen: false,
    community: null,
  });
  const [exportValue, setExportValue] = useState<string>('');
  const [markAsCompleteInfo, setMarkAsCompleteInfo] = useState<{
    task: CampaignGroupAndTaskDetails | null;
  }>({ task: null });

  const openMarkModal = (task: CampaignGroupAndTaskDetails): void => {
    setIsMarkModalOpened(true);
    setMarkAsCompleteInfo({ task });
  };
  const closeMarkModal = (): void => {
    setIsMarkModalOpened(false);
    setMarkAsCompleteInfo({ task: null });
  };

  const openEditModal = (editableTask: EditModalState['community']): void => {
    setEditModalState({ isOpen: true, community: editableTask });
  };
  const closeEditModal = (): void => {
    setEditModalState({ isOpen: false, community: null });
  };

  const handleXlsxExport = (): void => {
    const campaignDetails: CampaignDetailsColumns[] = [];
    const campaignTasks = communities?.filter((c) => c.taskId);

    campaignTasks?.forEach((task) => {
      const taskDet: CampaignDetailsColumns = {};

      campaignTaskColumnNames?.forEach((column, index) => {
        if (
          task.imageUrls &&
          task.imageUrls?.length > 0 &&
          column === 'imageUrls'
        ) {
          taskDet['Image Urls'] = task.imageUrls.join(';');
        } else if (
          task.videoUrls &&
          task.videoUrls?.length > 0 &&
          column === 'videoUrls'
        ) {
          taskDet['Video Urls'] = task.videoUrls.join(';');
        } else if (
          task.fbPermlink &&
          column === 'fbPermlink' &&
          task.status === 'Completed'
        ) {
          taskDet['FB Post Link'] = task.fbPermlink;
        } else if (column === 'No.') {
          taskDet[column] = index + 1;
        } else {
          taskDet[column] = task[column];
        }
      });

      const { imageUrls, videoUrls, fbPermlink, ...rest } = taskDet;
      campaignDetails.push(rest);
    });

    const worksheet = utils.json_to_sheet(campaignDetails);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

    writeFile(
      workbook,
      `${campaign?.campaignName || ''}_${moment(moment.now()).format(
        'YYYY-MM-DD',
      )}.xlsx`,
    );
  };

  const handlerMediaExport = async (): Promise<void> => {
    if (!campaign?.campaignId) {
      return;
    }

    const result = await getCampaignMedia({ campaignId: campaign.campaignId });
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('type', 'hidden');

    if (result.isBase64Encoded) {
      link.href = `data:text/plain;base64,${result.body}`;
      link.download = `${campaign?.campaignName || ''}_${moment(
        moment.now(),
      ).format('YYYY-MM-DD')}.zip`;
    } else {
      link.href = result.body;
      link.setAttribute('download', '');
    }

    link.click();
    document.body.removeChild(link);
  };

  const onChangeExport = (e: SelectChangeEvent): void => {
    setExportValue(e.target.value);
  };

  const setCheckboxFilters = (
    setCheckboxState: React.Dispatch<React.SetStateAction<FilterChecbox[]>>,
    value: string | null,
    checked: boolean,
    filter: 'postType' | 'groupTaskStatus',
  ): void => {
    let tasks = [...sortedTasks];

    tasks = checked
      ? [
          ...tasks,
          ...communities!.filter((task) =>
            !JSON.stringify(tasks).includes(JSON.stringify(task)) &&
            searchFilter.length
              ? task[filter] === value &&
                task.groupName
                  ?.toLowerCase()
                  .includes(searchFilter.toLowerCase())
              : task[filter] === value,
          ),
        ]
      : tasks.filter((task) => task[filter] !== value);

    setSortedTasks(tasks);
    setCheckboxState((prev) =>
      prev.map((item) => {
        if (item.name === value) {
          return { ...item, isSelected: checked };
        }
        return item;
      }),
    );
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, checked } = e.target;
    const value = e.target.value ? e.target.value : null;

    setCheckboxFilters(
      name === 'type' ? setTypeFilters : setStatusFilters,
      value,
      checked,
      name === 'type' ? 'postType' : 'groupTaskStatus',
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!communities?.length) return;

    const { value } = e.target;

    setSortedTasks(
      value.trim()
        ? communities.filter((item) =>
            item.groupName?.toLowerCase().includes(value.toLowerCase()),
          )
        : communities,
    );
    setSearchFilter(value);
  };

  const handleShowAll = (): void => {
    setTypeFilters([...defaultTypeFilters]);
    setStatusFilters([...defaultStatusFilters]);

    if (communities) {
      setSortedTasks([...communities]);
    }
  };

  useEffect(() => {
    if (communities) {
      setSortedTasks(communities);
    }
  }, [communities]);

  return (
    <>
      <Paper sx={commonStyles.container}>
        <Box sx={headerStyles.box}>
          <Typography variant="subtitle2">
            All Tasks
            <Chip
              label={communities?.filter((c) => c.taskId)?.length || 0}
              size="small"
              sx={headerStyles.chip}
            />
          </Typography>
          <Box sx={commonStyles.flexAlignCenter}>
            <FormControl>
              <InputLabel id="export-select">Export</InputLabel>
              <Select
                labelId="export-select"
                value={exportValue}
                onChange={onChangeExport}
                sx={commonStyles.select}
                label="Export"
              >
                <MenuItem
                  value={DefaultExportValues.XLSX}
                  sx={{ fontSize: '14px' }}
                  onClick={handleXlsxExport}
                >
                  {DefaultExportValues.XLSX}
                </MenuItem>
                <MenuItem
                  value={DefaultExportValues.MEDIA}
                  sx={{ fontSize: '14px' }}
                  onClick={handlerMediaExport}
                >
                  {DefaultExportValues.MEDIA}
                </MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Tasks with empty status will not be available in download">
              <ErrorOutlineIcon
                sx={{ ...commonStyles.icon, ...headerStyles.infoIcon }}
              />
            </Tooltip>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ ...headerStyles.box, ...commonStyles.backgroundBox }}>
          <Box sx={commonStyles.flexAlignCenter}>
            <Typography variant="subtitle1">Filters: </Typography>
            <FilterPopper buttonText="Type">
              {typeFilters.map((item) => (
                <FormControlLabel
                  name="type"
                  key={item.displayName}
                  value={item.name}
                  checked={item.isSelected}
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label={item.displayName}
                />
              ))}
            </FilterPopper>
            <FilterPopper buttonText="State">
              {statusFilters.map((item) => (
                <FormControlLabel
                  name="status"
                  key={item.displayName}
                  value={item.name}
                  checked={item.isSelected}
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label={item.displayName}
                />
              ))}
            </FilterPopper>
            <Input
              value={searchFilter}
              onChange={handleInputChange}
              sx={headerStyles.input}
              disableUnderline
              placeholder="Search by group or admin name..."
            />
          </Box>
          <Box>
            <Link
              sx={{ fontSize: '14px', cursor: 'pointer' }}
              onClick={handleShowAll}
            >
              Show all
            </Link>
          </Box>
        </Box>
      </Paper>

      <Table
        sortedTasks={sortedTasks}
        campaign={campaign}
        openEditModal={openEditModal}
        openMarkModal={openMarkModal}
        handleRefetchCommunities={handleRefetchCommunities}
      />

      {editModalState.isOpen && (
        <EditModal
          campaign={campaign}
          modalState={editModalState}
          closeModal={closeEditModal}
          handleRefetchCommunities={handleRefetchCommunities}
        />
      )}

      <MarkAsCompleteModal
        isOpen={isMarkModalOpened}
        closeModal={closeMarkModal}
        markAsCompleteInfo={markAsCompleteInfo}
        handleRefetchCommunities={handleRefetchCommunities}
      />
    </>
  );
};
