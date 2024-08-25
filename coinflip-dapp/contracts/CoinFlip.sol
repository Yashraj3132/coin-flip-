// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool _choice) public payable {
        require(msg.value > 0, "You need to send some ether");
        bool outcome = (block.timestamp % 2 == 0);
        if (outcome == _choice) {
            payable(msg.sender).transfer(msg.value * 2);
        }
    }
}

