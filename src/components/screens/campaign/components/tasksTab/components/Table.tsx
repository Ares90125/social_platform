import React, { useState } from 'react';
import {
  TableContainer,
  Table as TableMui,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from '@mui/material';
import Lightbox from 'react-image-lightbox';
import { tableStyles, commonStyles } from '../tasksTab.styles';
import { CampaignGroupAndTaskDetails } from '../../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { EditModalState } from '../TasksTab';
import { CampaignInputs } from '../../detailsTab/campaign.types';
import { TableTaskRow } from './TableTaskRow';

const TableColumns = [
  'TASK',
  'TITLE',
  'ASSIGNED TO',
  'TYPE',
  'PERIOD',
  'DATE / TIME',
  'STATE',
];

type TableProps = {
  campaign?: CampaignInputs;
  openEditModal: (editableTask: EditModalState['community']) => void;
  openMarkModal: (task: CampaignGroupAndTaskDetails) => void;
  sortedTasks: CampaignGroupAndTaskDetails[];
  handleRefetchCommunities: () => void;
};

export const Table: React.FC<TableProps> = ({
  campaign,
  sortedTasks,
  openEditModal,
  openMarkModal,
  handleRefetchCommunities,
}) => {
  const [gallery, setGallery] = useState<{
    images: string[];
    photoIndex: number;
    isOpen: boolean;
  }>({
    images: [],
    photoIndex: 0,
    isOpen: false,
  });

  const handleGallery = (images: string[], photoIndex: number): void => {
    setGallery({
      images,
      photoIndex,
      isOpen: true,
    });
  };

  return (
    <>
      <TableContainer component={Paper} sx={commonStyles.container}>
        <TableMui>
          <TableHead sx={commonStyles.backgroundBox}>
            <TableRow>
              {TableColumns.map((col, i) => (
                <TableCell
                  key={col}
                  sx={
                    i === 0
                      ? { ...tableStyles.headCell, width: '280px' }
                      : { ...tableStyles.headCell }
                  }
                >
                  {col}
                </TableCell>
              ))}
              <TableCell sx={{ ...tableStyles.headCell, width: '66px' }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedTasks.map((task) => (
              <TableTaskRow
                key={task.taskId}
                campaign={campaign}
                openEditModal={openEditModal}
                openMarkModal={(): void => openMarkModal(task)}
                task={task}
                handleRefetchCommunities={handleRefetchCommunities}
                handleGallery={handleGallery}
              />
            ))}
          </TableBody>
        </TableMui>
      </TableContainer>
      {gallery.isOpen && (
        <Lightbox
          reactModalStyle={{
            overlay: {
              zIndex: 9999,
            },
          }}
          mainSrc={gallery.images[gallery.photoIndex]}
          nextSrc={
            gallery.images[(gallery.photoIndex + 1) % gallery.images.length]
          }
          prevSrc={
            gallery.images[
              (gallery.photoIndex + gallery.images.length - 1) %
                gallery.images.length
            ]
          }
          onCloseRequest={(): void => {
            setGallery({ isOpen: false, photoIndex: 0, images: [] });
          }}
          onMovePrevRequest={(): void => {
            setGallery({
              ...gallery,
              photoIndex:
                (gallery.photoIndex + gallery.images.length - 1) %
                gallery.images.length,
            });
          }}
          onMoveNextRequest={(): void => {
            setGallery({
              ...gallery,
              photoIndex: (gallery.photoIndex + 1) % gallery.images.length,
            });
          }}
        />
      )}
    </>
  );
};
