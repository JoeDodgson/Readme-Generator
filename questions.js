// Require in node modules
const axios = require("axios");
const validator = require("validator");
const fs = require("fs");

// Questions data
let questionData = {
    'welcome': {
        'text': 'Welcome to the readme generator. Would you like to generate a readme?',
        'options': ["Yes", "No"],
        'type': 'List',
        'nextQuestion': response => {
            switch (response) {
                case 'Yes':
                    return 'filename';
                case 'No':
                    console.log("Ok, well if you change your mind you know where to find me...");
                    return;
            }
        }
    },
    'filename': {
        'text': 'Enter a file name for your new readme (remember to include the file extension, e.g. README.md):',
        'type': 'Input',
        'nextQuestion': response => {
            questionData['overwrite']['text'] = `A file named ${response} already exists in the Generated README folder.\nThis will be overwritten when you run this script.\nDo you want to continue?`
            return 'checkFileExists';
        }
    },
    'checkFileExists': {
        'text': null,
        'type': 'Action',
        'action': () => {},
        'nextQuestion': response => {
            // TODO - properly format the file path
            const readmeFilePath = `./Generated_README/${response['fileName']}`;
            // Check if a file already exists
            if(fs.existsSync(readmeFilePath)) {
                return 'overwrite';
            }
            else {
                return 'username';
            }
        }
    },
    'overwrite': {
        'text': null,
        'options': ["Yes", "No"],
        'type': 'List',
        'nextQuestion': response => {
            switch (response) {
                case 'Yes':
                    return 'username';
                case 'No':
                    console.log("Come back once you have backed up your existing file.");
                    return;
            }
        }
    },
    'username': {
        'text': 'Enter your name:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'githubUser';
        }
    },
    'githubUser': {
        'text': 'Enter your GitHub username:',
        'type': 'Input',
        'nextQuestion': async response => {
            try {
                // Use the Github username entered by the user to form a Github API query URL
                const queryUrl = `https://api.github.com/users/${response}`;
            
                // Perform a get request to Github API
                const { data } = await axios.get(queryUrl);
            
                // Check if there is an email associated with the Github user account
                if(data.email){
                    return 'githubEmail';
                }
                else {
                    return 'contactEmail';
                }
            }
            catch (error) {
                console.log(`Github username not found`);
                return 'githubUser';

            }
        }
    },
    'githubEmail': {
        'text': 'Are you happy for your github email address to be used as your contact email? If not, enter an alternative email address',
        'options': ["Yes", "No"],
        'type': 'List',
        'nextQuestion': response => {
            switch (response) {
                case 'Yes':
                    return 'githubRepo';
                case 'No':
                    return 'contactEmail';
            }
        }
    },
    'contactEmail': {
        'text': 'Please enter a contact email address:',
        'type': 'Input',
        'nextQuestion': response => {
            // Check if the user has entered a valid email address. 
            let validEmail = validator.isEmail(alternativeEmail.address);

            // If user has not entered a valid email address, ask them to enter a different one
            if (validEmail) {
                return 'githubRepo'
            }
            console.log('Invalid email address.')
            return 'contactEmail';
        }
    },
    // TODO - query the Github API to get a list of the user's repos
    'githubRepo': {
        'text': 'Enter the name of the project repository as it appears on Github:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'description';
        }
    },
    'projectTitle': {
        'text': 'Enter a project title:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'githubRepo';
        }
    },
    'description': {
        'text': 'Enter a project description:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'installation';
        }
    },
    'installation': {
        'text': 'Enter any installation details:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'usage';
        }
    },
    'usage': {
        'text': 'Enter any usage information:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'contributing';
        }
    },
    'contributing': {
        'text': 'Enter any contributing information:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'testing';
        }
    },
    'testing': {
        'text': 'Enter information about the testing carried out on the project:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'createFile';
        }
    },
    'createFile': {
        'text': null,
        'type': 'Action',
        'action': () => {},
        'nextQuestion': response => {
        }
    },
}

let readme = {}

// Export generated questions array
module.exports = {
    questionData: questionData,
};