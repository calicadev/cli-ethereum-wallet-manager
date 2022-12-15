import { ethers } from "ethers"
import dotenv from "dotenv"
dotenv.config()

import Wallet from "../types/Wallet"

const topUpAccounts = async (sender: Wallet, receiver: Wallet[], amount: number) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL as string)
  const wallet = new ethers.Wallet(sender.privateKey, provider)

  for (let i = 0; i < receiver.length; i++) {
    const tx = {
      to: receiver[i].address,
      value: ethers.utils.parseEther(amount.toString())
    }

    const transaction = await wallet.sendTransaction(tx)
    console.log(`Transaction hash: ${transaction.hash}`)
    await transaction.wait()
  }

  console.log('Successfully topped up accounts')
}

export default topUpAccounts