import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAnsweredTestById } from '../../services/answeredTestService';
import { getRespondnetById } from '../../services/respondentsService';
import { getTestById } from '../../services/testsService';
import DataTable from '../DataTable/DataTable';
import ReactToPrint from "react-to-print";
import "./ReportByRespondentAndTest.css";
import ReactHtmlParser from "react-html-parser";
import OpenedTableRow from '../OpenedTableRow/OpenedTableRow';

function ReportByRespondentAndTest() {
  const params = useParams();
  const navigate = useNavigate();
  const componentRef=useRef();

  const [test, setTest] = useState();
  const [answeredTest, setAnseredTest] = useState();
  const [respondent, setRespondent] = useState();
  const [tableList, setTableList] = useState([]);

  const colNames = ["id", "question", "answered correctly?", "date Answered"]

  useEffect(() => {
    const fetchAnsweredTestData = async () => {
      const answeredTestId = params.answeredTestId;
      const { data: selectedAnsweredTest } = await getAnsweredTestById(answeredTestId);
      const { data: selectedTest } = await getTestById(selectedAnsweredTest.testId);
      const { data: selectedRespondent } = await getRespondnetById(selectedAnsweredTest.respondentId);
      setTest(selectedTest);
      setAnseredTest(selectedAnsweredTest);
      setRespondent(selectedRespondent);
    }
    fetchAnsweredTestData();
  }, [])

  useEffect(() => {
    let index = 0;
    const tempList = answeredTest?.answeredQuestions.map((question) => {
      index++;
      let date = new Date(question.lastUpdated);
      date = date.toLocaleDateString();
      const findQuestion = test.questions.find((ques) => ques._id === question.questionId);
      return {
        id: question._id,
        index,
        question: ReactHtmlParser(findQuestion.questionContent),
        isCorrect: question.isCorrect,
        date: answeredTest.date,
        answers: findQuestion.answers,
        userAnswer: question.answers
      }
    });
    setTableList(tempList);
  }, [answeredTest])

  const navigateBackHandler = () => {
    navigate(-1);
  }



  return (
    <div ref={componentRef}>
      <h2>Test result for <span className='coloredWord'> {test?.testName}</span></h2>
      <h3>Respondet: <span className='coloredWord'>{respondent?.name}</span> </h3>
      <h3>Summary</h3>
      <div className='summaryTest'>
        <div>Test Name: <span className='boldWord'>{test?.testName}</span></div>
        <div>Test Id: <span className='boldWord'>{test?._id}</span></div>
        <div>Num Of Questions: <span className='boldWord'>{test?.questions.length}</span></div>
        <div>Passing Grade: <span className='boldWord'>{test?.passingGrade}</span></div>
        <div>Last Submmited: <span className='boldWord'>{answeredTest?.date}</span></div>
        <div>Number Of Question Submitted: <span className='boldWord'>{answeredTest?.answeredQuestions?.length}</span></div>
        <div>Number of Correct Answers: <span className='boldWord'>{answeredTest?.numOfCorrectAnswers}</span></div>
        <div>Final Grade: <span className='boldWord'>{answeredTest?.finalGrade}</span></div>
        <div>Status: <span className='boldWord'>{answeredTest?.isUserPassed ? "Passed" : "Not passed"}</span></div>
      </div>
      <div className='Detailes'>
        <h2>Details</h2>
        <div>Click a question to see its results</div>
        <table>
          <thead>
            <tr>
              {colNames?.map((colName, index) => {
                return <th key={index}>{colName.toUpperCase()}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {tableList?.map((obj, index2) => {
              return <OpenedTableRow key={index2} obj={obj} />

            })}
          </tbody>

        </table>
      </div>
      <div className="reportBtnDiv2">
        <button className='reportBtn' onClick={navigateBackHandler}>BACK</button>
        <ReactToPrint
        trigger={() => <button className='reportBtn'>PRINT</button>}
        content={() => componentRef.current}
      />
      </div>

    </div >
  )
}

export default ReportByRespondentAndTest