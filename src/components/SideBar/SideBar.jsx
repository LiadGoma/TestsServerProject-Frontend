import React from 'react'
import { NavLink } from 'react-router-dom'
import "./SideBar.css";

function SideBar() {
    return (
        <div className='sidebar'>
            <NavLink className={(navData)=>navData.isActive?"active navlink": "navlink"} to="/questionsManager">Manage Questions</NavLink>
            <NavLink className={(navData)=>navData.isActive?"active navlink": "navlink"} to="/testsManager">Manage Tests</NavLink>
            <NavLink className={(navData)=>navData.isActive?"active navlink": "navlink"} to="/testsReports">Tests Reports</NavLink>
            <NavLink className={(navData)=>navData.isActive?"active navlink": "navlink"} to="/respondentsReports">Respondents Reports</NavLink>
        </div>
    )
}

export default SideBar