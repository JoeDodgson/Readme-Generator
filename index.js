// Require in the node modules needed
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Promisify the writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

// Message: welcome to the readme generator. Press enter to continue

// Using inquirer, get the input information needed from the user
inquirer
  .prompt([{
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
  }]
  )
  // Feed the answers provided by the user into a then promise
  .then(answers => {

    // Use the Github username entered by the user to form a Github API query URL
    const queryUrl = `https://api.github.com/users/${answers.username}`;

    // Perform a .get method API call using axios, feeding in the queryURL
    axios
      .get(queryUrl)
      .then(response => {
        // Store the user's profile image and email
        var data = {};
        data.answers = answers;
        data.userImageURL = response.data.avatar_url;
        data.userGithubEmail = response.data.email;
        return data;
      })
      // Create a readme file and write the content based on user input
      .then(data => {
        var readmeContent = 
        `# ${data.answers.title}\n\n## Description:\n${data.answers.description}\n\n## Table of contents:\n${data.answers.contents}\n\n## Installation:\n${data.answers.installation}\n\n## Usage:\n${data.answers.usage}\n\n## Author:\n${data.answers.name}\nGithub username: ${data.answers.username}\n${data.avatar_url}\n\n## Contributing:\n${data.answers.contributing}\n\n## Tests:\nThe project passed the following tests:\n${data.answers.tests}\n\n## Contact:\n${data.answers.contact}`;
        
        writeFileAsync("readme.md", readmeContent)
        .then(file => {
            // Give a message to tell the user the file has been created.
            console.log("Created readme file");
        });
      })
  });