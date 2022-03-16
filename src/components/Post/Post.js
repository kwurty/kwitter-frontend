import React from 'react'
import "./Post.css"

export default function Post({ post }) {
    const whiteHeart = '\u2661';
    const blackHeart = '\u2665';

    let date = new Date(post.Post.created_at)

    console.log(post)
    return (
        <div className="post">
            <div className="author">
                <div className="icon">
                    <div className="icon-text">
                        {post.Post.user.username[0].toUpperCase()}
                    </div>
                </div>
                <div className="username">
                    {post.Post.user.username}
                </div>

            </div>
            <div className="content">
                <div className="title">
                    {post.Post.title}
                </div>
                <div className="content">
                    {post.Post.content}
                </div>
                <div className="info">
                    <div className="date">
                        {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
                    </div>
                    <div className="likes">
                        &#x2764; {post.Post.votes || "0"}
                    </div>
                </div>


            </div>
        </div>
    )
}
