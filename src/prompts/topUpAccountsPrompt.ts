import inquirer from "inquirer";
import loadWallets from "../utils/loadWallets";
import topUpAccounts from "../utils/topUpAccounts";

import Wallet from "../types/Wallet";

interface TopUpAccountsInput {
  sender: string;
  receiver: string[];
  amount: number;
}

const topUpAccountsPrompt = async () => {
  const wallets = await loadWallets();
  try {
    const {sender, receiver, amount}: TopUpAccountsInput = await inquirer.prompt([
      {
        type: 'list',
        name: 'sender',
        message: 'Select sender wallet',
        choices: wallets.map((wallet: Wallet) => wallet.identifer)
      },
      {
        type: 'checkbox',
        name: 'receiver',
        message: 'Select receiver wallets',
        choices: wallets.map((wallet: Wallet) => wallet.identifer)
      },
      {
        type: 'number',
        name: 'amount',
        message: 'How much would you like to top up the accounts with?'
      }
    ])

    const senderWallet: Wallet = wallets.find((wallet: Wallet) => wallet.identifer === sender) as Wallet;
    const receiverWallets: Wallet[] = wallets.filter((wallet: Wallet) => receiver.includes(wallet.identifer)) as Wallet[];

    topUpAccounts(senderWallet, receiverWallets, amount)
  } catch (err) {
    if (err.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment')
    } else {
      console.log('Something went wrong')
    }
  }
}

export default topUpAccountsPrompt