const { getProvider, getWalletProvider} = require('../../chains/providers');
const { FactoryContract } = require('../../chains/contracts/contract');
const { RouterContract } = require('../../chains/contracts/contract');
const { erc721Contract } = require('../../chains/contracts/contract');
const { erc20Contract } = require('../../chains/contracts/contract');
const { SwapMiningContract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class SwapMiningDemo{
    address = '';
    constructor(test_address) {
        this.address = test_address;
    }
    async approve(spender_contract = '') {
        try {
            const wallet = getWalletProvider();
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
    // 查询每个区块的奖励
    async getcoinPerBlock(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getcoinPerBlock=await instance.coinPerBlock();
        console.log(
            getcoinPerBlock.toString()
        )
    }
    // 查询总权重
    async gettotalAllocPoint(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const gettotalAllocPoint=await instance.totalAllocPoint();
        console.log(
            gettotalAllocPoint.toString()
        )
    }
    // 查询预言机地址
    async getoracle(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getoracle=await instance.oracle();
        console.log(
            getoracle.toString()
        )
    }
    // 查询奖励的代币地址
    async getcoin(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getcoin=await instance.coin();
        console.log(
            getcoin.toString()
        )
    }
    // 查询sudo工厂合约的地址
    async getfactory(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getfactory=await instance.factory();
        console.log(
            getfactory.toString()
        )
    }
    // 查询手续费进来后兑换的锚定代币
    async gettargetToken(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const gettargetToken=await instance.targetToken();
        console.log(
            gettargetToken.toString()
        )
    }
    // 查询系列池详情
    async getpoolInfo(index=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getpoolInfo=await instance.poolInfo(index);
        console.log(
            getpoolInfo.toString()
        )
    }
    // 查询此系列是否已经添加池子
    async getadded(addressnft=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getadded=await instance.added(addressnft);
        console.log(
            getadded.toString()
        )
    }
    // 查询此系列的PID
    async getpairOfPid(addressnft=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getpairOfPid=await instance.pairOfPid(addressnft);
        console.log(
            getpairOfPid.toString()
        )
    }
    // 查询用户在不同池子的信息
    async getuserInfo(pid='',user=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getuserInfo=await instance.userInfo(pid,user);
        console.log(
            getuserInfo.toString()
        )
    }
    // 查询池子的数量
    async poolLength(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getpoolLength=await instance.poolLength();
        console.log(
            getpoolLength.toString()
        )
    }
    // 批量添加NFT系列
    async addSeries(_nfts = '',_allocPoint = '',  _withUpdate = '') {
        const wallet = getWalletProvider();
        const token_sol = SwapMiningContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.addSeries(_nfts, _allocPoint, _withUpdate)
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.addSeries(_nfts, _allocPoint, _withUpdate)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 更改nft系列权重、开始结束区块
    async setSeriesAllocPoint(apt = '',  _withUpdate = '') {
        const wallet = getWalletProvider();
        const token_sol = SwapMiningContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.setSeriesAllocPoint(apt,_withUpdate)
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.setSeriesAllocPoint(apt, _withUpdate)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 批量更新池子
    async massMintPools() {
        const wallet = getWalletProvider();
        const token_sol = SwapMiningContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.massMintPools()
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.massMintPools()
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 更新指定池子
    async mint(pid='') {
        const wallet = getWalletProvider();
        const token_sol = SwapMiningContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.mint(pid)
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.mint(pid)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 提取指定池子的奖励
    async withdrawWithPid(key='',pid='') {
        const wallet = getWalletProvider(key);
        const token_sol = SwapMiningContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.withdrawWithPid(pid)
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.withdrawWithPid(pid)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 提取所有池子的奖励
    async withdrawAll(key='') {
        const wallet = getWalletProvider(key);
        const token_sol = SwapMiningContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.withdrawAll()
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.withdrawAll()
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 获取用户在指定池子的奖励
    async getUserReward(_user='',pids='',){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getUserReward=await instance.getUserReward(_user,pids);
        console.log(
            ethers.utils.formatUnits(getUserReward)
        )
    }
    // 获取用户所有池子的奖励
    async getUserAllReward(_user='') {
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getUserAllReward=await instance.getUserAllReward(_user);
        console.log(
            ethers.utils.formatUnits(getUserAllReward)
            
        )
    }
    // 获取指定池子的信息
    async getPoolInfo(pids=''){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getPoolInfo=await instance.getPoolInfo(pids);
        console.log(
            getPoolInfo.toString()
        )
    }
    // 获取所有池子的信息
    async getAllPoolInfo(){
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = SwapMiningContract(this.address, provider);
        const getAllPoolInfo=await instance.getAllPoolInfo();
        console.log(
            getAllPoolInfo.toString()
        )
    }



}
module.exports = SwapMiningDemo;
