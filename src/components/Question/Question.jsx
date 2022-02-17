import React from 'react'
import "./Question.css";
import ReactHtmlParser from 'react-html-parser';

function Question({ content, extraContent, answers, isHorizontal, isMultiChoice }) {
    return (
        <div>
            <div className='question'>{ReactHtmlParser(content)}</div>
            <div className='extra'>{ReactHtmlParser(extraContent)}</div>
            <div className={`answersShow ${isHorizontal? "horizontal" : "vertical"}`}>
                {answers.map((answer,index) => {
                    return <div key={index} className='choice'>
                        <input type="checkbox" ></input>
                        <div className='choiceContent'>{ReactHtmlParser(answer.content)}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Question