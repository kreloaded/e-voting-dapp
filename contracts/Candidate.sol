// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;

contract Candidate {

    /* Structs */

    struct CandidateDetails {
        string name;
        string nic;
        string party;
    }


    /* Storage */

    address[] public candidateAddresses;

    /** Mapping of address to candidate details */
    mapping (address => CandidateDetails) public candidates;


    /* Public Functions */

    /**
     * @notice Add a candidate.
     *
     * @dev Adds a new candidate to the system.
     *      - Checks whether candidate is already added or not.
     *      - Adds a candidate to the `candidates` mapping.
     *      - Adds candidate's address to `candidateAddresses` address array.
     *
     * @param _name - candidate's name
     * @param _nic - candidate's nic
     * @param _party - candidate's party
     */
    function addCandidate(
        string memory _name,
        string memory _nic,
        string memory _party
    ) public {
        require(
            bytes(candidates[msg.sender].name).length == 0,
            "Candidate must not already exist."
        );

        candidates[msg.sender] = CandidateDetails(
            _name,
            _nic,
            _party
        );

        candidateAddresses.push(msg.sender);
    }
}
