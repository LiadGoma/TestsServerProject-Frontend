const validateQuestion = (question) => {
    const errors = {};

    if (question.questionText.length < 5) {
        errors.questionText = "Question text should be more than 5 characters \n";
    }
    console.log(question.answers)
    console.log(question.isMultiChoice)
    if (!question.isMultiChoice) {
        console.log("in");
        let counter = 0;
        for (let index = 0; index < question.answers.length; index++) {
            if (question.answers[index].isCorrect === true) counter++;
            if (question.answers[index].content.length < 1) {
                errors.answers = "an answer cannot be empty";
            }

        }
        if (counter > 1) {
            errors.answers = "In a single choice question there should only be one correct answer \n";
        }
        if(counter <1){
            errors.answers = "you must have atleast one correct answer";
        }
    }
    if (question.answers.length < 2) {
        errors.answers = "A question needs to have at least two answers \n";
    }
    if (question.tags.length < 1) {
        errors.tags = "A question needs to have at least one tag \n"
    }
    return errors

}
module.exports = {
    validateQuestion
}