import React from 'react'
import "./MainPage.css";
import { Outlet, Route, Routes } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar';
import QuestionsManager from '../QuestionsManager/QuestionsManager';
import TestsManager from '../TestsManager/TestsManager';
import AddNewQuestion from '../AddNewQuestion/AddNewQuestion';
import EditQuestion from '../EditQuestion/EditQuestion';
import AddNewTest from '../AddNewTest/AddNewTest';
import TestsReports from '../TestsReports/TestsReports';
import RespondentsReports from '../RespondentsReports/RespondentsReports';
import ReportByRespondentAndTest from '../../components/ReportByRespondentAndTest/ReportByRespondentAndTest';
import EditTest from '../EditTest/EditTest';
import TestPage from '../TestPage/TestPage';
import RespondentLogin from '../RespondentLogin/RespondentLogin';

function MainPage() {
    return (
        <>
            <Routes>
                <Route path="/test/:testId" element={<TestPage />} />
                <Route path="/test/login" element={<RespondentLogin />} />
                <Route path="/*" element={
                    <div className='mainPage'>
                        <SideBar />
                        <div className='sideBarDiv'></div>
                        <div className='content'>
                            <Routes>
                                <Route path="/questionsManager" element={<QuestionsManager />} />
                                <Route path="/testsManager" element={<TestsManager />} />
                                <Route path="/addNewQuestion" element={<AddNewQuestion />} />
                                <Route path="/addNewTest" element={<AddNewTest />} />
                                <Route path="/editQuestion/:questionId" element={<EditQuestion />} />
                                <Route path="/editTest/:testId" element={<EditTest />} />
                                <Route path="/testsReports" element={<TestsReports />} />
                                <Route path="/respondentsReports" element={<RespondentsReports />} />
                                <Route path="/AnsweredTestReport/:answeredTestId" element={<ReportByRespondentAndTest />} />
                            </Routes>
                        </div>
                    </div>
                } />


            </Routes>

        </>
    )
}

export default MainPage