import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { respondentAuthActions } from '../../store/respondentAuth';
import { useNavigate } from 'react-router-dom';
import { createNewRespondent } from '../../services/respondentsService';
import "./RespondentLogin.css";

function RespondentLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const loginHandler = async () => {
        const respondent = {
            name,
            email,
            phoneNumber
        }
        const { data } = await createNewRespondent(respondent);
        dispatch(respondentAuthActions.login(data._id));
        navigate(-1);
    }
    return (
        <>
            <div className='loginForm'>
                <div className='loginField'>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className='loginField'>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='loginField'>
                    <label>Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                </div>
                <button onClick={loginHandler} className="loginBtn">Login</button>
            </div>

        </>
    )
}

export default RespondentLogin