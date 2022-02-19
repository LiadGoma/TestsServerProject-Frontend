import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
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
    const [testName, setTestName] = useState("");
    const [testHeader, setTestHeader] = useState("");
    const [testPassingGrade, setTestPassingGrade] = useState(55);
    const [testSuccessText, setTestSuccessText] = useState("");
    const [testFailText, setTestFailText] = useState("");
    const [testField, setTestField] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const navigation = useNavigate();

    const colNames = ["Id", "Question Text and Tags", ""];

    useEffect(() => {
        getAllQuestions().then((response)=>setQuestionList(response.data.map((question, index)=>({
            id: question._id,
            index,
            questionContent: [ReactHtmlParser(question.questionContent), ...question.tags],
        }))));
        // const setQuestionsData = async () => {
        //     console.log(data.data);
        //     setQuestionList(data);
        // }
        // setQuestionsData();
    }, []);

    // useEffect(() => {
    //     let index = 0;
    //     const data = questionList?.map((question) => {
    //         index++;
    //         return {
    //             id: question._id,
    //             index,
    //             questionContent: [ReactHtmlParser(question.questionContent), ...question.tags],
    //         }
    //     });
    //     setQuestionList(data);
    // }, []);

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
        setTestHeader(e);
    }
    const successContentChangeHandler = (e) => {
        setTestSuccessText(e);
    }
    const failContentChangeHandler = (e) => {
        setTestFailText(e);
    }
    const showClickHandler = () => {
        setShowQuestion(true);
    }
    
    const handleSaveClick = () => {
    
        const newTest = {
            testName: testName,
            field: testField ? testField : "",
            testIntroduction: testHeader,
            creatorEmail: "lame@lame.co.il",
            passingGrade: testPassingGrade,
            canShowAnswers: true,
            certificationURL: "What the actual fuck",
            successText: testSuccessText,
            failureText: testFailText,
            lastUpdated: Date.now(),
            questions: selectedQuestions
       }
        createNewTest(newTest).then(()=>navigation("/testsManager"));
        //window.location = "/testsManager";
   }


   const selectedQuestionHandler = (question) =>{
    if(!selectedQuestions.find((q)=>q.id === question.id)){ 
        selectedQuestions.push({id:question.id})
        setSelectedQuestions(selectedQuestions)
    }
    else{
        setSelectedQuestions(selectedQuestions.filter((q)=>q.id !== question.id));
    }
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
                <DataTable list={questionList} colNames={colNames} onSelect={selectedQuestionHandler}/>
            </div>
        </div>
        <button className='formBtn green' onClick={handleSaveClick}>SAVE</button>
    </div> 

    )
}

export default TestForm;
