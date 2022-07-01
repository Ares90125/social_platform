import Auth from '@aws-amplify/auth';

export const AmplifyConfig = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id:
    'us-east-1:456e1b9e-abbf-4297-8cda-f32d6fc61cd4',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_sJUKzJDSZ',
  aws_user_pools_web_client_id: '7j1h56mkgn374r27ph7oindlvn',
  oauth: {
    domain: 'auth.develop.convosight.com',
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'https://localhost:4200/login-response/',
    redirectSignOut: 'https://develop.convosight.com/logout/',
    responseType: 'code',
  },
  Storage: {
    AWSS3: {
      bucket: 'bd-cs-dev-media',
      region: 'us-east-1',
    },
  },
  Analytics: {
    disabled: true,
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_appsync_graphqlEndpoint:
    'https://72ke2fhlpjh6zeqilx22jcspyi.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  API: {
    graphql_endpoint: 'https://graph.feature3.convosight.com/graphql',
    graphql_headers: async () => ({
      authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
    }),
  },
};
