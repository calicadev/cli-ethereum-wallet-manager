import inquirer from "inquirer";

import loadWallets from "../utils/loadWallets";
import checkBalances from "../utils/checkBalances";

import Wallet from "../types/Wallet";

const checkBalancesPrompt = async () => {
  const wallets = await loadWallets();
  try {
    const {selectedWalletIdentifiers} = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedWalletIdentifiers',
        message: 'Select wallets to check balances',
        choices: wallets.map((wallet: Wallet) => wallet.identifer)
      }
    ])

    const selectedWallets = wallets.filter((wallet: Wallet) => selectedWalletIdentifiers.includes(wallet.identifer))
    checkBalances(selectedWallets)
  } catch (err) {
    if (err.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment')
    } else {
      console.log('Something went wrong')
    }
  }
}

export default checkBalancesPrompt;