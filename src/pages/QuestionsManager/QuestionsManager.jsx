import React, { useEffect, useState } from 'react'
import "./QuestionsManager.css";
import { getAllQuestions, getQuestionById, deleteQuestion } from "../../services/questionsService"
import DataTable from '../../components/DataTable/DataTable';
import ReactHtmlParser from 'react-html-parser';
import Modal from '../../components/Modal/Modal';
import Question from '../../components/Question/Question';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { TextField } from '@mui/material';

function QuestionsManager() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [list, setList] = useState([]);
    const [tagsFilter, setTagsFilter] = useState("");
    const [isQuestionModalShow, setIsQuestionModalShow] = useState(false);
    const [questionShow, setQuestionShow] = useState({});
    const [pageNumber, setPageNumber] = useState(0);

    const colNames = ["Id", "Question text and tags", "Last Update", "Question type", "Field", ""];
    const questionsPerPage = 5;
    const pageVisited = pageNumber * questionsPerPage;
    const displayQuestions = list.slice(pageVisited, pageVisited + questionsPerPage);
    const pageCount = Math.ceil(list.length / questionsPerPage);



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
        navigate("/addNewQuestion");
    }
    const handleEditClick = async (id) => {
        navigate(`/editQuestion/${id}`);
    }
    const handleShowClick = async (id) => {
        const { data } = await getQuestionById(id);
        setQuestionShow(data);
        setIsQuestionModalShow(true);
    }
    const handleDeleteClick = async (id) => {
        const { data } = await deleteQuestion(id);
        const tempList = await getAllQuestions();
        setQuestions(tempList.data);
        setFilteredQuestions(tempList.data)
        return data;
    }
    const closeModal = () => {
        setIsQuestionModalShow(false);
    }

    const filterChangeHandler = (e) => {
        setTagsFilter(e.target.value);
        const filtered = questions.filter((question) => question.tags.filter((tag) => tag.includes(e.target.value)).length > 0);
        setFilteredQuestions(filtered);
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }


    return (
        <div className='page'>
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
                <TextField
                    value={tagsFilter}
                    onChange={filterChangeHandler}
                    id="search-tags"
                    type="search"
                    variant="standard"
                />
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
            <DataTable list={displayQuestions} colNames={colNames} editClick={handleEditClick} showClick={handleShowClick} deleteClick={handleDeleteClick} />

            <button className='btn' onClick={handleClick}>ADD NEW QUESTION</button>
        </div>

    )
}

export default QuestionsManager