import { UserContext } from '../../contexts/UserContext'
import React from 'react';
import { Link } from "react-router-dom";
import './Nav.css';

export default function Nav() {
    const user = React.useContext(UserContext)
    return (
        <nav className="topnav">
            <ul className="menu">
                <li className="logo"><Link to="/">Kwitter</Link></li>
                {
                    user.user.auth && (
                        <>
                            <li className="item"><Link to="/">View Posts</Link></li>
                            <li className="item"><Link to="/">Create Post</Link></li>
                        </>
                    )
                }

                {
                    user.user.auth ? (
                        <>
                            <li className="item"> {UserContext.user}</li>
                        </>
                    ) : (
                        <>
                            <li className="item button secondary"><Link to="/register">Sign Up</Link></li>
                            <li className="item button"><Link to="/login">Log In</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}
