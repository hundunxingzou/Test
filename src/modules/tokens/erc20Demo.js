const { getProvider, getWalletProvider } = require('../../chains/providers');
const { erc20Contract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class Erc20TokenDemo {
    address = '';

    constructor(erc20_token) {
        this.address = erc20_token;
    }

    // 查询示例方法 (合约的读取方法)
    // 代币的基本查询方法
    async queryTokenInfo() {
        const provider = getProvider(); // 创建一个链网络RPC节点
        const token_sol = erc20Contract(this.address, provider);    // 通过ERC20代币合约地址创建一个合约实例对象

        /// 调用合约 ABI 里的对应(读取)方法
        const token_name = await token_sol.name();  // 查询代币合约名称
        const token_symbol = await token_sol.symbol();  // 查询代币合约标识
        const token_decimals = await token_sol.decimals();  // 查询代币精度

        console.log(
            "ERC20 代币基本信息: \n",
            `代币名称: ${token_name}\n`,
            `代币标识: ${token_symbol}\n`,
            `代币精度: ${token_decimals}\n`
        );
    }

    // 查询示例方法 (合约的读取方法)
    // 查询一个地址的erc20代币在一个合约的授权额度
    async queryAllowance(owner_address = '', spender_contract = '') {
        const provider = getProvider(); // 创建一个链网络RPC节点
        const token_sol = erc20Contract(this.address, provider);    // 通过ERC20代币合约地址创建一个合约实例对象

        // 查询授权额度（带精度）
        let allowance = await token_sol.allowance(owner_address, spender_contract);
        console.log(`\n用户地址:(${owner_address}) 在合约（${spender_contract}）的授权额度为: ${allowance.toString()} (带精度)`)

        // 查询授权额度（不带精度）
        const token_decimals = await token_sol.decimals();  // 查询代币精度
        allowance = ethers.utils.formatUnits(allowance, token_decimals);
        console.log(`用户地址:(${owner_address}) 在合约（${spender_contract}）的授权额度为: ${allowance} (不带精度)`)
    }

    // 写入示例方法 (合约的写入链上方法)
    // 用户将erc20代币授权指定额度给一个合约地址
    async approve(spender_contract = '') {
        const wallet = getWalletProvider();
        const token_sol = erc20Contract(this.address, wallet);

        // 执行写入操作之前,先用 estimateGas 进行执行检查和预估本次执行需要的Gas费用
        const approve_gas_limit = await token_sol.estimateGas.approve(spender_contract, ethers.constants.MaxUint256);

        // 如果获取到预估Gas费用,则完成最后的写入操作
        if (approve_gas_limit && approve_gas_limit.gt(0)) {
            const gasPrice = await wallet.getGasPrice();

            const options = {
                gasPrice: gasPrice.mul(2).toString(),
                gasLimit: approve_gas_limit.mul(2).toString()
            }

            console.log(`\n用户地址: (${wallet.address}) 发起授权给合约地址(${spender_contract}), 授权额度为最大值. 合约正在交互中...`);

            // 完成写入操作,返回交易信息
            const approve_tx = await token_sol.approve(spender_contract, ethers.constants.MaxUint256, options);
            console.log(`合约交互成功, 交易哈希为: ${approve_tx.hash}`);

            await approve_tx.wait(1);   // 等待一个区块确认,确保合约执行成功
            console.log(`已完成1个区块确认, 合约交互完成`);
        }
    }
}

module.exports = Erc20TokenDemo;