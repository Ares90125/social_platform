import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PostAdd, AddPhotoAlternate, Add, Star } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { SecondaryButton, Button, Spinner } from '../../../form';
import {
  RequireAssets,
  RateFbAdmin,
  AddTextAssets,
  UpdateTextAssets,
  AssignRole,
} from '.';
import { CMCNotification } from '../../../../graphs/getCMCNotifications';
import styles from '../../../../assests/scss/content-manager.module.scss';
import {
  CampaignAssetItem,
  getCampaignGroupAssetsByIds,
} from '../../../../graphs/getCampaignGroupAssetsByIds';
import { createTaskForCampaignGroupAsset } from '../../../../graphs/createTaskForCampaignGroupAsset';
import {
  CampaignAsset,
  CreateAssetInput,
  createCampaignGroupAsset,
} from '../../../../graphs/createCampaignGroupAsset';
import {
  UpdateAssetInput,
  updateCampaignGroupAssetsByIds,
} from '../../../../graphs/updateCampaignGroupAssetsByIds';
import { RejectModal } from './RejectModal';
import { getCookieByName } from '../../../../utils/helpers/cookies';
import { deleteCampaignGroupAsset } from '../../../../graphs/deleteCampaignGroupAsset';
import { getUsersByRoles, UserRole } from '../../../../graphs/getUsersByRoles';
import { Asset } from './Asset';
import { uploadContentManagerMediaUrl } from '../../../../utils/contants/media-upload';
import { useToast } from '../../../../context/toast';

type CampaignGroupProps = {
  selectedNotification: CMCNotification;
  defaultAsset?: CampaignAsset;
  trigger: boolean;
  handleRefetchAssetsKpis: () => void;
  handleSelectNotivication: (notification: CMCNotification) => void;
};

const CampaignGroupComponent: React.FC<CampaignGroupProps> = ({
  selectedNotification,
  defaultAsset,
  trigger,
  handleRefetchAssetsKpis,
  handleSelectNotivication,
}) => {
  const { setErrorToast, setSuccessToast } = useToast();

  const [campaignAsset, setCampaignAsset] = useState<CampaignAsset | undefined>(
    defaultAsset,
  );
  const [open, setOpen] = useState(false);
  const [openRateFB, setOpenRateFB] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openAssignRole, setOpenAssignRole] = useState(false);
  const [assignModalType, setAssignModalType] = useState<
    '' | 'copywriter' | 'designer'
  >('');
  const [textAssetInfo, setTextAssetInfo] = useState<{
    id: string;
    value: string;
  }>({} as { id: string; value: string });
  const [rejectedAsset, setRejectedAsset] = useState<CampaignAssetItem>(
    {} as CampaignAssetItem,
  );
  const [selectedRole, setSelectedRole] = useState<{
    userRole: UserRole | null;
    asset: CampaignAssetItem | null;
  }>({ userRole: null, asset: null });
  const [openTextAssets, setOpenTextAssets] = useState(false);
  const [openUpdateTextAssets, setUpdateOpenTextAssets] = useState(false);
  const { isLoading: isLoadingCampaignAsset, refetch: refetchCampaignAsset } =
    useQuery(
      ['campaign-asset', selectedNotification],
      ({ queryKey: [, notification] }) => {
        if (
          notification !== null &&
          typeof notification === 'object' &&
          notification.campaignId &&
          notification.groupId
        ) {
          handleRefetchAssetsKpis();
          return getCampaignGroupAssetsByIds(
            notification.campaignId,
            notification.groupId,
          );
        }

        if (
          campaignAsset &&
          campaignAsset.campaignId &&
          campaignAsset.groupId
        ) {
          handleRefetchAssetsKpis();
          return getCampaignGroupAssetsByIds(
            campaignAsset.campaignId,
            campaignAsset.groupId,
          );
        }

        return undefined;
      },
      {
        enabled: !!selectedNotification?.id,
        onSuccess: (data) => {
          setCampaignAsset(data);
        },
      },
    );

  const { data: userRoles } = useQuery('user-roles', getUsersByRoles);

  const createGroupAssetMutation = useMutation(
    (data: { campaignId: string; groupId: string; input: CreateAssetInput }) =>
      createCampaignGroupAsset(data),
    {
      onSuccess: () => {
        refetchCampaignAsset();
        setSuccessToast();
      },
      onError: setErrorToast,
    },
  );

  const updateGroupAssetMutation = useMutation(
    (data: { campaignId: string; groupId: string; input: UpdateAssetInput }) =>
      updateCampaignGroupAssetsByIds(data),
    {
      onSuccess: () => {
        refetchCampaignAsset();
        setSuccessToast();
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const deleteGroupAssetMutation = useMutation(
    (data: { campaignId: string; groupId: string; itemId: string }) =>
      deleteCampaignGroupAsset(data),
    {
      onSuccess: () => {
        refetchCampaignAsset();
        setSuccessToast('Successfully deleted');
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const createTaskMutation = useMutation(
    (data: { campaignId: string; groupId: string }) =>
      createTaskForCampaignGroupAsset(data),
    {
      onSuccess: () => {
        refetchCampaignAsset();
        setSuccessToast('Task was created');
      },
      onError: () => {},
    },
  );

  const handlePreviousCampaign = (): void => {
    if (defaultAsset) {
      handleSelectNotivication({} as CMCNotification);
      setCampaignAsset({ ...defaultAsset });
    }
  };

  const openAssignRoleModal = (type: 'copywriter' | 'designer'): void => {
    setOpenAssignRole(true);
    setAssignModalType(type);
  };
  const closeAssignRoleModal = (): void => {
    setOpenAssignRole(false);
    setAssignModalType('');
  };

  const openRequireAssetsModal = (): void => {
    setOpen(true);
  };
  const closeRequireAssetsModal = (): void => {
    setOpen(false);
  };

  const openRateFbAdmin = (): void => {
    setOpenRateFB(true);
  };
  const closeRateFbAdmin = (): void => {
    setOpenRateFB(false);
  };

  const openTextAssetsModal = (): void => {
    setOpenTextAssets(true);
  };
  const closeTextAssetsModal = (): void => {
    setOpenTextAssets(false);
  };

  const openRejectModal = (info: CampaignAssetItem): void => {
    setRejectedAsset(info);
    setOpenReject(true);
  };
  const closeRejectModal = (): void => {
    setRejectedAsset({} as CampaignAssetItem);
    setOpenReject(false);
  };

  const openUpdateTextAssetsModal = (info: {
    id: string;
    value: string;
  }): void => {
    setTextAssetInfo(info);
    setUpdateOpenTextAssets(true);
  };
  const closeUpdateTextAssetsModal = (): void => {
    setTextAssetInfo({} as { id: string; value: string });
    setUpdateOpenTextAssets(false);
  };

  const handleCreateTask = (): void => {
    if (campaignAsset?.campaignId && campaignAsset?.groupId) {
      createTaskMutation.mutate({
        campaignId: campaignAsset.campaignId,
        groupId: campaignAsset.groupId,
      });
    }
  };

  const handleRefetchCampaignAsset = (): void => {
    refetchCampaignAsset();
  };

  const handleDeleteAsset = (itemId: string): void => {
    if (!campaignAsset?.campaignId || !campaignAsset?.groupId || !itemId) {
      return;
    }

    deleteGroupAssetMutation.mutate({
      campaignId: campaignAsset.campaignId,
      groupId: campaignAsset.groupId,
      itemId,
    });
  };

  const updateGroupAsset = (input: {
    campaignId: string;
    groupId: string;
    input: UpdateAssetInput;
  }): void => {
    updateGroupAssetMutation.mutate(input);
  };

  const createGroupAsset = (input: {
    campaignId: string;
    groupId: string;
    input: CreateAssetInput;
  }): void => {
    createGroupAssetMutation.mutate(input);
  };

  const handleMediaUpload = async ({
    event,
    selectedAsset,
    type,
    isCreation,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    selectedAsset?: CampaignAssetItem;
    type: 'image' | 'video';
    isCreation?: boolean;
  }): Promise<void> => {
    const userToken = getCookieByName('token');
    const file = event.target?.files?.[0];
    const fileReader = new FileReader();

    if (
      !file ||
      !campaignAsset?.campaignId ||
      !campaignAsset?.groupId ||
      !userToken
    ) {
      return;
    }

    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async function (): Promise<void> {
      const signedUrls = await axios({
        method: 'put',
        data: { type },
        url: uploadContentManagerMediaUrl,
        headers: {
          authorization: userToken,
        },
      }).then((response) => response.data);

      await axios({
        method: 'put',
        url: signedUrls.signedUrl,
        data: fileReader.result,
        headers:
          type === 'image'
            ? { 'Content-Type': 'image/png' }
            : { 'Content-Type': 'video/mp4' },
      });

      if (isCreation) {
        createGroupAsset({
          campaignId: campaignAsset.campaignId,
          groupId: campaignAsset.groupId,
          input: {
            status: selectedAsset?.status || 'PendingApproval',
            value: signedUrls.cloudfrontUrl,
            type,
          },
        });

        return;
      }

      if (!selectedAsset) return;

      const preparedAssetItem: UpdateAssetInput = {
        id: selectedAsset.id,
        status: 'PendingApproval',
        value: signedUrls.cloudfrontUrl,
        rejectReason: selectedAsset.rejectReason,
        assignedContentUserId: selectedAsset.assignedContentUserId,
      };

      updateGroupAsset({
        campaignId: campaignAsset.campaignId,
        groupId: campaignAsset.groupId,
        input: preparedAssetItem,
      });
    };
  };

  const handleRole = (role: {
    userRole: UserRole | null;
    asset: CampaignAssetItem | null;
  }): void => {
    setSelectedRole(role);
  };

  useEffect(() => {
    setCampaignAsset(defaultAsset);
  }, [defaultAsset]);

  useEffect(() => {
    refetchCampaignAsset();
  }, [trigger]);

  if (isLoadingCampaignAsset) {
    return <Spinner spinnerWrapperProps={{ style: { marginTop: '30vh' } }} />;
  }

  return campaignAsset ? (
    <div className={styles.campaign_group_wrap}>
      <div className={styles.campaign_heading}>
        <div className={styles.campaign_info_block}>
          <div className={styles.campaign_info_block_inner_container}>
            <span className={styles.campaign_info_block_title}>
              {campaignAsset.brandName}
            </span>
            <span className={styles.campaign_info_block_subtitle}>
              {campaignAsset.campaignName} • {campaignAsset.groupName}
            </span>
          </div>
        </div>

        <SecondaryButton
          disabled={campaignAsset.status === 'Done'}
          onClick={openRequireAssetsModal}
        >
          Require asset
        </SecondaryButton>
        {campaignAsset.status === 'Done' ? (
          <SecondaryButton disabled>
            <span>Task created</span>
          </SecondaryButton>
        ) : (
          <SecondaryButton
            disabled={campaignAsset.status !== 'PendingCopiesAssets'}
            onClick={handleCreateTask}
          >
            {campaignAsset.status !== 'PendingCopiesAssets' && (
              <Add fontSize="small" />
            )}
            <span>
              {campaignAsset.status !== 'PendingCopiesAssets'
                ? 'Created'
                : 'Create task'}
            </span>
          </SecondaryButton>
        )}

        {!campaignAsset.rating ? (
          <SecondaryButton onClick={openRateFbAdmin}>
            Rate fb admin
          </SecondaryButton>
        ) : (
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Star sx={{ color: '#27ae60 ' }} />
            <strong>{campaignAsset.rating}</strong>&nbsp;Fb admin rating
          </Box>
        )}

        {Object.keys(selectedNotification).length > 0 && (
          <Button onClick={handlePreviousCampaign}>Previous campaign</Button>
        )}
      </div>

      <div className={styles.campaign_assets_wrapper}>
        <div className={styles.campaign_assets_body_wrap}>
          <div className={styles.campaign_assets_body}>
            {campaignAsset.items?.map((asset) => (
              <Asset
                asset={asset}
                key={asset.id}
                userRoles={userRoles}
                handleRole={handleRole}
                campaign={campaignAsset}
                openRejectModal={openRejectModal}
                openAssignModal={openAssignRoleModal}
                updateGroupAsset={updateGroupAsset}
                handleDeleteAsset={handleDeleteAsset}
                handleMediaUpload={handleMediaUpload}
                openUpdateTextAssetsModal={openUpdateTextAssetsModal}
              />
            ))}
            {campaignAsset.status !== 'Done' && (
              <>
                <div
                  className={`${styles.campaign_asset_container} ${styles.edit_container}`}
                >
                  <div
                    className={styles.campaign_asset}
                    onClick={openTextAssetsModal}
                  >
                    <PostAdd sx={{ fontSize: 60 }} />
                    <span>Add text asset</span>
                  </div>
                </div>
                <div
                  className={`${styles.campaign_asset_container} ${styles.edit_container}`}
                >
                  <div className={styles.campaign_asset}>
                    <AddPhotoAlternate sx={{ fontSize: 60 }} />
                    <span>Add image asset</span>
                    <input
                      type="file"
                      className="custom-inputFile-invisible"
                      title=" "
                      accept="image/*"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ): void => {
                        handleMediaUpload({
                          event,
                          type: 'image',
                          isCreation: true,
                        });
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`${styles.campaign_asset_container} ${styles.edit_container}`}
                >
                  <div className={styles.campaign_asset}>
                    <AddPhotoAlternate sx={{ fontSize: 60 }} />
                    <span>Add video asset</span>
                    <input
                      type="file"
                      className="custom-inputFile-invisible"
                      title=" "
                      accept="video/*"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ): void => {
                        handleMediaUpload({
                          event,
                          type: 'video',
                          isCreation: true,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <RequireAssets
        open={open}
        groupId={campaignAsset.groupId}
        campaignId={campaignAsset.campaignId}
        closeRequireAssetsModal={closeRequireAssetsModal}
      />

      <RateFbAdmin
        openRateFB={openRateFB}
        groupId={campaignAsset.groupId}
        campaignId={campaignAsset.campaignId}
        closeRateFbAdmin={closeRateFbAdmin}
        handleRefetchCampaignAsset={handleRefetchCampaignAsset}
      />

      <AddTextAssets
        campaignAsset={campaignAsset}
        openTextAssets={openTextAssets}
        refetchCampaignAsset={refetchCampaignAsset}
        closeTextAssetsModal={closeTextAssetsModal}
      />

      <UpdateTextAssets
        id={textAssetInfo.id}
        campaignAsset={campaignAsset}
        defaultValue={textAssetInfo.value}
        openTextAssets={openUpdateTextAssets}
        refetchCampaignAsset={refetchCampaignAsset}
        closeTextAssetsModal={closeUpdateTextAssetsModal}
      />

      <RejectModal
        asset={rejectedAsset}
        campaignAsset={campaignAsset}
        openTextAssets={openReject}
        refetchCampaignAsset={refetchCampaignAsset}
        closeModal={closeRejectModal}
      />

      <AssignRole
        open={openAssignRole}
        type={assignModalType}
        campaignAsset={campaignAsset}
        updateGroupAsset={updateGroupAsset}
        closeModal={closeAssignRoleModal}
        selectedRole={selectedRole}
      />
    </div>
  ) : null;
};

const arePropsEqual = (
  prevProps: CampaignGroupProps,
  nextProps: CampaignGroupProps,
): boolean =>
  prevProps.selectedNotification.id === nextProps.selectedNotification.id &&
  prevProps.defaultAsset?.campaignId === nextProps.defaultAsset?.campaignId &&
  prevProps.trigger === nextProps.trigger;

export const CampaignGroup = React.memo(CampaignGroupComponent, arePropsEqual);
