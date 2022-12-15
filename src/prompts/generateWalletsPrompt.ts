import inquirer from 'inquirer';

import generateWallets from '../utils/generateWallets';

const generateWalletsPrompt = async () => {
	try {
		const { numberOfWallets } = await inquirer.prompt([
			{
				type: 'number',
				name: 'numberOfWallets',
				message: 'How many wallets would you like to generate?',
			},
		]);

		generateWallets(numberOfWallets);
		
	} catch (err) {
		if (err.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment')
    } else {
      console.log('Something went wrong')
    }
	}
};

export default generateWalletsPrompt;
