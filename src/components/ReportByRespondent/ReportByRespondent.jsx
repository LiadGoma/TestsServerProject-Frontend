import React from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from '../DataTable/DataTable';
import "./ReportByRespondent.css";

function ReportByRespondent({ respondent }) {
    const navigate=useNavigate();

    const colNames = ["test id", "Test name", "Grade", "Date"];

    const testSelectHandler = (value) => {
        navigate("/answeredTestReport");
    }
    return (
        <div className='reportByRespondent'>
            {console.log(respondent)}
            <h2> Activity Report for: <span className='coloredWord'>{respondent.name}</span> </h2>
            <div className='smallHeaders'>
                <div>Click a test to show its results</div>
                <div className='boldWord'>{`Avarage grade for a test:`}</div>
            </div>
            <DataTable colNames={colNames} onSelect={testSelectHandler} />
        </div>
    )
}

export default ReportByRespondent