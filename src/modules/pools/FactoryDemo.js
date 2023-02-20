const { getProvider, getWalletProvider } = require('../../chains/providers');
const { FactoryContract } = require('../../chains/contracts/contract');
const { RouterContract } = require('../../chains/contracts/contract');
const { erc721Contract } = require('../../chains/contracts/contract');
const { erc20Contract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class FactoryDemo {
    address = '';

    constructor(test_address) {
        this.address = test_address;
    }
    async approve(key='',spender_contract = '') {
        try {
            const wallet = getWalletProvider(key);
            const token_sol = erc721Contract(this.address, wallet);

            // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
            const approve_gas_limit = await token_sol.estimateGas.setApprovalForAll(spender_contract, true);

            // 如果获取到预估Gas费用,则完成最后的写入操作
            if (approve_gas_limit && approve_gas_limit.gt(0)) {
                const gasPrice = await wallet.getGasPrice();

                const options = {
                    gasPrice: gasPrice.mul(2).toString(),
                    gasLimit: approve_gas_limit.mul(2).toString()
                }

                console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址(${spender_contract}), 授权额度为最大值. 合约正在交互中...`);

                // 完成写入操作,返回交易信息
                const approve_tx = await token_sol.setApprovalForAll(spender_contract, true);
                console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

                await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
                console.log(`已完成1个区块确认, 合约交互完成`);
            }
        } catch (error) {
            console.log(error)
        }

    }

    async approve2(spender_contract = '') {
        const wallet = getWalletProvider();
        const token_sol = erc20Contract(this.address, wallet);

        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.approve2(spender_contract, ethers.constants.MaxUint256);

        // 如果获取到预估Gas费用,则完成最后的写入操作
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址(${spender_contract}), 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.approve2(spender_contract, ethers.constants.MaxUint256, options);
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }
    }
    // 标记
    //  创建ETH池子
    async createPairETH(key='',nft = '', bondingCurve = '', assetRecipient = '', poolType = '', delta = '', fee = '', spotPrice = '', initialNFTIDs = '',sum='') {
        const wallet = getWalletProvider(key);
        const token_sol = FactoryContract(this.address, wallet);
        const amount = ethers.utils.parseEther(sum);

        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.createPairETH(nft, bondingCurve, assetRecipient, poolType, delta, fee, spotPrice, initialNFTIDs,{ value: amount })

        // 如果获取到预估Gas费用,则完成最后的写入操作
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.createPairETH(nft, bondingCurve, assetRecipient, poolType, delta, fee, spotPrice, initialNFTIDs, { value: amount })
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }


    }
    // 标记
    // 给现有的池子添加NFT
    async depositNFTs(key='',nft = '', ids = '', address = '') {
        const wallet = getWalletProvider(key);
        const token_sol = FactoryContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.depositNFTs(nft, ids, address)
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.depositNFTs(nft, ids, address)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 查询有多少个pair
    async getPairLength(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = FactoryContract(this.address, provider);
        const getSellNFTQuote= await instance.getPairLength()

        console.log(
            getSellNFTQuote.toString()
        )



    }
    // 查询具体的pair
    async pairs(pid=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = FactoryContract(this.address, provider);
        const getSellNFTQuote= await instance.pairs(pid)

        console.log(
            getSellNFTQuote.toString()
        )



    }
    
    

}




module.exports = FactoryDemo;