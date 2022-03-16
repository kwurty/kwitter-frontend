import React, { useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'

import './PostList.css'
import Post from "../Post/Post"

export default function PostList() {
    let [posts, setPosts] = useState(null)
    const user = React.useContext(UserContext)
    useEffect(() => {

        let fetchPosts = async () => {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.user.token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, requestOptions)
            let status = await response.status
            if (status === 200) {
                let postsInfo = await response.json()
                setPosts(postsInfo)
            } else {
                console.log(response)
                console.log(posts)
            }
        }

        if (user.user.auth) {
            fetchPosts()
        }
    }, [user])
    return (
        <div class="post-list-wrapper">
            <div className="postlist">
                {posts && posts.map((post) => {
                    return <Post post={post} ></Post>
                })}
            </div>
        </div>
    )
}
