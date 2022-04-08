import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'


export default function User({ user }) {
    return (
        <Link to={`/profile/${user.username}`}>
            <div className='user'>
                <div className="author">
                    <div className="icon">
                        <div className="icon-text">
                            {user.username[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="user-top">
                        <div>
                            <div className="displayname">
                                {user.displayname}
                            </div>
                            <div className="username">
                                {user.username}
                            </div>

                        </div>
                        <div className="follow-button-container">
                            <button className="follow-button">Follow</button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
