// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./VotingPoll.sol";

contract VotingFactory {

    address private admin;
    event CreatedVotingPoll(string title, address indexed owner);
    address[] private s_votingPolls;
    string[] private s_votingTitles;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Not Admin");
        _;
    }

    function createVotingPoll(string memory title, string[] memory options)
        external
        onlyAdmin
        returns (address votingPollAddress)
    {
        VotingPoll votingPoll = new VotingPoll(title, options, msg.sender);
        votingPollAddress = address(votingPoll);
        s_votingPolls.push(votingPollAddress);
        s_votingTitles.push(title);
        emit CreatedVotingPoll(title, msg.sender);
    }

    function getVotingPollTitles() external view returns(string[] memory) {
        return (s_votingTitles);
    }

    function getVotingPollById(uint256 id) external view returns(address) {
        return s_votingPolls[id];
    }
}
