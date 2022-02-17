import React from 'react'
import DataTable from '../../components/DataTable/DataTable'
import "./RespondentsReports.css"
function RespondentsReports() {
  return (
    <div>
        <h2>Report By Respondent Name</h2>
        <h4>Find A Respondent</h4>
        <div>To find a respondent, start typing a name below. Then select a respondent from the list tht will be appear</div>
    <div>
      <div>Respondent Name:</div>
      <input></input>
    </div>
    <DataTable/>
    </div>
  )
}

export default RespondentsReports