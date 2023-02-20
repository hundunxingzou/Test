'use strict';

const { ethers } = require("ethers");

/**
 * 获取ERC20标准合约
 * @param {String} contractAddress ERC20合约地址
 * @param {Provider} provider RPC Provider
 * @returns contract
 */
function erc20Contract(contractAddress, provider) {
    const abi = require('./abis/erc_20.json');
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
}

/**
 * 获取ERC721标准合约
 * @param {String} contractAddress ERC721合约地址
 * @param {Provider} provider RPC Provider
 * @returns contract
 */
function erc721Contract(contractAddress, provider) {
    const abi = require('./abis/erc_721.json');
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
}

/**
 * 获取ERC1155标准合约
 * @param {String} contractAddress ERC1155合约地址
 * @param {Provider} provider RPC Provider
 * @returns contract
 */
function erc1155Contract(contractAddress, provider) {
    const abi = require('./abis/erc_1155.json');
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
}

// function  stakingNFTContract(contractAddress, provider) {
//     const abi = require('./abis/StakingNFT.json');
//     const contract = new ethers.Contract(contractAddress, abi, provider);

//     return contract;
// }
function  FactoryContract(contractAddress, provider) {
    const abi = require('./abis/Factory.json');
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
}
function  RouterContract(contractAddress, provider) {
    const abi = require('./abis/Router.json');
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
}
function  pairContract(contractAddress, provider) {
    const abi = require('./abis/pair.json');
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
}
function  SwapMiningContract(contractAddress, provider) {
    const abi = require('./abis/SwapMining.json');
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
}

module.exports = {
    erc20Contract,
    erc721Contract,
    erc1155Contract,
    FactoryContract,
    RouterContract,
    pairContract,
    SwapMiningContract,
    // stakingNFTContract,

}