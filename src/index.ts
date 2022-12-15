import inquirer from "inquirer";
import figlet from 'figlet'

import generateWalletsPrompt from "./prompts/generateWalletsPrompt";
import checkBalancesPrompt from "./prompts/checkBalancesPrompt";
import topupAccountsPrompt from "./prompts/topUpAccountsPrompt";

const main = async () => {

  console.log(figlet.textSync('Wallet Manager'))

  try {
    const { option } = await inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: ['Generate wallets', 'Check balances', 'Top up accounts']
      }
    ])
    
    switch (option) {
      case 'Generate wallets':
        generateWalletsPrompt();
        break;
      case 'Check balances':
        checkBalancesPrompt();
        break;
      case 'Top up accounts':
        topupAccountsPrompt();
        break;
    }

  } catch (err) {
    if (err.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment')
    } else {
      console.log('Something went wrong')
    }
  }

}

main();