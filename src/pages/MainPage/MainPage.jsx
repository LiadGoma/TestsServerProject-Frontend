import React from 'react'
import "./MainPage.css";
import { Outlet, Route, Routes } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar';
import QuestionsManager from '../QuestionsManager/QuestionsManager';
import TestsManager from '../TestsManager/TestsManager';
import AddNewQuestion from '../AddNewQuestion/AddNewQuestion';

function MainPage() {
    return (
        <div className='mainPage'>
            <SideBar />
            <div></div>
            <div className='content'>
                <Routes>
                    <Route path="/questionsManager" element={<QuestionsManager />} />
                    <Route path="/testsManager" element={<TestsManager />} />
                    <Route path="/addNewQuestion" element={<AddNewQuestion />} />
                </Routes>
            </div>
        </div>
    )
}

export default MainPage