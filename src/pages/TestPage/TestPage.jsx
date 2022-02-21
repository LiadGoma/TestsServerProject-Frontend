import React, { useEffect, useState } from 'react'
import { matchRoutes, useParams } from 'react-router-dom';
import { getTestById } from '../../services/testsService';
import ReactPaginate from 'react-paginate';
import "./TestPage.css";
import Question from '../../components/Question/Question';
import { createNewAnsweredTest } from '../../services/answeredTestService';

function TestPage() {
  const [test, setTest] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false);
  const params = useParams();

  const questions = test?.questions;
  const questionsPerPage = 1;
  const pageVisited = pageNumber * questionsPerPage;
  const displayQuestion = questions?.slice(pageVisited, pageVisited + questionsPerPage)[0];
  const pageCount = Math.ceil(questions?.length / questionsPerPage);

  useEffect(() => {
    const getTestData = async () => {
      const { data } = await getTestById(params.testId);
      console.log(data);
      setTest(data);
    }
    getTestData();
  }, [])

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const answerChangeHandler = (questionId, answerId) => {
    const questionIndex = questions.findIndex((question) => question._id === questionId);
    const answerIndex = questions[questionIndex].answers.findIndex((answer) => answer._id === answerId);
    const isCorrect = questions[questionIndex].answers[answerIndex].isCorrect;

    const tempAnsweredQuestions = [...answeredQuestions];
    const isAnsweredQuestionExist = tempAnsweredQuestions.findIndex((answeredQuestion) => answeredQuestion.questionId === questionId);
    console.log(isAnsweredQuestionExist)
    if (isAnsweredQuestionExist > -1) {
      tempAnsweredQuestions[isAnsweredQuestionExist].answers = [answerId];
      tempAnsweredQuestions[isAnsweredQuestionExist].isCorrect = isCorrect;
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
      respondentId: "62029b734c44cd0cef44723b",
      isUserPassed: test.passingGrade < finalGrade,
      finalGrade: finalGrade,
      answeredQuestions: answeredQuestions
    }
    await createNewAnsweredTest(answeredTest);
  }

  return (
    <div>
      <div className='testHeader'>{test?.testName}</div>
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
    </div>
  )
}

export default TestPage