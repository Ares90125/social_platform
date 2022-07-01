import { CognitoUserPool } from 'amazon-cognito-identity-js';

const UserPoolConfig = {
  UserPoolId: process.env.COGNITO_USER_POOL!,
  ClientId: process.env.COGNITO_CLIENT_ID!,
};

export const UserPool = new CognitoUserPool(UserPoolConfig);
