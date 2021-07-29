// Require in node modules
const inquirer = require("inquirer");

// Require in local files
const { InputQuestion, ListQuestion } = require("./helper");
const { questionData } = require("./questions");

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
                    questionData[questionKey].action(responseObj);
                    break;
                default:
                    throw `Question type ${type} not handled`;
            }

            if (type === 'Input' || type === 'List') {
                // Use the inquirer module to prompt the user with the question
                response = await inquirer.prompt(question.returnString());

                // Validate the user has entered a response
                if (!response[questionKey]) {
                    console.log(`Response cannot be empty.`)
                    continue;
                }

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
    }
    catch (error) {
        console.log(`Error - controller.js - createReadme() - ${error}`);
    }
}

// Export createReadme function
module.exports = {
    createReadme: createReadme,
};