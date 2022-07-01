import { request, gql } from 'graphql-request';
import { UserSchema } from '../api/User/UserSchema';

const userQ = gql`
  query GetUserDetails {
    getUserDetails {
      __typename
      cognitoId
      id
      userType
      createdAtUTC
      updatedAtUTC
      email
      givenname
      familyname
      middlename
      fullname
      nickname
      username
      birthdate
      gender
      landbotInteractionCustomerId
      locale
      mobileNumberMasked
      mobileDialCode
      mobileCountryCode
      profilePictureUrl
      timezoneOffsetInMins
      timezoneInfo
      timezoneName
      fbUserAccessToken
      fbUserId
      csAdminTeam
      expiresAt
      loginMethod
      notificationPrefs
      personaSurvey
      emailVerificationStatus
      whatsappSubscriptionStatus
      productDemoedAtDate
      joinedCSGroupAtDate
      monetizationWorkshopAttendedAtDate
      receiveNotifications
      receiveWANotifications
      receiveEmailNotifications
      hasAccessToReportGenerationFeature
      totalWhatsappConfirmationRequest
      accessTokenReActivatedAtUTC
      fcmTokens
      modeOfCommunication
      modeOfCommunicationVerificationStatus
      landbotCustomerId
      modeOfCommunicationUpdatedBy
      isEligibleForConvosightEarningPlatform
      CEPOnboardingState
      campaignUpdatesSubscribed
      isAdminBioCompleted
      isBetaUser
      adminBioContactEmail
      adminBioContactPhoneNumber
      sendAdminBioNotificationCampaign
      userRole
    }
  }
`;

export const getUser = async (token: string): Promise<UserSchema> => {
  const userResult = await request({
    url: 'https://graph.develop.convosight.com/graphql',
    document: userQ,
    requestHeaders: {
      authorization: token,
    },
  });

  return userResult.getUserDetails;
};
