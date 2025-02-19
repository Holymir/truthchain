// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TruthChain {
    struct Fact {
        string content;
        address submittedBy;
        uint256 timestamp;
        bool verified;
    }

    mapping(bytes32 => Fact) public facts;
    mapping(bytes32 => uint256) public votes;
    mapping(address => uint256) public reputation;

    event FactSubmitted(bytes32 indexed factHash, address indexed submittedBy, string content);
    event FactVerified(bytes32 indexed factHash, address indexed verifiedBy);
    event VoteCasted(bytes32 indexed factHash, address indexed voter, bool vote);

    modifier onlyReputable() {
        require(reputation[msg.sender] > 0, "Insufficient reputation");
        _;
    }

    function submitFact(string memory _content) public {
        bytes32 factHash = keccak256(abi.encodePacked(_content, msg.sender, block.timestamp));
        facts[factHash] = Fact(_content, msg.sender, block.timestamp, false);
        emit FactSubmitted(factHash, msg.sender, _content);
    }

    function voteFact(bytes32 _factHash, bool _vote) public onlyReputable {
        require(facts[_factHash].timestamp > 0, "Fact does not exist");
        votes[_factHash] += _vote ? 1 : 0;
        emit VoteCasted(_factHash, msg.sender, _vote);
    }

    function verifyFact(bytes32 _factHash) public onlyReputable {
        require(facts[_factHash].timestamp > 0, "Fact does not exist");
        require(votes[_factHash] >= 3, "Not enough votes to verify");
        facts[_factHash].verified = true;
        reputation[msg.sender] += 1;
        emit FactVerified(_factHash, msg.sender);
    }

    function increaseReputation(address _user) public {
        reputation[_user] += 1;
    }
}
