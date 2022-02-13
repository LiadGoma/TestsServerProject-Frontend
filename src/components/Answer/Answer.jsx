import React from 'react'
import TextEditor from '../TextEditor/TextEditor'
import "./Answer.css"

function Answer() {
  return (
    <div className='answer'>
        <button className='answerButton'>x</button>
        <TextEditor height={150}/>
        <input type="checkbox" id="isCorrect"/>
        <label for="isCorrect" >correct</label>
    </div>
  )
}

export default Answer