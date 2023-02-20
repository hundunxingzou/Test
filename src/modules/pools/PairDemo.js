const { getProvider, getWalletProvider} = require('../../chains/providers');
const { pairContract } = require('../../chains/contracts/contract');
const { erc721Contract } = require('../../chains/contracts/contract');
const { erc20Contract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class PairDemo{
    address='';
    constructor(test_address) {
        this.address = test_address;
    }
    // 标记
    // 提取池子的NFT
    async withdrawERC721(key='',address='',nids=''){
        const wallet = getWalletProvider(key);
        const token_sol = pairContract(this.address, wallet);

        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.withdrawERC721(address, nids)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.withdrawERC721(address, nids)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 标记
    //提取池子的所有金额
    async withdrawAllETH(key=''){
        const wallet = getWalletProvider(key);
        const token_sol = pairContract(this.address, wallet);

        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.withdrawAllETH()

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.withdrawAllETH()
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 标记
    // 提取池子的部分金额
    async withdrawETH(key='',amount=''){
        const wallet = getWalletProvider(key);
        const token_sol = pairContract(this.address, wallet);

        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.withdrawETH(amount)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.withdrawETH(amount)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 估算购买池子中一定数量NFT金额
    async getBuyNFTQuote(num=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = pairContract(this.address, provider);
        const getSellNFTQuote= await instance.getBuyNFTQuote(num)

        console.log(
            getSellNFTQuote.toString()
        )



    }
    // 估算NFT兑换代币的手续费
    async getSellNFTQuote(num=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = pairContract(this.address, provider);
        const getSellNFTQuote= await instance.getSellNFTQuote(num)

        console.log(
            getSellNFTQuote.toString()
        )



    }
    // 标记
    // 更改现价
    async changeSpotPrice(key='',newSpotPrice=''){
        const wallet = getWalletProvider(key);
        const token_sol = pairContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.changeSpotPrice(newSpotPrice)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.changeSpotPrice(newSpotPrice)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 标记
    // 更改增长
    async changeDelta(key='',newDelta=''){
        const wallet = getWalletProvider(key);
        const token_sol = pairContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.changeDelta(newDelta)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.changeDelta(newDelta)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 标记
    // 更改手续费
    async changeFee(key='',newFee=''){
        const wallet = getWalletProvider(key);
        const token_sol = pairContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.changeFee(newFee)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.changeFee(newFee)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 标记
    // 更改资产接收的(双边池不能设置)
    async changeAssetRecipient(key='',newRecipient=''){
        const wallet = getWalletProvider(key);
        const token_sol = pairContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.changeAssetRecipient(newRecipient)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.changeAssetRecipient(newRecipient)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    //查询现价
    async spotPrice(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = pairContract(this.address, provider);
        const spotPrice= await instance.spotPrice();

        console.log(
            spotPrice.toString()
        )



    }
    //查询增长
    async delta(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = pairContract(this.address, provider);
        const delta= await instance.delta();

        console.log(
            delta.toString()
        )



    }
    // 查询手续费
    async fee(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = pairContract(this.address, provider);
        const fee= await instance.fee();

        console.log(
            fee.toString()
        )



    }
    // 查询资产接受地址
    async assetRecipient(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = pairContract(this.address, provider);
        const assetRecipient= await instance.assetRecipient();

        console.log(
            assetRecipient.toString()
        )



    }




}
module.exports = PairDemo;