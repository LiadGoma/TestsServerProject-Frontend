import React from 'react'
import DataTable from '../DataTable/DataTable';
import "./ReportByRespondentAndTest.css";

function ReportByRespondentAndTest({ test, respondent }) {
  return (
    <div>
      <h2>Test result for <span className='coloredWord'> dsdsfds</span></h2>
      <h3>Respondet: <span className='coloredWord'>dfsds</span> </h3>
      <h3>Summary</h3>
      <div className='summaryTest'>
        <div>Test Name: <span className='boldWord'></span></div>
        <div>Test Id: <span className='boldWord'></span></div>
        <div>Num Of Questions: <span className='boldWord'></span></div>
        <div>Passing Grade: <span className='boldWord'></span></div>
        <div>Last Submmited: <span className='boldWord'></span></div>
        <div>Number Of Submmisions: <span className='boldWord'></span></div>
        <div>Number Of Question Submitted: <span className='boldWord'></span></div>
        <div>Number of Correct Answers: <span className='boldWord'></span></div>
        <div>Final Grade: <span className='boldWord'></span></div>
        <div>Status: <span className='boldWord'></span></div>
      </div>
      <div className='Detailes'>
        <h2>Details</h2>
        <div>Click a question to see its results</div>
        <DataTable />
      </div>
      <div className="reportBtnDiv">
        <button>BACK</button>
        <button>PRINT</button>
      </div>

    </div >
  )
}

export default ReportByRespondentAndTest