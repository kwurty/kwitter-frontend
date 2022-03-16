import React, { useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import './CreatePost.css'

export default function CreatePost() {
    const [post, setPost] = useState('')

    const user = React.useContext(UserContext)
    return (
        <>
            {user.user.auth && (
                <div class="create-post-wrapper">
                    <div class="input-box">
                        <div class="tweet-area">
                            {
                                post.length < 1 && (
                                    <span class="placeholder">What's happening?</span>
                                )
                            }
                            <textarea value={post} onChange={(e) => {
                                setPost(e.target.value.slice(0, 140));
                            }}></textarea>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="content">
                            <span class="counter">{140 - post.length}</span>
                            <button>Post</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
