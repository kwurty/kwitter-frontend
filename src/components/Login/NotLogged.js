import React, { useState } from 'react'
import './NotLogged.css'
import Login from './Login'
import Register from './Register'
import Kwitter from '../../images/kwitter.png'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export default function NotLogged() {
    const [authState, setAuthState] = useState(undefined)

    const user = React.useContext(UserContext)

    let navigate = useNavigate();

    const loginDemoAccount = async () => {
        let formdata = new FormData();
        formdata.append("username", "example@example.com");
        formdata.append("password", "Password1234");

        let requestOptions = {
            method: 'POST',
            body: formdata,
        };

        let response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, requestOptions)

        let status = await response.status
        if (status === 403) {

        } else {
            let userInfo = await response.json()
            user.login(userInfo.access_token)
            let path = `/`;
            navigate(path);
        }
    }

    return (
        <div className="login-container">
            <div className="login-left">
            </div>
            <div className="login-right">
                <div className="login-right-menu">


                    {authState === undefined && (
                        <div>
                            <div className="items">
                                <img src={Kwitter} alt="kwitter" />

                                <h1> Kwitter </h1>
                                <span onClick={e => {
                                    e.preventDefault();
                                    setAuthState("login")
                                }}>
                                    <h4>
                                        Login </h4>
                                </span>

                                <span onClick={e => {
                                    e.preventDefault();
                                    setAuthState("register")
                                }}>
                                    <h4>Register</h4>

                                </span>
                            </div>
                            <div className="demo">
                                Just browsing? <br /><button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        loginDemoAccount();
                                    }}> [Use Demo Account]</button>
                            </div>

                        </div>
                    )}

                    {authState === "login" && (
                        <Login authState={authState} setAuthState={setAuthState} />
                    )}

                    {authState === "register" && (
                        <Register authState={authState} setAuthState={setAuthState} />
                    )}
                </div>
            </div>
        </div >
    )
}
