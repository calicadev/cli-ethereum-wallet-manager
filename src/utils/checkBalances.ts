import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config()

import Wallet from "../types/Wallet";

const checkBalances = async (wallets: Wallet[]) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  for (const wallet of wallets) {
    const balance = await provider.getBalance(wallet.address);
    const etherBalance = ethers.utils.formatEther(balance);
    
    console.log(`${wallet.identifer}: ${etherBalance} Ξ`);
  }
}

export default checkBalances;