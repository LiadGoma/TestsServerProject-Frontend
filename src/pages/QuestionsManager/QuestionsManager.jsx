import React, { useEffect, useState } from 'react'
import "./QuestionsManager.css";
import { getAllQuestions } from "../../services/questionsService"
import DataTable from '../../components/DataTable/DataTable';

function QuestionsManager() {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [list, setList] = useState([]);
    const [tagsFilter, setTagsFilter] = useState("");

    const colNames = ["Id", "Question text and tags", "LastUpdate", "question type", "# of tags", ""];


    useEffect(() => {
        const setQuestionsData = async () => {
            const { data } = await getAllQuestions();
            setQuestions(data);
            setFilteredQuestions(data);
        }
        setQuestionsData();
    }, []);
    useEffect(() => {
        let index = 0;
        const tempList = filteredQuestions?.map((question) => {
            index++;
            return {
                id: question._id,
                index,
                questionContent: question.questionContent,
                lastUpdated: question.lastUpdated,
                questionType: question.isMultichoice ? "multiple" : "single",
                tags: question.tags,
            }
        });
        setList(tempList);
    }, [filteredQuestions])

    const handleClick = () => {
        window.location = "/addNewQuestion";
    }
    const handleEditClick = async (id) => {
        console.log(id);
        localStorage.setItem("editQuestion", id);
        window.location = "/editQuestion";
    }
    const filterChangeHandler = (e) => {
        setTagsFilter(e.target.value);
        setFilteredQuestions(questions.filter((question) => question.tags.filter((tag) => tag.incldes(tagsFilter))))
    }


    return (
        <div className='page'>
            <h3>Available questions for</h3>
            <div className='filter'>
                <div>Filter by tags or content</div>
                <input value={tagsFilter} onChange={filterChangeHandler}></input>
            </div>
            <DataTable list={list} colNames={colNames} editClick={handleEditClick} />
            <button className='btn' onClick={handleClick}>ADD NEW QUESTION</button>
        </div>




    )
}

export default QuestionsManager