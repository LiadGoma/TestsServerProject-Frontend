import React, { useEffect, useState } from 'react'
import "./Question.css";
import ReactHtmlParser from 'react-html-parser';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';

function Question({ content, extraContent, answers, isHorizontal, isMultiChoice, onAnswerChange, questionId }) {

    const answerChangeHandler = (e) => {
        if (onAnswerChange) {
            onAnswerChange(questionId, e.target.value, e.target.checked);
        }
    }
    return (
        <div className='questionModel'>
            <div className='question'>{ReactHtmlParser(content)}</div>
            <div className='extra'>{ReactHtmlParser(extraContent)}</div>
            <div className={`answersShow ${isHorizontal ? "horizontal" : "vertical"}`}>
                {isMultiChoice ?
                    <FormGroup>
                        {answers.map((answer, index) => {
                            return <div key={answer._id} >
                                <FormControlLabel onChange={answerChangeHandler}
                                    value={answer._id} control={<Checkbox />}
                                    label={ReactHtmlParser(answer.content)} />
                            </div>
                        })}
                    </FormGroup>
                    :
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {answers.map((answer, index) => {
                            return <div key={answer._id} >
                                <FormControlLabel onChange={answerChangeHandler}
                                    value={answer._id} control={<Radio />}
                                    label={ReactHtmlParser(answer.content)} />
                            </div>
                        })}
                    </RadioGroup>
                }


            </div>
        </div>
    )
}

export default Question