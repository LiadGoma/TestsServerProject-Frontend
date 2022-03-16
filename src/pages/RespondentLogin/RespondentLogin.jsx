import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { respondentAuthActions } from '../../store/respondentAuth';
import { useNavigate } from 'react-router-dom';
import { createNewRespondent } from '../../services/respondentsService';
import "./RespondentLogin.css";
import TextField from '@mui/material/TextField';

import { validateRespondentLogin } from '../../services/validator';
import { Button } from '@mui/material';

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
        if (!loginErrors.name && !loginErrors.email && !loginErrors.phoneNumber) {
            const { data } = await createNewRespondent(respondent);
            dispatch(respondentAuthActions.login(data._id));
            navigate(-1);
        }

    }
    return (
        <div className='loginPage'>
            <div className='loginForm'>
                <div className='loginField'>
                    <TextField
                        value={name} onChange={(e) => setName(e.target.value)}
                        id="name-input"
                        label="Name"
                        type="search"
                        variant="outlined"
                        error={errors?.name && true}
                    />
                    {errors?.name && <div className='loginErorr'>{errors.name}</div>}
                </div>
                <div className='loginField'>
                    <TextField
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        id="email-input"
                        label="Email"
                        type="search"
                        variant="outlined"
                        error={errors?.email && true}
                    />
                    {errors?.email && <div className='loginErorr'>{errors.email}</div>}
                </div>
                <div className='loginField'>
                    <TextField
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                        id="phoneNumber-input"
                        label="Phone Number"
                        type="search"
                        variant="outlined"
                        error={errors?.phoneNumber && true}
                    />
                    {errors?.phoneNumber && <div className='loginErorr'>{errors.phoneNumber}</div>}
                </div>
                <Button
                    onClick={loginHandler} 
                    variant="outlined"
                    size="medium"
                    sx={{
                        borderColor: 'primary.main',
                        alignSelf: "center",
                        padding: "0.6rem",
                        backgroundColor:"rgb(245, 245, 249)"
                     
                    }
                    }>
                    LOGIN
                </Button>
            </div>

        </div>
    )
}

export default RespondentLogin