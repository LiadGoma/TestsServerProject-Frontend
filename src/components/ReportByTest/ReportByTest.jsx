import React from 'react'
import DataTable from '../DataTable/DataTable';
import "./ReportByTest.css";
function ReportByTest({ test }) {
    return (
        <div>
            <h2>{`Test Report : ${test.testName}`}</h2>

            <div className='summaryTest'>
                <h3>Summary</h3>
                <div>{`Test Name: ${test?.testName}`}</div>
                <div>{`Test Id: ${test?.id}`}</div>
                <div>{`Num Of Questions: ${test?.answers?.length}`}</div>
                <div>{`Passing Grade: ${test?.passingGrade}`}</div>
                <div>{`Date Range: ${"the daate"}`}</div>
                <div>{`Number Of Submmisions: ${"num of subimissions"}`}</div>
                <div>{`Number Of Respondents Passed: ${""}`}</div>
                <div>{`Passing Precentage: ${""}`}</div>
                <div>{`Avarage Grade: ${""}`}</div>
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
                    <button>Show answer statistics of all questions</button>
                    <button>Show detailed report of al answers</button>
                </div>
                <DataTable/>
                <div className='reportBtnDiv'>
                    <button>BACK</button>
                    <button>PRINT</button>
                </div>

            </div>
        </div>
    )
}

export default ReportByTest