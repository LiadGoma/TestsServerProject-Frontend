import React, { useEffect, useState } from 'react'
import TextEditor from '../TextEditor/TextEditor'
import "./Answer.css"

function Answer({ id, changeAnswer, deleteHandler, initContent, initIsCorrect }) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [content, setContent] = useState("");

    const changeHandler = async () => {
        setIsAnswerCorrect((prev) => !prev);
        changeAnswer(id, content, !isAnswerCorrect);
    }
    const textChangeHandler = (value) => {
        setContent(value);
        changeAnswer(id, value, isAnswerCorrect);
    }
    const deleteBtnHandler = () => {
        deleteHandler(id);
    }
    return (
        <div className='answer'>
            <button className='answerButton' onClick={deleteBtnHandler}>x</button>
            <TextEditor height={150} changeHandler={textChangeHandler} initValue = {initContent} />
            <input type="checkbox" onChange={changeHandler} name="isCorrects" id={id} checked={initIsCorrect}/>
            <label htmlFor={id}>{!isAnswerCorrect ? "correct" : "incorrect"}</label>
        </div>
    )
}

export default Answer