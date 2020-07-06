// Require in the node modules needed
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const validator = require("validator");

// Require in local files
const questions = require("./questions");
const ListQuestion = questions.ListQuestion;
const InputQuestion = questions.InputQuestion;

// Declare variables to be used in the app
const email = {};

// Use classes required from questions.js to generate the questions
const question1 = new ListQuestion("Welcome to the readme generator. Would you like to generate a readme?", "continueYN", ["Yes", "No"]);
const question2 = new InputQuestion("Enter a file name for your new readme (remember to include the file extension, e.g. README.md):", "readmeFileName");
const question4 = new InputQuestion("Enter your name:", "name");
const question5 = new InputQuestion("Enter your GitHub username:", "username");
const question6 = new InputQuestion("Enter a project title:", "title");
const question7 = new InputQuestion("Enter the name of the project repository as it appears on Github:", "repo");
const question8 = new InputQuestion("Enter a project description:", "description");
const question9 = new InputQuestion("Enter any installation details:", "installation");
const question10 = new InputQuestion("Enter any usage information:", "usage");
const question11 = new InputQuestion("Enter any contributing information:", "contributing");
const question12 = new InputQuestion("Enter information about the testing carried out on the project:", "tests");
const question13 = new ListQuestion("Are you happy for your github email address to be used as your contact email? If not, enter an alternative email address", "YN", ["Yes", "No"]);
const question14 = new InputQuestion("Please enter a contact email address:", "address");
const question15 = new InputQuestion("The email address you entered is not valid. Please enter a valid email address:", "address");

// Promisify the writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

// Define an async await function which creates a readme based on user input
async function createReadme() {
    try {
        // First question: would you like to generate a readme?
        const { continueYN } = await inquirer.prompt(question1.returnString());

        if (continueYN === "No") {
            console.log("Ok, well if you change your mind you know where to find me...");
            return;
        };

        // Ask user to enter a file name
        const { readmeFileName } = await inquirer.prompt(question2.returnString());

        // Use that file name to generate a file path 
        const readmeFilePath = `./Generated_README/${readmeFileName}`;

        // Generate the question using the file name that the user entered
        const question3 = new questions.ListQuestion(`A file named ${readmeFileName} already exists in the Generated README folder.\nThis will be overwritten when you run this script.\nDo you want to continue?`, "stillContinueYN", ["Yes", "No"]);

        // Check if there is an existing README file which may be overwritten
        if(fs.existsSync(readmeFilePath)) {
            // Tell user this will overwrite existing README file. Ask if they want to continue
            const { stillContinueYN } = await inquirer.prompt(question3.returnString());
            
            if (stillContinueYN === "No") {
                console.log("Come back once you have backed up your existing file.");
                return;
            };
        }

        // Using inquirer, get the input information needed from the user
        const answers = await inquirer.prompt([question4.returnString(), question5.returnString(), question6.returnString(), question7.returnString(), question8.returnString(), question9.returnString(), question10.returnString(), question11.returnString(), question12.returnString()]);

        // Use the Github username entered by the user to form a Github API query URL
        const queryUrl = `https://api.github.com/users/${answers.username}`;
        
        // Perform a .get method API call using axios, feeding in the queryURL
        const { data } = await axios.get(queryUrl);

        // Check if there is an email associated with the Github user account
        if(data.email){
            // Ask user if they want to use Github email
            const includeGithubEmail = await inquirer.prompt(question13.returnString());

            if(includeGithubEmail.YN === "Yes"){
                email.address =  data.email;
            }
        }

        // If no Github email exists or user chose not to include, ask to provide alternative email
        if(!data.email || includeGithubEmail.YN === "No"){
            // Ask the user to enter an alternative email
            let alternativeEmail = await inquirer.prompt(question14.returnString());

            // Check if the user has entered a valid email address. 
            let trueEmail = validator.isEmail(alternativeEmail.address);
            
            // If user has not entered a valid email address, ask them to enter a different one
            while (!trueEmail) {
                alternativeEmail = await inquirer.prompt(question15.returnString());
                trueEmail = validator.isEmail(alternativeEmail.address);
            }
            email.address = alternativeEmail.address;
        }

        // Use the Github username and repo name to form a license shield URL
        const licenseShieldMD = `![GitHub](https://img.shields.io/github/license/${answers.username}/${answers.repo}?logoColor=%23ff0000)`

        // Create a readme file and write the content based on user input
        const readmeContent = 
        `# ${answers.title}\n\n## Table of contents:\n1. Description\n2. Installation\n3. Usage\n4. Author\n5. Contributing\n6. License\n7. Tests\n8. Contact\n\n## 1. Description:\n${answers.description}\n\n## 2. Installation:\n${answers.installation}\n\n## 3. Usage:\n${answers.usage}\n\n## 4. Author:\n${answers.name}\nGithub username: ${answers.username}\n<img src="${data.avatar_url}">\n\n## 5. Contributing:\n${answers.contributing}\n\n## 6. License:\n\n${licenseShieldMD}\n\n## 7. Tests:\nThe project passed the following tests:\n${answers.tests}\n\n## 8. Contact:\nFor any questions about this project, please contact ${answers.name} at the following email address:\n${email.address}`;
        
        const file = await writeFileAsync(readmeFilePath, readmeContent);

        // Give a message to tell the user the file has been created.
        console.log("Your README file was created successfully!");

    } catch (error) {
        console.log(error);
    }
}

// Call the createReadme function
createReadme();