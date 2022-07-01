import moment from 'moment';
import * as yup from 'yup';

const checkInvalidDate = (val: Date | null): Date | null =>
  val && val.toString() === 'Invalid Date' ? null : val;

const REQUIRED_MESSAGE = 'This field is required';
const MIN_ARR_MESSAGE = 'This field must have at least 1 item';

export const schema = yup
  .object({
    campaignName: yup.string().required(REQUIRED_MESSAGE),
    details: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .transform((v) => (v?.replace(/<\/?[^>]+>/gi, '').trim() ? v : '')),
    phaseIdea: yup.string(),
    typeformId: yup.string(),
    cmcType: yup.array().of(yup.string()).min(1, MIN_ARR_MESSAGE),
    totalPhase: yup
      .number()
      .typeError('Only numbers are allowed')
      .min(1, 'Minimum 1 number of Phase')
      .max(100, 'Maximum 100 phases are allowed')
      .nullable(true)
      .transform((val) => (Number.isNaN(val) ? null : val)),
    assetsImagesRequired: yup
      .number()
      .typeError('Only numbers are allowed')
      .min(1, 'Minimum 1 image is allowed')
      .max(10, 'Maximum 10 images are allowed')
      .nullable(true)
      .transform((val) => (Number.isNaN(val) ? null : val)),
    keywordCategory: yup.string().required(REQUIRED_MESSAGE),
    keywordSubCategories: yup.array().of(yup.string()).min(1, MIN_ARR_MESSAGE),
    keywordBrand: yup.string().required(REQUIRED_MESSAGE),
    primaryObjective: yup.string().required(REQUIRED_MESSAGE),
    KPIs: yup.array().of(yup.string()).min(1, MIN_ARR_MESSAGE),
    startDateAtUTC: yup
      .date()
      .required(REQUIRED_MESSAGE)
      .min(moment().startOf('day'), 'Start date cannot  be in the past')
      .nullable()
      .transform(checkInvalidDate),
    endDateAtUTC: yup
      .date()
      .min(
        yup.ref('startDateAtUTC'),
        'The end date cannot be less than the start date',
      )
      .required(REQUIRED_MESSAGE)
      .nullable()
      .transform(checkInvalidDate),
    defaultTaskDate: yup
      .date()
      .min(
        yup.ref('startDateAtUTC'),
        'The date must be between the start date and the end date',
      )
      .max(
        yup.ref('endDateAtUTC'),
        'The date must be between the start date and the end date',
      )
      .nullable()
      .typeError('Correct format mm/dd/yyyy hh:mm (a|p)m'),
  })
  .required();
