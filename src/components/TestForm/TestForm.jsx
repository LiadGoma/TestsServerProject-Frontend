import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import TextEditor from '../TextEditor/TextEditor';
import DataTable from '../DataTable/DataTable.jsx';
import { createNewTest } from "../../services/testsService";
import { getAllQuestions, getQuestionById } from '../../services/questionsService';
import { validateTest } from '../../services/validator';
import Modal from '../Modal/Modal';
import "./TestForm.css";
import ReactPaginate from "react-paginate";

function TestForm({ edit, editTest }) {
    const [questionList, setQuestionList] = useState([]);
    const [testName, setTestName] = useState("");
    const [testHeader, setTestHeader] = useState("");
    const [testPassingGrade, setTestPassingGrade] = useState(55);
    const [testSuccessText, setTestSuccessText] = useState("");
    const [testFailText, setTestFailText] = useState("");
    const [testField, setTestField] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [canShowAnswers, setCanShowAnswers] = useState(false);
    const [creatorEmail, setCreatorEmail] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [errors, setErrors] = useState({});
    const [isErrors, setIsErrors] = useState(false);
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
                const tempSelectedQuestions = edit.questions.map((question) => { return { id: question._id } });
                setSelectedQuestions(tempSelectedQuestions);
                setCanShowAnswers(edit.canShowAnswers);
                setCreatorEmail(edit.creatorEmail);
            }
        }
        setEditData();
    }, [edit]);

    useEffect(() => {
        getAllQuestions().then((response) => setQuestionList(response.data.map((question, index) => {
            let testingSelected = false;
            const isSelected = selectedQuestions.forEach(selectedQuestion => {
                if (selectedQuestion.id === question._id) {
                    testingSelected = true;
                }
            });
            return {
                id: question._id,
                index,
                questionContent: [ReactHtmlParser(question.questionContent), ...question.tags],
                selected: testingSelected
            }
        })));
    }, [selectedQuestions, displayQuestions]);

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
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    const closeModal = () => {
        setIsErrors(false);
    }
    const canShowAnswersChangeHandler = () => {
        setCanShowAnswers(!canShowAnswers);
    }
    const emailChangeHandler = (e) => {
        setCreatorEmail(e.target.value);
    }

    const handleSaveClick = async () => {
        const validateErrors = validateTest({
            testName,
            testField,
            testHeader,
            creatorEmail,
            testPassingGrade,
            testSuccessText,
            testFailText,
            selectedQuestions
        });
        setErrors(validateErrors);

        if (Object.values(validateErrors).length > 0) {
            setIsErrors(true);
            return;
        };

        const newTest = {
            testName: testName,
            field: testField ? testField : "",
            testIntroduction: testHeader,
            creatorEmail: creatorEmail,
            passingGrade: testPassingGrade,
            canShowAnswers: true,
            certificationURL: "What the actual fuck",
            successText: testSuccessText,
            failureText: testFailText,
            questions: selectedQuestions
        }
        if (edit) {
            await editTest(newTest, edit._id)
            navigation("/testsManager");
            return;
        }
        if (Object.values(validateErrors).length < 1) {
            createNewTest(newTest).then(() => navigation("/testsManager"));
        }
    }


    const selectedQuestionHandler = (question) => {
        let temp = selectedQuestions;
        if (!selectedQuestions.find((q) => q.id === question.id)) {
            temp.push({ id: question.id });
            setSelectedQuestions(temp);
        }
        else {
            temp = temp.filter((q) => q.id !== question.id);
            setSelectedQuestions(temp);
        }
    }


    return (
        <>
            {isErrors && <Modal title="Errors" content={Object.values(Object.values(errors))} onConfirm={closeModal} />}

            <div className="form">
                <div className="field">
                    <label className={errors.testName ? "error" : ""}>Test Name:</label>
                    <input onChange={nameChangeHandler} defaultValue={testName}></input>
                </div>
                <div className="field">
                    <label className={errors.field ? "error" : ""}>Field of Study:</label>
                    <input onChange={fieldChangeHandler} defaultValue={testField}></input>
                </div>
                <div className="field">
                    <label>Passing Grade:</label>
                    <input type="number" min="55" max="100" onChange={passingGradeChangeHandler} value={testPassingGrade}></input>
                </div>
                <div className='field'>
                    <label>Allow Students to See Correct Answers After Submission</label>
                    <input type="checkbox" onChange={canShowAnswersChangeHandler} checked={canShowAnswers} />
                </div>
                <div className="field">
                    <label className={errors.creatorEmail ? "error" : ""}>Creator EMail:</label>
                    <input onChange={emailChangeHandler} defaultValue={creatorEmail}></input>
                </div>
                <div>
                    <label className={errors.testIntroduction ? "error" : ""}>Header</label>
                    <TextEditor height={200} initValue={testHeader} changeHandler={headerContentChangeHandler} />
                </div>
                <div>
                    <label className={errors.successText ? "error" : ""}>Message to Show on Success:</label>
                    <TextEditor height={200} initValue={testSuccessText} changeHandler={successContentChangeHandler} />
                </div>
                <div>
                    <label className={errors.failureText ? "error" : ""}>Message to Show on Failure:</label>
                    <TextEditor height={200} initValue={testFailText} changeHandler={failContentChangeHandler} />
                </div>
                <div>
                    <h3 className={`field ${errors.selectedQuestions ? "error" : ""}`}>Select the question you want to include in the test</h3>
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
                        <DataTable list={displayQuestions} colNames={colNames} onSelect={selectedQuestionHandler} />
                    </div>
                </div>
                <button className='formBtn green' onClick={handleSaveClick}>SAVE</button>
            </div>
        </>
    )
}

export default TestForm;
