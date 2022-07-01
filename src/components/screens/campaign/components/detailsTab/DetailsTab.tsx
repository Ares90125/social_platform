import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import {
  Button,
  Editor,
  EmptyButton,
  Input,
  MultiCheckbox,
  Select,
  BasicDateTimePicker,
  BasicDatePicker,
} from '../../../../form';
import { CampaignDataToSend, CampaignInputs } from './campaign.types';
import { getAllBrands } from '../../../../../graphs/brands';
import { listKeywords } from '../../../../../graphs/keywords';
import { KeywordsModal } from '../../../../modals/keyword/KeywordsModal';
import { createCampaign } from '../../../../../graphs/createCMCcampaign';
import * as S from './detailsTab.styled';
import { updateCampaign } from '../../../../../graphs/updateCMCampaignDetails';
import {
  cmcTypeList,
  communicationChannels,
  currencies,
  defaultValues,
  kpiList,
  postTypesDetails,
  postTypesDetailsData,
  timeZones,
} from './defaultFormValues';
import { schema } from './campaign.validation';
import {
  getCategoriesBrands,
  getMultiCheckboxErrors,
  getSubcategories,
  normalizeDefaultValuesForCampaign,
} from './campaign.helpers';
import { useToast } from '../../../../../context/toast';

type K = { id: number; value: string }[];

type DetailsTabProps = {
  campaign?: CampaignInputs;
};

export const DetailsTab: React.FC<DetailsTabProps> = ({ campaign }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setSuccessToast, setErrorToast } = useToast();
  const { data: allBrands } = useQuery('brands', getAllBrands);
  const { data: keywords } = useQuery('keywords', () => listKeywords());
  const mutationCreateCampaign = useMutation(createCampaign, {
    onSuccess: (data) => {
      router.push(
        `/brands/${router.query.id}/edit-campaign/${data.campaignId}`,
      );
      setSuccessToast();
    },
    onError: () => {
      setErrorToast();
    },
  });
  const mutationUpdateCampaign = useMutation(updateCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries(`brand-${router.query.id}`);
      setSuccessToast('Successfully updated');
    },
    onError: () => {
      setErrorToast();
    },
  });
  const keywordsCategories = _.uniq(
    keywords?.map((keyword) => keyword.category),
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
    clearErrors,
  } = useForm<CampaignInputs>({
    mode: 'all',
    defaultValues: campaign
      ? normalizeDefaultValuesForCampaign(campaign)
      : defaultValues,
    resolver: yupResolver(schema),
  });

  const watchCMCType = watch('cmcType');
  const watchKPIs = watch('KPIs');
  const watchPhases = watch('totalPhase');
  const watchKeywordCategory = watch('keywordCategory');
  const watchKeywordSubCategories = watch('keywordSubCategories');
  const watchKeywords = watch('keywords');
  const watchKeywordsExcluded = watch('keywordsExcluded');
  const [phases, setPhases] = useState<number[]>([]);
  const [subCategories, setSubCategories] = useState<Array<string | null>>([]);
  const [brands, setBrands] = useState<Array<string | null>>([]);
  const [openTrackModal, setOpenTrackModal] = useState(false);
  const [openExcludeModal, setOpenExcludeModal] = useState(false);
  const [keywordsToTrack, setKeywordsToTrack] = useState<K>(
    watchKeywords
      ? Array.from(watchKeywords, (value, id) => ({ id, value }))
      : [],
  );
  const [keywordsToExclude, setKeywordsToExclude] = useState<K>(
    watchKeywordsExcluded
      ? Array.from(watchKeywordsExcluded, (value, id) => ({ id, value }))
      : [],
  );

  const onSubmit = (data: CampaignInputs): void => {
    const {
      numConversationsListenedInLastThreeMonths,
      createdAtUTC,
      updatedAtUTC,
      type,
      useWAForContentAutomation,
      wordCloudSupportingText,
      defaultPostContentType,
      ...rest
    } = data;

    const updatedData: CampaignDataToSend = {
      ...rest,
      KPIs: JSON.stringify(data.KPIs),
      cmcType: JSON.stringify(data.cmcType),
      startDateAtUTC: moment(data.startDateAtUTC).toISOString(),
      endDateAtUTC: moment(data.endDateAtUTC).toISOString(),
      defaultTaskDate: data.defaultTaskDate
        ? moment(data.defaultTaskDate).toISOString()
        : undefined,
      defaultPostContentType: defaultPostContentType
        ? postTypesDetailsData[defaultPostContentType]
        : 'Basic',
    };

    if (router.asPath.includes('edit-campaign')) {
      const { brandLogoURL, ...dataToUpdate } = updatedData;
      mutationUpdateCampaign.mutate({ ...dataToUpdate, wordCloudSupportingText });
      return;
    }

    mutationCreateCampaign.mutate(updatedData);
  };

  useEffect(() => {
    if (!allBrands || !router.query.id) return;

    const activeBrand = allBrands.filter(
      (brand) => brand && brand.id === router.query.id,
    )[0];

    setValue('brandId', activeBrand.id);
    setValue('brandLogoURL', activeBrand.iconUrl);
    setValue('brandName', activeBrand.name);
  }, [allBrands, router.query.id]);

  useEffect(() => {
    if (typeof router.query.name !== 'string') return;

    setValue('campaignName', router.query.name);
  }, [router.query.name]);

  useEffect(() => {
    setValue(
      'keywords',
      keywordsToTrack.map(({ value }) => value),
    );
  }, [keywordsToTrack]);

  useEffect(() => {
    setValue(
      'keywordsExcluded',
      keywordsToExclude.map(({ value }) => value),
    );
  }, [keywordsToExclude]);

  useEffect(() => {
    if (watchKeywordCategory) {
      setSubCategories(getSubcategories(watchKeywordCategory, keywords));
    }
  }, [keywords, watchKeywordCategory]);

  useEffect(() => {
    if (watchKeywordCategory && watchKeywordSubCategories) {
      setBrands(
        getCategoriesBrands(
          watchKeywordCategory,
          watchKeywordSubCategories,
          keywords,
        ),
      );
    }
  }, [keywords, watchKeywordCategory, watchKeywordSubCategories]);

  useEffect(() => {
    if (!watchPhases) {
      setPhases([]);
      return;
    }
    const totalPhases = +watchPhases;

    if (totalPhases > 0 && totalPhases <= 100) {
      setPhases(Array.from({ length: totalPhases }, (v, i) => i + 1));
    }
  }, [watchPhases]);

  return (
    <S.DetailsWrapper>
      <S.CampaignForm onSubmit={handleSubmit(onSubmit)}>
        <S.CampaignFormHeader>
          <p>Edit solution details</p>
          <S.CampaignFormHeaderButtons>
            <EmptyButton
              type="button"
              onClick={(): void => reset(campaign || defaultValues)}
            >
              Discard Changes
            </EmptyButton>
            <Button type="submit">Save Changes</Button>
          </S.CampaignFormHeaderButtons>
        </S.CampaignFormHeader>
        <S.CampaignFormContainer>
          <S.CampaignFormGroup>
            <Controller
              name="campaignName"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="campaignName"
                  placeholder="Campaign Name"
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Name for community marketing solution (this will appear as the title of the campaign report) *"
                  helperTextPosition="top"
                  errorText={errors.campaignName?.message}
                />
              )}
            />
          </S.CampaignFormGroup>
          <S.CampaignFormGroup>
            <Controller
              name="details"
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Editor
                  id="details"
                  placeholder="Add Campaign brief"
                  onChange={onChange}
                  value={value}
                  helperText="Campaign brief *"
                  errorText={errors.details?.message}
                />
              )}
            />
          </S.CampaignFormGroup>
          <S.CampaignFormGroup>
            <Controller
              name="phaseIdea"
              control={control}
              render={({ field: { onChange, value } }): JSX.Element => (
                <Editor
                  id="phaseIdea"
                  placeholder="Please provide the idea behind this phase"
                  onChange={onChange}
                  value={value}
                  helperText="Phase Idea"
                />
              )}
            />
          </S.CampaignFormGroup>
          <S.CampaignFormGroup>
            <Controller
              name="typeformId"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="typeformId"
                  placeholder="Typeform ID"
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Typeform ID"
                  helperTextPosition="top"
                />
              )}
            />
          </S.CampaignFormGroup>
          <S.CampaignFormGroup>
            <MultiCheckbox<CampaignInputs>
              options={cmcTypeList}
              name="cmcType"
              control={control}
              setValue={setValue}
              helperText="Campaign type *"
              errorText={getMultiCheckboxErrors(errors.cmcType)?.message}
              values={watchCMCType || []}
              clearErrors={clearErrors}
            />
          </S.CampaignFormGroup>
          <S.CampaignFormGroupTwoCols>
            <Controller
              name="startDateAtUTC"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <BasicDatePicker
                  label="Start date *"
                  id="startDateAtUTC"
                  onChange={onChange}
                  value={value}
                  name={name}
                  errorText={errors.startDateAtUTC?.message}
                />
              )}
            />
            <Controller
              name="endDateAtUTC"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <BasicDatePicker
                  disabled={!getValues('startDateAtUTC')}
                  label="End date *"
                  id="endDateAtUTC"
                  onChange={onChange}
                  value={value}
                  name={name}
                  errorText={errors.endDateAtUTC?.message}
                />
              )}
            />
          </S.CampaignFormGroupTwoCols>
          <S.CampaignFormGroupTwoCols>
            <Controller
              name="totalPhase"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="totalPhase"
                  placeholder="If you have a phase for this campaign, please add the number here"
                  onChange={(e): void => {
                    onChange(e.target.value.replace(/\D/gi, ''));
                  }}
                  value={value}
                  name={name}
                  helperText="No of phases"
                  helperTextPosition="top"
                  errorText={errors.totalPhase?.message}
                />
              )}
            />
            <Controller
              name="currentPhase"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Select phase number for current campaign"
                  disabled={!!errors.totalPhase?.message || !phases.length}
                  items={phases}
                  id="currentPhase"
                />
              )}
            />
          </S.CampaignFormGroupTwoCols>
          <S.CampaignFormGroup>
            <Controller
              name="productPurchaseRequired"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={value}
                      onChange={onChange}
                      name={name}
                      id="productPurchaseRequired"
                      checked={value}
                    />
                  }
                  label="Product purchase required"
                />
              )}
            />

            {getValues().productPurchaseRequired && (
              <Controller
                name="productPurchaseInfo"
                control={control}
                render={({ field: { onChange, value, name } }): JSX.Element => (
                  <Input
                    id="productPurchaseInfo"
                    placeholder="Product info"
                    onChange={onChange}
                    value={value}
                    name={name}
                    helperText="Enter product information"
                    helperTextPosition="top"
                  />
                )}
              />
            )}
          </S.CampaignFormGroup>
          <S.Divider />
          <S.CampaignFormGroup>
            <Controller
              name="trainingLinkMessage"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="trainingLinkMessage"
                  placeholder="Training link message"
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Enter training link message"
                  helperTextPosition="top"
                />
              )}
            />
          </S.CampaignFormGroup>
          <S.Divider />
          <S.CampaignFormGroupTwoCols>
            <S.AsssetsWrapper>
              <Controller
                name="assetsTextRequired"
                control={control}
                render={({ field: { onChange, value, name } }): JSX.Element => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="assetsTextRequired"
                        checked={value}
                        onChange={onChange}
                        name={name}
                      />
                    }
                    label="Text required"
                  />
                )}
              />
              <Controller
                name="assetsVideoRequired"
                control={control}
                render={({ field: { onChange, value, name } }): JSX.Element => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="assetsVideoRequired"
                        checked={value}
                        onChange={onChange}
                        name={name}
                      />
                    }
                    label="Video required"
                  />
                )}
              />
            </S.AsssetsWrapper>
            <Controller
              name="assetsImagesRequired"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="assetsImagesRequired"
                  placeholder="Minimum amount 1 - 10"
                  onChange={(e): void => {
                    onChange(e.target.value.replace(/\D/gi, ''));
                  }}
                  value={`${value === null ? '' : value}`}
                  name={name}
                  helperText="Enter minimum amount of images assets"
                  helperTextPosition="top"
                  errorText={errors.assetsImagesRequired?.message}
                />
              )}
            />
          </S.CampaignFormGroupTwoCols>
          <S.CampaignFormGroupThreeCols>
            <Controller
              name="keywordCategory"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={(e): void => {
                    onChange(e);
                    setValue('keywordSubCategories', []);
                    setValue('keywordBrand', '');
                  }}
                  value={value}
                  name={name}
                  helperText="Category *"
                  inputLabel="Select Category"
                  items={keywordsCategories}
                  id="keywordCategory"
                  error={!!errors.keywordCategory?.message}
                  errorText={errors.keywordCategory?.message}
                />
              )}
            />
            <Controller
              name="keywordSubCategories"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={(e): void => {
                    const currentValue = e.target.value as string[];

                    if (!currentValue.length) {
                      onChange(e);
                      setBrands([]);
                      setValue('keywordBrand', '');
                      return;
                    }
                    onChange(e);
                    setValue('keywordBrand', '');
                  }}
                  value={value}
                  name={name}
                  helperText="Sub-category *"
                  inputLabel="Select Sub Category"
                  items={subCategories}
                  id="keywordSubCategories"
                  multiple
                  errorText={
                    getMultiCheckboxErrors(errors?.keywordSubCategories)
                      ?.message
                  }
                />
              )}
            />
            <Controller
              name="keywordBrand"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Brand *"
                  inputLabel="Select Brand"
                  items={brands}
                  id="keywordBrand"
                  error={!!errors.keywordBrand?.message}
                  errorText={errors.keywordBrand?.message}
                />
              )}
            />
          </S.CampaignFormGroupThreeCols>
          <S.CampaignFormGroupTwoCols>
            <Controller
              name="primaryObjective"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="primaryObjective"
                  placeholder="Primary objective"
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Primary campaign objective *"
                  helperTextPosition="top"
                  errorText={errors.primaryObjective?.message}
                />
              )}
            />
            <Controller
              name="secondaryObjective"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="secondaryObjective"
                  placeholder="If you have a secondary objective, please add here"
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Secondary campaign objective (optional)"
                  helperTextPosition="top"
                />
              )}
            />
          </S.CampaignFormGroupTwoCols>
          <Box mb={4}>
            <MultiCheckbox<CampaignInputs>
              options={kpiList}
              name="KPIs"
              helperText="Campaign type *"
              control={control}
              setValue={setValue}
              values={watchKPIs || []}
              errorText={getMultiCheckboxErrors(errors?.KPIs)?.message}
              clearErrors={clearErrors}
            />
          </Box>
          <S.CampaignFormGroup>
            <p>
              Keywords to Track:{' '}
              <Button onClick={(): void => setOpenTrackModal(true)}>
                + Add keywords
              </Button>
              <KeywordsModal
                saveKeywords={(
                  keywordsToSave: { id: number; value: string }[],
                ): void => {
                  setKeywordsToTrack(keywordsToSave);
                }}
                open={openTrackModal}
                handleClose={(): void => setOpenTrackModal(false)}
                values={watchKeywords}
              />
            </p>
            <div>
              {watchKeywords?.map((key) => (
                <S.KeywordChip key={key}>{key}</S.KeywordChip>
              ))}
            </div>
          </S.CampaignFormGroup>
          <S.CampaignFormGroup>
            <p>
              Keywords to Exclude:{' '}
              <Button onClick={(): void => setOpenExcludeModal(true)}>
                + Add keywords
              </Button>
              <KeywordsModal
                saveKeywords={(
                  keywordsToSave: { id: number; value: string }[],
                ): void => {
                  setKeywordsToExclude(keywordsToSave);
                }}
                open={openExcludeModal}
                handleClose={(): void => setOpenExcludeModal(false)}
                values={watchKeywordsExcluded}
              />
            </p>
            <div>
              {watchKeywordsExcluded?.map((key) => (
                <S.KeywordChip key={key}>{key}</S.KeywordChip>
              ))}
            </div>
          </S.CampaignFormGroup>
        </S.CampaignFormContainer>
        <S.DetailsMoreInfoWrapper>
          <h4>Setup Default Task details</h4>
          <p>
            Default details will be applied to any new communities added. If any
            changes are made to the existing Default details, those will only be
            applicable to the communities added later.
          </p>
          <S.CampaignFormGroup>
            <Controller
              name="taskTitle"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="taskTitle"
                  placeholder="Enter Title"
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Title"
                  helperTextPosition="top"
                />
              )}
            />
          </S.CampaignFormGroup>
          <S.CampaignFormGroupTwoCols>
            <Controller
              name="campaignPeriod"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Input
                  id="campaignPeriod"
                  placeholder="Enter campaign period"
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Campaign period"
                  helperTextPosition="top"
                />
              )}
            />
            <Controller
              name="defaultPostContentType"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={onChange}
                  value={value === null ? '' : value}
                  name={name}
                  helperText="Post type"
                  inputLabel="Please select post type"
                  items={postTypesDetails}
                  id="defaultPostContentType"
                />
              )}
            />
          </S.CampaignFormGroupTwoCols>
          <S.CampaignFormGroupTwoCols>
            <Controller
              name="defaultTaskDate"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <BasicDateTimePicker
                  disabled={
                    !getValues('startDateAtUTC') || !getValues('endDateAtUTC')
                  }
                  label="Posting date & time"
                  id="defaultTaskDate"
                  onChange={onChange}
                  value={value || undefined}
                  name={name}
                  errorText={errors.defaultTaskDate?.message}
                />
              )}
            />

            <Controller
              name="timezoneName"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Posting timezone"
                  inputLabel="Please select timezone"
                  items={timeZones}
                  id="timezoneName"
                />
              )}
            />
          </S.CampaignFormGroupTwoCols>
          <S.CampaignFormGroupTwoCols>
            <Controller
              name="communicationChannel"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={onChange}
                  value={value === null ? '' : value}
                  name={name}
                  helperText="Communication Channel"
                  inputLabel="Select Communication Channel"
                  items={communicationChannels}
                  id="communicationChannel"
                />
              )}
            />
            <Controller
              name="currency"
              control={control}
              render={({ field: { onChange, value, name } }): JSX.Element => (
                <Select
                  onChange={onChange}
                  value={value}
                  name={name}
                  helperText="Currency"
                  inputLabel="Select Currency"
                  items={currencies}
                  id="currency"
                />
              )}
            />
          </S.CampaignFormGroupTwoCols>
        </S.DetailsMoreInfoWrapper>
      </S.CampaignForm>
    </S.DetailsWrapper>
  );
};
