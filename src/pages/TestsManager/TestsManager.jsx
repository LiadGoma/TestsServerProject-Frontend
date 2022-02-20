import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import { getAllTests } from '../../services/testsService';
import "./TestsManager.css";

function TestsManager() {
    const navigate=useNavigate();
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [list, setList] = useState([]);
    const [tagsFilter, setTagsFilter] = useState("");
  

    const colNames = ["Id", "Test Name", "# of questions", "Last Update", "passing grade", "version", ""];


    useEffect(() => {
        const setTestsData = async () => {
            const { data } = await getAllTests();
            setTests(data);
            setFilteredTests(data);
        }
        setTestsData();
    }, []);

    useEffect(() => {
        let index = 0;
        const tempList = filteredTests?.map((test) => {
            index++;
            let date = new Date(test.lastUpdated);
            date = date.toLocaleDateString();
            return {
                id: test._id,
                index,
                testName: test.testName,
                numOfQuestions: test.questions.length,
                lastUpdated: date,
                passingGrade: test.passingGrade,
                version: 1,
            }
        });
        setList(tempList);
    }, [filteredTests])

    const editClickHandler = (id) => {
        navigate(`/EditTest/${id}`);
    }
    const filterChangeHandler = (e) => {
        setTagsFilter(e.target.value);
        const filtered = tests.filter((test) => test.testName.includes(e.target.value));
        setFilteredTests(filtered);
    }
    const addNewTestClickHandler = () => {
        navigate("/AddNewTest");
    }
    return (
        <div className='page'>
            <h3>Available Tests for</h3>
            <div className='filter'>
                <div>Filter by name</div>
                <input value={tagsFilter} onChange={filterChangeHandler}></input>
            </div>
            <DataTable list={list}
                colNames={colNames}
                editClick={editClickHandler}
                copyLink={true}
            />
            <button className='btn' onClick={addNewTestClickHandler}>ADD NEW TEST</button>

        </div>
    )
}

export default TestsManager