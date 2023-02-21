async function userpair(key=''){
        const private_key = key
        const rpc_url = config.bscurl
      
        const provider = new ethers.providers.JsonRpcProvider(rpc_url)
        const wallet = new ethers.Wallet(private_key, provider)
      
     
    axios.get('http://8.218.94.153:3006/pool/list',{
        headers: {'account_address': wallet.address},
        params: {
            
            chain_id: 56,
        }
      })
      .then(function (response) {
        console.log(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });  
} 
// 授权创建池子合约
// 参数一：私钥Key
// 参数二：nft系列地址
async function approvefactory(key='',NFTAddress='',) {
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(NFTAddress)

    // 授权合约
    test_instance.approve(key,factory_address);
}   
// 批量授权池子工厂合约
// 参数一：nft系列地址(config文件中必修配置有key)
async function batchapprovefactory(NFTAddress='') {
    const ukey=config.key
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(NFTAddress)
    for(let i=0;i<ukey.length;i++){
        // 授权合约
        test_instance.approve(ukey[i],factory_address);
    }

}
// 批量用户和批量NFT授权（config文件中必修配置有key和NFTAddress）
async function Twobatchapprovefactory(){
    const ukey = config.key
    const NFTAddress=config.NFTAddress
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    for(let j=0;j<NFTAddress.length;j++){
        const test_instance = new FactoryDemo(NFTAddress)
        for(let i=0;i<ukey.length;i++){
        // 授权合约
        test_instance.approve(ukey[i],factory_address);
        }

    }
}   
// 创建双边线性池
//  参数 一:key
// 参数 二 : NFT地址
// 参数 三 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)
// 参数 四 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置（1e18）
// 参数 五 : 现货初始价格(1e18)
// 参数 六 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
// 参数 七 ：初始放入支付金额
async function createbilateralPair(key='',NFTAddress='',increase='',fee='',price='',NFTIDs='',sum=''){
    const Curve=config.linearCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
         //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
  test_instance.createPairETH(key,NFTAddress,Curve,ethers.constants.AddressZero,'2',increase,fee,price,NFTIDs,sum)
}
// 创建双边指数池
//  参数 一:key
// 参数 二 : NFT地址
// 参数 三 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)
// 参数 四 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置（1e18）
// 参数 五 : 现货初始价格(1e18)
// 参数 六 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
// 参数 七 ：初始放入支付金额
async function createbilateralPair2(key='',NFTAddress='',increase='',fee='',price='',NFTIDs='',sum=''){
    const Curve=config.exponentialCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
         //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)

// 参数 十 ：初始放入池子的金额
  test_instance.createPairETH(key,NFTAddress,Curve,ethers.constants.AddressZero,'2',increase,fee,price,NFTIDs,sum)
}
// 创建单边买线性池
//  参数 一:key
// 参数 二 : NFT地址
// 参数 三 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)
// 参数 四 : 现货初始价格(1e18)
// 参数 五 ：初始放入支付金额
async function createBUYPair(key='',NFTAddress='',increase='',price='',sum=''){
    const Curve=config.linearCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    const private_key = key
    const rpc_url = config.bscurl
    const provider = new ethers.providers.JsonRpcProvider(rpc_url)
    const wallet = new ethers.Wallet(private_key, provider)
         //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)

// 参数 十 ：初始放入池子的金额
  test_instance.createPairETH(key,NFTAddress,Curve,wallet.address,'0',increase,0,price,[],sum)
}
// 创建单边买指数池
//  参数 一:key
// 参数 二 : NFT地址
// 参数 三 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)
// 参数 四 : 现货初始价格(1e18)
// 参数 五 ：初始放入支付金额
async function createBUYPair2(key='',NFTAddress='',increase='',price='',sum=''){
    const Curve=config.exponentialCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    const private_key = key
    const rpc_url = config.bscurl
    const provider = new ethers.providers.JsonRpcProvider(rpc_url)
    const wallet = new ethers.Wallet(private_key, provider)
         //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址
// 参数 三 : 曲线类型(线性或者指数)
// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址
// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)
// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)
// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置
// 参数 八 : 现货初始价格
// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)

// 参数 十 ：初始放入池子的金额
  test_instance.createPairETH(key,NFTAddress,Curve,wallet.address,'0',increase,0,price,[],sum)
}
// 创建单边卖线性池
//  参数 一:key
// 参数 二 : NFT地址
// 参数 三 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)
// 参数 四 : 现货初始价格(1e18)
// 参数 五 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
async function createSellPair(key='',NFTAddress='',increase='',price='',NFTIDs=''){
    const Curve=config.linearCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    const private_key = key
    const rpc_url = config.bscurl
    const provider = new ethers.providers.JsonRpcProvider(rpc_url)
    const wallet = new ethers.Wallet(private_key, provider)
         //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)

  test_instance.createPairETH(key,NFTAddress,Curve,wallet.address,'1',increase,0,price,NFTIDs)
}
// 创建单边卖指数池
//  参数 一:key
// 参数 二 : NFT地址
// 参数 三 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)
// 参数 四 : 现货初始价格(1e18)
// 参数 五 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
async function createSellPair2(key='',NFTAddress='',increase='',price='',NFTIDs=''){
    const Curve=config.exponentialCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    const private_key = key
    const rpc_url = config.bscurl
    const provider = new ethers.providers.JsonRpcProvider(rpc_url)
    const wallet = new ethers.Wallet(private_key, provider)
         //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
  test_instance.createPairETH(key,NFTAddress,Curve,wallet.address,'1',increase,0,price,NFTIDs)
}
// 给现有池子加NFT
// 参数 一：key
// 参数 二 : NFT地址
// 参数 三 : NFT的TokenID
// 参数 四 : 接受的池子地址
async function depositNFTs(key='',NFTAddress='',NFTIDs='',PID=''){
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
// 给现有池子加NFT
    // 参数 一：key
    // 参数 二 : NFT地址
    // 参数 三 : NFT的TokenID
    // 参数 四 : 接受的池子地址
       test_instance.depositNFTs(key,NFTAddress,NFTIDs,PID)
}
// 卖时NFT授权给交易合约
// 参数一：私钥Key
// 参数二：nft系列地址
async function approverouter(key='',NFTAddress='') {
    const router_address = "0x14688f159EaFe290bf86C9945Bf4EA62a197c5C8"
    const test_instance = new RouterDemo(NFTAddress)
     test_instance.approve(key,router_address);
}
// 批量用户NFT授权交易合约
// 参数一：nft系列地址（config文件中必修配置有key）
async function batchapproverouter(NFTAddress=''){
    const ukey = config.key
    const router_address = "0x14688f159EaFe290bf86C9945Bf4EA62a197c5C8"
    const test_instance = new RouterDemo(NFTAddress)
    for(let i=0;i<ukey.length;i++){
        // 授权合约
        test_instance.approve(ukey[i],router_address);
    }
}
// 批量用户和批量NFT授权（config文件中必修配置有key和NFTAddress）
async function Twobatchapproverouter(){
    const ukey = config.key
    const NFTAddress=config.NFTAddress
    const router_address = "0x14688f159EaFe290bf86C9945Bf4EA62a197c5C8"
    for(let j=0;j<NFTAddress.length;j++){
        const test_instance = new RouterDemo(NFTAddress)
        for(let i=0;i<ukey.length;i++){
        // 授权合约
        test_instance.approve(ukey[i],router_address);
        }
    }
}
{   // 单个池子具体数量的NFT
    // const swap_list = [{
    //     pair: "0xAe426adb52850f86B8e5A8A4aC05E4189E54Ea9E",
    //     numItems: 1
    // }]
    // // 多个池子具体ID的NFT
    // const swap_list2 = [{
    //     pair: "0xf4b81ecf49f5002eda57b144006c300a9b121253",
    //     nftIds: ['20191', '20172']
    // }, {
    //     pair: "0x9b49341cf45781cb6ae4ec8e20964b2818125b6f",
    //     nftIds: ['20181']
    // }]
    // // 单个池子具体ID的NFT
    // const swap_list3 = [{
    //     pair: "0x496143993b989864e5b16be5b8daa72b435f36b3",
    //     nftIds: ['26', '10']
    // }]
}
// 用NFT买ETH
// 参数一：key
// 参数二：如上NFT集合
// 参数三：最少要收到的Token数量
// 参数四：代币接收地址
async function swapNFTsForToken(key='',swap_list='',minOutput='',tokenRecipient=''){
        const router_address = "0x14688f159EaFe290bf86C9945Bf4EA62a197c5C8"
        const test_instance = new RouterDemo(router_address)
        const deadline = Math.ceil(new Date().getTime() / 100) + 24 * 60 * 60 * 1000 - 1;
    // 用NFT买ETH
    // 参数一：如上NFT集合
    // 参数二：最少要收到的Token数量
    // 参数三：代币接收地址
    // 参数四：时效
         test_instance.swapNFTsForToken(key,swap_list,minOutput,tokenRecipient, deadline);
} 
//  用代币购买一定数量的的NFT
//  参数 一 ：key
// 参数 二 : 需要购买的池子地址和NFT数量集合
// 参数 三 : 剩余NFT的接收地址(一般为发起者地址)
// 参数 四 : NFT接收地址
// 参数 五 ：支付金额
async function swapETHForAnyNFTs(key='',swap_list='',ethRecipient='',nftRecipient='',sum=''){
        const router_address = "0x14688f159EaFe290bf86C9945Bf4EA62a197c5C8"
        const test_instance = new RouterDemo(router_address)
        const deadline = Math.ceil(new Date().getTime() / 100) + 24 * 60 * 60 * 1000 - 1;
        //  用代币购买一定数量的的NFT
    //  参数 一 ：key
//      参数 二 : 需要购买的池子地址和NFT数量集合
//      参数 三 : 剩余NFT的接收地址(一般为发起者地址)
//      参数 四 : NFT接收地址
//      参数 五 ：支付金额
//      参数 六 : 过期时间(每次调用都会有一个过期时间,超出这个时间会直接失败)
      test_instance.swapETHForAnyNFTs(key,swap_list,ethRecipient, nftRecipient,sum, deadline);
}
//用代币购买一定数量的的NFT
// 参数 一 ：key
// 参数 二 : 需要购买的池子地址和NFT的ID集合数组
// 参数 三 : 剩余NFT的接收地址(一般为发起者地址)
// 参数 四 : NFT接收地址
// 参数 五 ：支付金额
async function swapETHForSpecificNFTs(key='',swap_list='',ethRecipient='',nftRecipient='',sum=''){
        const router_address = "0x14688f159EaFe290bf86C9945Bf4EA62a197c5C8"
        const test_instance = new RouterDemo(router_address)
        const deadline = Math.ceil(new Date().getTime() / 100) + 24 * 60 * 60 * 1000 - 1;
        //  用代币购买具体ID的NFT
    //  参数 一 ：key
//      参数 二 : 需要购买的池子地址和NFT的ID集合数组
//      参数 三 : 剩余NFT的接收地址(一般为发起者地址)
//      参数 四 : NFT接收地址
//      参数 五 ：支付金额
//      参数 六 : 过期时间(每次调用都会有一个过期时间,超出这个时间会直接失败)
      test_instance.swapETHForSpecificNFTs(key,swap_list,ethRecipient, nftRecipient,sum, deadline);
}
 //修改现价 参数一：key 参数二：池子地址  参数三：新价格(1e18)
async function changeSpotPrice(key='',pair_address='',newSpotPrice='') {
    // 池子地址
    const test_instance=new PairDemo(pair_address)
    //修改现价 参数一：key 参数二：新价格
     test_instance.changeSpotPrice(key,newSpotPrice)
}
//修改增长 参数一：key 参数二：池子地址  参数三：新增长数量（1e18）
async function changeDelta(key='',pair_address='',newDelta='') {
    // 池子地址
    const test_instance=new PairDemo(pair_address)
    //修改增长  参数一：key 参数二：新增长数量
     test_instance.changeDelta(key,newDelta)
}
//修改手续费仅双边池有 参数一：key 参数二：池子地址  参数三：新手续费（1e18）
async function changeFee(key='',pair_address='',newFee='') {
    // 池子地址
    const test_instance=new PairDemo(pair_address)
    //修改手续费仅双边池有  参数一：key 参数二：新手续费
     test_instance.changeFee(key,newFee)
}
//修改资产接受地址 参数一：key 参数二：池子地址  参数三：新接受地址
async function changeAssetRecipient(key='',pair_address='',newAssetRecipient='') {
    // 池子地址
    const test_instance=new PairDemo(pair_address)
     //修改资产接受地址  参数一：key 参数二：新接受地址
     test_instance.changeAssetRecipient(key,newAssetRecipient)
}
//提取池子的所有金额 参数一：key 参数二：池子地址
async function withdrawAllETH(key='',pair_address='') {
    // 池子地址
    const test_instance=new PairDemo(pair_address)
    //提取池子的所有金额 参数KEY
     test_instance.withdrawAllETH(key)
}
// 提取池子的部分金额 参数一：key 参数二：池子地址  参数三：提取数量
async function withdrawETH(key='',pair_address='',amount='') {
    // 池子地址
    const test_instance=new PairDemo(pair_address)
    // 提取池子的部分金额 参数一：key 参数二：提取数量
     test_instance.withdrawETH(key,amount)
}
// 批量创建单边卖线性池（config文件中配置好key与NFTAddress）
// 参数一：曲线增长数量
// 参数二：价格
async function batchcreateSellPair(increase='',price=''){
    const ukey=config.key
    const NFTAddress=config.NFTAddress
    const Curve=config.linearCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    for(let i=0;i<ukey.length;i++){
        const private_key = ukey[i]
        const rpc_url = config.bscurl
        const provider = new ethers.providers.JsonRpcProvider(rpc_url)
        const wallet = new ethers.Wallet(private_key, provider)
        for (let j=0;j<NFTAddress.length;j++){
            var NFTIDs=[]
            axios.get('http://8.218.94.153:3006/nft/list',{
            headers: {'account_address': wallet.address},
            params: {
            token_address:NFTAddress[j],
            chain_id: 56,
        }
      })
      .then(function (response) {
        for(let k=0;k<3;k++){
            NFTIDs[k]=response.data.result.data[k].token_id
        }
        // console.log(response.data.result);
        // console.log(NFTIDs)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
       //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)

      test_instance.createPairETH(ukey[i],NFTAddress[j],Curve,wallet.address,'1',increase,0,price,NFTIDs) 
      }

    }
}
// 批量创建单边卖指数池（config文件中配置好key与NFTAddress）
// 参数一：曲线增长数量
// 参数二：价格
async function batchcreateSellPair2(increase='',price=''){
    const ukey=config.key
    const NFTAddress=config.NFTAddress
    const Curve=config.exponentialCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    for(let i=0;i<ukey.length;i++){
        const private_key = ukey[i]
        const rpc_url = config.bscurl
        const provider = new ethers.providers.JsonRpcProvider(rpc_url)
        const wallet = new ethers.Wallet(private_key, provider)
        for (let j=0;j<NFTAddress.length;j++){
            var NFTIDs=[]
            axios.get('http://8.218.94.153:3006/nft/list',{
            headers: {'account_address': wallet.address},
            params: {
            token_address:NFTAddress[j],
            chain_id: 56,
        }
      })
      .then(function (response) {
        for(let k=0;k<3;k++){
            NFTIDs[k]=response.data.result.data[k].token_id
        }
        // console.log(response.data.result);
        // console.log(NFTIDs)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
       //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)

      test_instance.createPairETH(ukey[i],NFTAddress[j],Curve,wallet.address,'1',increase,0,price,NFTIDs) 
      }

    }

}
// 批量创建双边线性池（config文件中配置好key与NFTAddress）
// 参数一：曲线增长数量(1e18)
// 参数二：手续费（1e18）
// 参数三：价格（1e18）
// 参数三：初始放入池子的金额
async function batchTowcreatePair(increase='',fee='',price='',sum=''){
    const ukey=config.key
    const NFTAddress=config.NFTAddress
    const Curve=config.linearCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    for(let i=0;i<ukey.length;i++){
        const private_key = ukey[i]
        const rpc_url = config.bscurl
        const provider = new ethers.providers.JsonRpcProvider(rpc_url)
        const wallet = new ethers.Wallet(private_key, provider)
        for (let j=0;j<NFTAddress.length;j++){
            var NFTIDs=[]
            axios.get('http://8.218.94.153:3006/nft/list',{
            headers: {'account_address': wallet.address},
            params: {
            token_address:NFTAddress[j],
            chain_id: 56,
        }
      })
      .then(function (response) {
        // let resp_data = response.data.result.data;
        for(let k=0;k<3;k++){
            NFTIDs[k]=response.data.result.data[k].token_id
        }
        // console.log(response.data.result);
        // console.log(NFTIDs)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
       //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
// 参数十：初始放入池子中的代币数量

      test_instance.createPairETH(ukey[i],NFTAddress[j],Curve,ethers.constants.AddressZero,'2',increase,fee,price,NFTIDs,sum) 
      }

    }

}
// 批量创建双边指数池（config文件中配置好key与NFTAddress）
// 参数一：曲线增长数量(1e18)
// 参数二：手续费（1e18）
// 参数三：价格（1e18）
// 参数三：初始放入池子的金额
async function batchTowcreatePair2(increase='',fee='',price='',sum=''){
    const ukey=config.key
    const NFTAddress=config.NFTAddress
    const Curve=config.exponentialCurve_address
    const factory_address = "0xd6947A0DeC7968ABa606D474601dE57ab5679bed"
    const test_instance = new FactoryDemo(factory_address)
    for(let i=0;i<ukey.length;i++){
        const private_key = ukey[i]
        const rpc_url = config.bscurl
        const provider = new ethers.providers.JsonRpcProvider(rpc_url)
        const wallet = new ethers.Wallet(private_key, provider)
        for (let j=0;j<NFTAddress.length;j++){
            var NFTIDs=[]
            axios.get('http://8.218.94.153:3006/nft/list',{
            headers: {'account_address': wallet.address},
            params: {
            token_address:NFTAddress[j],
            chain_id: 56,
        }
      })
      .then(function (response) {
        for(let k=0;k<3;k++){
            NFTIDs[k]=response.data.result.data[k].token_id
        }
        // console.log(response.data.result);
        // console.log(NFTIDs)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
       //  创建池子分别输入
    //  参数 一:key
// 参数 二 : NFT地址

// 参数 三 : 曲线类型(线性或者指数)

// 参数 四 : 资产接受地址,单边池适用,一般为创建者自己的地址.双边池这里设置为0地址

// 参数 五 : 池子类型(0: Token(用ETH买NFT),1 : NFT(卖NFT换ETH), 2 : TRAND)

// 参数 六 : 曲线的增长(线性池任意数都可以,指数池必须大于1e18)

// 参数 七 : 每次交易收取的手续费,池子必须为TRAND类型时才可以设置

// 参数 八 : 现货初始价格

// 参数 九 : 初始化放进池子的NFT(根据池子的类型决定传不传,可以为空数组)
// 参数十：初始放入池子中的代币数量

      test_instance.createPairETH(ukey[i],NFTAddress[j],Curve,ethers.constants.AddressZero,'2',increase,fee,price,NFTIDs,sum) 
      }

    }

}
// 批量地址购买希望价格的NFT（config文件中配置好key与NFTAddress可以多个系列或者一个系列） 
// 参数一：希望的nft购买价格 
// 参数二: 支付金额（因为要添加gas费，所以sum一般要大于hopesum）
async function batchswapETHForAnyNFTs(hopesum='',sum=''){
    const ukey=config.key
    const NFTAddress=config.NFTAddress
    const router_address = "0x14688f159EaFe290bf86C9945Bf4EA62a197c5C8"
    const test_instance = new RouterDemo(router_address)
    const deadline = Math.ceil(new Date().getTime() / 100) + 24 * 60 * 60 * 1000 - 1;
    for(let i=0;i<ukey.length;i++){
        const private_key = ukey[i]
        const rpc_url = config.bscurl
        const provider = new ethers.providers.JsonRpcProvider(rpc_url)
        const wallet = new ethers.Wallet(private_key, provider)
        for (let j=0;j<NFTAddress.length;j++){
            axios.get('http://8.218.94.153:3006/info/contract/pools',{
            params: {
            token_address:NFTAddress[j],
            chain_id: 56,
        }
      })
      .then(function (response) {
        const data=response.data.result.data
        for(let k=0;k<data.length;k++){
            if(data[k].buy_price<=hopesum && data[k].buy_price>0){
                const swap_list = [{
                    pair: data[k].pool_address,
                    numItems: 1
                     }]
                     //  参数 一 ：key
//      参数 二 : 需要购买的池子地址和NFT数量集合
//      参数 三 : 剩余NFT的接收地址(一般为发起者地址)
//      参数 四 : NFT接收地址
//      参数 五 ：支付金额
//      参数 六 : 过期时间(每次调用都会有一个过期时间,超出这个时间会直接失败)
                     test_instance.swapETHForAnyNFTs(ukey[i],swap_list,wallet.address,wallet.address,sum, deadline);
            }
        }
        // console.log(response.data.result);
        // console.log(NFTIDs)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
    }
    }
}
// 每分钟30S时，执行一次批量买的操作
// 参数一：希望的nft购买价格 
// 参数二: 支付金额（因为要添加gas费，所以sum一般要大于hopesum）
async function buyrule(hopesum='',sum=''){
    rule.second = 30;
        let job = schedule.scheduleJob(rule, () => {
            batchswapETHForAnyNFTs(hopesum,sum)

         }); 
}
