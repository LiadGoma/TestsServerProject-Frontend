import React, { useEffect, useState } from 'react'
import "./QuestionsManager.css";
import { getAllQuestions } from "../../services/questionsService"
import DataTable from '../../components/DataTable/DataTable';

function QuestionsManager() {
    const [questions, setQuestions] = useState([]);
    const [list, setList] = useState([]);

    const colNames = ["Id", "Question text and tags", "LastUpdate", "question type", "# of tags", ""];


    useEffect(() => {
        const setQuestionsData = async () => {
            const { data } = await getAllQuestions();
            setQuestions(data);
        }
        setQuestionsData();
    }, []);
    useEffect(() => {
        let index = 0;
        const tempList = questions?.map((question) => {
            index++;
            return {
                id: index,
                questionContent: question.questionContent,
                lastUpdated: question.lastUpdated,
                tags: question.tags
            }
        });
        setList(tempList);
    }, [questions])

    const handleClick=()=>{
        window.location="/addNewQuestion";
    }


    return (
        <div className='page'>
            <h3>Available questions for</h3>
            <div className='filter'>
                <div>Filter by tags or content</div>
                <input></input>
            </div>
            <DataTable list={list} colNames={colNames} />
            <button className='btn' onClick={handleClick}>ADD NEW QUESTION</button>
        </div>




    )
}

export default QuestionsManager