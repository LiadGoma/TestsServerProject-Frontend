import React from 'react'
import DataTable from '../DataTable/DataTable';
import "./ReportByTest.css";
function ReportByTest({ test, fromDate, toDate }) {
    return (
        <div className='testReport'>
            {console.log(test)}
            {console.log(fromDate)}
            {console.log(toDate)}
            <h2>Test Report :  {<span className='coloredWord'>{test.testName}</span>}</h2>
            <h3>Summary</h3>

            <div className='summaryTest'>
                <div>Test Name: {<span className='boldWord'>{test.testName}</span>}</div>
                <div>Test Id: {<span className='boldWord'>{test?._id}</span>}</div>
                <div>Num Of Questions: {<span className='boldWord'>{test?.questions?.length}</span>}</div>
                <div>Passing Grade: {<span className='boldWord'>{test?.passingGrade}</span>}</div>
                <div>Date Range: {<span className='boldWord'>{fromDate} - {toDate}</span>}</div>
                <div>Number Of Submmisions: {<span className='boldWord'>{"num of subimissions"}</span>}</div>
                <div>Number Of Respondents Passed: {<span className='boldWord'>{""}</span>}</div>
                <div>Passing Precentage: {<span className='boldWord'>{""}</span>}</div>
                <div>Avarage Grade: {<span className='boldWord'>{""}</span>}</div>
            </div>


            <div className='respondentsGradesAndAnswers'>
                <h3>Respondents Grades And Answers</h3>
                <div>Click a name from the list to see the respondent answers</div>
                <br/>
                <DataTable />
            </div>

            <div className='questionStats'>
                <h3>Question Statistics</h3>
                <div>Click a questoin to see its statistics</div>
                <div  className='questionStatsField'> 
                    <div>Filter by tags or content</div>
                    <input></input>
                </div>
                <div className='QuestionStatsButtonDiv'>
                    <button className="reportBtn">Show answer statistics of all questions</button>
                    <button className="reportBtn">Show detailed report of al answers</button>
                </div>
                <DataTable/>
                <div className='reportBtnDiv'>
                    <button className="reportBtn">BACK</button>
                    <button className="reportBtn">PRINT</button>
                </div>

            </div>
        </div>
    )
}

export default ReportByTest