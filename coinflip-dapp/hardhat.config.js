require("@nomiclabs/hardhat-waffle");
require("dotenv").config(); // Load environment variablesnpm install @nomiclabs/hardhat-waffle ethereum-waffle chai

console.log(process.env.INFURA_PROJECT_ID);
console.log(process.env.PRIVATE_KEY);

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
