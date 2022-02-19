import React, { useEffect, useState } from 'react'
import { getAllTests } from '../../services/testsService';
import TextField from '@material-ui/core/TextField';
import "./TestsReports.css"
import ReportByTest from '../../components/ReportByTest/ReportByTest';


function TestsReports() {
    const [tests, setTests] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [chosenTest, setChosenTest] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    useEffect(() => {
        setFromDate("2017-05-24");
        setToDate("2022-19-02");
        const getTestsData = async () => {
            const { data } = await getAllTests();
            setTests(data);
            if (data[0]) setChosenTest(data[0]);
        }
        getTestsData();
    }, [])

    const generateReportClickHandler = () => {
        setShowReport(true);
    }
    const testChangeHandler = (e) => {
        const tempTest = tests.filter((test) => test._id === e.target.value);
        setChosenTest(tempTest[0]);
    }
    const toDateChangeHandler = (e) => {
        setToDate(e.target.value);
    }
    const fromDateChangeHandler = (e) => {
        setFromDate(e.target.value);
    }
    return (
        <div className='reportSearch'>
            <h2>Test Report for</h2>
            <div className='searchBox'>
                <div className='fieldSearch'>
                    <label>Select Test:</label>
                    <select onChange={testChangeHandler}>
                        {tests.map((test) => {
                            return <option key={test._id} value={test._id}>{test.testName}</option>
                        })}
                    </select>
                </div>
                <div className='fieldSearch'>
                    <label>Date Range:</label>
                    <TextField
                        id="date"
                        label="from"
                        type="date"
                        onChange={fromDateChangeHandler}
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="to"
                        type="date"
                        onChange={toDateChangeHandler}
                        defaultValue={Date.now}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <button onClick={generateReportClickHandler} className="reportBtn">Generate Report</button>
            </div>
            {showReport && <ReportByTest test={chosenTest} fromDate={fromDate} toDate={toDate} />}
        </div>
    )
}

export default TestsReports