global.crypto = require('crypto');
const { USER_POOL_ID: UserPoolId, CLIENT_ID: ClientId } = process.env;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const CognitoUserPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId,
  ClientId
});

const CognitoUser = (username) => {
  return new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: CognitoUserPool
  });
};

const AuthenticationDetails = (username, password) => {
  return new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password
  });
};

module.exports = {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
};
