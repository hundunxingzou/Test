const { getProvider, getWalletProvider } = require('../../chains/providers');
const { erc721Contract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class Erc721TokenDemo {
    address = '';

    constructor(erc721_token) {
        this.address = erc721_token;
    }
    // setApprovalForAll

    ///TODO: ERC721 相关的读写调用方法
}

module.exports = Erc721TokenDemo;