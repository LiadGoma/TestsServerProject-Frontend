import React, { useEffect, useState } from 'react'
import "./Question.css";
import ReactHtmlParser from 'react-html-parser';

function Question({ content, extraContent, answers, isHorizontal, isMultiChoice, onAnswerChange, questionId }) {

    const answerChangeHandler = (e) => {
        if (onAnswerChange) {
            onAnswerChange(questionId, e.target.value);
        }
    }
    return (
        <div className='questionModel'>
            <div className='question'>{ReactHtmlParser(content)}</div>
            <div className='extra'>{ReactHtmlParser(extraContent)}</div>
            <div className={`answersShow ${isHorizontal ? "horizontal" : "vertical"}`}>
                {answers.map((answer, index) => {
                    console.log(answer)
                    return <div key={answer._id} className='choice'>
                        <input type={isMultiChoice ? "checkbox" : "radio"}
                            name={questionId}
                             onChange={answerChangeHandler}
                            value={answer._id} ></input>
                        <div className='choiceContent'>{ReactHtmlParser(answer.content)}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Question