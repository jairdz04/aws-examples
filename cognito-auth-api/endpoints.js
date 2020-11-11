const CognitoProvider = require('./cognito');

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const accessTokens = await CognitoProvider.signIn({
      username,
      password
    });

    return res.send(accessTokens);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { userConfirmed, userSub } = await CognitoProvider.signUp({
      username,
      password
    });

    return res.send({ userConfirmed, userSub });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const confirmAccount = async (req, res) => {
  try {
    const { username, confirmationCode } = req.body;
    await CognitoProvider.confirmSignUp({
      username,
      confirmationCode
    });
    return res.send({ message: 'user confirmed successfully' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = (app) => {
  app.post('/sign-in', signIn);
  app.post('/sign-up', signUp);
  app.post('/sign-up-confirmation', confirmAccount);
};
