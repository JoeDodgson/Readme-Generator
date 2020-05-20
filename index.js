// Require in the node modules needed
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");

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
  .then(function({username}) {
    console.log(username);
  });

// Use axios to perform an API call using the Github API
// Store the user's profile image and email

// Use fs createFile to create a readme.md
// Use fs writeFile to write content of the readme
// Give a message to tell the user the file has been created.