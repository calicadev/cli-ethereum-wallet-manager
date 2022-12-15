import fs from 'fs'
import { ethers } from 'ethers'

const generateWallets = (amount: number) => {
  const wallets: ethers.Wallet[] = []
  for (let i = 0; i < amount; i++) {
    const wallet = ethers.Wallet.createRandom()
    wallets.push(wallet)
  }
  saveWallets(wallets)
}

const saveWallets = (wallets: ethers.Wallet[]) => {
  for (let i = 0; i < wallets.length; i++) {
    fs.appendFileSync('./wallets.csv', `walletgen ${i + 1},${wallets[i].address},${wallets[i].privateKey}\n`)
  }

}

export default generateWallets
