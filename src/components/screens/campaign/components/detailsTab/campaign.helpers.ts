import _ from 'lodash';
import { FieldError } from 'react-hook-form';
import { Keyword } from '../../../../../graphs/keywords';
import { CampaignInputs } from './campaign.types';

export const getSubcategories = (
  categoryName: string,
  keywords?: Keyword[],
): Array<string | null> => {
  let subC: Array<string | null> = [];

  if (keywords) {
    subC = _.uniq(
      keywords
        .filter((keyword) => keyword.category === categoryName)
        .map((keyword) => keyword.subCategory),
    );
  }

  return subC;
};

export const getCategoriesBrands = (
  selectedCategory: string,
  selectedSubCategories: string[],
  keywords?: Keyword[],
): Array<string | null> => {
  if (!keywords) return [];

  const categories = keywords.filter(
    (keyword) => keyword.category === selectedCategory,
  );

  let ssc: Keyword[] = [];
  selectedSubCategories.forEach((category) => {
    if (ssc.length > 0) {
      const brandSubCategories = categories?.filter(
        (keyword) => keyword.subCategory === selectedCategory,
      );
      if (brandSubCategories) {
        ssc = ssc.concat(brandSubCategories);
        ssc = _.uniqBy(ssc, (subCat) => subCat.uiFriendlyName);
      }
    } else {
      ssc =
        categories?.filter((keyword) => keyword.subCategory === category) || [];
    }
  });

  return _.uniq(ssc.map((keyword) => keyword.uiFriendlyName));
};

export const getMultiCheckboxErrors = (
  fieldErrors: any,
): FieldError | undefined =>
  fieldErrors ? (fieldErrors as FieldError) : (fieldErrors as undefined);

export const normalizeDefaultValuesForCampaign = (
  campaign: CampaignInputs,
): CampaignInputs => ({
  ...campaign,
  cmcType: campaign?.cmcType || [],
  keywordCategory: campaign?.keywordCategory || '',
  keywordSubCategories: campaign?.keywordSubCategories || [],
  keywordBrand: campaign?.keywordBrand || '',
  primaryObjective: campaign?.primaryObjective || '',
  KPIs: campaign?.KPIs || [],
  phaseIdea: campaign?.phaseIdea || '',
  typeformId: campaign?.typeformId || '',
});
