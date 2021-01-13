// Require in node modules
const fs = require("fs");
const util = require("util");

// Class for all questions
class InputQuestion {
    constructor (message, name) {
        this.message = message;
        this.name = name;
    }

    returnString() {
        return JSON.parse(`{"message" : "${this.message}",
        "name" : "${this.name}"}`);
    }
}

// Class for 'list' type questions
class ListQuestion extends InputQuestion {
    constructor (message, name, choices) {
        super(message, name);
        this.type = "list";
        this.choices = choices;
    }

    stringifyChoices() {
        return this.choices.join('","');
    }

    returnString() {
        return JSON.parse(`{"type" : "${this.type}",
        "message" : "${this.message}",
        "name" : "${this.name}",
        "choices" : ["${this.stringifyChoices()}"]}`);
    }
}

// Promisify the writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

// Questions data
const questionData = {
    'welcome': {
        'text': 'Welcome to the readme generator. Would you like to generate a readme?',
        'options': ["Yes", "No"],
        'type': 'List',
    },
    'filename': {
        'text': 'Enter a file name for your new readme (remember to include the file extension, e.g. README.md):',
        'type': 'Input',
    },
    'username': {
        'text': 'Enter your name:',
        'type': 'Input',
    },
    'githubUser': {
        'text': 'Enter your GitHub username:',
        'type': 'Input',
    },
    'projectTitle': {
        'text': 'Enter a project title:',
        'type': 'Input',
    },
    'githubRepo': {
        'text': 'Enter the name of the project repository as it appears on Github:',
        'type': 'Input',
    },
    'description': {
        'text': 'Enter a project description:',
        'type': 'Input',
    },
    'installation': {
        'text': 'Enter any installation details:',
        'type': 'Input',
    },
    'usage': {
        'text': 'Enter any usage information:',
        'type': 'Input',
    },
    'contributing': {
        'text': 'Enter any contributing information:',
        'type': 'Input',
    },
    'testing': {
        'text': 'Enter information about the testing carried out on the project:',
        'type': 'Input',
    },
    'githubEmail': {
        'text': 'Are you happy for your github email address to be used as your contact email? If not, enter an alternative email address',
        'options': ["Yes", "No"],
        'type': 'List',
    },
    'contactEmail': {
        'text': 'Please enter a contact email address:',
        'type': 'Input',
    },
}

// Export generated questions array
module.exports = {
    InputQuestion : InputQuestion,
    ListQuestion : ListQuestion,
    writeFileAsync: writeFileAsync,
    questionData: questionData,
};