import React, { useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import './CreatePost.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePost({ setReloadPosts }) {
    const [post, setPost] = useState('')

    const [submitted, setSubmitted] = useState(false)

    const user = React.useContext(UserContext)

    const submitPost = async () => {
        setSubmitted(true)


        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.user.token}`);
        myHeaders.append("Content-Type", "application/json");

        let content = JSON.stringify({
            "content": post,
            "published": true
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: content
        };


        let response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, requestOptions)
        let status = await response.status
        if (status === 201) {
            setPost("");
            toast.success('Posted successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: false
            })
            setSubmitted(false);
            setReloadPosts(true);
        } else {
            setSubmitted(false);
            toast.error('Post failed to submit! Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: false
            });
        }
    }

    return (
        <>
            {user.user.auth && (
                <div className="create-post-wrapper">
                    <ToastContainer />
                    <div className="input-box">
                        <div className="post-area">
                            {
                                post.length < 1 && (
                                    <span className="placeholder">What's happening?</span>
                                )
                            }
                            <textarea value={post}
                                onChange={(e) => {
                                    setPost(e.target.value.slice(0, 140));
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" && e.ctrlKey) {

                                    }
                                }}

                                disabled={submitted}
                            ></textarea>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="content">
                            <span className="counter">{140 - post.length}</span>
                            <button onClick={(e) => {
                                e.preventDefault();
                                submitPost();
                            }}>Post</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
