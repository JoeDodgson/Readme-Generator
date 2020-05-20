// Require in the node modules needed
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Promisify the writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

// Define an async await function which creates a readme based on used input
async function createReadme() {
    try {

        // Message: welcome to the readme generator. Press enter to continue
        
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

        // Create a readme file and write the content based on user input
        const readmeContent = 
        `# ${answers.title}\n\n## Description:\n${answers.description}\n\n## Table of contents:\n${answers.contents}\n\n## Installation:\n${answers.installation}\n\n## Usage:\n${answers.usage}\n\n## Author:\n${answers.name}\nGithub username: ${answers.username}\n${data.avatar_url}\n\n## Contributing:\n${answers.contributing}\n\n## Tests:\nThe project passed the following tests:\n${answers.tests}\n\n## Contact:\n${answers.contact}`;
        
        const file = await writeFileAsync("readme.md", readmeContent);

        // Give a message to tell the user the file has been created.
        console.log("Created readme file");

    } catch (error) {
        console.log(error);
    }
}

// Call the createReadme function
createReadme();