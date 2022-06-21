const hre = require("hardhat");
async function main() {
    const VotingFactory = await hre.ethers.getContractFactory("VotingFactory");
    const votingFactory = await VotingFactory.deploy();
    await votingFactory.deployed();
    console.log(votingFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat run .\deploy\00_VotingFactory.js --network ropsten
  // npx hardhat verify 0x432443f987fE3F4e6e6AB6CE7118c2632A558187 --network ropsten