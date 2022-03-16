import React, { useEffect, useState } from 'react';
import Answer from '../Answer/Answer';
import TextEditor from '../TextEditor/TextEditor';
import { createNewQuestion, getQuestionById } from "../../services/questionsService";
import { validateQuestion } from '../../services/validator';
import "./QuestionForm.css";
import Modal from '../Modal/Modal';
import Question from '../Question/Question';

import TextField from '@mui/material/TextField';


import { useNavigate } from 'react-router-dom';
import { FormControlLabel, FormLabel, InputLabel, MenuItem, NativeSelect, Radio, RadioGroup, Select } from '@mui/material';


function QuestionForm({ edit, editQuestion }) {
    const navigate = useNavigate();
    const [isMultiChoice, setIsMultiChoice] = useState(false);
    const [isHorizontal, setIsHorizontal] = useState(false);
    const [questionText, setQuestionText] = useState("");
    const [extraContent, setExtraContent] = useState("");
    const [answers, setAnswers] = useState([]);
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});
    const [isErrors, setIsErrors] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);

    useEffect(() => {
        if (edit) {
            setIsMultiChoice(edit.isMultichoice);
            setQuestionText(edit.questionContent);
            setExtraContent(edit.extraContent);
            setIsHorizontal(edit.isHorizontal);
            setAnswers(edit.answers);
            setTags(edit.tags);
        }

    }, [edit])

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
        const id = answers.length;
        const tempAnswers = [...answers, { id: id, content: "", isCorrect: false }];
        setAnswers(tempAnswers);
    }
    const changeAnswer = (id, content, isCorrect) => {
        const tempAnswers = [...answers];
        tempAnswers[id].content = content;
        tempAnswers[id].isCorrect = isCorrect;
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
        const newQuestion = {
            field: "aaa",
            isMultichoice: isMultiChoice,
            isHorizontal,
            questionContent: questionText,
            extraContent,
            answers,
            tags
        }
        if (edit) {
            editQuestion(newQuestion, edit._id)
            return;
        }
        if (Object.values(validateErrors).length < 1) {
            createNewQuestion(newQuestion);
            navigate("/questionsManager");
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
            <div className='questionform'>
                <div className='field'>
                    <Select
                        labelId="select-typeQuestion"
                        id="questionTypeSelect"
                        value={isMultiChoice}
                        label="Question"
                        variant='standard'
                        onChange={selectQuestionTypeChangeHandler}
                    >
                        <MenuItem value={false} >Single Choice Question</MenuItem>
                        <MenuItem value={true}>Multi Choice Question</MenuItem>
                    </Select>
                </div>
                <div className="field">
                    <FormLabel className={errors.questionText ? "error" : ""} id="questionTextLabel">Question Text</FormLabel>
                    <TextEditor height={200} initValue={questionText} changeHandler={questionContentChangeHandler} />
                </div>
                <div className='field'>
                    <label></label>
                    <FormLabel  id="TextBelowLabel">Text Below Question</FormLabel>
                    <TextEditor height={200} initValue={extraContent} changeHandler={extraContentChangeHandler} />
                </div>

                <div className={`field ${errors.answers ? "error" : ""}`}>
                    <label>Possible Answers</label>
                    <div className='answers'>
                        {answers.map((answer, index) => {
                            return <Answer key={index} deleteHandler={deleteBtnHandler} isMultiChoice={answer.isMultiChoice} initIsCorrect={answer.isCorrect}
                                initContent={answer.content} changeAnswer={changeAnswer} id={answer.id} />
                        })}
                        <button className='answerBtn' onClick={addAnswerClickHandler}>ADD AN ANSWER</button>
                    </div>

                </div>

                <div className='field'>
                    <FormLabel id="demo-row-radio-buttons-group-label">Answers Layout</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            control={<Radio />}
                            label="Horizontal"
                            onChange={selectIsHorizontalChangeHandler}
                            name="layout"
                            value={true}
                            id="horizontal" />
                        <FormControlLabel control={<Radio />} label="Vertical"
                            onChange={selectIsHorizontalChangeHandler}
                            name="layout"
                            value={false}
                            id="vertical" />
                    </RadioGroup>
                </div>
                <div className={`field ${errors.tags ? "error" : ""}`}>
                    <TextField
                        id="filled-search"
                        label="Tags"
                        type="search"
                        variant="filled"
                        onChange={tagsChangeHandler} value={tags}
                    />

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