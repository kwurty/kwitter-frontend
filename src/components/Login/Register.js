import React from 'react'
import { useState } from 'react';
import './Register.css'
import { Link } from "react-router-dom";
import { DebounceInput } from 'react-debounce-input';
import { UserContext } from '../../contexts/UserContext';

export default function Register() {
    let [usernameError, setUsernameError] = useState(null)
    let [emailError, setEmailError] = useState(null)
    let [passwordError, setPasswordError] = useState(null)
    let [regError, setRegError] = useState(null)
    let [username, setUsername] = useState(null)
    let [email, setEmail] = useState(null)
    let [password, setPassword] = useState(null)

    const user = React.useContext(UserContext)

    const emailValidation = (email) => {
        setEmail(email)
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email")
        } else {
            setEmailError(null)
        }
    }

    const usernameValidation = (username) => {
        setUsername(username)
        if (username.length < 5) {
            setUsernameError("Username does not meet minimum length requirements (5)");
        }
        else {
            setUsernameError(null)
        }
    }

    const passwordValidation = (password) => {
        setPassword(password)
        if (password.length < 8) {
            setPasswordError("Password does not meet minimum length requirements (8)")
        } else {
            setPasswordError(null)
        }
    }

    const submitRegistration = async () => {

        if (!emailError && !usernameError && !passwordError) {

            let headers = new Headers();
            headers.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "email": email,
                "username": username,
                "password": password
            });

            let requestOptions = {
                method: 'POST',
                headers: headers,
                body: raw
            };

            let response = await fetch(`${process.env.REACT_APP_API_URL}/users/`, requestOptions)
            let status = await response.status

            if (status === 400) {
                let error = await response.json()
                setRegError(error.detail);
                setTimeout(() => {
                    setRegError(null)
                }, 8000);
            } else {
                let userInfo = await response.text();

                user.login({
                    "username": userInfo.username,
                    "id": userInfo.id,
                    'auth': true
                })


            }
        }
    }
    return (
        <div className="registration-page">
            <div className="form">
                <form className="input-form">
                    <DebounceInput className={usernameError ? 'error' : ''}
                        placeholder="username"
                        value={username}
                        debounceTimeout={300}
                        minLength="5"
                        onChange={(e) => {
                            setUsername(e.target.value.replace(/\s/g, ""))
                            usernameValidation(e.target.value.replace(/\s/g, ''))
                        }} >
                    </DebounceInput>

                    <DebounceInput className={passwordError ? 'error' : ''}
                        placeholder="password"
                        debounceTimeout={300}
                        type="password"
                        onChange={(e) => {
                            passwordValidation(e.target.value)
                        }} >
                    </DebounceInput>
                    <DebounceInput className={emailError ? 'error' : ''}
                        placeholder="email address"
                        debounceTimeout={300}
                        type="email"
                        onChange={(e) => {
                            emailValidation(e.target.value)
                        }} >
                    </DebounceInput>
                    <button onClick={(e) => {
                        e.preventDefault()
                        submitRegistration()
                    }}>create</button>
                    <p className="message">Already registered? <Link to="/login"> Sign In </Link></p>
                </form>

            </div>

            {
                (passwordError || usernameError || emailError) && (
                    <div className='errors'>
                        {
                            passwordError && (
                                <div> - {passwordError} </div>
                            )
                        }
                        {
                            usernameError && (
                                <div> - {usernameError} </div>
                            )
                        }
                        {
                            emailError && (
                                <div> - {emailError} </div>
                            )
                        }
                        {
                            regError && (
                                <div> - {regError}</div>
                            )
                        }
                    </div>
                )
            }



        </div>
    )
}
