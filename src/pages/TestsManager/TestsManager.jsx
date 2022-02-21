import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable/DataTable';
import { getAllTests } from '../../services/testsService';
import "./TestsManager.css";
import ReactPaginate from "react-paginate";


function TestsManager() {
    const navigate=useNavigate();
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [list, setList] = useState([]);
    const [tagsFilter, setTagsFilter] = useState("");
    const [pageNumber, setPageNumber] = useState(0);

    const colNames = ["Id", "Test Name", "# of questions", "Last Update", "passing grade", "version", ""];
    const testsPerPage = 5;
    const pageVisited = pageNumber * testsPerPage;
    const displayTests = list.slice(pageVisited, pageVisited + testsPerPage);
    const pageCount = Math.ceil(list.length / testsPerPage);


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
    const changePage=({selected})=>{
        setPageNumber(selected);
    }
    return (
        <div className='page'>
            <h3>Available Tests for</h3>
            <div className='filter'>
                <div>Filter by name</div>
                <input value={tagsFilter} onChange={filterChangeHandler}></input>
            </div>
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationButtons"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            />
            <DataTable list={displayTests}
                colNames={colNames}
                editClick={editClickHandler}
                copyLink={true}
            />
            <button className='btn' onClick={addNewTestClickHandler}>ADD NEW TEST</button>

        </div>
    )
}

export default TestsManager