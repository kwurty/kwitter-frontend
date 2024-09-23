import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Post from '../Post/Post'
import { toast } from 'react-toastify';
// import '../post'

export default function Search() {

    let { keyword } = useParams()
    let [posts, setPosts] = useState([])
    const user = React.useContext(UserContext)
    useEffect(() => {
        let fetchPosts = async () => {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.user.token}`);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let response = await fetch(`${process.env.REACT_APP_API_URL}/posts?hashtag=${keyword}`, requestOptions)
            let status = await response.status
            if (status === 200) {
                let postsInfo = await response.json()
                setPosts(postsInfo)
            } else {

            }
        }

        if (user.user.auth) {
            fetchPosts()
        }
    }, [user, keyword])


    return (
        <div className="post-list-wrapper">
            <div className="postlist">
                {posts && posts.map((post) => {
                    return <Post post={post} ></Post>
                })}
            </div>
        </div>
    )
}
