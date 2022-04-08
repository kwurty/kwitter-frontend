import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { UserContext } from '../../contexts/UserContext'
import './UserProfile.css'
import { toast } from 'react-toastify';
import defaultProfilePicture from '../../images/usericon.png'
import Post from '../Post/Post';
import { useParams } from 'react-router';

export default function UserProfile() {

    let { username } = useParams()

    const [userInfo, setUserInfo] = useState(null)
    const [posts, setPosts] = useState(null)
    const [isFollowing, setIsFolowing] = useState(null)

    let joinedDate = null

    const user = React.useContext(UserContext)

    useEffect(() => {


        const retrieveDetails = async () => {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.user.token}`);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let user_detail = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}`, requestOptions)
            let user_status = await user_detail.status
            if (user_status === 200) {
                user_detail = await user_detail.json()
                setUserInfo(user_detail)
                setIsFolowing(user_detail.is_following)

            }
        }

        const retrievePosts = async () => {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.user.token}`);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let user_posts = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}/posts`, requestOptions)

            let posts = await user_posts.json()

            if (user_posts.status === 200) {
                setPosts(posts)

            }

        }

        retrieveDetails()
        retrievePosts()

    }, [])


    return (
        <>
            {
                userInfo && (

                    <div className="userprofile">
                        <header>
                            <div className="user-profile-pic">
                                <img src={defaultProfilePicture} alt='' className="profile-picture"></img>
                            </div>
                            <div className="user-info">

                                <div className="user-displayname">
                                    {userInfo.displayname}
                                </div>
                                <div className="user-name">
                                    @{userInfo.username}

                                </div>

                            </div>
                            {
                                userInfo.id === user.user.id ?
                                    <div className='edit-profile'>
                                        <button>Edit Profile</button>
                                    </div>
                                    :

                                    <div className="follow">

                                        {
                                            userInfo.isFollowing ? (
                                                <div className="is-following">
                                                    <button>
                                                        Unfollow
                                                    </button>
                                                </div>
                                            )
                                                :
                                                <div className="is-not-following">
                                                    <button>
                                                        Follow
                                                    </button>
                                                </div>

                                        }
                                    </div>

                            }

                        </header>
                        <div className="joined-date">
                            Joined {new Date(userInfo.created_at).toLocaleDateString("en-US")}
                        </div>
                        <div className="user-stats">
                            <div className="follow-item">
                                <span> {userInfo.following} </span> Following
                            </div>
                            <div className="follow-item">
                                <span> {userInfo.followers} </span> Followers
                            </div>
                        </div>

                        <div className="posts-list">
                            {posts && posts.map((post) => (
                                <Post post={post} />
                            ))}
                        </div>

                    </div>
                )
            }

        </>
    )
}
