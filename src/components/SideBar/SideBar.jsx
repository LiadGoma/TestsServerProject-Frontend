import { Divider } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./SideBar.css";
import MenuIcon from '@mui/icons-material/Menu';

function SideBar() {

    const [show, setShow] = useState(true);
    const handleClick = (() => {
        setShow((prev) => !prev);
    })
    return (
        <>
            {show ?
                <div className='sidebar' >
                    <div className='links'>
                    <MenuIcon onClick={handleClick} className="menuIcon" />
                        <NavLink className={(navData) => navData.isActive ? "active navlink" : "navlink"} to="/questionsManager">Manage Questions</NavLink>
                        <Divider variant='middle' />
                        <NavLink className={(navData) => navData.isActive ? "active navlink" : "navlink"} to="/testsManager">Manage Tests</NavLink>
                        <Divider />
                        <NavLink className={(navData) => navData.isActive ? "active navlink" : "navlink"} to="/testsReports">Tests Reports</NavLink>
                        <Divider />
                        <NavLink className={(navData) => navData.isActive ? "active navlink" : "navlink"} to="/respondentsReports">Respondents Reports</NavLink>
                        <Divider />
                    </div>
                    <a className='copyright' href="https://github.com/Liadgoma">©Copyright by Liad Goma</a>
                </div> :
                <div className='sidebarClosed' onClick={handleClick}>
                    <MenuIcon className="menuIcon" />
                </div>
            }
        </>
    )
}

export default SideBar