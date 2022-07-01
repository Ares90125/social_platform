import { gql } from 'graphql-request';
import { requestApi } from './request';

export type UserRole = {
  username: string;
  id: string;
  fullname: string;
  givenname: string;
  familyname: string;
  email: string;
};

export type UsersByRolesOutput = {
  copywriter: UserRole[];
  designer: UserRole[];
};

const statement = gql`
  query GetUsersByRoles {
    getUsersByRoles {
      copywriter {
        username
        id
        fullname
        givenname
        familyname
        email
      }
      designer {
        username
        id
        fullname
        givenname
        familyname
        email
      }
    }
  }
`;

export const getUsersByRoles = async (): Promise<UsersByRolesOutput> => {
  const result = await requestApi<{}, { getUsersByRoles: UsersByRolesOutput }>(
    statement,
    {},
  );

  return result.getUsersByRoles;
};
