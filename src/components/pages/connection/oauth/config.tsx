export const config = {
  google: {
    issuer: 'https://accounts.google.com',
    clientId:
      '128451461186-2r9ec6b1jmlja0h77g211tcvddfu8n5t.apps.googleusercontent.com',
    redirectUrl:
      'com.googleusercontent.apps.128451461186-2r9ec6b1jmlja0h77g211tcvddfu8n5t:/oauth2redirect/google',
    response_type: 'code',
    scopes: ['openid'],
  },
  microsoft: {
    clientId: '0d181cc4-6e56-46b5-988f-4f8183fd93a1',
    redirectUrl:
      'com.googleusercontent.apps.128451461186-2r9ec6b1jmlja0h77g211tcvddfu8n5t://oauth',
    scopes: ['openid'],
    additionalParameters: {prompt: 'select_account'},
    serviceConfiguration: {
      authorizationEndpoint:
        'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/authorize',
      tokenEndpoint:
        'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/token',
    },
  },
};
