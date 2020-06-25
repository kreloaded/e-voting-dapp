const { AccountProvider } = require('../test_lib/utils');

const CandidateContract = artifacts.require('Candidate');
const Utils = require('../test_lib/utils');

contract('Candidate::addCandidate', async (accounts) => {
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
    it('should pass when candidate is successfully added.', async () => {
      await candidateContract.addCandidate(
        param.name,
        param.nic,
        param.party,
        { from: candidateAddress },
      );

      const candidate = await candidateContract.candidates.call(candidateAddress);
      assert.isNotNull(
        candidate,
        'Candidate is not successfully added.',
      );
    });
  });
});
