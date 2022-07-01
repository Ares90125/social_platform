import request, { gql } from 'graphql-request';
import { getCookieByName } from '../utils/helpers/cookies';

export type Keyword = {
  __typename: 'Keywords';
  keywordKey: string;
  category: string | null;
  keywordCategory: string | null;
  subCategory: string | null;
  uiFriendlyName: string | null;
  transformations?: string;
  keywordName: string | null;
};

type KeywordsConnection = {
  __typename: 'KeywordsConnection';
  items: Array<Keyword> | null;
  nextToken: string | null;
};

const keywordsReturnAttributes = `
__typename
keywordKey
category
keywordCategory
subCategory
uiFriendlyName
transformations
keywordName
`;

const getListKeywords = async (
  userToken: string,
  limit?: number,
  nextToken?: string | null,
): Promise<KeywordsConnection> => {
  const statement = gql`query ListKeywords($limit: Int, $nextToken: String) {
    listKeywords(limit: $limit, nextToken: $nextToken) {
      __typename
      items {
          ${keywordsReturnAttributes}
      }
      nextToken
    }
  }`;

  const gqlAPIServiceArguments: Partial<{
    limit: number;
    nextToken: null | string;
  }> = {};

  if (limit) {
    gqlAPIServiceArguments.limit = limit;
  }
  if (nextToken) {
    gqlAPIServiceArguments.nextToken = nextToken;
  }

  const result = await request({
    url: 'https://graph.develop.convosight.com/graphql',
    document: statement,
    variables: gqlAPIServiceArguments,
    requestHeaders: {
      authorization: userToken,
    },
  });

  return <KeywordsConnection>result.listKeywords;
};

export const listKeywords = async (
  nextToken: string | null = null,
): Promise<Keyword[]> => {
  const userToken = getCookieByName('token') as string;
  const keywords = await getListKeywords(userToken, 1000, nextToken);

  if (!keywords?.items) return [];

  let brandListKeywords = keywords.items.filter(
    (keyword) => keyword?.keywordCategory === 'Brands',
  );

  if (keywords.nextToken) {
    const keywordsAdd = await listKeywords(keywords.nextToken);
    brandListKeywords = brandListKeywords.concat(keywordsAdd);
  }

  return brandListKeywords;
};
