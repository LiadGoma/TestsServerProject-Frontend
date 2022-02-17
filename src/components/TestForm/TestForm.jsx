import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import TextEditor from '../TextEditor/TextEditor';
import DataTable from '../DataTable/DataTable.jsx';
import { createNewTest } from "../../services/testsService";
import { getAllQuestions } from '../../services/questionsService';
import "./TestForm.css";

function TestForm() {
    const [questionContent, setQuestionContent] = useState();
    const [questionList, setQuestionList] = useState([]);
    const [showQuestion, setShowQuestion] = useState(false);
    const [testName, setTestName] = useState();
    const [testHeader, setTestHeader] = useState();
    const [testPassingGrade, setTestPassingGrade] = useState();
    const [testSuccessText, setTestSuccessText] = useState();
    const [testFailText, setTestFailText] = useState();
    const [testField, setTestField] = useState();



    const colNames = ["Id", "Question Text and Tags", ""];

    useEffect(() => {
        const setQuestionsData = async () => {
            const { data } = await getAllQuestions();
            setQuestionList();
        }
        setQuestionsData();
    }, []);

    useEffect(() => {
        let index = 0;
        const data = questionList?.map((question) => {
            index++;
            return {
                id: question._id,
                index,
                questionContent: [ReactHtmlParser(question.questionContent), ...question.tags],
            }
        });
        setQuestionList(data);
    }, [])

    const fieldChangeHandler = (e) => {
        setTestField(e.target.value);
    }
    const nameChangeHandler = (e) => {
        setTestName(e.target.value);
    }
    const passingGradeChangeHandler = (e) => {
        setTestPassingGrade(e.target.value);
    }
    const headerContentChangeHandler = (e) => {
        setTestHeader(e.target.value);
    }
    const successContentChangeHandler = (e) => {
        setTestSuccessText(e.target.value);
    }
    const failContentChangeHandler = (e) => {
        setTestFailText(e.target.value);
    }
    const showClickHandler = () => {
        setShowQuestion(true);
    }
    
    const handleSaveClick = () => {
    //    const validateErrors = validateTest({                      //Import from validator, make a test validator there!
    //        isHorizontal,
    //        isMultiChoice,
    //        questionText,
    //        extraContent,
    //        answers,
    //        tags
    //    });
    //   setErrors(validateErrors);
    //   if (Object.values(validateErrors).length > 0) setIsErrors(true);
        const newTest = {
            testName: testName,
            testHeader: testHeader,
            testPassingGrade: testPassingGrade,
            testSuccessText: testSuccessText,
            testFailText: testFailText,
            testField: testField,
            questionList: questionList
       }
        createNewTest(newTest);
        window.location = "/testsManager";
   }


    return (

    <div className="form">
        <div>
            <label>Field of Study:</label>
            <input onChange={fieldChangeHandler} value={testField}></input>
        </div>
        <div className="field">
            <label>Test Name:</label>
            <input onChange={nameChangeHandler} value={testName}></input>
        </div>
        <div className="field">
            <label>Passing Grade:</label>
            <input type="number" min="55" max="100" onChange={passingGradeChangeHandler} value={testPassingGrade}></input>
        </div>
        <div>
            <label>Show Correct Answers After Submission</label>
        </div>
        <div>
            <label>Header</label>
            <TextEditor height={200} initValue={testHeader} changeHandler={headerContentChangeHandler} />
        </div>
        <div>
            <label>Message to Show on Success:</label>
            <TextEditor height={200} initValue={testSuccessText} changeHandler={successContentChangeHandler} />
        </div>
        <div>
            <label>Message to Show on Failure:</label>
            <TextEditor height={200} initValue={testFailText} changeHandler={failContentChangeHandler} />
        </div>
        <div>
            <h3>Select the question you want to include in the test</h3>
            <div className="questions">
                <DataTable list={questionList} colNames={colNames}/>
            </div>
        </div>
        <button className='formBtn green' onClick={handleSaveClick}>SAVE</button>
    </div> 

    )
}

export default TestForm;
