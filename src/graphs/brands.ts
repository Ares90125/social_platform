import { request, gql } from 'graphql-request';
import { BrandSchema } from '../api/Brand/BrandSchema';
import { getCookieByName } from '../utils/helpers/cookies';
import { getUser } from './user';

export const getBrandsGraph = async (
  userId: string,
  userToken: string,
  nextToken: string | null,
): Promise<{ items: BrandSchema[]; nextToken: null | string }> => {
  const query = gql`
    query GetBrandsByUserId($userId: String!, $nextToken: String) {
      getBrandsByUserId(userId: $userId, nextToken: $nextToken) {
        items {
          __typename
          id
          createdAtUTC
          updatedAtUTC
          name
          description
          iconUrl
          status
        }
        nextToken
      }
    }
  `;

  const result = await request({
    url: 'https://graph.develop.convosight.com/graphql',
    document: query,
    variables: {
      userId,
      nextToken,
    },
    requestHeaders: {
      authorization: userToken,
    },
  });

  return {
    items: result.getBrandsByUserId.items,
    nextToken: result.getBrandsByUserId.nextToken,
  };
};

export const getBrands = async (
  userId: string,
  userToken: string,
  nextToken: string | null,
): Promise<BrandSchema[]> => {
  const response = await getBrandsGraph(userId, userToken, nextToken);
  let allBrands = [...response.items];

  if (response.nextToken) {
    const nextBrands = await getBrands(userId, userToken, response.nextToken);

    allBrands = [...allBrands, ...nextBrands];
  }

  return allBrands;
};

export const getAllBrands = async (): Promise<BrandSchema[]> => {
  const token = getCookieByName('token') as string;
  const user = await getUser(token);
  const brandsF = await getBrands(user.id, token, null);

  return brandsF;
};
