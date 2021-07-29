// Require in node modules
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
            // Check if a file already exists
            questionData['overwrite']['text'] = `A file named ${response} already exists in the Generated README folder.\nThis will be overwritten when you run this script.\nDo you want to continue?`
            return 'username';
        }
    },
    'overwrite': {
        'text': null,
        'options': ["Yes", "No"],
        'type': 'List',
        'nextQuestion': response => {
            switch (response) {
                case 'Yes':
                    return 'createFile';
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
        'nextQuestion': response => {
            return 'projectTitle';
        }
    },
    'projectTitle': {
        'text': 'Enter a project title:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'githubRepo';
        }
    },
    'githubRepo': {
        'text': 'Enter the name of the project repository as it appears on Github:',
        'type': 'Input',
        'nextQuestion': response => {
            return 'description';
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
            return 'githubEmail';
        }
    },
    'githubEmail': {
        'text': 'Are you happy for your github email address to be used as your contact email? If not, enter an alternative email address',
        'options': ["Yes", "No"],
        'type': 'List',
        'nextQuestion': response => {
            switch (response) {
                case 'Yes':
                    return 'checkFileExists';
                case 'No':
                    return 'contactEmail';
            }
        }
    },
    'contactEmail': {
        'text': 'Please enter an alternative contact email address:',
        'type': 'Input',
        'nextQuestion': response => {
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
            if(fs.existsSync(readmeFilePath)) {
                return 'overwrite';
            }
            else {
                return 'createFile';
            }
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