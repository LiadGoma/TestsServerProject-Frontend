import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import TextEditor from '../TextEditor/TextEditor';
import DataTable from '../DataTable/DataTable.jsx';
import { createNewTest } from "../../services/testsService";
import { getAllQuestions, getQuestionById } from '../../services/questionsService';
import "./TestForm.css";
import ReactPaginate from "react-paginate";

function TestForm({edit, editTest}) {
    const [questionList, setQuestionList] = useState([]);
    const [testName, setTestName] = useState("");
    const [testHeader, setTestHeader] = useState("");
    const [testPassingGrade, setTestPassingGrade] = useState(55);
    const [testSuccessText, setTestSuccessText] = useState("");
    const [testFailText, setTestFailText] = useState("");
    const [testField, setTestField] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const navigation = useNavigate();

    const colNames = ["Id", "Question Text and Tags", ""];
    const questionsPerPage = 10;
    const pageVisited = pageNumber * questionsPerPage;
    const displayQuestions = questionList.slice(pageVisited, pageVisited + questionsPerPage);
    const pageCount = Math.ceil(questionList.length / questionsPerPage);


    useEffect(() => {
        const setEditData = async () => {
            if (edit) {
                setTestName(edit.testName);
                setTestHeader(edit.testIntroduction);
                setTestPassingGrade(edit.passingGrade);
                setTestSuccessText(edit.successText);
                setTestFailText(edit.failureText);
                setTestField(edit.field);
                const tempSelectedQuestions = edit.questions.map((question)=>{return {id:question._id}});
                // for (let i = 0; i < edit.questions.length; i++) {
                //     const {data} = await getQuestionById(edit.questions[i]._id);
                //     tempSelectedQuestions.push(data); 
                // }    
                console.log(tempSelectedQuestions);
                setSelectedQuestions(tempSelectedQuestions);
            }
        }
        setEditData();
    }, [edit]);

    useEffect(() => {
        getAllQuestions().then((response)=>setQuestionList(response.data.map((question, index)=>{
            let testingSelected = false;
            const isSelected = selectedQuestions.forEach(selectedQuestion => {
                console.log(selectedQuestion)
                if(selectedQuestion._id === question._id) {
                    testingSelected = true;}
            });
            return{
            id: question._id,
            index,
            questionContent: [ReactHtmlParser(question.questionContent), ...question.tags],
            selected : testingSelected
        }})));
    }, [selectedQuestions]);

    const nameChangeHandler = (e) => {
        setTestName(e.target.value);
    }
    const fieldChangeHandler = (e) => {
        setTestField(e.target.value);
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
    const changePage=({selected})=>{
        setPageNumber(selected);
    }
    
    const handleSaveClick = () => {
        console.log(selectedQuestions);
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
            questions: selectedQuestions
        }
        console.log(newTest)
        if(edit){
            editTest(newTest, edit.id)
            navigation("/testsManager");
            return;
        }
        createNewTest(newTest).then(()=>navigation("/testsManager"));
   }


   const selectedQuestionHandler = (question) =>{

        if(!selectedQuestions.find((q)=>q.id === question.id)){
            // const {data} = await getQuestionById(question.id);
            selectedQuestions.push({id:question.id});
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
            <input onChange={fieldChangeHandler} defaultValue={testField}></input>
        </div>
        <div className="field">
            <label>Test Name:</label>
            <input onChange={nameChangeHandler} defaultValue={testName}></input>
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
            <DataTable list={displayQuestions} colNames={colNames} onSelect={selectedQuestionHandler}/>
            </div>
        </div>
        <button className='formBtn green' onClick={handleSaveClick}>SAVE</button>
    </div> 

    )
}

export default TestForm;
