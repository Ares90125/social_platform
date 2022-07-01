import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
} from '@mui/x-data-grid';
import Image from 'next/image';
import { useMutation, useQuery } from 'react-query';
import { People, Download, DeleteOutline, Email } from '@mui/icons-material';
import { Button, ButtonOutlined } from '../../../../form';
import { CommunityModal } from '../../../../modals/community/CommunityModal';
import { NoSelectedCampaigns } from '../noSelectedCampaigns/NoSelectedCampaigns';
import {
  CampaignGroupAndTaskDetails,
  NormalizedCommunity,
} from '../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { CampaignInputs } from '../detailsTab/campaign.types';
import { RemoveCommunitiesModal } from '../../../../modals/community/components/RemoveCommunitiesModal';
import { downloadCampaignGroupAssetsExcel } from '../../../../../graphs/downloadCampaignGroupAssetsExcel';
import {
  sendProposalToCommunityAdmin,
  SendProposalToCommunityAdminInput,
} from '../../../../../graphs/sendProposalToCommunityAdmin';
import { timeZones } from '../detailsTab/defaultFormValues';
import { CommunityAdminEditCell } from './components/EditCells/CommunityAdminEditCell';
import { CommunityManagerEditCell } from './components/EditCells/CommunityManagerEditCell';
import { PaymentEditCell } from './components/EditCells/PaymentEditCell';
import { SelectEditInputCell } from './components/EditCells/SelectEditInputCell';
import { PaymentDateEditInputCell } from './components/EditCells/PaymentDateEditCell';
import { DateTimeEditInputCell } from './components/EditCells/DateTimeEditCell';
import {
  cohorts,
  currencies,
  currencySybols,
  editableTaskCells,
  paymentStatusOptions,
} from './cellsOptions';
import { Filter } from './components/Filter/Filter';
import {
  checkForCampaignStatusSendProposal,
  getnormalizedCommunities,
} from './helpers';
import { getAllCommunityManagers } from '../../../../../graphs/getCommunityManagers';
import { CommunityAdminCell } from './components/Cells/CommunityAdminCell';
import { PostingTimeCell } from './components/Cells/PostingTimeCell';
import { EditGroupsButton } from './components/EditGroup/EditGroupsButton';
import { EditGroupsModal } from './components/EditGroup/EditGroupsModal';
import { RequiereAssetModal } from './components/RequireAssetModal/RequiereAssetModal';
import { useToast } from '../../../../../context/toast';
import Cell from './components/Cells/Cell';
import { ProposalModal } from './components/ProposalModal';
import { PaymentStatusEditCell } from './components/EditCells/PaymentStatusEditCell';
import { PriceEditCell } from './components/EditCells/PricingEditCell';
import { TasksDashboard } from './components/TasksDashboard/TasksDashboard';
import { downloadCMCExecutionExcel } from '../../../../../graphs/downloadCMCExecutionExcel';
import { TaskStatusCell } from './components/Cells/TaskStatusCell';

const columns: GridColDef[] = [
  {
    headerName: '',
    field: 'linkToFb',
    width: 20,
    sortable: false,
    renderCell: (params: GridRenderCellParams<string>): React.ReactElement =>
      params.value ? (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          <Image
            src="/icons/icon-outbond.svg"
            alt="fb group"
            width={16}
            height={16}
          />
        </a>
      ) : (
        <span />
      ),
  },
  {
    field: 'groupName',
    headerName: 'Community Name',
    width: 280,
    sortable: true,
  },
  {
    field: 'convertedMemberCount',
    headerName: 'Members',
    width: 90,
    sortable: false,
  },
  {
    field: 'communityAdminName',
    headerName: 'Community Admin',
    width: 180,
    renderCell: (params) => (
      <Cell params={params}>
        <CommunityAdminCell params={params} />
      </Cell>
    ),
    renderEditCell: (params) => <CommunityAdminEditCell {...params} />,
    editable: true,
  },
  {
    field: 'communityManager',
    headerName: 'Community Manager',
    width: 150,
    renderCell: (params) => <Cell params={params} />,
    renderEditCell: (params) => <CommunityManagerEditCell {...params} />,
    editable: true,
  },
  {
    field: 'currency',
    headerName: 'Currency',
    width: 100,
    type: 'singleSelect',
    valueOptions: Object.keys(currencies),
    renderCell: (params) => <Cell params={params} />,
    renderEditCell: (params) => <SelectEditInputCell {...params} />,
    editable: true,
  },
  {
    field: 'pricing',
    headerName: 'Pricing',
    width: 120,
    editable: true,
    type: 'number',
    renderCell: (params) => <Cell params={params} displayValue="add amount" />,
    renderEditCell: (params) => <PriceEditCell {...params} />,
  },
  {
    field: 'groupTaskStatus',
    headerName: 'Task status',
    width: 150,
    renderCell: (params) => <TaskStatusCell {...params} />,
  },
  {
    field: 'campaignAssetProposalSent',
    headerName: 'Proposal sent',
    width: 150,
    renderCell: (params) => (params.value ? 'Yes' : 'No'),
  },
  {
    field: 'defaultTaskDate',
    headerName: 'Posting time',
    width: 160,
    type: 'dateTime',
    renderEditCell: (params) => <DateTimeEditInputCell {...params} />,
    renderCell: (params) => (
      <Cell params={params}>
        <PostingTimeCell params={params} />
      </Cell>
    ),
    editable: true,
  },
  {
    field: 'timezone',
    headerName: 'Posting timezone',
    width: 150,
    type: 'singleSelect',
    valueOptions: timeZones,
    renderCell: (params) => <Cell params={params} />,
    renderEditCell: (params) => <SelectEditInputCell {...params} />,
    editable: true,
  },
  {
    field: 'cohort',
    headerName: 'Cohort',
    width: 150,
    type: 'singleSelect',
    valueOptions: cohorts,
    renderCell: (params) => <Cell params={params} />,
    renderEditCell: (params) => <SelectEditInputCell {...params} />,
    editable: true,
  },
  {
    field: 'paymentStatus',
    headerName: 'Payment Status',
    width: 150,
    type: 'singleSelect',
    valueOptions: Object.keys(paymentStatusOptions),
    renderCell: (params) => <Cell params={params} />,
    renderEditCell: (params) => <PaymentStatusEditCell {...params} />,
    editable: true,
  },
  {
    field: 'paymentRemarks',
    headerName: 'Payment Remarks',
    width: 150,
    editable: true,
    renderCell: (params) => <Cell params={params} displayValue="add remarks" />,
    renderEditCell: (params) => <PaymentEditCell {...params} />,
  },
  {
    field: 'paymentAmountPaid',
    headerName: 'Payment Amount Paid',
    width: 150,
    editable: true,
    type: 'number',
    renderCell: (params) => <Cell params={params} />,
    renderEditCell: (params) => <PaymentEditCell {...params} />,
  },
  {
    field: 'paymentBalanceAmount',
    headerName: 'Payment Balance Amount',
    width: 150,
    renderCell: (params): number => {
      const { pricing, paymentAmountPaid } = params.row;
      let balance = 0;
      if (Number(pricing) && Number(paymentAmountPaid)) {
        balance = pricing - paymentAmountPaid;
      }
      if (Number(pricing) && !Number(paymentAmountPaid)) {
        balance = pricing;
      }
      if (!Number(pricing) && Number(paymentAmountPaid)) {
        balance -= paymentAmountPaid;
      }
      return balance;
    },
  },
  {
    field: 'paymentDate',
    headerName: 'Payment Date',
    width: 150,
    type: 'date',
    renderCell: (params) => <Cell params={params} />,
    renderEditCell: (params) => <PaymentDateEditInputCell {...params} />,
    editable: true,
  },
  {
    field: 'owner',
    headerName: 'Owner',
    width: 150,
  },
  {
    field: 'postType',
    headerName: 'Post Type',
    width: 150,
  },
  {
    field: 'campaignAssetsStatus',
    headerName: 'Campaign assets status',
    width: 210,
  },
  {
    field: 'campaignAssetsApproved',
    headerName: 'Number of approved',
    width: 150,
  },
  {
    field: 'campaignAssetsDeclined',
    headerName: 'Number of declined',
    width: 150,
  },
  {
    field: 'campaignAssetsPending',
    headerName: 'Number of pending assets',
    width: 150,
  },
  {
    field: 'campaignAssetsApprovedAll',
    headerName: 'All assets approved',
    width: 150,
  },
  {
    field: 'campaignAssetsHasDeclined',
    headerName: 'Has declined assets',
    width: 150,
  },
  {
    field: 'campaignAssetsHasPending',
    headerName: 'Has pending assets',
    width: 150,
  },
  {
    field: 'campaignAssetsInitial',
    headerName: 'Assets not submitted',
    width: 150,
  },
];

type ExecutionTabProps = {
  communities?: CampaignGroupAndTaskDetails[];
  campaign?: CampaignInputs;
  handleRefetchCommunities: () => void;
};
export type EditModalState = {
  isOpen: boolean;
  option: {
    key: string;
    label: string;
  } | null;
};

export const ExecutionTab: React.FC<ExecutionTabProps> = ({
  communities,
  campaign,
  handleRefetchCommunities,
}) => {
  const { data: communityManagers } = useQuery(
    'get-community-managers',
    getAllCommunityManagers,
  );
  const [isProposalWindowOpen, setIsProposalWindowOpen] = useState(false);
  const { setErrorToast, setSuccessToast } = useToast();
  const [snackProposal, setSnackProposal] = useState({
    to: '',
    community: '',
  });
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isRequireAssetModalOpen, setIsRequireAssetModalOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [editModalState, setEditModalState] = useState<EditModalState>({
    isOpen: false,
    option: null,
  });

  const handlePropsalOpen = (): void => {
    setIsProposalWindowOpen(true);
  };
  const handlePropsalClose = (): void => {
    setIsProposalWindowOpen(false);
  };

  const [filteredCommunities, setFilteredCommunities] = useState<
    CampaignGroupAndTaskDetails[] | undefined
  >(communities);

  const normalizedCommunities: NormalizedCommunity[] | undefined =
    getnormalizedCommunities(campaign, communities, communityManagers);

  // should call this func on updateTasks / createTask etc; ↓
  // should figure out when to call this func ↓
  const isCampaignreadyForSendProposal = checkForCampaignStatusSendProposal(
    communities,
    campaign,
  );

  const calculateCurrencySum = (): {
    sumOfAll: number;
    currencyValues: {
      SGD: number;
      USD: number;
      INR: number;
    };
  } => {
    let sumOfAll = 0;
    const currencyValues = Object.entries(
      _.groupBy(
        normalizedCommunities?.filter(
          (c) => c.id && c?.pricing && selectionModel.includes(c.id),
        ) || [],
        (c) => c.currency,
      ),
    ).reduce(
      (prev, [key, c]) => {
        const sum = c.reduce((p, n) => p + Number(n?.pricing) || 0, 0);
        sumOfAll += sum;

        return { ...prev, [currencySybols[key]]: sum };
      },
      {
        SGD: 0,
        USD: 0,
        INR: 0,
      },
    );

    return { sumOfAll, currencyValues };
  };
  const { sumOfAll, currencyValues } = calculateCurrencySum();

  const sendProposalMutation = useMutation(
    (data: SendProposalToCommunityAdminInput) =>
      sendProposalToCommunityAdmin(data),
    {
      onSuccess: () => {
        setSelectionModel([]);
        setSuccessToast(
          <>
            <b>Proposal was successfully sent</b> <br />
            Proposal request from community {snackProposal.community} was sent
            to {snackProposal.to}
          </>,
        );
        setSnackProposal({ to: '', community: '' });
        handleRefetchCommunities();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );
  const downloadCommunities = async (): Promise<void> => {
    if (!campaign?.campaignId) return;

    const result = await downloadCMCExecutionExcel(campaign.campaignId);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('type', 'hidden');
    link.href = `data:text/plain;base64,${result}`;
    link.download = `${campaign?.campaignName}_${moment(new Date()).format(
      'YYYY-MM-DD',
    )}.xlsx`;
    link.click();
    document.body.removeChild(link);
  };

  const handleClickOpen = (): void => {
    setIsCommunityOpen(true);
  };

  const handleClose = (): void => {
    setIsCommunityOpen(false);
  };

  const handleClickOpenRemoveModal = (): void => {
    setIsRemoveOpen(true);
  };

  const handleCloseRemoveModal = (): void => {
    setIsRemoveOpen(false);
  };

  const handleOpenRequireAssetModal = (): void => {
    setIsRequireAssetModalOpen(true);
  };

  const resetSelection = (): void => {
    setSelectionModel([]);
  };

  const downloadCampaignAssets = async (): Promise<void> => {
    if (!campaign?.campaignId) return;
    try {
      const result = await downloadCampaignGroupAssetsExcel(
        campaign.campaignId,
      );
      window.open(result.url);
    } catch (e) {
      setErrorToast();
    }
  };

  const handleSendProposals = (): void => {
    const selectedCommunityIds = selectionModel
      ? (selectionModel as string[])
      : [];
    const selectedCommunities: NormalizedCommunity[] | undefined =
      normalizedCommunities?.filter(
        (c) => c.id && selectedCommunityIds.includes(c.id),
      );

    if (!selectedCommunities?.length) {
      return;
    }

    if (
      selectedCommunities.find((c) => !c.pricing || c.pricing === 'add amount')
    ) {
      setErrorToast(
        <>
          <span>
            <b>Proposal request failed</b>
          </span>
          <br />
          <span>
            Pricing is mandatory field, please type in pricing in selected
            communities
          </span>
        </>,
      );

      return;
    }

    const proposalSentGroups = selectedCommunities.filter(
      (c) => c.campaignAssetProposalSent,
    );

    if (proposalSentGroups.length) {
      handlePropsalOpen();

      return;
    }

    selectedCommunities.forEach((selectedCommunity) => {
      if (
        selectedCommunity?.groupId &&
        selectedCommunity?.campaignId &&
        selectedCommunity?.communityAdminId
      ) {
        sendProposalMutation.mutate({
          groupId: selectedCommunity.groupId,
          campaignId: selectedCommunity.campaignId,
          communityAdminId: selectedCommunity.communityAdminId,
        });
        setSnackProposal({
          to: selectedCommunity.communityAdminName || '',
          community: selectedCommunity.groupName || '',
        });
      }
    });
  };

  const sendToAllSelected = (): void => {
    const selectedCommunityIds = selectionModel
      ? (selectionModel as string[])
      : [];
    const selectedCommunities: NormalizedCommunity[] | undefined =
      normalizedCommunities?.filter(
        (c) => c.id && selectedCommunityIds.includes(c.id),
      );

    if (!selectedCommunities?.length) {
      return;
    }

    selectedCommunities.forEach((selectedCommunity) => {
      if (
        selectedCommunity?.groupId &&
        selectedCommunity?.campaignId &&
        selectedCommunity?.communityAdminId
      ) {
        sendProposalMutation.mutate({
          groupId: selectedCommunity.groupId,
          campaignId: selectedCommunity.campaignId,
          communityAdminId: selectedCommunity.communityAdminId,
        });
        setSnackProposal({
          to: selectedCommunity.communityAdminName || '',
          community: selectedCommunity.groupName || '',
        });
      }
    });
  };

  const sendToWithoutProposals = (): void => {
    const selectedCommunityIds = selectionModel
      ? (selectionModel as string[])
      : [];
    const selectedCommunities: NormalizedCommunity[] | undefined =
      normalizedCommunities?.filter(
        (c) =>
          c.id &&
          selectedCommunityIds.includes(c.id) &&
          !c.campaignAssetProposalSent,
      );

    if (!selectedCommunities?.length) {
      return;
    }

    selectedCommunities.forEach((selectedCommunity) => {
      if (
        selectedCommunity?.groupId &&
        selectedCommunity?.campaignId &&
        selectedCommunity?.communityAdminId
      ) {
        sendProposalMutation.mutate({
          groupId: selectedCommunity.groupId,
          campaignId: selectedCommunity.campaignId,
          communityAdminId: selectedCommunity.communityAdminId,
        });
        setSnackProposal({
          to: selectedCommunity.communityAdminName || '',
          community: selectedCommunity.groupName || '',
        });
      }
    });
  };

  useEffect(() => {
    if (communities) {
      setFilteredCommunities([...communities]);
    }
  }, [communities]);

  return (
    <>
      {normalizedCommunities?.length ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box>
              <Typography variant="h6" component="h1" sx={{ mb: '10px' }}>
                Selected Groups: {selectionModel.length}{' '}
                {selectionModel.length > 0 && sumOfAll > 0 && (
                  <>
                    Total pricing:{' '}
                    {Object.entries(currencyValues).map(([currency, number]) =>
                      number ? `${currency}: ${number} ` : null,
                    )}
                  </>
                )}
              </Typography>
              {selectionModel.length > 0 ? (
                <>
                  <Button
                    startIcon={<Email />}
                    sx={{ mr: '10px' }}
                    onClick={handleSendProposals}
                  >
                    Send Proposal
                  </Button>
                  <ButtonOutlined
                    onClick={handleOpenRequireAssetModal}
                    sx={{ textTransform: 'none', mr: '10px' }}
                  >
                    Require Asset
                  </ButtonOutlined>
                  <EditGroupsButton setEditModalState={setEditModalState} />
                  <ButtonOutlined
                    onClick={handleClickOpenRemoveModal}
                    sx={{ textTransform: 'none', color: '#dc3545!important' }}
                    startIcon={
                      <DeleteOutline sx={{ color: '#dc3545!important' }} />
                    }
                  >
                    Remove from Campaign
                  </ButtonOutlined>
                </>
              ) : (
                <>
                  <Button
                    startIcon={<People />}
                    sx={{ mr: '10px' }}
                    onClick={handleClickOpen}
                  >
                    Find more communities
                  </Button>
                  <ButtonOutlined
                    startIcon={<Download />}
                    onClick={downloadCommunities}
                    sx={{ textTransform: 'none', mr: '10px' }}
                  >
                    Download as '.xlsx'
                  </ButtonOutlined>
                  <ButtonOutlined
                    startIcon={<Download />}
                    onClick={downloadCampaignAssets}
                    sx={{ textTransform: 'none' }}
                  >
                    Download campaign assets as ‘.xlsx’
                  </ButtonOutlined>
                </>
              )}
            </Box>
            <Box>
              <Filter
                setFilteredCommunities={setFilteredCommunities}
                communities={communities}
                communityManagers={communityManagers}
              />
            </Box>
            <TasksDashboard
              campaign={campaign}
              isCampaignreadyForSendProposal={isCampaignreadyForSendProposal}
            />
          </Box>
          <DataGrid
            sx={{
              mt: '16px',
              background: '#fff',
              '.MuiDataGrid-columnHeaderTitle': {
                fontSize: '13px',
              },
              '.MuiDataGrid-cell': {
                position: 'relative',
              },
              '.MuiDataGrid-cell--editable': {
                cursor: 'pointer',
                '.MuiDataGrid-cellContent': {
                  borderBottom: '1px dashed #3654ff',
                },
              },
            }}
            columns={columns}
            rows={normalizedCommunities.filter((c) =>
              filteredCommunities?.find((fc) => fc.groupId === c.groupId),
            )}
            checkboxSelection
            hideFooter
            disableSelectionOnClick
            rowHeight={32}
            autoHeight
            onSelectionModelChange={(newSelectionModel): void => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            experimentalFeatures={{ newEditingApi: true }}
            isCellEditable={(params): boolean => {
              const {
                field,
                row: { groupTaskStatus },
              } = params;
              if (
                !editableTaskCells.cells.includes(field) &&
                editableTaskCells.status.includes(groupTaskStatus)
              ) {
                return false;
              }
              return true;
            }}
          />
        </>
      ) : (
        <NoSelectedCampaigns openCommunityModal={handleClickOpen} />
      )}
      {isCommunityOpen && (
        <CommunityModal
          handleClose={handleClose}
          normalizedCommunities={normalizedCommunities || []}
          campaign={campaign}
        />
      )}
      {isRequireAssetModalOpen && (
        <RequiereAssetModal
          campaignId={campaign?.campaignId}
          selectionModel={selectionModel as string[]}
          isOpen={isRequireAssetModalOpen}
          setIsRequireAssetModalOpen={setIsRequireAssetModalOpen}
        />
      )}
      {editModalState.isOpen && (
        <EditGroupsModal
          brandId={campaign?.brandId}
          campaignId={campaign?.campaignId}
          communities={communities}
          selectionModel={selectionModel}
          editModalState={editModalState}
          setEditModalState={setEditModalState}
          communityManagers={communityManagers}
        />
      )}
      <RemoveCommunitiesModal
        handleClose={handleCloseRemoveModal}
        campaignId={campaign?.campaignId}
        groupIds={selectionModel as string[]}
        isOpen={isRemoveOpen}
        brandId={campaign?.brandId}
        handleSelection={resetSelection}
        normalizedCommunities={normalizedCommunities || []}
      />

      <ProposalModal
        isOpen={isProposalWindowOpen}
        sendToAllSelected={sendToAllSelected}
        sendToWithoutProposals={sendToWithoutProposals}
        closeModal={handlePropsalClose}
      />
    </>
  );
};
