import React, { useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import Post from '../components/Post/Post'
import User from '../components/UserProfile/User'
import './Explore.css'
import { Link } from 'react-router-dom'

export default function Explore() {

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [hashtags, setHashtags] = useState([])


    const userContext = React.useContext(UserContext)
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userContext.user.token}`);


    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {


        let getRandomPosts = async () => {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/posts/explore`, requestOptions)
            let status = await response.status

            if (status !== 200) {
                return
            }

            let results = await response.json()
            setPosts(results)
        }

        let getRandomUsers = async () => {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/users/explore`, requestOptions)
            let status = await response.status

            if (status !== 200) {
                return
            }

            let results = await response.json()
            setUsers(results)
        }

        let getRandomHashtags = async () => {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/hashtags/explore`, requestOptions)
            let status = await response.status

            if (status !== 200) {
                return
            }

            let results = await response.json()
            setHashtags(results)
        }

        getRandomHashtags()
        getRandomPosts()
        getRandomUsers()

    }, [])

    return (
        <div className="explore">
            <div className="random-posts">
                <h1> Posts</h1>
                {posts.map((post, i) => (
                    <Post post={post} key={i}>

                    </Post>
                ))}
            </div>
            <div className="random-users">
                <h1>
                    Users
                </h1>
                {users.map((user, i) => (

                    <User user={user.User} followed={user.follow_user_id} key={i} />
                ))}
            </div>
            <div className="random-hashtags">
                <h1>
                    Trending Topics
                </h1>
                {hashtags.map((hashtag, i) => (
                    <div className="hashtag" key={i}>
                        <Link to={`/search/${hashtag.hashtag}`} >
                            #{hashtag.hashtag}

                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}
