# BlockVerify

BlockVerify is a decentralized application (dApp) designed to combat misinformation by allowing users to register and analyze articles on the Ethereum blockchain. The application leverages smart contracts to ensure the integrity and traceability of articles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Register articles with a unique hash and metadata.
- Retrieve registered articles from the blockchain.
- Analyze articles for sentiment and potential misinformation using Natural Language Processing (NLP).
- Store articles in a MongoDB database for easy retrieval and analysis.

## Technologies Used

- **Ethereum**: Smart contracts for decentralized article registration.
- **Truffle**: Development framework for Ethereum.
- **Express.js**: Web framework for building the backend API.
- **MongoDB**: NoSQL database for storing articles.
- **Web3.js**: JavaScript library for interacting with the Ethereum blockchain.
- **NLTK**: Natural Language Toolkit for NLP tasks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blockverify.git
   cd blockverify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Truffle globally if you haven't already:
   ```bash
   npm install -g truffle
   ```

4. Set up your environment variables:
   - Create a `.env` file in the root directory and add your Infura project ID and mnemonic:
     ```
     MNEMONIC=<Your 12 phrase mnemonic>
     PROJECT_ID=<Your Infura project id>
     ```

5. Compile and migrate the smart contracts:
   ```bash
   truffle migrate --network development
   ```

6. Start the backend server:
   ```bash
   node backend/server.js
   ```

## Usage

- Access the API at `http://localhost:3001`.
- Use the following endpoints to interact with the application.

## API Endpoints

### Register an Article

- **POST** `/registerArticle`
- Request Body:
  ```json
  {
    "hash": "unique_article_hash",
    "metadata": "Article metadata"
  }
  ```

### Analyze an Article

- **POST** `/analyze`
- Request Body:
  ```json
  {
    "content": "Article content to analyze"
  }
  ```

### Retrieve All Articles

- **GET** `/articles`

### Retrieve a Specific Article

- **GET** `/articles/:id`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
