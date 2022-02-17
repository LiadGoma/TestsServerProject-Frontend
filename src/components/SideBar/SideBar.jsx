import React from 'react'
import { NavLink } from 'react-router-dom'
import "./SideBar.css";

function SideBar() {
    return (
        <div className='sidebar'>
            <NavLink className="navlink" to="/questionsManager">Manage Questions</NavLink>
            <NavLink className="navlink" to="/testsManager">Manage Tests</NavLink>
            <NavLink className="navlink" to="/testsReports">Tests Reports</NavLink>
            <NavLink className="navlink" to="/respondentsReports">Respondents Reports</NavLink>
        </div>
    )
}

export default SideBar