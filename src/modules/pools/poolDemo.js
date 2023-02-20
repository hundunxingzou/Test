const { getProvider, getWalletProvider } = require('../../chains/providers');
const { stakingNFTContract } = require('../../chains/contracts/contract');
const { ethers } = require('ethers');

class PoolDemo {
    address = '';

    constructor(pool_address) {
        this.address = pool_address;
    }
    async Id_sum(index = ''){//池⼦的详情
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const poolInfo = await instance.poolInfo(index) 
        console.log(
            poolInfo.toString()
        )

    }

    async token_sum(index = ''){//获取抵押的代币详情
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const tokenInfo= await instance.tokenInfo(index) 
        console.log(
            tokenInfo.toString()
        )

    }
    async  sum_NFT(userAddress='',pid='',pid2=''){//⽤户在某个池⼦抵押的NFT
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const userInfo = await instance.userInfo(userAddress,pid,pid2) 

        console.log(
            userInfo.toString()
        )

    }
    async work(userAddress =''){//获取⽤户⼯作状态
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const getWorkStatus = await instance.getWorkStatus(userAddress)

        console.log(
            getWorkStatus.toString()
        )

    }
    async MintRate(){//获取当前的产出率
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const getCurrentMintRate = await instance.getCurrentMintRate()

        console.log(
            getCurrentMintRate.toString()
        )
    }
    async UserNft(userAddress =''){//获取⽤户有多少个可以质押的NFT
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const getUserNft=await instance.getUserNft(userAddress)

        console.log(
            getUserNft.toString()
        )


    }
    async UserDepositTokenLength(userAddress=''){//获取⽤户质押了多少个NFT
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const getUserDepositTokenLength = await instance.getUserDepositTokenLength(userAddress)

        console.log(
            getUserDepositTokenLength.toString
        
        )
        


    }

    

    async UserDepositTokenID(userAddress = '') {//返回⽤户质押的所有NFT
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const user_deposit = await instance.getUserDepositTokenID(userAddress)
        // const award = await instance.pen
        
        
        console.log(
            user_deposit.toString()
        )
    }
    async Total_Reward(tid = ''){//池子代币总奖励

        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const total_reward = await instance.pending(tid)
        console.log(
            total_reward.toString()/1e+18
        )

    }
    async Award(userAddress ='',pid = ''){//获取⽤户在当前池⼦的奖励
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const award =await instance.pendingWithPool(userAddress,pid)
        console.log(
            award.toString()/1e+18
        )
    }
    async UserPending(userAddress=''){//获取⽤户质押NFT所有的奖励
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const getUserPending=await instance.getUserPending(userAddress)

        console.log(
            getUserPending.toString()
        )

    }
    async Fatigue(tid=''){//获取当前的疲劳值
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const getFatigue = await instance.getFatigue(tid)
        console.log(
            getFatigue.toString()
        )
    }
    async ClearCoin(tid=''){//获取当前清除疲劳值所需要的代币数量
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const getClearCoin=await instance.getClearCoin(tid)
        console.log(
            getClearCoin.toString()
        )

    }
    async clear(tid=''){//清除疲劳值
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const clearfatigueValues =await instance.clearfatigueValues(tid)
        console.log(
            clearfatigueValue.toString()
        )
    }
async TagAward(userAddress ='',pid = ''){//获取⽤户在当前池⼦的奖励
        const provider = getProvider(); // 创建一个链网络RPC节点
        const instance = stakingNFTContract(this.address, provider)
        const award =await instance.pendingWithPool(userAddress,pid,{ blockTag:20168650})
        console.log(
            'award',
            award.toString()/1e+18
        )
}
async Tagtal_Reward(tid = ''){//池子代币总奖励

    const provider = getProvider(); // 创建一个链网络RPC节点
    // const  num= await provider.getBlockNumber()
    // console.log(num);

    const instance = stakingNFTContract(this.address, provider)
    const total_reward = await instance.pending(tid,{ blockTag:20168650})
    console.log(
        total_reward.toString()/1e+18
    )

}
async TagFatigue(tid=''){//获取当前的疲劳值
    const provider = getProvider(); // 创建一个链网络RPC节点
    const instance = stakingNFTContract(this.address, provider)
    const getFatigue = await instance.getFatigue(tid,{ blockTag:20168650})
    console.log(
        getFatigue.toString()
    )
}

}

module.exports = PoolDemo;