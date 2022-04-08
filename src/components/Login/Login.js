import React, { useState } from 'react'
import './Login.css'
import { Link } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom'

export default function Login({ authState, setAuthState }) {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState('')

    let navigate = useNavigate();

    const user = React.useContext(UserContext)

    const submitLogin = async () => {

        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        let requestOptions = {
            method: 'POST',
            body: formdata,
        };

        let response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, requestOptions)

        let status = await response.status
        if (status === 403) {
            let loginError = await response.json()
            setError(loginError.detail);
            setTimeout(() => {
                setError(null)
            }, 8000);
        } else {
            let userInfo = await response.json()
            user.login(userInfo.access_token)
            let path = `/`;
            navigate(path);
        }
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="input-form">
                    <input type="text" placeholder="email" onInput={(e) => {
                        setUsername(e.target.value)
                    }} value={username} />
                    <input type="password" placeholder="password" onInput={(e) => {
                        setPassword(e.target.value)
                    }} value={password} />
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            submitLogin()
                        }}
                    >login</button>
                    <p className="message">Not registered?

                        <span className="link" onClick={(e) => {
                            e.preventDefault()
                            setAuthState("register")
                        }}> Create an account

                        </span>
                        <br />

                    </p>

                    <button style={{ "margin-top": "15px" }}
                        onClick={(e) => {
                            e.preventDefault()
                            setUsername("example@example.com");
                            setPassword("Password1234");
                            submitLogin();
                        }}
                    >
                        Use Demo Account
                    </button>
                </form>
            </div>
        </div>
    )
}
