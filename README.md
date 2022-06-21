### voting_app

# 1.voting_sc
 - This is hardhat smart contract project for the VotingFactory.sol and VotingPoll.sol
 - It had been already deployed on Ropsten network: 0x432443f987fE3F4e6e6AB6CE7118c2632A558187
 - If you want to redeploy it, you can run the below commands.
```console
$ cd voting_sc
$ npm install
$ npx hardhat run .\deploy\00_VotingFactory.js --network ropsten
```
 - After deployed, you can verify it by using the following command. (note: please replace the address with new deployed address.)
```console
$ npx hardhat verify 0x432443f987fE3F4e6e6AB6CE7118c2632A558187 --network ropsten
```
 - Now you can go to the etherscan, and you can create votingPoll on it directly.
 - After that you can copy and paste the address on the voting-dapp/.env file.

# 2.voting-dapp

## Install
- run the following command
```console
$ cd voting-dapp
$ npm install
```

## Set .env
- If you want to change the smart contract address, you can replace it in .env file.
- If not, you can use the default contract address that had been already deployed.
- 

## Run
- run the code
```console
$ npm run start
```

