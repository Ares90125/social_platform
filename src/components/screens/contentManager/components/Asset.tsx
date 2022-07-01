import React, { useState } from 'react';
import moment from 'moment';
import { Box, IconButton } from '@mui/material';
import {
  ContentCopy,
  Check,
  Close,
  Edit,
  Download,
  Upload,
  DeleteOutline,
} from '@mui/icons-material';
import {
  ButtonOutlined,
  IconButton40X40,
  Input,
  MenuDropDown,
} from '../../../form';
import {
  CampaignAsset,
  CampaignAssetItem,
} from '../../../../graphs/getCampaignAssetsByCampaignId';
import styles from '../../../../assests/scss/content-manager.module.scss';
import { UpdateAssetInput } from '../../../../graphs/updateCampaignGroupAssetsByIds';
import {
  UserRole,
  UsersByRolesOutput,
} from '../../../../graphs/getUsersByRoles';

const addresHelper = {
  building: 'Building',
  city_pin: 'City+pin',
  country: 'Country',
  district: 'District',
  name: 'Name',
  street: 'Street',
};

type AssetProps = {
  handleRole: (input: {
    userRole: UserRole | null;
    asset: CampaignAssetItem | null;
  }) => void;
  asset: CampaignAssetItem;
  campaign: CampaignAsset;
  updateGroupAsset: (input: {
    campaignId: string;
    groupId: string;
    input: UpdateAssetInput;
  }) => void;
  openUpdateTextAssetsModal: (info: { id: string; value: string }) => void;
  openRejectModal: (info: CampaignAssetItem) => void;
  openAssignModal: (type: 'copywriter' | 'designer') => void;
  handleDeleteAsset: (itemId: string) => void;
  handleMediaUpload: ({
    event,
    selectedAsset,
    type,
    isCreation,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    selectedAsset?: CampaignAssetItem;
    type: 'image' | 'video';
    isCreation?: boolean;
  }) => Promise<void>;
  userRoles?: UsersByRolesOutput;
};

export const Asset: React.FC<AssetProps> = ({
  asset,
  campaign,
  openRejectModal,
  updateGroupAsset,
  openUpdateTextAssetsModal,
  handleDeleteAsset,
  handleMediaUpload,
  userRoles,
  openAssignModal,
  handleRole,
}) => {
  const address: { [key: string]: string } | null =
    asset.type === 'address' ? JSON.parse(asset.value) : null;
  const [isAddresEditing, setIsAddresEditing] = useState(false);
  const [addresValues, setAddresValues] = useState(
    address ? { ...address } : {},
  );

  const handleValueChange = (role: UserRole): void => {
    handleRole({ userRole: role, asset });
  };

  const handleApprove = (approvedAsset: CampaignAssetItem): void => {
    if (!campaign?.campaignId || !campaign?.groupId) return;

    updateGroupAsset({
      campaignId: campaign.campaignId,
      groupId: campaign.groupId,
      input: {
        assignedContentUserId:
          approvedAsset?.assignedContentUserId || undefined,
        id: approvedAsset.id,
        rejectReason: approvedAsset?.rejectReason || '',
        status: 'Approved',
        value: approvedAsset.value,
      },
    });
  };

  const onDownload = (imageUrl: string): void => {
    const headers = new Headers();
    headers.append('crossDomain', 'true');
    headers.append('dataType', 'jsonp');
    fetch(imageUrl, { method: 'GET', headers })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = imageUrl;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((err) => {
        console.error('err: ', err);
      });
  };

  const getUserRole = (id: string | null): string | null => {
    if (!id) return null;

    if (asset.type === 'text' && userRoles?.copywriter) {
      return userRoles.copywriter.filter(
        (cw) => cw.id === asset.assignedContentUserId,
      )[0].fullname;
    }

    if (
      (asset.type === 'video' || asset.type === 'image') &&
      userRoles?.designer
    ) {
      return userRoles.designer.filter(
        (cw) => cw.id === asset.assignedContentUserId,
      )[0].fullname;
    }

    return null;
  };

  const handleStartEditAdress = (): void => {
    setIsAddresEditing(true);
  };

  const handleChangeAdress = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowName: string,
  ): void => {
    setAddresValues({ ...addresValues, [rowName]: event.target.value });
  };

  const handleUpdateAddress = (updatedAsset: CampaignAssetItem): void => {
    updateGroupAsset({
      campaignId: campaign.campaignId,
      groupId: campaign.groupId,
      input: {
        assignedContentUserId: null,
        id: updatedAsset.id,
        status: 'PendingApproval',
        value: JSON.stringify(addresValues),
      },
    });
    setIsAddresEditing(false);
  };

  return (
    <Box key={asset.id}>
      <div className={styles.campaign_asset_container}>
        <div className={styles.assets_actions_wrapper}>
          {asset.type === 'text' && (
            <>
              <IconButton40X40
                onClick={(): void => {
                  navigator?.clipboard?.writeText(asset.value);
                }}
              >
                <ContentCopy />
              </IconButton40X40>
              <IconButton40X40
                disabled={campaign.status === 'Done'}
                onClick={(): void => {
                  openUpdateTextAssetsModal({
                    id: asset.id,
                    value: asset.value,
                  });
                }}
              >
                <Edit />
              </IconButton40X40>
              {userRoles?.copywriter?.length && (
                <MenuDropDown
                  disabled={campaign.status === 'Done'}
                  buttonText={
                    getUserRole(asset.assignedContentUserId) ||
                    'Assign Copywriter'
                  }
                  menuItems={userRoles.copywriter}
                  onChange={openAssignModal}
                  modalType="copywriter"
                  handleValueChange={handleValueChange}
                />
              )}
            </>
          )}
          {asset.type === 'image' && (
            <>
              <IconButton40X40 onClick={(): void => onDownload(asset.value)}>
                <Download />
              </IconButton40X40>
              <label
                htmlFor={`upload-image-${asset.id}`}
                style={{ cursor: 'pointer' }}
              >
                <IconButton40X40
                  disabled={campaign.status === 'Done'}
                  sx={{ pointerEvents: 'none' }}
                >
                  <Upload />
                </IconButton40X40>
              </label>
              <input
                id={`upload-image-${asset.id}`}
                type="file"
                style={{ display: 'none' }}
                title=" "
                accept="image/*"
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void => {
                  handleMediaUpload({
                    event,
                    type: 'image',
                    selectedAsset: asset,
                  });
                }}
              />
              {userRoles?.designer?.length && (
                <MenuDropDown
                  disabled={campaign.status === 'Done'}
                  buttonText={
                    getUserRole(asset.assignedContentUserId) ||
                    'Assign Designer'
                  }
                  menuItems={userRoles.designer}
                  onChange={openAssignModal}
                  modalType="designer"
                  handleValueChange={handleValueChange}
                />
              )}
            </>
          )}
          {asset.type === 'video' && (
            <>
              <label
                htmlFor={`upload-video-${asset.id}`}
                style={{ cursor: 'pointer' }}
              >
                <IconButton40X40
                  disabled={campaign.status === 'Done'}
                  sx={{ pointerEvents: 'none' }}
                >
                  <Upload />
                </IconButton40X40>
              </label>
              <input
                id={`upload-video-${asset.id}`}
                type="file"
                style={{ display: 'none' }}
                title=" "
                accept="video/*"
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void => {
                  handleMediaUpload({
                    event,
                    type: 'video',
                    selectedAsset: asset,
                  });
                }}
              />
              {userRoles?.designer?.length && (
                <MenuDropDown
                  disabled={campaign.status === 'Done'}
                  buttonText={
                    getUserRole(asset.assignedContentUserId) ||
                    'Assign Designer'
                  }
                  menuItems={userRoles.designer}
                  onChange={openAssignModal}
                  modalType="designer"
                  handleValueChange={handleValueChange}
                />
              )}
            </>
          )}
          {asset.type === 'address' && (
            <IconButton40X40
              disabled={campaign.status === 'Done'}
              onClick={(): void => {
                isAddresEditing
                  ? handleUpdateAddress(asset)
                  : handleStartEditAdress();
              }}
            >
              {isAddresEditing ? (
                <Check
                  sx={{
                    color: '#12c457',
                  }}
                />
              ) : (
                <Edit />
              )}
            </IconButton40X40>
          )}
        </div>
        <div
          className={`${styles.campaign_editor} ${
            asset.type === 'video' ? styles.campaign_editor_noPadding : ''
          }`}
        >
          {asset.type === 'text' && asset.value}
          {asset.type === 'image' && (
            <>
              <img
                src={asset.value}
                alt={asset.id}
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              {campaign.status !== 'Done' && (
                <IconButton
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                  }}
                  onClick={(): void => {
                    handleDeleteAsset(asset.id);
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              )}
            </>
          )}
          {asset.type === 'video' && (
            <>
              <video controls height="296" width="336" key={asset.value}>
                <track kind="captions" />
                <source src={asset.value} />
              </video>
              <IconButton
                color="primary"
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 10,
                }}
                onClick={(): void => {
                  handleDeleteAsset(asset.id);
                }}
              >
                <DeleteOutline />
              </IconButton>
            </>
          )}
          {asset.type === 'address' &&
            address &&
            Object.entries(address).map(([rowName, value]) =>
              isAddresEditing ? (
                <Input
                  key={rowName}
                  value={addresValues[rowName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    handleChangeAdress(e, rowName);
                  }}
                  size="small"
                  sxInput={{
                    width: '100%',
                    height: '40px',
                    mb: '5px',
                  }}
                />
              ) : (
                <Box
                  key={rowName}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 8px 12px 12px',
                    width: '100%',
                    height: '40px',
                    background: '#ebebed',
                    borderRadius: '4px',
                    border: 'none',
                    '&:not(:last-child)': {
                      mb: '5px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      color: '#33334f',
                      fontSize: '16px',
                    }}
                  >
                    {value}
                  </Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#707084',
                    }}
                  >
                    {addresHelper[rowName] || rowName}
                  </Box>
                </Box>
              ),
            )}
        </div>
      </div>
      <div className={styles.campaign_assets_footer}>
        {asset.updatedAtInSeconds && !asset.updatedByContentTeam && (
          <h6>
            updated&nbsp;
            {moment(asset.updatedAtInSeconds * 1000).format(
              'd MMM yyyy hh:mm:ss a',
            )}
          </h6>
        )}
        {asset.updatedAtInSeconds && asset.updatedByContentTeam && (
          <h6>
            updated by content team&nbsp;
            {moment(asset.updatedAtInSeconds * 1000).format(
              'd MMM yyyy hh:mm:ss a',
            )}
          </h6>
        )}
        {asset.status === 'Approved' && (
          <Box
            sx={{
              background: '#fff',
              border: '1px solid #e0e0e5',
              borderRadius: '4px',
              width: '112px',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              m: '0 0 0 auto',
              cursor: 'default',
            }}
          >
            <Check
              sx={{
                color: '#12c457',
                fontSize: 20,
                marginRight: '4px',
              }}
            />
            <span>Approved</span>
          </Box>
        )}
        {asset.status === 'Declined' && (
          <div
            style={{
              color: '#eb5757',
              fontSize: '12px',
              textAlign: 'right',
            }}
          >
            REJECTED • Notification was sent to Group Admin
          </div>
        )}
        {(asset.status === 'PendingApproval' || asset.status === 'Empty') && (
          <div className={styles.campaign_action}>
            <ButtonOutlined
              onClick={(): void => {
                openRejectModal(asset);
              }}
            >
              <Close
                sx={{
                  color: '#eb5757',
                  fontSize: 20,
                  marginRight: '4px',
                }}
              />
              <span>Reject</span>
            </ButtonOutlined>
            <ButtonOutlined
              onClick={(): void => {
                handleApprove(asset);
              }}
            >
              <Check
                sx={{
                  color: '#12c457',
                  fontSize: 20,
                  marginRight: '4px',
                }}
              />
              <span>Approve</span>
            </ButtonOutlined>
          </div>
        )}
      </div>
    </Box>
  );
};
