import React, { useEffect, useState } from 'react';
import Answer from '../Answer/Answer';
import TextEditor from '../TextEditor/TextEditor';
import { createNewQuestion, getQuestionById } from "../../services/questionsService";
import { validateQuestion } from '../../services/validator';
import "./QuestionForm.css";
import Modal from '../Modal/Modal';
import  Question  from '../Question/Question';


function QuestionForm({ edit }) {
    const [isMultiChoice, setIsMultiChoice] = useState(false);
    const [isHorizontal, setIsHorizontal] = useState(true);
    const [questionText, setQuestionText] = useState("");
    const [extraContent, setExtraContent] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});
    const [isErrors, setIsErrors] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);

    useEffect(() => {
        console.log(edit);

    }, [])

    useEffect(() => {
        const tempAnswers = [
            { id: 0, content: "", isCorrect: false },
            { id: 1, content: "", isCorrect: false },
            { id: 2, content: "", isCorrect: false },
            { id: 3, content: "", isCorrect: false }
        ]
        setAnswers(tempAnswers);
    }, [])


    const selectQuestionTypeChangeHandler = (e) => {
        setIsMultiChoice(e.target.value);
    }
    const selectIsHorizontalChangeHandler = (e) => {
        console.log(e.target.value);
        setIsHorizontal(e.target.value);
    }
    const tagsChangeHandler = (e) => {
        const value = e.target.value;
        let tempTags = value.split(",");
        tempTags = tempTags.map(tag => tag.trim());
        setTags(tempTags);
    }
    const questionContentChangeHandler = (value) => {
        setQuestionText(value);
    }
    const extraContentChangeHandler = (value) => {
        setExtraContent(value);
    }
    const addAnswerClickHandler = () => {
        const id = answers.length;
        const tempAnswers = [...answers, { id: id, content: "", isCorrect: false }];
        setAnswers(tempAnswers);
    }
    const changeAnswer = (id, content, isCorrect) => {
        console.log(content + "----")
        const tempAnswers = [...answers];
        tempAnswers[id].content = content;
        tempAnswers[id].isCorrect = isCorrect;
        console.log(tempAnswers);
        setAnswers(tempAnswers);
    }
    const deleteBtnHandler = (id) => {
        const tempAnswers = answers.filter((answer) => answer.id !== id);
        setAnswers(tempAnswers);
    }
    const closeModal = () => {
        setIsErrors(false);
        setShowQuestion(false);
    }
    const showQuestionHandler = () => {
        setShowQuestion(true);
    }
    const handleSaveClick = () => {
        // console.log(isMultiChoice);
        // console.log(isHorizontal);
        // console.log(questionText);
        // console.log(extraContent);
         console.log(answers);
        // console.log(tags);
        const validateErrors = validateQuestion({
            isHorizontal,
            isMultiChoice,
            questionText,
            extraContent,
            answers,
            tags
        });
        setErrors(validateErrors);
        if (Object.values(validateErrors).length > 0) setIsErrors(true);
        if (!validateErrors) {
            // const newQuestion = {
            //     field: "aaa",
            //     isMultichoice: isMultiChoice,
            //     isHorizontal,
            //     questionContent: questionText,
            //     extraContent,
            //     answers,
            //     tags
            // }
            // createNewQuestion(newQuestion);
            // window.location = "/questionsManager";
        }

    }
    return (
        <>
            {isErrors && <Modal title="Errors" content={Object.values(Object.values(errors))} onConfirm={closeModal} />}
            {showQuestion && <Modal title="question"
                content={
                    <Question
                        content={questionText}
                        extraContent={extraContent}
                        answers={answers}
                        isHorizontal={isHorizontal}
                        isMultiChoice={isMultiChoice}
                    />
                }
                onConfirm={closeModal} />}
            <div className='form'>
                <div className='field'>
                    <label >Question Type</label>
                    <select onChange={selectQuestionTypeChangeHandler}>
                        <option value={false} >Single Choice Question</option>
                        <option value={true}>Multi Choice Question</option>
                    </select>
                </div>
                <div className="field">
                    <label className={errors.questionText ? "error" : ""}>Question Text</label>
                    <TextEditor height={200} changeHandler={questionContentChangeHandler} />
                </div>
                <div className='field'>
                    <label>Text Below Question</label>
                    <TextEditor height={200} changeHandler={extraContentChangeHandler} />
                </div>

                <div className={`field ${errors.answers ? "error" : ""}`}>
                    <label>Possible Answers</label>
                    <div className='answers'>
                        {answers.map((answer, index) => {
                            return <Answer key={index} deleteHandler={deleteBtnHandler} isMultiChoice={isMultiChoice} changeAnswer={changeAnswer} id={answer.id} />
                        })}
                        <button className='answerBtn' onClick={addAnswerClickHandler}>ADD AN ANSWER</button>
                    </div>

                </div>

                <div className='field'>
                    <label>Answers Layout</label>
                    <input type="radio" onChange={selectIsHorizontalChangeHandler} defaultChecked={true} name="layout" value={true} id="horizontal" />
                    <label htmlFor="horizontal">Horizontal</label>
                    <input type="radio" onChange={selectIsHorizontalChangeHandler} name="layout" value={false} id="vertical" />
                    <label htmlFor="vertical">Vertical</label>
                </div>
                <div className={`field ${errors.tags ? "error" : ""}`}>
                    <label>Tags</label>
                    <input onChange={tagsChangeHandler}></input>
                </div>
                <div className='bottomBtns'>
                    <button className='formBtn' onClick={showQuestionHandler}>SHOW</button>
                    <button className='formBtn green' onClick={handleSaveClick}>SAVE</button>
                </div>

            </div >
        </>
    )
}

export default QuestionForm;