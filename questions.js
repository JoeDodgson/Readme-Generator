// Class for all questions
class PromptQuestion {
    constructor (message, name) {
        this.message = message;
        this.name = name;
    }

    returnString() {
        return `{message : "${this.message}",
        name : "${this.name}"}`
    }
}

// Class for 'choices' type questions
class ChoiceQuestion extends PromptQuestion {
    constructor (message, name, choices) {
        super(message, name);
        this.type = "choice";
        this.choices = choices;
    }

    stringifyChoices() {
        return this.choices.join('","') + '"';
    }

    returnString() {
        return JSON.parse(`{"type" : "choice",
        "message" : "${this.message}",
        "name" : "${this.name}",
        "choices" : ["${this.stringifyChoices()}]}`);
    }
}


// Export generated questions array
module.exports = {
    PromptQuestion : PromptQuestion,
    ChoiceQuestion : ChoiceQuestion
};