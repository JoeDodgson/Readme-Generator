// Require in node modules
const axios = require("axios");
const validator = require("validator");
const fs = require("fs");
const util = require("util");

// Promisify the writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

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
        'action': responseObj => {},
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
            let validEmail = validator.isEmail(response);

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
            return 'projectTitle';
        }
    },
    'projectTitle': {
        'text': 'Enter a project title:',
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
            return 'createFile';
        }
    },
    'createFile': {
        'text': null,
        'type': 'Action',
        'action': async responseObj => {
            try {
                // Define filepath using filename
                const readmeFilePath = `./Generated_README/${responseObj.filename}`;

                // Use the Github username and repo name to form a license shield URL
                const licenseShieldMD = `![GitHub](https://img.shields.io/github/license/${responseObj.githubUser}/${responseObj.githubRepo}?logoColor=%23ff0000)`
                
                // Create a readme file and write the content based on user input
                const title = `# ${responseObj.projectTitle}\n\n`;
                const toc = `## Table of contents:\n1. Description\n2. Installation\n3. Usage\n4. Author\n5. Contributing\n6. License\n7. Tests\n8. Contact\n\n`;
                const description = `## 1. Description:\n${responseObj.description}\n\n`;
                const installation = `## 2. Installation:\n${responseObj.installation}\n\n`;
                const usage = `## 3. Usage:\n${responseObj.usage}\n\n`;
                const avatar_url = `https://github.com/${responseObj.githubUser}.png`
                const author = `## 4. Author:\n${responseObj.username}\n\nGithub username: ${responseObj.githubUser}\n\n<img src="${avatar_url}">\n\n`;
                const contributing = `## 5. Contributing:\n${responseObj.contributing}\n\n`;
                const license = `## 6. License:\n${licenseShieldMD}\n\n`;
                const testing = `## 7. Testing:\n${responseObj.testing}\n\n`;
                let contact = `## 8. Contact:\nFor any questions about this project, please contact ${responseObj.username} at the following email address:\n`;
                if (responseObj.githubEmail === 'Yes') {
                    contact += responseObj.githubEmail;
                } 
                else {
                    contact += responseObj.contactEmail;
                }
                const readmeContent = title + toc + description + installation + usage + author + contributing + license + testing + contact;
                
                const file = await writeFileAsync(readmeFilePath, readmeContent);

                // Give a message to tell the user the file has been created.
                console.log("Your README file was created successfully!");
            }
            catch (error) {
                console.log(`Error - questions.js - questionData.createFile.action() - ${error}`);
            }
        },
        'nextQuestion': response => {}
    },
}

let readme = {}

// Export generated questions array
module.exports = {
    questionData: questionData,
};