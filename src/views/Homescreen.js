import React, { useState } from 'react'
import PostList from '../components/PostList/PostList'
import CreatePost from '../components/Post/CreatePost'
import './Homescreen.css'

export default function Homescreen() {

    const [reloadPosts, setReloadPosts] = useState(false)

    return (
        <div className="homescreen">
            <div className="posts-pane">
                <CreatePost setReloadPosts={setReloadPosts}></CreatePost>
                <PostList reloadPosts={reloadPosts} setReloadPosts={setReloadPosts}></PostList>
            </div>

        </div>
    )
}
