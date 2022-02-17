import React from 'react'
import DataTable from '../DataTable/DataTable';
import "./ReportByRespondent.css";

function ReportByRespondent() {
    return (
        <div>
            <h2>{` Activity Report for : `}</h2>
            <div>Click a test to show its results</div>
            <div>{`Avarage grade for a test:`}</div>
            <DataTable/>
        </div>
    )
}

export default ReportByRespondent