import * as dotenv from 'dotenv';
dotenv.config();
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

export const cognito = new CognitoIdentityProvider({
  region: 'ap-northeast-1',
});
export const AWS_COGNITO_APP_CLIENT_ID = process.env.AWS_COGNITO_APP_CLIENT_ID!;
export const AWS_COGNITO_USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID!;
