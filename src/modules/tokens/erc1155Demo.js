const { getProvider, getWalletProvider } = require('../../chains/providers');
const { erc1155Contract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class Erc1155TokenDemo {
    address = '';

    constructor(erc1155_token) {
        this.address = erc1155_token;
    }

    ///TODO: ERC1155 相关的读写调用方法
}

module.exports = Erc1155TokenDemo;