import React, { useEffect, useState } from 'react'
import TextEditor from '../TextEditor/TextEditor'
import "./Answer.css"

function Answer({ isMultiChoice, id, changeAnswer }) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [isMulti, setIsMulti] = useState(isMultiChoice);
    const [content, setContent] = useState("");

    useEffect(() => {
        setIsMulti(isMultiChoice);
    }, [isMultiChoice])

    const changeHandler = () => {
        setIsAnswerCorrect(!isAnswerCorrect);
        changeAnswer(id, content, isAnswerCorrect);
    }
    const textChangeHandler = (value) => {
        setContent(value);
        changeAnswer(id, content, isAnswerCorrect);
    }
    return (
        <div className='answer'>
            <button className='answerButton'>x</button>
            <TextEditor height={150} changeHandler={textChangeHandler} />
            <input type={isMultiChoice ? "checkbox" : "radio"} onChange={changeHandler} name="isCorrects" id="isCorrect" />
            <label for="isCorrect"  >{isAnswerCorrect ? "incorrect" : "correct"}</label>
        </div>
    )
}

export default Answer