import React, { useEffect, useState } from 'react'
import TextEditor from '../TextEditor/TextEditor'
import "./Answer.css"

function Answer({ id, changeAnswer, deleteHandler }) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [content, setContent] = useState("");

    const changeHandler = async () => {
        console.log(isAnswerCorrect + "----");
        setIsAnswerCorrect((prev) => !prev);
        console.log(isAnswerCorrect + "-----");
        changeAnswer(id, content, !isAnswerCorrect);
    }
    const textChangeHandler = (value) => {
        setContent(value);
        changeAnswer(id, content, isAnswerCorrect);
    }
    const deleteBtnHandler = () => {
        deleteHandler(id);
    }
    return (
        <div className='answer'>
            <button className='answerButton' onClick={deleteBtnHandler}>x</button>
            <TextEditor height={150} changeHandler={textChangeHandler} />
            <input type="checkbox" onChange={changeHandler} name="isCorrects" id="isCorrect" />
            <label htmlFor="isCorrect"  >{isAnswerCorrect ? "incorrect" : "correct"}</label>
        </div>
    )
}

export default Answer