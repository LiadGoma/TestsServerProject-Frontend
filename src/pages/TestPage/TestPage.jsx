import React, { useEffect, useState } from 'react'
import { matchRoutes, Navigate, useParams } from 'react-router-dom';
import { getTestById } from '../../services/testsService';
import ReactPaginate from 'react-paginate';
import "./TestPage.css";
import Question from '../../components/Question/Question';
import { createNewAnsweredTest } from '../../services/answeredTestService';
import { useSelector } from 'react-redux';
import TestFinished from '../../components/TestFinished/TestFinished';
import { getRespondnetById, updateRespondent } from '../../services/respondentsService';
import { createNewAnsweredQuestion } from '../../services/answeredQuestionService';
import TestIntroduction from '../../components/TestIntroduction/TestIntroduction';

function TestPage() {
  const isAuth = useSelector((state) => state.respondentAuth.isAuthenticated);
  const respondentId = useSelector((state) => state.respondentAuth.respondentId);
  const params = useParams();


  const [test, setTest] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [answeredTestResults, setAnsweredTestResults] = useState();
  const [isTestStarted, setIsTestStarted] = useState(false);

  const questions = test?.questions;
  const questionsPerPage = 1;
  const pageVisited = pageNumber * questionsPerPage;
  const displayQuestion = questions?.slice(pageVisited, pageVisited + questionsPerPage)[0];
  const pageCount = Math.ceil(questions?.length / questionsPerPage);

  useEffect(() => {
    const getTestData = async () => {
      const { data } = await getTestById(params.testId);
      setTest(data);
    }
    getTestData();
  }, [])

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }
  const testStartedHandler = () => {
    setIsTestStarted(true);
  }

  const answerChangeHandler = (questionId, answerId, isChecked) => {
    const questionIndex = questions.findIndex((question) => question._id === questionId);
    const answerIndex = questions[questionIndex].answers.findIndex((answer) => answer._id === answerId);
    const isCorrect = questions[questionIndex].answers[answerIndex].isCorrect;
    const isMultiChoice = questions[questionIndex].isMultichoice;

    const correctAnswers = [];
    questions[questionIndex].answers.map((answer) => {
      if (answer.isCorrect) {
        correctAnswers.push(answer._id);
      }
    })




    const tempAnsweredQuestions = [...answeredQuestions];
    const isAnsweredQuestionExist = tempAnsweredQuestions.findIndex((answeredQuestion) => answeredQuestion.questionId === questionId);

    if (isAnsweredQuestionExist > -1) {
      if (!isMultiChoice) {
        tempAnsweredQuestions[isAnsweredQuestionExist].answers = [answerId];
        tempAnsweredQuestions[isAnsweredQuestionExist].isCorrect = isCorrect;
      }
      else {
        if (!isChecked) {
          tempAnsweredQuestions[isAnsweredQuestionExist].answers = tempAnsweredQuestions[isAnsweredQuestionExist].answers.filter((answer) => answer !== answerId);
          if (isAnswersIdentical(correctAnswers, tempAnsweredQuestions[isAnsweredQuestionExist].answers)) {
            tempAnsweredQuestions[isAnsweredQuestionExist].isCorrect = true;
          }
          else {
            tempAnsweredQuestions[isAnsweredQuestionExist].isCorrect = false;
          }
          return;
        }
        tempAnsweredQuestions[isAnsweredQuestionExist].answers.push(answerId);
        if (!isCorrect) tempAnsweredQuestions[isAnsweredQuestionExist].isCorrect = isCorrect;
        else {
          if (isAnswersIdentical(correctAnswers, tempAnsweredQuestions[isAnsweredQuestionExist].answers)) {
            tempAnsweredQuestions[isAnsweredQuestionExist].isCorrect = true;
          }
          else {
            tempAnsweredQuestions[isAnsweredQuestionExist].isCorrect = false;
          }
        }

      }
      return;
    }

    const answeredQuestion = {
      questionId: questionId,
      answers: [answerId],
      isCorrect: isCorrect
    }

    tempAnsweredQuestions.push(answeredQuestion);
    if (tempAnsweredQuestions.length >= test.questions.length) {
      setIsAllQuestionsAnswered(true);
    }
    setAnsweredQuestions(tempAnsweredQuestions);
  }

  const isAnswersIdentical = (answers1, answers2) => {
    if (answers1.length !== answers2.length) {
      return false;
    }
    answers1.map((answer) => {
      if (!answers2.includes(answer)) return false;
    })
    return true;
  }

  const submitTestHandler = async () => {

    let numOfCorrectAnswers = 0;
    answeredQuestions.map((answeredQuestion) => {
      if (answeredQuestion.isCorrect) {
        numOfCorrectAnswers++;
      }
    })
    const finalGrade = Math.ceil(100 / questions.length * numOfCorrectAnswers);
    const answeredTest = {
      testId: test._id,
      respondentId: respondentId,
      isUserPassed: test.passingGrade <= finalGrade,
      finalGrade: finalGrade,
      answeredQuestions: answeredQuestions,
      numOfCorrectAnswers: numOfCorrectAnswers
    }

    const { data } = await createNewAnsweredTest(answeredTest);
    const { data: respondent } = await getRespondnetById(respondentId);
    respondent.answeredTestsId = [...respondent.answeredTestsId, data._id];
    updateRespondent(respondent, respondent._id);

    for (let index = 0; index < answeredQuestions.length; index++) {
      const { data: questionAnswered } = await createNewAnsweredQuestion(answeredQuestions[index]);
    }

    setAnsweredTestResults(data);
    setIsTestFinished(true);
  }

  return (

    <div>
      {!isAuth && <Navigate to={"/test/login"} />}
      <div className='testHeader'>{test?.testName}</div>
      {!isTestStarted ? <TestIntroduction onClick={testStartedHandler} testIntroduction={test?.testIntroduction} /> :
        <>
          {!isTestFinished ?
            <div className='testPage'>
              <h3 className='questionHeader'>{`Question #${pageNumber + 1}`}</h3>
              {displayQuestion && <Question content={displayQuestion?.questionContent}
                extraContent={displayQuestion?.extraContent}
                answers={displayQuestion?.answers}
                isHorizontal={displayQuestion?.isHorizontal}
                isMultiChoice={displayQuestion?.isMultichoice}
                questionId={displayQuestion?._id} onAnswerChange={answerChangeHandler} />}

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
              {isAllQuestionsAnswered &&
                <button className='submitTestBtn' onClick={submitTestHandler}>SUBMIT TEST</button>}
            </div>
            :
            <TestFinished test={test} answeredTest={answeredTestResults} />
          }
        </>
      }


    </div>
  )
}

export default TestPage