import request from 'graphql-request';
import { getCookieByName } from '../utils/helpers/cookies';

export async function requestApi<T extends Object, K extends Object>(
  statement: string,
  variables: T,
): Promise<K> {
  const token = getCookieByName('token') as string;
  const result = await request({
    url: process.env.URL_GRAPHQL as string,
    document: statement,
    variables,
    requestHeaders: {
      authorization: token,
    },
  });
  return result;
}
