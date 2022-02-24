import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { respondentAuthActions } from '../../store/respondentAuth';
import { useNavigate } from 'react-router-dom';
import { createNewRespondent } from '../../services/respondentsService';
import "./RespondentLogin.css";
import { validateRespondentLogin } from '../../services/validator';

function RespondentLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState();


    const loginHandler = async () => {
        const respondent = {
            name,
            email,
            phoneNumber
        }
        const loginErrors = validateRespondentLogin(respondent);
        setErrors(loginErrors);
        if (!loginErrors.name&&!loginErrors.email&&!loginErrors.phoneNumber) {
            const { data } = await createNewRespondent(respondent);
            dispatch(respondentAuthActions.login(data._id));
            navigate(-1);
        }

    }
    return (
        <>
            <div className='loginForm'>
                <div className='loginField'>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}></input>
                    {errors?.name&&<div className='loginErorr'>{errors.name}</div>}
                </div>
                <div className='loginField'>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    {errors?.email&&<div className='loginErorr'>{errors.email}</div>}
                </div>
                <div className='loginField'>
                    <label>Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                    {errors?.phoneNumber&&<div className='loginErorr'>{errors.phoneNumber}</div>}
                </div>
                <button onClick={loginHandler} className="loginBtn">Login</button>
            </div>

        </>
    )
}

export default RespondentLogin