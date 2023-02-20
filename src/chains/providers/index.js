'use strict'

const { ethers } = require('ethers')
require('dotenv').config()
// dotenv.config();

function getProvider(url = '') {
  const rpc_url = url || process.env.RPC_URL

  const provider = new ethers.providers.JsonRpcProvider(rpc_url)
  return provider
}

function getWalletProvider(key='',url='') {
  const private_key = key|| process.env.PRIVATE_KEY
  const rpc_url = url || process.env.RPC_URL

  const provider = new ethers.providers.JsonRpcProvider(rpc_url)
  const wallet = new ethers.Wallet(private_key, provider)

  return wallet
}
// function getWalletProvider2(key='',url='') {
//   const private_key = key|| process.env.PRIVATE_KEY
//   const rpc_url = url || process.env.RPC_URL

//   const provider = new ethers.providers.JsonRpcProvider(rpc_url)
//   const wallet = new ethers.Wallet(private_key, provider)

//   return wallet
// }

module.exports = {
  getProvider,
  getWalletProvider,
  // getWalletProvider2,
}
