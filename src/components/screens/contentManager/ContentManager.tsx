import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Download as DownloadIcon } from '@mui/icons-material';
import { getAllBrands } from '../../../graphs/brands';
import { CampaignGroup } from './components/CampaignGroup';
import { Notifications } from './components/Notifications';
import { getAllCampaigns } from '../../../graphs/campaigns';
import { BrandSchema } from '../../../api/Brand/BrandSchema';
import { ComboBox, ButtonOutlined, Button } from '../../form';
import styles from '../../../assests/scss/content-manager.module.scss';
import { CampaignInputs } from '../campaign/components/detailsTab/campaign.types';
import { getCampaignGroupAssetKpis } from '../../../graphs/getCampaignGroupAssetKpis';
import {
  CampaignAsset,
  getCampaignAssetsByCampaignId,
} from '../../../graphs/getCampaignAssetsByCampaignId';
import { downloadCampaignGroupAssetsExcel } from '../../../graphs/downloadCampaignGroupAssetsExcel';
import { CMCNotification } from '../../../graphs/getCMCNotifications';
import { useToast } from '../../../context/toast';

export const ContentManagerScreen: React.FC = () => {
  const { setErrorToast } = useToast();

  const router = useRouter();
  const [trigger, setTrigger] = useState(false);
  const [filter, setFilter] = useState('All');
  const [defaultAsset, setDefaultAsset] = useState<
    CampaignAsset[] | undefined
  >();
  const [selectedNotification, setSelectedNotification] =
    useState<CMCNotification>({} as CMCNotification);
  const [allBrands, setAllBrands] = useState<BrandSchema[]>([]);
  const [allCampaigns, setAllCampaigns] = useState<CampaignInputs[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandSchema>(
    {} as BrandSchema,
  );
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignInputs>(
    {} as CampaignInputs,
  );

  const { isLoading: isLoadingBrands } = useQuery('brands', getAllBrands, {
    onSuccess: (data) => {
      const filtredBrands = data.filter((brand) => brand);

      setAllBrands([...filtredBrands]);

      if (router?.query?.id) {
        setSelectedBrand(
          filtredBrands?.filter((brand) => brand.id === router.query.id)?.[0] ||
            filtredBrands?.[0] ||
            {},
        );

        return;
      }

      setSelectedBrand(filtredBrands?.[0] || {});
    },
    onError: () => {
      setErrorToast();
    },
  });

  const { isLoading: isLoadingCampaigns } = useQuery(
    `brand-${selectedBrand?.id}`,
    () => getAllCampaigns(selectedBrand?.id),
    {
      enabled: !!selectedBrand?.id,
      onSuccess: (data) => {
        const filtredCampaigns = data.filter((campaign) => campaign);

        setAllCampaigns([...filtredCampaigns]);
        setSelectedNotification({} as CMCNotification);

        if (router?.query?.campaignId) {
          setSelectedCampaign(
            filtredCampaigns?.filter(
              (campaign) => campaign.campaignId === router.query.campaignId,
            )?.[0] ||
              filtredCampaigns?.[0] ||
              {},
          );

          return;
        }

        setSelectedCampaign(filtredCampaigns?.[0] || {});
      },
      onError: () => {
        setErrorToast();
      },
    },
  );

  const { data: assetsKpis, refetch: refetchAssetsKpis } = useQuery(
    `assets-kpi-${selectedCampaign?.campaignId}`,
    () => getCampaignGroupAssetKpis(selectedCampaign?.campaignId),
    {
      enabled: !!selectedCampaign?.campaignId,
      retry: false,
    },
  );

  const {
    data: assets,
    refetch: refetchAssests,
    isLoading: isLoadingAssets,
  } = useQuery(
    `assets-${selectedCampaign?.campaignId}`,
    () => getCampaignAssetsByCampaignId(selectedCampaign?.campaignId),
    {
      enabled: !!selectedCampaign?.campaignId,
      retry: false,
      onSuccess: (data) => {
        setDefaultAsset(data);
        setSelectedNotification({} as CMCNotification);
      },
      onError: () => {
        setDefaultAsset(undefined);
        setSelectedNotification({} as CMCNotification);
      },
    },
  );

  const handleBrandChange = (newValue: BrandSchema): void => {
    setSelectedBrand(newValue);
  };

  const handleCampaignChange = (newValue: CampaignInputs): void => {
    setSelectedCampaign(newValue);
  };

  const downloadCampaignAssets = async (): Promise<void> => {
    if (!selectedCampaign?.campaignId) return;

    try {
      const result = await downloadCampaignGroupAssetsExcel(
        selectedCampaign.campaignId,
      );
      window.open(result.url);
    } catch (e) {
      console.log(e);
    }
  };

  const handleResetAssets = (): void => {
    refetchAssests();
    setTrigger(!trigger);
  };

  const handleSelectNotivication = (notification: CMCNotification): void => {
    setSelectedNotification(notification);
  };

  const filterCampaignAssets = (newFilter: string): void => {
    let result: CampaignAsset[] | undefined;

    switch (newFilter) {
      case 'Approved':
        result =
          assets?.filter((campaignAsset) => {
            if (campaignAsset.items) {
              const filteredItems = campaignAsset.items.filter(
                (item) => item.status === newFilter,
              );
              if (filteredItems.length === campaignAsset.items.length) {
                return {
                  ...campaignAsset,
                  subElements: campaignAsset.items.filter(
                    (item) => item.status === newFilter,
                  ),
                };
              }
            }

            return false;
          }) || undefined;
        break;
      case 'PendingApproval':
        result =
          assets?.filter((campaignAsset) => {
            if (campaignAsset.items) {
              const filteredItems = campaignAsset.items.filter(
                (item) => item.status === newFilter,
              );
              if (filteredItems.length) {
                return {
                  ...campaignAsset,
                  subElements: campaignAsset.items.filter(
                    (item) => item.status === newFilter,
                  ),
                };
              }
            }

            return false;
          }) || undefined;
        break;
      case 'Declined':
        result =
          assets?.filter((campaignAsset) => {
            if (campaignAsset.items) {
              const filteredItems = campaignAsset.items.filter(
                (item) => item.status === newFilter,
              );
              if (filteredItems.length) {
                return {
                  ...campaignAsset,
                  subElements: campaignAsset.items.filter(
                    (item) => item.status === newFilter,
                  ),
                };
              }
            }
            return false;
          }) || undefined;

        break;
      case 'NotSubmitted':
        result =
          assets?.filter((campaignAsset) => {
            if (!campaignAsset.items) {
              return campaignAsset;
            }

            return false;
          }) || undefined;

        break;
      case 'Edit':
        result =
          assets?.filter((campaignAsset) => {
            if (campaignAsset.items) {
              const filteredItems = campaignAsset.items.filter(
                (item) => item.updatedByContentTeam,
              );
              if (filteredItems.length) {
                return {
                  ...campaignAsset,
                  subElements: campaignAsset.items.filter(
                    (item) => item.updatedByContentTeam,
                  ),
                };
              }
            }

            return false;
          }) || undefined;
        break;
      case 'Not edit':
        result =
          assets?.filter((campaignAsset) => {
            if (campaignAsset.items) {
              const filteredItems = campaignAsset.items.filter(
                (item) => !item.updatedByContentTeam,
              );
              if (filteredItems.length) {
                return {
                  ...campaignAsset,
                  subElements: campaignAsset.items.filter(
                    (item) => !item.updatedByContentTeam,
                  ),
                };
              }
            }

            return false;
          }) || undefined;

        break;

      default:
        result = assets || undefined;
    }

    setDefaultAsset(result);
    setFilter(newFilter);
  };

  const handleRefetchAssetsKpis = (): void => {
    refetchAssetsKpis();
  };

  return (
    <div className={styles.content_manager_wrap}>
      <div className={styles.content_left}>
        <div className={styles.selector}>
          <div className={styles.selector_heading}>
            <span>Select brand</span>
            <span>Total: {allBrands.length}</span>
          </div>
          <ComboBox<BrandSchema>
            options={allBrands}
            value={selectedBrand}
            isLoading={isLoadingBrands}
            handleChange={handleBrandChange}
          />
        </div>

        <div className={styles.selector}>
          <div className={styles.selector_heading}>
            <span>Select campaign</span>
            <span>Total: {allCampaigns.length}</span>
          </div>
          <ComboBox<CampaignInputs>
            keyField="campaignId"
            options={allCampaigns}
            value={selectedCampaign}
            labelField="campaignName"
            isLoading={isLoadingCampaigns}
            handleChange={handleCampaignChange}
          />
        </div>

        <div className={styles.campaign_kpis_wrap}>
          <ul className="list-unstyled">
            <li>
              <span>Total number of proposals</span>{' '}
              <span>{assetsKpis?.campaignTotal || 0}</span>
            </li>
            <li>
              <span>Product purchase required</span>{' '}
              <span>{assetsKpis?.campaignProductRequired || 0}</span>
            </li>
            <li>
              <span>Accepted proposals</span>{' '}
              <span>{assetsKpis?.campaignAccepted || 0}</span>
            </li>
            <li>
              <span>Rejected proposals</span>{' '}
              <span>{assetsKpis?.campaignRejected || 0}</span>
            </li>
            <li>
              <span>Pending proposals</span>{' '}
              <span>{assetsKpis?.campaignPending || 0}</span>
            </li>
            <li>
              <span>Task created</span>{' '}
              <span>{assetsKpis?.campaignTaskCreated || 0}</span>
            </li>
          </ul>
        </div>

        <div className={styles.campaign_actions}>
          <a
            href={`/brands/${selectedBrand.id}/edit-campaign/${selectedCampaign.campaignId}#execution`}
            target="_blank"
            rel="noreferrer noopener"
            style={{
              pointerEvents: selectedCampaign.campaignId ? 'auto' : 'none',
            }}
          >
            <ButtonOutlined disabled={!selectedCampaign.campaignId}>
              Open Campaign dashboard
            </ButtonOutlined>
          </a>

          <Box pt={1}>
            <ButtonOutlined
              className="mr-1"
              onClick={handleResetAssets}
              disabled={isLoadingAssets}
            >
              Refresh assets
            </ButtonOutlined>
            <ButtonOutlined
              onClick={downloadCampaignAssets}
              disabled={!assets?.length}
            >
              <DownloadIcon fontSize="small" />
              <span>Download as ‘.xlsx’</span>
            </ButtonOutlined>
          </Box>
        </div>

        <Notifications
          campaignId={selectedCampaign?.campaignId}
          selectedNotification={selectedNotification.id}
          handleSelectNotivication={handleSelectNotivication}
        />
      </div>
      <div className={styles.content_right}>
        {Object.keys(selectedNotification).length === 0 && (
          <div className={styles.filters_wrapper}>
            <Button
              className={`${styles.filter} ${
                filter === 'All' ? styles.active : ''
              }`}
              onClick={(): void => filterCampaignAssets('All')}
            >
              <span className={styles.button_label}>All</span>
              <span className={styles.button_value}>
                {(assetsKpis?.groupAssetsApproved || 0) +
                  (assetsKpis?.groupAssetsRequireReview || 0) +
                  (assetsKpis?.groupAssetsRequireDeclined || 0) +
                  (assetsKpis?.groupAssetsRequireInitial || 0)}
              </span>
            </Button>
            <Button
              className={`${styles.filter} ${
                filter === 'Approved' ? styles.active : ''
              }`}
              onClick={(): void => filterCampaignAssets('Approved')}
            >
              <span className={styles.button_label}>Approved</span>
              <span className={styles.button_value}>
                {assetsKpis?.groupAssetsApproved || 0}
              </span>
            </Button>
            <Button
              className={`${styles.filter} ${
                filter === 'PendingApproval' ? styles.active : ''
              }`}
              onClick={(): void => filterCampaignAssets('PendingApproval')}
            >
              <span className={styles.button_label}>To be Reviewed</span>
              <span className={styles.button_value}>
                {assetsKpis?.groupAssetsRequireReview || 0}
              </span>
            </Button>
            <Button
              className={`${styles.filter} ${
                filter === 'Declined' ? styles.active : ''
              }`}
              onClick={(): void => filterCampaignAssets('Declined')}
            >
              <span className={styles.button_label}>Rejected</span>
              <span className={styles.button_value}>
                {assetsKpis?.groupAssetsRequireDeclined || 0}
              </span>
            </Button>
            <Button
              className={`${styles.filter} ${
                filter === 'NotSubmitted' ? styles.active : ''
              }`}
              onClick={(): void => filterCampaignAssets('NotSubmitted')}
            >
              <span className={styles.button_label}>Not submitted</span>
              <span className={styles.button_value}>
                {assetsKpis?.groupAssetsRequireInitial || 0}
              </span>
            </Button>
            <Button
              className={`${styles.filter} ${
                filter === 'Edit' ? styles.active : ''
              }`}
              onClick={(): void => filterCampaignAssets('Edit')}
            >
              <span className={styles.button_label}>
                Edit by copywriter/designer
              </span>
            </Button>
            <Button
              className={`${styles.filter} ${
                filter === 'Not edit' ? styles.active : ''
              }`}
              onClick={(): void => filterCampaignAssets('Not edit')}
            >
              <span className={styles.button_label}>
                Not edit by copywriter/designer
              </span>
            </Button>
          </div>
        )}
        <CampaignGroup
          trigger={trigger}
          selectedNotification={selectedNotification}
          defaultAsset={defaultAsset?.[0]}
          handleRefetchAssetsKpis={handleRefetchAssetsKpis}
          handleSelectNotivication={handleSelectNotivication}
        />
      </div>
    </div>
  );
};
