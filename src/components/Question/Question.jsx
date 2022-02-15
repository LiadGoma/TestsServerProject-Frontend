import React from 'react'
import "./Question.css";
import ReactHtmlParser from 'react-html-parser';

function Question({ content, extraContent, answers, isHorizontal, isMultiChoice }) {
    return (
        <div>
            <div className='question'>{ReactHtmlParser(content)}</div>
            <div className='extra'>{ReactHtmlParser(extraContent)}</div>
            {console.log(answers)}
            <div className='answers'>
                {answers.map((answer) => {
                    return <div className='choice'>
                        <input type="checkbox" ></input>
                        {console.log(answer.content)}
                        <div className='choiceContent'>{ReactHtmlParser(answer.content)}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Question