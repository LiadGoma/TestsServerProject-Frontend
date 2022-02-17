import React, { useEffect, useState } from 'react'
import { getAllTests } from '../../services/testsService';
import TextField from '@material-ui/core/TextField';
import "./TestsReports.css"
import ReportByTest from '../../components/ReportByTest/ReportByTest';


function TestsReports() {
    const [tests, setTests] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [chosenTest, setChosenTest] = useState();

    useEffect(() => {
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
        console.log(e.target.value);
    }
    return (
        <div className='reportSearch'>
            <h2>Test Report for</h2>
            <div className='searchBox'>
                <div className='fieldSearch'>
                    <label>Select Test:</label>
                    <select onChange={testChangeHandler}>
                        {tests.map((test) => {
                            return <option key={test._id} >{test.testName}</option>
                        })}
                    </select>
                </div>
                <div className='fieldSearch'>
                    <label>Date Range:</label>
                    <TextField
                        id="date"
                        label="from"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="to"
                        type="date"
                        defaultValue={Date.now}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <button onClick={generateReportClickHandler} className="reportBtn">Generate Report</button>
            </div>
            {showReport && <ReportByTest test={chosenTest} />}
        </div>
    )
}

export default TestsReports