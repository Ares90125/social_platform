import React, { useState } from 'react';
import moment from 'moment';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
} from '@mui/x-data-grid';
import { People, Download, DeleteOutline } from '@mui/icons-material';
import Image from 'next/image';
import { Button, ButtonOutlined } from '../../../../form';
import { CommunityModal } from '../../../../modals/community/CommunityModal';
import { NoSelectedCampaigns } from '../noSelectedCampaigns/NoSelectedCampaigns';
import {
  CampaignGroupAndTaskDetails,
  MetaColumns,
  NormalizedCommunity,
} from '../../../../../graphs/listCampaignGroupsAndTasksDetails';
import { shortNumber } from '../../../../../utils/helpers/short-number';
import { downloadCommunitiesExcel } from '../../../../../graphs/downloadCommunitiesExcel';
import { CampaignInputs } from '../detailsTab/campaign.types';
import { RemoveCommunitiesModal } from '../../../../modals/community/components/RemoveCommunitiesModal';

type SelectionTabProps = {
  communities?: CampaignGroupAndTaskDetails[];
  campaign?: CampaignInputs;
};

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
    sortable: false,
  },
  { field: 'convertedMemberCount', headerName: 'Members', width: 90 },
  {
    field: 'campaignPostEngagementRateLastNinetyDays',
    headerName: 'Campaign Engagement',
    width: 180,
  },
  {
    field: 'postsEngagementRateLastNinetyDays',
    headerName: 'Post Engagement',
    width: 130,
  },
  { field: 'state', headerName: 'Group State', width: 120, sortable: false },
  {
    field: 'groupInstallationStartedAtUTC',
    headerName: 'Installed Date',
    width: 110,
    sortable: false,
  },
  {
    field: 'businessCategory',
    headerName: 'Business Category',
    width: 200,
    sortable: false,
  },
  {
    field: 'categoryDensity',
    headerName: 'Category Density',
    width: 130,
    sortable: false,
  },
  { field: 'country', headerName: 'Country', width: 70, sortable: false },
  { field: 'region', headerName: 'Region', width: 70, sortable: false },
  {
    field: 'isMonetized',
    headerName: 'Is Monetized',
    width: 100,
    sortable: false,
  },
  {
    field: 'isMonetizable',
    headerName: 'Is Monetizable',
    width: 110,
    sortable: false,
  },
  {
    field: 'topTenCities',
    headerName: 'Top Ten Cities',
    width: 110,
    sortable: false,
  },
  {
    field: 'isAnyCampaignTaskToBePerformedThisMonth',
    headerName: 'Is Any Campaign Task To Be Performed This Month',
    width: 350,
    sortable: false,
  },
  {
    field: 'averageActiveMember',
    headerName: 'Average Active Member',
    width: 180,
    sortable: false,
  },
  {
    field: 'averageTopPostsReach',
    headerName: 'Average Top Posts Reach',
    width: 180,
    sortable: false,
  },
];

export const SelectionTab: React.FC<SelectionTabProps> = ({
  communities,
  campaign,
}) => {
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const normalizedCommunities: NormalizedCommunity[] | undefined =
    communities?.map((community) => {
      const {
        memberCount,
        campaignPostEngagementRateLastNinetyDays,
        postsEngagementRateLastNinetyDays,
        state,
        groupInstallationStartedAtUTC,
        businessCategory,
        categoryDensity,
        topTenCities,
        averageTopPostsReach,
        metadata,
        groupId,
        fbGroupId,
      } = community;
      const {
        country,
        region,
        isMonetizable,
        isMonetized,
        isAnyCampaignTaskToBePerformedThisMonth,
        averageActiveMember,
      }: MetaColumns = metadata ? JSON.parse(metadata) : {};
      const convertedMemberCount = memberCount ? shortNumber(memberCount) : '0';

      return {
        ...community,
        id: groupId,
        convertedMemberCount,
        memberCount,
        campaignPostEngagementRateLastNinetyDays:
          campaignPostEngagementRateLastNinetyDays || '-',
        postsEngagementRateLastNinetyDays:
          postsEngagementRateLastNinetyDays || '-',
        state: state || '-',
        groupInstallationStartedAtUTC: moment(
          groupInstallationStartedAtUTC,
        ).format('d MMM yyyy'),
        businessCategory: businessCategory || '-',
        categoryDensity: categoryDensity || '-',
        country: country || '-',
        region: region || '-',
        isMonetized: isMonetized || '-',
        isMonetizable: isMonetizable || '-',
        topTenCities: topTenCities || '-',
        isAnyCampaignTaskToBePerformedThisMonth:
          isAnyCampaignTaskToBePerformedThisMonth || '-',
        averageActiveMember: averageActiveMember || '-',
        averageTopPostsReach: averageTopPostsReach || '-',
        linkToFb: fbGroupId
          ? `https://www.facebook.com/groups/${fbGroupId}`
          : '',
      };
    });

  const downloadCommunities = async (): Promise<void> => {
    if (!campaign?.campaignId) return;

    const result = await downloadCommunitiesExcel(campaign.campaignId);
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

  const resetSelection = (): void => {
    setSelectionModel([]);
  };

  return (
    <>
      {normalizedCommunities?.length ? (
        <>
          <Box>
            {selectionModel.length > 0 ? (
              <ButtonOutlined
                onClick={handleClickOpenRemoveModal}
                sx={{ textTransform: 'none' }}
                startIcon={<DeleteOutline />}
                color="error"
              >
                Remove from Campaign
              </ButtonOutlined>
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
                  sx={{ textTransform: 'none' }}
                >
                  Download as '.xlsx'
                </ButtonOutlined>
              </>
            )}
          </Box>
          <DataGrid
            sx={{ mt: '16px', background: '#fff' }}
            columns={columns}
            rows={normalizedCommunities}
            checkboxSelection
            hideFooter
            disableSelectionOnClick
            rowHeight={32}
            autoHeight
            onSelectionModelChange={(newSelectionModel): void => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
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
      <RemoveCommunitiesModal
        handleClose={handleCloseRemoveModal}
        campaignId={campaign?.campaignId}
        groupIds={selectionModel as string[]}
        isOpen={isRemoveOpen}
        brandId={campaign?.brandId}
        handleSelection={resetSelection}
        normalizedCommunities={normalizedCommunities || []}
      />
    </>
  );
};
