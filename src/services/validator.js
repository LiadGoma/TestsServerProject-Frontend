const validateQuestion = (question) => {
    const errors = {};

    if (question.questionText.length < 5) {
        errors.questionText = "Question text should be more than 5 characters \n";
    }
    if (!question.isMultiChoice) {
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

const validateTest = (test) =>{
    const errors = {};

    if (test.testName.length < 3) {
        errors.testName = "A test's name must be over 3 characters in length!";
    }
    if (test.testField.length < 1) {
        errors.field = "A test must have a field of study!";
    }
    if (test.testHeader.length < 5) {
        errors.testIntroduction = "A test's introduction must be over 5 characters in length!";
    }
    if (test.creatorEmail.length < 5) {
        errors.creatorEmail = "A test must have a creator email!";
    }
    if (test.testPassingGrade < 55 || test.passingGrade > 100) {
        errors.passingGrade = "A test's passing grade must be between 55 and 100!";
    }
    if (test.testSuccessText.length < 1) {
        errors.successText = "A test must have a success text!";
    }
    if (test.testFailText.length < 1) {
        errors.failureText = "A test must have a failure text!";
    }
    if (test.selectedQuestions.length < 5) {
        errors.selectedQuestions = "A test must have at least five questions!"
    }
    return errors;
}            


module.exports = {
    validateQuestion,
    validateTest
}