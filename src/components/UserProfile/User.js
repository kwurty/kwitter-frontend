import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { useState } from 'react'
import './User.css'
import { toast } from 'react-toastify';


export default function User({ user, followed }) {

    const userInfo = React.useContext(UserContext)
    const [isFollowing, setIsFollowing] = useState(followed)

    const followUser = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userInfo.user.token}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        let submit_follow = await fetch(`${process.env.REACT_APP_API_URL}/users/follow/${user.id}`, requestOptions);
        let follow_status = await submit_follow.status
        if (follow_status === 201) {
            let follow_results = await submit_follow.json()
            setIsFollowing(follow_results.following);
        }
    }

    return (
        <div className='user'>
            <div className="author">
                <Link to={`/profile/${user.username}`}>
                    <div className="icon">
                        <div className="icon-text">
                            {user.username[0].toUpperCase()}
                        </div>
                    </div>

                </Link>
                <div className="user-top">
                    <div>
                        <div className="displayname">
                            {user.displayname}
                        </div>
                        <div className="username">
                            {user.username}
                        </div>

                    </div>
                    {
                        isFollowing ? (
                            <div className="follow-button-container">
                                <button className="unfollow-button"
                                    onClick={followUser}>Unfollow</button>
                            </div>
                        ) : (
                            <div className="follow-button-container">
                                <button className="follow-button"
                                    onClick={followUser}>Follow</button>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
