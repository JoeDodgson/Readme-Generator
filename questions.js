// Class for all questions
class PromptQuestion {
    constructor (message, name) {
        this.message = message;
        this.name = name;
    }
}

// Class for 'choices' type questions
class ChoiceQuestion extends PromptQuestion {
    constructor (message, name, choices) {
        super(message, name);
        this.type = "list";
        this.choices = choices;
    }
}

// Use classes to generate the questions
const question1 = new ChoiceQuestion("Welcome to the readme generator. Would you like to generate a readme?", "continueYN", ["Yes", "No"]);
const question2 = new PromptQuestion("Enter a file name for your new readme (remember to include the file extension, e.g. README.md):", "readmeFileName");
const question3 = new PromptQuestion("Enter your name:", "name");
const question4 = new PromptQuestion("Enter your GitHub username:", "username");
const question5 = new PromptQuestion("Enter a project title:", "title");
const question6 = new PromptQuestion("Enter the name of the project repository as it appears on Github:", "repo");
const question7 = new PromptQuestion("Enter a project description:", "description");
const question8 = new PromptQuestion("Enter any installation details:", "installation");
const question9 = new PromptQuestion("Enter any usage information:", "usage");
const question10 = new PromptQuestion("Enter any contributing information:", "contributing");
const question11 = new PromptQuestion("Enter information about the testing carried out on the project:", "tests");


// Export generated questions array

// Import the readmeFileName variable from the index.js file

// Do not create question 3 until the user has entered the readmeFileName
const question3 = new ChoiceQuestion(`A file named ${readmeFileName} already exists in the Generated README folder.\nThis will be overwritten when you run this script.\nDo you want to continue?`, "stillContinueYN", ["Yes", "No"]);
