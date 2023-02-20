const { getProvider, getWalletProvider } = require('../../chains/providers');
const { RouterContract } = require('../../chains/contracts/contract');
const { erc721Contract } = require('../../chains/contracts/contract');
const { erc20Contract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class RouterDemo {
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
    //使用ETH购买多个NFT(不同的池子)
    async swapETHForAnyNFTs(key='',swapLis = '', Recipient = '', nftRecipient = '', deadline = '',sum='') {
        const wallet = getWalletProvider(key);
        const token_sol = RouterContract(this.address, wallet);

        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const amount = ethers.utils.parseEther(sum);
        const approve_gas_limit = await token_sol.estimateGas.swapETHForAnyNFTs(swapLis, Recipient, nftRecipient, deadline, { value: amount })

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.swapETHForAnyNFTs(swapLis, Recipient, nftRecipient, deadline, { value: amount })
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }
    }
    // 标记
    //#### 使用ETH购买具体ID的NFT
    async swapETHForSpecificNFTs(key='',swapList = '', Recipient = '', nftRecipient = '', deadline = '',sum='') {
        const wallet = getWalletProvider(key);
        const token_sol = RouterContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const amount = ethers.utils.parseEther(sum);
        const approve_gas_limit = await token_sol.estimateGas.swapETHForSpecificNFTs(swapList, Recipient, nftRecipient, deadline, { value: amount })


        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.swapETHForSpecificNFTs(swapList, Recipient, nftRecipient, deadline, { value: amount })
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 将具体ID的NFT用ETH为中介兑换称另一个池子的NFT(没有具体ID)
    async swapNFTsForAnyNFTsThroughETH(trade = '', minOutput = '', ethRecipient = '', nftRecipient = '', deadline = '') {
        const wallet = getWalletProvider();
        const token_sol = RouterContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const amount = ethers.utils.parseEther("0.0003");
        const approve_gas_limit = await token_sol.estimateGas.swapNFTsForAnyNFTsThroughETH(trade, minOutput, ethRecipient, nftRecipient, deadline, { value: amount })

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.swapNFTsForAnyNFTsThroughETH(trade, minOutput, ethRecipient, nftRecipient, deadline, { value: amount })
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 将具体ID的NFT用ETH为中介兑换称另一个池子的NFT(有具体ID)
    async swapNFTsForSpecificNFTsThroughETH(trade = '', minOutput = '', ethRecipient = '', nftRecipient = '', deadline = '') {
        const wallet = getWalletProvider();
        const token_sol = RouterContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const amount = ethers.utils.parseEther("0.0003");
        const approve_gas_limit = await token_sol.estimateGas.swapNFTsForSpecificNFTsThroughETH(trade, minOutput, ethRecipient, nftRecipient, deadline, { value: amount })

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.swapNFTsForSpecificNFTsThroughETH(trade, minOutput, ethRecipient, nftRecipient, deadline, { value: amount })
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 标记
    // 将具体ID的NFT兑换成ETH或者ERC20(目前只支持ETH)
    async swapNFTsForToken(key='',swapList = '', minOutput = '', tokenRecipient = '', deadline = '') {
        const wallet = getWalletProvider(key);
        const token_sol = RouterContract(this.address, wallet);
        const approve_gas_limit = await token_sol.estimateGas.swapNFTsForToken(swapList, minOutput, tokenRecipient, deadline)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.swapNFTsForToken(swapList, minOutput, tokenRecipient, deadline)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 用尽可能多的ETH(指定的)兑换一个池子的NFT(没有具体ID)
    async robustSwapETHForAnyNFTs(swapList = '', Recipient = '', nftRecipient = '', deadline = '') {
        const wallet = getWalletProvider();
        const token_sol = RouterContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const amount = ethers.utils.parseEther("0.0003");
        const approve_gas_limit = await token_sol.estimateGas.robustSwapETHForAnyNFTs(swapList, Recipient, nftRecipient, deadline, { value: amount })

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.robustSwapETHForAnyNFTs(swapList, Recipient, nftRecipient, deadline, { value: amount })
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // #### 用尽可能多的ETH(指定的)兑换一个池子的NFT(有具体ID)
    async robustSwapETHForSpecificNFTs(swapList = '', Recipient = '', nftRecipient = '', deadline = '') {
        const wallet = getWalletProvider();
        const token_sol = RouterContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const amount = ethers.utils.parseEther("0.0003");
        const approve_gas_limit = await token_sol.estimateGas.robustSwapETHForSpecificNFTs(swapList, Recipient, nftRecipient, deadline, { value: amount })

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.robustSwapETHForSpecificNFTs(swapList, Recipient, nftRecipient, deadline, { value: amount })
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // #### 用一个池子的NFT(有具体ID)兑换成代币
    async robustSwapNFTsForToken(swapList = '', tokenRecipient = '', deadline = '') {
        const wallet = getWalletProvider();
        const token_sol = RouterContract(this.address, wallet);
        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用

        const approve_gas_limit = await token_sol.estimateGas.robustSwapNFTsForToken(swapList, tokenRecipient, deadline)

        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.robustSwapNFTsForToken(swapList, tokenRecipient, deadline)
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }

    }
    // 在一笔交易中用ETH购买NFT并将其出售
    async robustSwapETHForSpecificNFTsAndNFTsToToken(params = '') {
        const wallet = getWalletProvider();
        const token_sol = RouterContract(this.address, wallet);
        const amount = ethers.utils.parseEther("0.0003");
        const approve_gas_limit = await token_sol.estimateGas.robustSwapETHForSpecificNFTsAndNFTsToToken(params, { value: amount })
        const options = {
            gasPrice: gasPrice.mul(2).toString(),
            gasLimit: approve_gas_limit.mul(2).toString()
        }
        console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址, 授权额度为最大值. 合约正在交互中...`);

        // 完成写入操作,返回交易信息
        const approve_tx = await token_sol.robustSwapETHForSpecificNFTsAndNFTsToToken(params, { value: amount })
        console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

        await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
        console.log(`已完成1个区块确认, 合约交互完成`);
    }


}




module.exports = RouterDemo;