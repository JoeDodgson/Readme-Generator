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

        // Using inquirer, get the input information needed from the user
        const { readmeFileName } = await inquirer.prompt([{
            message: "Enter a file name for your new readme (remember to include the file extension, e.g. README.md):",
            name: "readmeFileName"
            }
        ]);

        // Check if there is an existing README file which may be overwritten.
        if(fs.existsSync(readmeFileName)) {
            // Tell user this will overwrite existing README file. Ask if they want to continue
            const { stillContinueYN } = await inquirer.prompt({
                type: "list",
                message: `You already have an existing file named ${readmeFileName} which will be overwritten when you run this script.\nDo you want to continue?`,
                name: "stillContinueYN",
                choices: ["Yes", "No"]
            });
            
            if (stillContinueYN === "No") {
                console.log("Come back once you have backed up your existing file.");
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
            }
        ]);

        // Use the Github username entered by the user to form a Github API query URL
        const queryUrl = `https://api.github.com/users/${answers.username}`;
        
        // Perform a .get method API call using axios, feeding in the queryURL
        const { data } = await axios.get(queryUrl);

        // Check if there is an email associated with the Github user account
        if(data.email){
            // Ask user if they want to use Github email
            const includeGithubEmail = await inquirer.prompt({
                    type: "list",
                    message: "Are you happy for your github email address to be used as your contact email? If not, enter an alternative email address",
                    name: "YN",
                    choices: ["Yes", "No"]
                }
            )
            if(includeGithubEmail.YN === "Yes"){
                const email = {
                    address: data.email
                }
            }
        }

        // If no Github email exists or user chose not to include, ask to provide alternative email
        if(!data.email || includeGithubEmail.YN === "No"){
            const email = await inquirer.prompt({
                message: "Please enter a contact email address:",
                name: "address"
            });
        }

        // {
        //     message: "Please select any additional types of contact information you would like to include:",
        //     name: "contact"
        // }

        console.log(data);

        // Use the Github username and repo name to form a license shield URL
        const licenseShieldMD = `![GitHub](https://img.shields.io/github/license/${answers.username}/${answers.repo}?logoColor=%23ff0000)`

        // Create a readme file and write the content based on user input
        const readmeContent = 
        `# ${answers.title}\n\n## Table of contents:\n1. Description\n2. Installation\n3. Usage\n4. Author\n5. Contributing\n6. License\n7. Tests\n8. Contact\n\n## 1. Description:\n${answers.description}\n\n## 2. Installation:\n${answers.installation}\n\n## 3. Usage:\n${answers.usage}\n\n## 4. Author:\n${answers.name}\nGithub username: ${answers.username}\n<img src="${data.avatar_url}">\n\n## 5. Contributing:\n${answers.contributing}\n\n## 6. License:\n\n${licenseShieldMD}\n\n## 7. Tests:\nThe project passed the following tests:\n${answers.tests}\n\n## 8. Contact:\nFor any questions about this project, please contact me at any of the following:\nEmail:${email.address}`;
        
        const file = await writeFileAsync(readmeFileName, readmeContent);

        // Give a message to tell the user the file has been created.
        console.log("Your README file was created successfully!");

    } catch (error) {
        console.log(error);
    }
}

// Call the createReadme function
createReadme();