export type BrandSchema = {
  createdAtUTC: string;
  description: string;
  iconUrl: string;
  id: string;
  name: string;
  status: 'Draft' | 'Active';
  updatedAtUTC: string;
};
