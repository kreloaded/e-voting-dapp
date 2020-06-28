const BN = require('bn.js');
const { AccountProvider } = require('../test_lib/utils');

const CandidateContract = artifacts.require('Candidate');

contract('Candidate::getCandidate', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);

  let candidateContract;
  let candidateAddress = accountProvider.get();
  let param = {};

  beforeEach(async () => {
    candidateContract = await CandidateContract.new();
    param = {
      name: 'xyz',
      nic: 'pqr',
      party: 'klm'
    };
  });

  contract('Positive Tests', async () => {
    it('should pass when candidate details retrieved successfully.', async () => {
      await candidateContract.addCandidate(
        param.name,
        param.nic,
        param.party,
        { from: candidateAddress },
      );

      const candidate = await candidateContract.getCandidate(candidateAddress);
      const candidateName = candidate[1];

      assert.strictEqual(
        candidateName,
        param.name,
        'Candidate name must match.',
      );
    });
  });
});
