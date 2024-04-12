// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract ArticleRegister {
    struct Article {
        string hash; // keep track
        string metadata;
        uint256 timestamp;
    }

    mapping(string => Article) public articles;

    event ArticleRegistered(string hash, string metadata, uint256 timestamp);

    function registerArticle(string memory _hash, string memory _metadata) public {
        require(bytes(articles[_hash].hash).length == 0, "Article already registered.");
        articles[_hash] = Article(_hash, _metadata, block.timestamp);
        emit ArticleRegistered(_hash, _metadata, block.timestamp);
    }

    function getArticle(string memory _hash) public view returns (Article memory) {
        require(bytes(articles[_hash].hash).length != 0, "Article not found.");
        return articles[_hash];
    }
}
