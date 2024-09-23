import React, { useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './PostList.css'
import Post from "../Post/Post"
import { toast } from 'react-toastify';

export default function PostList({ reloadPosts, setReloadPosts }) {

    let fetchPosts = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.user.token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, requestOptions)
        let status = await response.status
        if (status === 200) {
            let postsInfo = await response.json()
            postsInfo.sort((a, b) => {
                return new Date(b.Post.created_at) - new Date(a.Post.created_at); // descending
            })

            setPosts(postsInfo)
        } else {

        }
    }

    let [posts, setPosts] = useState(null)
    const user = React.useContext(UserContext)
    useEffect(() => {

        if (user.user.auth) {
            fetchPosts()
        }
    }, [user.user.auth])

    useEffect(() => {

        if (user.user.auth && reloadPosts) {
            fetchPosts()
        }
    }, [reloadPosts])

    return (
        <div className="post-list-wrapper">
            <div className="postlist">
                <TransitionGroup>
                    {posts && posts.map((post) => {

                        return (

                            <CSSTransition
                                key={post.id}
                                timeout={500}
                                classNames="scroll"
                            >
                                <Post post={post} key={post.id} ></Post>

                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </div>
        </div>
    )
}
