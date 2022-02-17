import React, { useEffect, useState } from 'react'
import "./QuestionsManager.css";
import { getAllQuestions, getQuestionById, deleteQuestion } from "../../services/questionsService"
import DataTable from '../../components/DataTable/DataTable';
import ReactHtmlParser from 'react-html-parser';
import Modal from '../../components/Modal/Modal';
import Question from '../../components/Question/Question';

function QuestionsManager() {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [list, setList] = useState([]);
    const [tagsFilter, setTagsFilter] = useState("");
    const [isQuestionModalShow, setIsQuestionModalShow] = useState(false);
    const [questionShow, setQuestionShow] = useState({});

    const colNames = ["Id", "Question text and tags", "Last Update", "Question type", "Field", ""];


    useEffect(() => {
        const setQuestionsData = async () => {
            const { data } = await getAllQuestions();
            setQuestions(data);
            setFilteredQuestions(data);
        }
        setQuestionsData();
    }, [questions]);
    useEffect(() => {
        let index = 0;
        const tempList = filteredQuestions?.map((question) => {
            index++;
            let date = new Date(question.lastUpdated);
            date = date.toLocaleDateString();
            return {
                id: question._id,
                index,
                questionContent: [ReactHtmlParser(question.questionContent), ...question.tags],
                lastUpdated: date,
                questionType: question.isMultichoice ? "multiple" : "single",
                field: question.field,
            }
        });
        setList(tempList);
    }, [filteredQuestions])

    const handleClick = () => {
        window.location = "/addNewQuestion";
    }
    const handleEditClick = async (id) => {
        localStorage.setItem("editQuestion", id);
        window.location = "/editQuestion";
    }
    const handleShowClick = async (id) => {
        const {data} = await getQuestionById(id);
        setQuestionShow(data);
        setIsQuestionModalShow(true);
    }
    const handleDeleteClick = async (id) =>{
        const {data} = await deleteQuestion(id);
        const tempList = await getAllQuestions();
        setQuestions(tempList.data);
        return data;
    }
    const closeModal = () => {
        setIsQuestionModalShow(false);
    }
    // const deleteQuestionHandler = () => {
    //     const changedList = questions.getAllQuestions
    //     setDeleted(changedList);
    // }
    const filterChangeHandler = (e) => {
        setTagsFilter(e.target.value);
        const filtered = questions.filter((question) => question.tags.filter((tag) => tag.includes(e.target.value)).length > 0);
        setFilteredQuestions(filtered);
    }


    return (
        <div className='page'>
            {/* {console.log(questionShow)} */}
            {isQuestionModalShow && <Modal title="question"
                content={
                    <Question
                        content={questionShow.questionContent}
                        extraContent={questionShow.extraContent}
                        answers={questionShow.answers}
                        isHorizontal={questionShow.isHorizontal}
                        isMultiChoice={questionShow.isMultichoice}
                    />
                }
                onConfirm={closeModal} />}
            <h3>Available questions for</h3>
            <div className='filter'>
                <div>Filter by tags or content</div>
                <input value={tagsFilter} onChange={filterChangeHandler}></input>
            </div>
            <DataTable list={list} colNames={colNames} editClick={handleEditClick} showClick={handleShowClick} deleteClick={handleDeleteClick}/>
            <button className='btn' onClick={handleClick}>ADD NEW QUESTION</button>
        </div>

    )
}

export default QuestionsManager