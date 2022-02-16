import React from 'react'
import "./Question.css";
import ReactHtmlParser from 'react-html-parser';

function Question({ content, extraContent, answers, isHorizontal, isMultiChoice }) {
    return (
        <div>
            <div className='question'>{ReactHtmlParser(content)}</div>
            <div className='extra'>{ReactHtmlParser(extraContent)}</div>
            {console.log(isHorizontal)}
            <div className={`answersShow ${isHorizontal? "horizontal" : "vertical"}`}>
                {answers.map((answer) => {
                    return <div key={answer._id} className='choice'>
                        <input type="checkbox" ></input>
                        <div className='choiceContent'>{ReactHtmlParser(answer.content)}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Question