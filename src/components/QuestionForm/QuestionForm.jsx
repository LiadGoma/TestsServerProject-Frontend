import React, { useEffect, useState } from 'react';
import Answer from '../Answer/Answer';
import TextEditor from '../TextEditor/TextEditor';
import { createNewQuestion, getQuestionById } from "../../services/questionsService";

import "./QuestionForm.css";


function QuestionForm({edit}) {
    const [isMultiChoice, setIsMultiChoice] = useState(false);
    const [isHorizontal, setIsHorizontal] = useState(true);
    const [questionText, setQuestionText] = useState("");
    const [extraContent, setExtraContent] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        console.log(edit)


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
        const tempAnswers = [...answers, { content: "", isCorrect: false }];
        setAnswers(tempAnswers);
    }
    const changeAnswer = (id, content, isCorrect) => {
        const tempAnswers = [...answers];
        tempAnswers[id].content = content;
        tempAnswers[id].isCorrect = isCorrect;
        console.log(tempAnswers);
        setAnswers(tempAnswers);
    }
    const handleSaveClick = () => {
        console.log(isMultiChoice);
        console.log(isHorizontal);
        console.log(questionText);
        console.log(extraContent);
        console.log(answers);
        console.log(tags);
        const newQuestion = {
            field: "aaa",
            isMultichoice: isMultiChoice,
            isHorizontal,
            questionContent: questionText,
            extraContent,
            answers,
            tags
        }
        createNewQuestion(newQuestion);
        window.location = "/questionsManager";
    }
    return (
        <div className='form'>
            <div className='field'>
                <label>Question Type</label>
                <select value={"Single Choice Question"} onChange={selectQuestionTypeChangeHandler}>
                    <option value={false} >Single Choice Question</option>
                    <option value={true}>Multi Choice Question</option>
                </select>
            </div>
            <div className='field'>
                <label>Question Text</label>
                <TextEditor height={200} changeHandler={questionContentChangeHandler} />
            </div>
            <div className='field'>
                <label>Text Below Question</label>
                <TextEditor height={200} changeHandler={extraContentChangeHandler} />
            </div>

            <div className='field'>
                <label>Possible Answers</label>
                <div className='answers'>
                    {answers.map((answer, index) => {
                        return <Answer key={index} isMultiChoice={isMultiChoice} changeAnswer={changeAnswer} id={answer.id} />
                    })}
                    <button className='answerBtn' onClick={addAnswerClickHandler}>ADD AN ANSWER</button>
                </div>

            </div>

            <div className='field'>
                <label>Answers Layout</label>
                <input type="radio" onChange={selectIsHorizontalChangeHandler} name="layout" value={true} id="horizontal" />
                <label htmlFor="horizontal">Horizontal</label>
                <input type="radio" onChange={selectIsHorizontalChangeHandler} name="layout" value={false} id="vertical" />
                <label htmlFor="vertical">Vertical</label>
            </div>
            <div className='field'>
                <label>Tags</label>
                <input onChange={tagsChangeHandler}></input>
            </div>
            <div className='bottomBtns'>
                <button className='formBtn'>SHOW</button>
                <button className='formBtn green' onClick={handleSaveClick}>SAVE</button>
            </div>

        </div>
    )
}

export default QuestionForm