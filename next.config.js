/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    COGNITO_USER_POOL: process.env.COGNITO_USER_POOL,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    URL: process.env.URL,
    URL_CLIENT: process.env.URL_CLIENT,
    URL_REST: process.env.URL_REST,
    URL_GRAPHQL: process.env.URL_GRAPHQL,
  },
};

module.exports = nextConfig;
