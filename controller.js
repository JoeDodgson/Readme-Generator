const axios = require("axios");
const inquirer = require("inquirer");
const validator = require("validator");
const { InputQuestion, ListQuestion, writeFileAsync, questionData } = require("./model");

const createReadme = async () => {
    try {
        const questionOrder = ['welcome', 'filename', 'username', 'githubUser', 'projectTitle', 'githubRepo', 'description', 'installation', 'usage', 'contributing', 'testing', 'githubEmail', 'contactEmail']
        
        let responseObj = {};

        for (let i = 0; i < questionOrder.length; i++) {
            const questionKey = questionOrder[i];
            const { type, text } = questionData[questionKey];
            let question, options;
            switch (type) {
                case 'Input':
                    question = new InputQuestion(text, questionKey);
                    break;
                case 'List':
                    options = questionData[questionKey].options;
                    question = new ListQuestion(text, questionKey, options);
                    break;
                default:
                    throw `Question type ${type} not handled`;
            }
            response = await inquirer.prompt(question.returnString());
            responseObj[questionKey] = response[questionKey];
            console.log(responseObj);

            // Next behaviour
            switch (questionKey) {
                case 'welcome':
                    if (responseObj[questionKey] === 'No') {
                        console.log("Ok, well if you change your mind you know where to find me...");
                        return;
                    }
                    break;
                default:
                    break;
            }
        }

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
    }
    catch (error) {
        console.log(`Error - controller.js - createReadme() - ${error}`);
    }
}

// Export createReadme function
module.exports = {
    createReadme: createReadme,
};