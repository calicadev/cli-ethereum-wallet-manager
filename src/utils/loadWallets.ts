import fs from 'fs'
import csv from 'csv-parser'

import Wallet from "../types/Wallet";

const loadWallets = async (): Promise<Wallet[]> => {
  const walletArray: Wallet[] = [];

  return new Promise((resolve) => {
    fs.createReadStream('wallets.csv')
      .pipe(csv())
      .on('data', (data) => {
        const wallet: Wallet = {
          identifer: data.Identifier,
          address: data.Address,
          privateKey: data['Private Key']
        }
        walletArray.push(wallet);
      })
      .on('end', () => {
        resolve(walletArray);
      });
  });
}

export default loadWallets;