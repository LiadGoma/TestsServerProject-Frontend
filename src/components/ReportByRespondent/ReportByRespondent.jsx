import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAnsweredTestById } from '../../services/answeredTestService';
import { getTestById } from '../../services/testsService';
import DataTable from '../DataTable/DataTable';
import "./ReportByRespondent.css";

function ReportByRespondent({ respondent }) {
    const navigate = useNavigate();

    const [tests, setTests] = useState();
    const [tableList, setTableList] = useState();

    const colNames = ["test id", "Test name", "Grade", "Date"];

    useEffect(() => {
        const getTestsData = async () => {
            const temp = respondent.answeredTestsId;
            const tempTestList = [];
            for (let index = 0; index < temp?.length; index++) {
                const { data } = await getAnsweredTestById(temp[index]);
                const {data:test} = await getTestById(data.testId);
                data.testName = test.testName;
                tempTestList.push(data);
            }
            setTests(tempTestList);
        }
        getTestsData();
    }, [respondent])


    useEffect(() => {
        let index = 0;
        const tempList = tests?.map((test) => {
            index++;
            let date = new Date(test.date);
            date = date.toLocaleDateString();
            return {
                id: test._id,
                index,
                testName: test.testName,
                Grade: test.finalGrade,
                date: date

            }
        });

        setTableList(tempList);
    }, [tests])

    const testSelectHandler = (value) => {
        navigate(`/answeredTestReport/${value.id}`);
    }
    return (
        <div className='reportByRespondent'>
            <h2> Activity Report for: <span className='coloredWord'>{respondent.name}</span> </h2>
            <div className='smallHeaders'>
                <div>Click a test to show its results</div>
                <div className='boldWord'>{`Avarage grade for a test:`}</div>
            </div>
            <DataTable list={tableList} colNames={colNames} onSelect={testSelectHandler} />
        </div>
    )
}

export default ReportByRespondent