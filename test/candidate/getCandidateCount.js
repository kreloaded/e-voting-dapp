const { AccountProvider } = require('../test_lib/utils');

const CandidateContract = artifacts.require('Candidate');

contract('Candidate::getCandidateCount', async (accounts) => {
  const accountProvider = new AccountProvider(accounts);

  let candidateContract;
  const firstCandidateAddress = accountProvider.get();
  const secondCandidateAddress = accountProvider.get();
  let params = {};

  beforeEach(async () => {
    candidateContract = await CandidateContract.new();
    params = {
      firstCandidate: {
        name: 'xyz',
        nic: 'pqr',
        party: 'klm'
      },
      secondCandidate: {
        name: 'abc',
        nic: 'fgh',
        party: 'hij'
      }
    };
  });

  contract('Positive Tests', async () => {
    it('should pass when candidate count matches with added candidates.', async () => {
      // Adding first candidate
      await candidateContract.addCandidate(
        params.firstCandidate.name,
        params.firstCandidate.nic,
        params.firstCandidate.party,
        { from: firstCandidateAddress },
      );

      // Adding second candidate
      await candidateContract.addCandidate(
        params.secondCandidate.name,
        params.secondCandidate.nic,
        params.secondCandidate.party,
        { from: secondCandidateAddress },
      );

      const totalCandidateCount = await candidateContract.getCandidateCount();
      const actualCandidatesAddedCount = Object.keys(params).length;

      assert.strictEqual(
        totalCandidateCount.toNumber(),
        actualCandidatesAddedCount,
        "Candidate count added must match."
      );
    });
  });
});
