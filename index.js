// Require in the node modules needed
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Message: welcome to the readme generator. Press enter to continue

// Using inquirer, get the input information needed from the user
inquirer
  .prompt([{
    message: "Enter your GitHub username",
    name: "username"
  },
  {
    message: "Enter a project title",
    name: "title"
  },
  {
    message: "Enter a project description",
    name: "description"
  },
  {
    message: "Enter a table of contents",
    name: "contents"
  },
  {
    message: "Enter any installation details",
    name: "installation"
  },
  {
    message: "Enter any usage information",
    name: "usage"
  },
  {
    message: "Enter any contributing information",
    name: "contributing"
  },
  {
    message: "Enter any tests that the project has passed",
    name: "tests"
  },
  {
    message: "Enter any additional contact information you would like to include",
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

        fs.writeFile("repos.txt"), repoNamesStr, function(err) {
            if (err) {
            throw err;
            }

            console.log(`Saved ${repoNames.length} repos`);
        };

      // Use fs writeFile to write content of the readme

      })
      // Give a message to tell the user the file has been created.
    
  })