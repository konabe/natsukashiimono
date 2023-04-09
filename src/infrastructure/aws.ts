import * as dotenv from 'dotenv';
dotenv.config();
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export const cognito = new CognitoIdentityServiceProvider({
  region: 'ap-northeast-1',
});
export const AWS_COGNITO_APP_CLIENT_ID = process.env.AWS_COGNITO_APP_CLIENT_ID;
export const AWS_COGNITO_USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID;
