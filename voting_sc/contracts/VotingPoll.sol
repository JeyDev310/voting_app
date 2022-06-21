// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract VotingPoll {
    string public s_title;
    string[] public s_options;
    address public s_owner;
    uint256[] public s_votes;
    mapping(address => bool) s_voted;

    event Vote(string option, uint256 value, address indexed voter);

    constructor(
        string memory title,
        string[] memory options,
        address owner
    ) {
        s_title = title;
        s_options = options;
        s_owner = owner;
        uint256[] memory votes = new uint256[](options.length);
        for (uint256 i = 0; i < options.length; i++) {
            votes[i] = 0;
        }
        s_votes = votes;
    }

    function vote(uint256 optionId) external {
        require(!s_voted[msg.sender], "already voted");
        s_voted[msg.sender] = true;
        s_votes[optionId] = s_votes[optionId] + 1;
        emit Vote(s_options[optionId], s_votes[optionId], msg.sender);
    }

    function getState()
        external
        view
        returns (
            string memory,
            string[] memory,
            address,
            uint256[] memory
        )
    {
        return (s_title, s_options, s_owner, s_votes);
    }

    function alreadyVoted(address user) external view returns (bool) {
        return s_voted[user];
    }

}
