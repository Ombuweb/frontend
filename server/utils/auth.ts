import { CognitoJwtVerifier } from 'aws-jwt-verify';
import outputs from '../../amplify_outputs.json';
if (!process.env.COGNITO_CLIENT_ID) {
  throw new Error('Missing COGNITO_CLIENT_ID environment variable');
}

const verifier = CognitoJwtVerifier.create({
  userPoolId: outputs.auth.user_pool_id,
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID,
});

export const getAuthenticatedUserId = async (
  token: string
): Promise<string | null> => {
  try {
    const payload = await verifier.verify(token, {
      clientId: process.env.COGNITO_CLIENT_ID,
      tokenUse: 'id',
    });
    console.log('Token is valid. Payload:', payload.sub);
    return payload.sub;
  } catch {
    console.log('Token not valid!');
    return null;
  }
};
