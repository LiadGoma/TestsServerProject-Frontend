import React from 'react'
import DataTable from '../DataTable/DataTable';
import "./ReportByRespondentAndTest.css";

function ReportByRespondentAndTest() {
  return (
    <div>
      <h2>{`Test result for`}</h2>
      <h3>{`Respondet: `}</h3>
      <div className='summaryTest'>
        <div>Summary</div>
        <div>{`Test Name: ${test.testName}`}</div>
        <div>{`Test Id: ${test.id}`}</div>
        <div>{`Num Of Questions: ${test.answers.length}`}</div>
        <div>{`Passing Grade: ${test.passingGrade}`}</div>
        <div>{`Last Submmited: ${"the daate"}`}</div>
        <div>{`Number Of Submmisions: ${"num of subimissions"}`}</div>
        <div>{`Number Of Question Submitted: ${""}`}</div>
        <div>{`Number of Correct Answers : ${""}`}</div>
        <div>{`Final Grade: ${""}`}</div>
        <div>{`Status: ${""}`}</div>
      </div>
      <div className='Detailes'>
        <h2>Details</h2>
        <div>Click a question to see its results</div>
        <DataTable/>
      </div>
      <button>PRINT</button>
    </div >
  )
}

export default ReportByRespondentAndTest