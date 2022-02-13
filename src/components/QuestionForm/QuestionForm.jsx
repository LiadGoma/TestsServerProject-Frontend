import React from 'react';
import Answer from '../Answer/Answer';
import TextEditor from '../TextEditor/TextEditor';
import "./QuestionForm.css";


function QuestionForm() {

    return (
        <div className='form'>
            <div className='field'>
                <label>Field</label>
                <select>
                    <option>Single Choice Question</option>
                    <option>Multi Choice Question</option>
                </select>
            </div>
            <div className='field'>
                <label>Question Type</label>
                <TextEditor height={200} />
            </div>
            <div className='field'>
                <label>Text Below Question</label>
                <TextEditor height={200} />
            </div>

            <div className='field'>
                <label>Possible Answers</label>
                <div className='answers'>
                    <Answer />
                    <Answer />
                    <Answer />
                    <button className='answerBtn'>ADD AN ANSWER</button>
                </div>

            </div>

            <div className='field'>
                <label>Answers Layout</label>
                <input type="checkbox" id="horizontal" />
                <label for="horizontal">Horizontal</label>
                <input type="checkbox" id="vertical" />
                <label for="vertical">Vertical</label>
            </div>
            <div className='field'>
                <label>Tags</label>
                <input></input>
            </div>

        </div>
    )
}

export default QuestionForm