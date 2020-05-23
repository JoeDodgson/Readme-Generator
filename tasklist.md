Tasks
DONE -Pseudocode the logic of the functionality
DONE -Create required files
DONE -npm init
DONE -install the required node modules
DONE -Create a .gitignore and add files and folders which we don't want to upload onto the repo
DONE -Write the JS file
DONE -Structure JS to move variable declaration to the top
-Change as much to ES6 as possible
-Comment through all the code
-Record a video showing the tool working
-Write the readme


Pseudocode:
DONE -Require in the different node modules
DONE -Prompt the user to provide:
    -Github username
    -Project title
    -Description
    -Table of contents
    -Installation
    -Usage
    -Contributing
    -Tests
    -FAQs
    -contact
DONE -Axios to perform API call using github API
DONE -Store Github profile image and email
DONE -Use fs writeFile to create a readme.md and write the content of the readme
DONE -Give a message to tell the user the file has been created.
DONE -Turn the function into an async await
DONE -Ensure there is a catch to handle errors
DONE -Add a welcome message at the start of the createReadme function
DONE -Add in a check to see if a readme file already exists
DONE -Badges functionality
DONE -Display image correctly
DONE -Table of contents appears correctly
DONE -Are you happy for your github email address to be used as your contact email? If not, enter an alternative email address

Optional:
-Select the readme from a list of the user's repos on github
-Specific extra contact details - select from a list of contact options, then prompt the user to enter something for each one selected
-Turn yes-no's into confirms
-Refactor: Use object creator functions to create similar objects