// Require in the node modules needed
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Promisify the writeFile function
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// Define an async await function which creates a readme based on used input
async function createReadme() {
    try {

        // Message: welcome to the readme generator. Press enter to continue
        const { continueYN } = await inquirer.prompt({
            type: "list",
            message: "Welcome to the readme generator. Would you like to generate a readme?",
            name: "continueYN",
            choices: ["Yes", "No"]
        });

        if (continueYN === "No") {
            console.log("Ok, well if you change your mind you know where to find me...");
            return;
        };

        // Check if there is an existing README file which may be overwritten.
        if(fs.existsSync("README.md")) {
            // Tell user this will overwrite existing README file. Ask if they want to continue
            const { stillContinueYN } = await inquirer.prompt({
                type: "list",
                message: "You already have an existing README.md file which will be overwritten when you run this script.\nDo you want to continue?",
                name: "stillContinueYN",
                choices: ["Yes", "No"]
            });
            
            if (stillContinueYN === "No") {
                console.log("Come back once you have backed up your existing README.md file.");
                return;
            };
        }

        // Using inquirer, get the input information needed from the user
        const answers = await inquirer.prompt([{
                message: "Enter your name:",
                name: "name"
            },
            {
                message: "Enter your GitHub username:",
                name: "username"
            },
            {
                message: "Enter a project title:",
                name: "title"
            },
            {
                message: "Enter the name of the project repository as it appears on Github:",
                name: "repo"
            },
            {
                message: "Enter a project description:",
                name: "description"
            },
            {
                message: "Enter a table of contents:",
                name: "contents"
            },
            {
                message: "Enter any installation details:",
                name: "installation"
            },
            {
                message: "Enter any usage information:",
                name: "usage"
            },
            {
                message: "Enter any contributing information:",
                name: "contributing"
            },
            {
                message: "Enter any tests that the project has passed:",
                name: "tests"
            },
            {
                message: "Enter any additional contact information you would like to include:",
                name: "contact"
            }
        ]);

        // Use the Github username entered by the user to form a Github API query URL
        const queryUrl = `https://api.github.com/users/${answers.username}`;
        
        // Perform a .get method API call using axios, feeding in the queryURL
        const { data } = await axios.get(queryUrl);

        // Use the Github username and repo name to form a license shield URL
        const licenseShieldURL = `https://img.shields.io/github/license/${answers.username}/${answers.repo}?logoColor=%23ff0000`
        // Badge: ![GitHub](https://img.shields.io/github/license/JoeDodgson/Readme-Generator?logoColor=%23ff0000)

        // Create a readme file and write the content based on user input
        const readmeContent = 
        `# ${answers.title}\n\n## Description:\n${answers.description}\n\n## Table of contents:\n${answers.contents}\n\n## Installation:\n${answers.installation}\n\n## Usage:\n${answers.usage}\n\n## Author:\n${answers.name}\nGithub username: ${answers.username}\n${data.avatar_url}\n\n## Contributing:\n${answers.contributing}\n\n##License:\n${licenseShieldURL}\n\n## Tests:\nThe project passed the following tests:\n${answers.tests}\n\n## Contact:\n${answers.contact}`;
        
        const file = await writeFileAsync("readme.md", readmeContent);

        // Give a message to tell the user the file has been created.
        console.log("Your README.md file was created successfully!");

    } catch (error) {
        console.log(error);
    }
}

// Call the createReadme function
createReadme();