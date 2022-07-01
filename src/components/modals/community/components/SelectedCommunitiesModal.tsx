import React, { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useMutation, useQueryClient } from 'react-query';
import { NormalizedCommunity } from '../../../../graphs/listCampaignGroupsAndTasksDetails';
import { ButtonOutlined } from '../../../form';
import { deleteCMCampaignGroup } from '../../../../graphs/deleteCMCampaignGroup';
import { Community } from '../../../../graphs/communityDiscoveryAPI';
import { shortNumber } from '../../../../utils/helpers/short-number';
import { useToast } from '../../../../context/toast';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  margin: '0 auto',
  background: '#fff',
  maxWidth: '960px',
  borderRadius: '8px',
};

const tableColumns = [
  'Group Name',
  'Members',
  'Campaign Engagement',
  'Post Engagement',
  'Action',
];

type CommunitiesModalProps = {
  apiCommunities: NormalizedCommunity[];
  selectedApiCommunities: NormalizedCommunity[];
  normalizedCommunities: (NormalizedCommunity | Community)[];
  isOpen: boolean;
  handleClose: () => void;
  brandId?: string;
  campaignId?: string;
  handleRemoveSelection: (groupId: string) => void;
};

export const SelectedCommunitiesModal: React.FC<CommunitiesModalProps> = ({
  apiCommunities,
  selectedApiCommunities,
  normalizedCommunities,
  isOpen,
  handleClose,
  brandId,
  campaignId,
  handleRemoveSelection,
}) => {
  const { setSuccessToast, setErrorToast } = useToast();
  const queryClient = useQueryClient();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const deleteMutation = useMutation(
    (data: { campaignId: string; groupId: string }) =>
      deleteCMCampaignGroup(data.campaignId, data.groupId),
    {
      onMutate: () => {
        setIsButtonDisabled(true);
      },
      onSuccess: (_, { groupId }) => {
        setIsButtonDisabled(false);
        setSuccessToast();
        if (brandId && campaignId) {
          queryClient.invalidateQueries(`brands-${brandId}-${campaignId}`);
          handleRemoveSelection(groupId);
        }
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '16px',
            borderBottom: '1px solid #dee2e6',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{ fontSize: '16px', color: '#33334f' }}
          >
            Selected Communities ({normalizedCommunities.length})
          </Typography>
          <IconButton onClick={handleClose}>
            <Image
              alt="close icon"
              src="/icons/close-icon.svg"
              width={20}
              height={20}
            />
          </IconButton>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: '80vh', overflow: 'auto' }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableColumns.map((name) => (
                  <TableCell
                    key={name}
                    sx={{
                      fontSize: '11px',
                      padding: '10px 8px',
                      color: '#707084',
                      fontWeight: 500,
                    }}
                  >
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {normalizedCommunities.map(
                (row: Community | NormalizedCommunity) => (
                  <TableRow
                    key={row.groupId}
                    sx={{
                      background: '#f3f5ff',
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{}}>
                      <Box
                        sx={{
                          maxWidth: '300px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          style={{
                            width: '32px',
                            margin: '12px 12px 12px 0',
                            borderRadius: '4px',
                            height: '32px',
                          }}
                          src={
                            'coverImageUrl' in row && row?.coverImageUrl
                              ? row.coverImageUrl
                              : '/images/default_group_image.jpg'
                          }
                          alt={
                            ('groupName' in row ? row.groupName : row.name) ||
                            'Convosight'
                          }
                          width={32}
                          height={32}
                        />
                        {'groupName' in row ? row.groupName : row.name}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      {'convertedMemberCount' in row
                        ? row?.convertedMemberCount
                        : shortNumber(row?.memberCount || 0)}
                    </TableCell>
                    <TableCell align="left">
                      {row.campaignPostEngagementRateLastNinetyDays}
                    </TableCell>
                    <TableCell align="left">
                      {row.postsEngagementRateLastNinetyDays}
                    </TableCell>
                    <TableCell align="left">
                      <ButtonOutlined
                        color="error"
                        sx={{ textTransform: 'none', fontSize: '12px' }}
                        startIcon={<DeleteOutline fontSize="small" />}
                        disabled={isButtonDisabled}
                        onClick={(): void => {
                          if (
                            selectedApiCommunities.find(
                              (c) => c.groupId && c.groupId === row.groupId,
                            )
                          ) {
                            const currentCommunity = apiCommunities.find(
                              (c) => c.groupId === row.groupId,
                            )!;
                            deleteMutation.mutate({
                              campaignId: currentCommunity.campaignId!,
                              groupId: currentCommunity.groupId!,
                            });
                          }

                          if (row?.groupId) {
                            handleRemoveSelection(row.groupId);
                          }
                        }}
                      >
                        Remove
                      </ButtonOutlined>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
