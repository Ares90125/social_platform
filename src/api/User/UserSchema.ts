enum VerificationStatusEnum {
  NotVerified = 'NotVerified',
  VerificationSent = 'VerificationSent',
  Verified = 'Verified',
}

export type UserSchema = {
  __typename: 'Users';
  cognitoId: string;
  id: string;
  userType: string;
  userRole: string | null;
  createdAtUTC: string | null;
  updatedAtUTC: string | null;
  email: string | null;
  givenname: string | null;
  familyname: string | null;
  middlename: string | null;
  fullname: string | null;
  nickname: string | null;
  username: string | null;
  birthdate: string | null;
  gender: string | null;
  locale: string | null;
  mobileNumber: string | null;
  mobileDialCode?: string | null;
  mobileCountryCode?: string | null;
  profilePictureUrl: string | null;
  timezoneOffsetInMins: number | null;
  timezoneInfo: string | null;
  timezoneName: string | null;
  fbUserAccessToken: string | null;
  fbUserId: string | null;
  expiresAt: string | null;
  loginMethod: string;
  notificationPrefs: string | null;
  personaSurvey: string | null;
  emailVerificationStatus: VerificationStatusEnum | null;
  typeformResponseId: string | null;
  csAdminTeam: string | null;
  fcmTokens: string[] | null;
  mobileNumberMasked?: string | null;
  modeOfCommunicationUpdatedBy?: string | null;
};
