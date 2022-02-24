import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { getAllAnsweredQuestionsByQuery } from '../../services/answeredQuestionService';
import { getAllAnsweredTests, getAllAnsweredTestsByQuery, getAnsweredTestById } from '../../services/answeredTestService';
import { getQuestionById } from '../../services/questionsService';
import { getRespondnetById } from '../../services/respondentsService';
import ReactHtmlParser from 'react-html-parser';
import DataTable from '../DataTable/DataTable';
import "./ReportByTest.css";
import { useNavigate } from 'react-router-dom';
import { getTestById } from '../../services/testsService';
function ReportByTest({ test, fromDate, toDate }) {
    const navigate = useNavigate();

    const [answeredTests, setAnsweredTests] = useState();
    const [tableList, setTableList] = useState();
    const [questions, setQuestions] = useState();
    const [answeredQuestions, setAnsweredQuestions] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [questionsPageNumber, setQuestionsPageNumber] = useState(0);

    const colNames = ["id", "respondent", "submitted", "num of correct answers", "grade"];
    const questionsColNames = ["id", "Question", "number of submissions", "% answered correctly"];

    const testPerPage = 8;
    const pageVisited = pageNumber * testPerPage;
    const displayAnsweredTests = tableList?.slice(pageVisited, pageVisited + testPerPage);
    const pageCount = Math.ceil(tableList?.length / testPerPage);

    const questionsPerPage = 8;
    const questionsPageVisited = questionsPageNumber * questionsPerPage;
    const displayAnsweredQuestions = answeredQuestions?.slice(questionsPageVisited, questionsPageVisited + questionsPerPage);
    const questionsPageCount = Math.ceil(answeredQuestions?.length / questionsPerPage);


    useEffect(() => {
        const getAnsweredTestData = async () => {
            const { data } = await getAllAnsweredTestsByQuery(`testId=${test._id}`);
            const tempTestList = [...data];
            for (let index = 0; index < data.length; index++) {
                const { data: respondent } = await getRespondnetById(data[index].respondentId);
                tempTestList[index].respondentId = respondent.name;
            }
            setAnsweredTests(tempTestList);


            const tempQuestionsList = [];
            for (let index = 0; index < data[0].answeredQuestions.length; index++) {
                const { data: questionsByQuery } = await getAllAnsweredQuestionsByQuery(`questionId=${data[0].answeredQuestions[index].questionId}`);
                const { data: questionContent } = await getQuestionById(data[0].answeredQuestions[index].questionId);
                tempQuestionsList.push({
                    questionId: data[0].answeredQuestions[index].questionId,
                    questionsList: questionsByQuery,
                    questionContent
                });
            }
            setQuestions(tempQuestionsList);
        }
        getAnsweredTestData();
    }, [test])


    useEffect(() => {
        const getQuestionsTableData = async () => {
            let index = 0;
            const tempList = questions?.map((question) => {
                index++;
                let numOfCorrectedPeople = 0;
                for (let index = 0; index < question.questionsList.length; index++) {
                    if (question.questionsList[index].isCorrect) {
                        numOfCorrectedPeople++;
                    }

                }
                return {
                    id: question.questionId,
                    index,
                    question: ReactHtmlParser(question.questionContent.questionContent)[0],
                    numOfSubmissions: question.questionsList?.length,
                    answeredCorrectly: `${(numOfCorrectedPeople / question.questionsList?.length * 100).toFixed(2)}%`,
                }
            });
            setAnsweredQuestions(tempList);
        }
        getQuestionsTableData();
    }, [questions])

    useEffect(() => {
        const getTableData = async () => {
            let index = 0;
            const tempList = answeredTests?.map((answeredTest) => {
                index++;
                let date = new Date(answeredTest.date);
                date = date.toLocaleDateString();
                return {
                    id: answeredTest._id,
                    index,
                    respondentName: answeredTest.respondentId,
                    date: date,
                    numOfCorrectAnswers: answeredTest.numOfCorrectAnswers || 5,
                    grade: answeredTest.finalGrade,
                }
            });
            setTableList(tempList);
        }
        getTableData();

    }, [answeredTests])

    const getRespondentPassed = () => {
        let counter = 0;
        answeredTests?.forEach(answeredTest => {
            if (answeredTest.isUserPassed) {
                counter++;
            }
        });
        return counter;
    }

    const getAverageGrade = () => {
        let gradeSum = 0;
        answeredTests?.forEach(answeredTest => {
            gradeSum += answeredTest.finalGrade;
        });
        return (gradeSum / answeredTests?.length).toFixed(2);
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    const questionsChangePage = ({ selected }) => {
        setQuestionsPageNumber(selected);
    }
    const onAnsweredTestSelcetedHandler = async (value) => {
        
        navigate(`/answeredTestReport/${value.id}`);
    }
    return (
        <div className='testReport'>
            <h2>Test Report :  {<span className='coloredWord'>{test.testName}</span>}</h2>
            <h3>Summary</h3>

            <div className='summaryTest'>
                <div>Test Name: {<span className='boldWord'>{test.testName}</span>}</div>
                <div>Test Id: {<span className='boldWord'>{test?._id}</span>}</div>
                <div>Num Of Questions: {<span className='boldWord'>{test?.questions?.length}</span>}</div>
                <div>Passing Grade: {<span className='boldWord'>{test?.passingGrade}</span>}</div>
                <div>Date Range: {<span className='boldWord'>{fromDate} - {toDate}</span>}</div>
                <div>Number Of Submmisions: {<span className='boldWord'>{answeredTests?.length}</span>}</div>
                <div>Number Of Respondents Passed: {<span className='boldWord'>{getRespondentPassed()}</span>}</div>
                <div>Passing Precentage: {<span className='boldWord'>{`${(getRespondentPassed() / answeredTests?.length * 100).toFixed(2)}%`}</span>}</div>
                <div>Average Grade: {<span className='boldWord'>{getAverageGrade()}</span>}</div>
            </div>


            <div className='respondentsGradesAndAnswers'>
                <h3>Respondents Grades And Answers</h3>
                <div>Click a name from the list to see the respondent answers</div>
                <br />
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
                <DataTable list={displayAnsweredTests} colNames={colNames} onSelect={onAnsweredTestSelcetedHandler} />
            </div>

            <div className='questionStats'>
                <h3>Question Statistics</h3>
                <div>Click a questoin to see its statistics</div>
                <div className='questionStatsField'>
                    <div>Filter by tags or content</div>
                    <input></input>
                </div>
                <div className='QuestionStatsButtonDiv'>
                    <button className="reportBtn">Show answer statistics of all questions</button>
                    <button className="reportBtn">Show detailed report of al answers</button>
                </div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={questionsPageCount}
                    onPageChange={questionsChangePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
                <DataTable list={displayAnsweredQuestions} colNames={questionsColNames} />
                <div className='reportBtnDiv'>
                    <button className="reportBtn">BACK</button>
                    <button className="reportBtn">PRINT</button>
                </div>

            </div>
        </div>
    )
}

export default ReportByTest