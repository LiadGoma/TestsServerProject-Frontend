import React from 'react'
import "./TestFinished.css";

function TestFinished({answeredTest, test}) {
    return (
        <div className='finishedTest'>
            <h2 className='TestNameTitle'>{test.testName}</h2>
            <div className='statsGrid'>
                <div className='bold'>Your Grade</div>
                <div className={answeredTest.isUserPassed?"greenFont": "redFont"}>{answeredTest.finalGrade}</div>
                <div className='bold'>Passed:</div>
                <div className={answeredTest.isUserPassed?"greenFont": "redFont"}>{answeredTest.isUserPassed? "Passed": "Not Passed"}</div>
                <div className='bold'>Summary</div>
                <div>{`you have answered ${answeredTest.numOfCorrectAnswers} correctly, out of ${test.questions.length} questions`}</div>
                <div className='bold'>Passing Grade</div>
                <div>{`The minimum grade to pass the test is ${test.passingGrade}`}</div>
            </div>
            <button className='reviewBtn'>REVIEW ANSWERS</button>
        </div>
    )
}

export default TestFinished