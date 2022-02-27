import React, { useState } from 'react'
import "./OpenedTableRow.css";
import ReactHtmlParser from "react-html-parser";

function OpenedTableRow({ obj }) {
    const [isDivOpen, setIsDivOpen] = useState(false);
    const showAnswersHandler = () => {
        setIsDivOpen((prev) => !prev);
    }
    return (
        <> <tr onClick={showAnswersHandler}    >
            <td >{obj.index}</td>
            <td>{obj.question}</td>
            <td>{obj.isCorrect ? "Yes" : "No"}</td>
            <td>{obj.date}</td>
        </tr>
            {isDivOpen && <div className={isDivOpen ? "show" : "notShow"} className=''>
                <div className='answerReportDiv'>
                    <h3>Answers:</h3>
                    {obj.answers.map((answer) => {
                        return <div key={answer._id} className={answer.isCorrect ? "correct answerDiv" : obj.userAnswer.includes(answer._id)?"false":""}>{ReactHtmlParser(answer.content)}</div>
                    })}
                </div>

            </div>}


        </>
    )
}

export default OpenedTableRow