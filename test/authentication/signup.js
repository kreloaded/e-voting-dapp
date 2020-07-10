const { AccountProvider } = require('../test_lib/utils');

const AuthenticationContract = artifacts.require('Authentication');
const Utils = require('../test_lib/utils');
const web3 = require('../test_lib/web3');

contract('Authentication::signup', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);
  let authenticationContract;
  let userAddress;
  let params;

  beforeEach(async () => {
    authenticationContract = await AuthenticationContract.new();
    userAddress = accountProvider.get();
    params = {
      name: 'abc'
    };
  });

  contract('Positive Tests', async () => {
    it('should pass when user is successfully signed up.', async () => {
      await authenticationContract.signup(
        web3.utils.fromAscii(params.name),
        { from: userAddress }
      );
    })
  })
});
