import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import ReportByRespondent from '../../components/ReportByRespondent/ReportByRespondent';
import ReportByRespondentAndTest from '../../components/ReportByRespondentAndTest/ReportByRespondentAndTest';
import { getAllRespondents } from '../../services/respondentsService';
import "./RespondentsReports.css"
function RespondentsReports() {
  const [respondents, setRespondents] = useState([]);
  const [filteredRespondents, setFilteredRespondents] = useState([]);
  const [list, setList] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [chosenRespondent, setChosenRespondent] = useState();
  const [showActivityReport, setShowActivityReport] = useState(false);

  const colnames = ["ID", "Respondent", "Email", "PhoneNumber"];

  useEffect(() => {
    const setRespondentsData = async () => {
      const { data } = await getAllRespondents();
      console.log(data);
      setRespondents(data);
      setFilteredRespondents(data);
    }
    setRespondentsData();
  }, [])
  useEffect(() => {
    let index = 0;
    const tempList = filteredRespondents?.map((respondent) => {
      index++;
      return {
        id: respondent._id,
        index,
        name: respondent.name,
        email: respondent.email,
        phoneNumber: respondent.phoneNumber
      }
    });
    setList(tempList);
  }, [filteredRespondents])

  const filterChangeHandler = (e) => {
    console.log(e.target.value);
    setNameFilter(e.target.value);
    const filtered = respondents.filter((respondent) => respondent.name.includes(e.target.value));
    setFilteredRespondents(filtered);
  }
  const onSelectHandler = (value) => {
    setChosenRespondent(value);
    setShowActivityReport(true);
  }

  return (
    <div >
      <div className='reportRespondent'>
        <h2>Report By Respondent Name</h2>
        <h4>Find A Respondent</h4>
        <div>To find a respondent, start typing a name below. Then select a respondent from the list tht will be appear</div>
        <div>
          <div>Respondent Name:</div>
          <input onChange={filterChangeHandler}></input>
        </div>
      </div>
      <DataTable list={list} colNames={colnames} onSelect={onSelectHandler} />
      {showActivityReport && <ReportByRespondent respondent={chosenRespondent} />}
    </div>
  )
}

export default RespondentsReports