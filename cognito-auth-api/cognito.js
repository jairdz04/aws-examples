const {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} = require('./helper');

const signIn = ({ username, password }) => {
  const cognitoUser = CognitoUser(username);
  const authenticationDetails = AuthenticationDetails(username, password);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({
          token: result.getAccessToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
          cognitoUserSession: result.getIdToken().getJwtToken()
        });
      },
      onFailure: (err) => reject(err)
    });
  });
};

const signUp = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    CognitoUserPool.signUp(username, password, [], null, (err, result) => {
      err && reject(err);
      resolve(result);
    });
  });
};

const confirmSignUp = ({ username, confirmationCode }) => {
  const cognitoUser = CognitoUser(username);
  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      err && reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  signUp,
  confirmSignUp,
  signIn
};
