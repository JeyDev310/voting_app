require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

task("account", "Prints the list of accounts", async(taskArgs, hre) => {
  const accounts = await hre.ethers.getSiners();
  for (const account of accounts) {
    console.log(account.address);
  }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    ropsten: {
      url: ROPSTEN_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 3,
    }
  },
  solidity: "0.8.4",
  etherscan: {
    apiKey: {
      ropsten: ETHERSCAN_API_KEY
    }
  }
};
