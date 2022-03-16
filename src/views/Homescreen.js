import React from 'react'
import PostList from '../components/PostList/PostList'
import CreatePost from '../components/Post/CreatePost'

export default function Homescreen() {
    return (
        <>
            <CreatePost></CreatePost>
            <PostList></PostList>
        </>
    )
}
