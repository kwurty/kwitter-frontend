import React, { useEffect, useState } from 'react'
import './UserHover.css'
import { UserContext } from '../../contexts/UserContext'
import Loading from '../Loading/Loading'

export default function UserHover({ user }) {

    const userContext = React.useContext(UserContext)
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let getUserInfo = async () => {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${userContext.user.token}`);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.username}`, requestOptions)
            let status = await response.status

            if (status !== 200) {
                return
            }

            let results = await response.json()
            setUserInfo(results)
        }

        getUserInfo();
    }, [])


    return (

        <div>

            {
                userInfo.id ? (
                    <div className="user-hover">
                        <div className="author">
                            <div className="icon">
                                <div className="icon-text">
                                    {userInfo.username[0].toUpperCase()}
                                </div>
                            </div>
                            <div className="info">
                                <div className='displayname'>
                                    {userInfo.displayname}
                                </div>
                                <div className="username">
                                    {userInfo.username}
                                </div>
                                <div className="follow">
                                    { }
                                </div>
                            </div>
                        </div>
                        <div className="user-actions">

                        </div>
                        <div className="user-stats">
                            <div className="user-stat">
                                <span>Followers: </span> {userInfo.followers}
                            </div>
                            <div className="user-stat">
                                <span>
                                    Following:
                                </span>
                                {userInfo.following}
                            </div>
                        </div>
                    </div>
                ) :
                    (
                        <div className="user-hover">
                            {loading && (
                                <Loading />
                            )}
                        </div>
                    )

            }

        </div>
    )
}
