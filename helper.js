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

// Export question classes
module.exports = {
    InputQuestion : InputQuestion,
    ListQuestion : ListQuestion,
};