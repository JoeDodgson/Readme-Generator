// Require in node modules
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// Require in local files
const { InputQuestion, ListQuestion } = require("./helper");
const { questionData } = require("./questions");

// Promisify the writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

const createReadme = async () => {
    try {
        let question, options, responseValue;
        let responseObj = {};

        // Set the initial question
        let nextQuestionKey = 'welcome';

        // Continue the sequence of questions until a 'next question' value is not set
        while (nextQuestionKey) {
            const questionKey = nextQuestionKey;
            const { type, text } = questionData[questionKey];
            switch (type) {
                case 'Input':
                    question = new InputQuestion(text, questionKey);
                    break;
                case 'List':
                    options = questionData[questionKey].options;
                    question = new ListQuestion(text, questionKey, options);
                    break;
                case 'Action':
                    questionData[questionKey].action();
                    break;
                default:
                    throw `Question type ${type} not handled`;
            }

            if (type === 'Input' || type === 'List') {
                // Use the inquirer module to prompt the user with the question
                response = await inquirer.prompt(question.returnString());
                responseValue = response[questionKey];
    
                // Store the user's response in the responseObj
                responseObj[questionKey] = responseValue;
            }

            else if (type === 'Action') {
                responseValue = responseObj;
            }

            // Feed the response into the nextQuestion method
            nextQuestionKey = await questionData[questionKey].nextQuestion(responseValue);
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