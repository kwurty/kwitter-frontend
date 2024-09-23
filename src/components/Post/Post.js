import React, { useEffect, useState } from 'react'
import "./Post.css"
import { Link } from "react-router-dom";
import { Interweave, Node } from 'interweave'
import { HashtagMatcher, UrlMatcher } from 'interweave-autolink'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UserContext } from '../../contexts/UserContext'
import UserHover from '../UserProfile/UserHover';
import FadeInOut from '../../utils/FadeInOut';
import hashtagParser from '../../utils/HashtagMatcher';
import { toast } from 'react-toastify';


export default function Post({ post }) {

    function transform(node, children) {
        console.log(node)
        console.log(children)
    }


    const parser = hashtagParser();

    const [liked, setLiked] = useState(post.liked_post)
    const [likes, setLikes] = useState(post.votes)
    const [hovering, setHovering] = useState(false)

    useEffect(() => {

    }, [post])
    let date = new Date(post.Post.created_at)

    const user = React.useContext(UserContext)

    const likePost = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.user.token}`);
        myHeaders.append("Content-Type", "application/json");
        let dir = 0
        if (!liked) {
            dir = 1
        } else {
            dir = 0
        }

        let raw = JSON.stringify({
            "post_id": post.Post.id,
            "dir": dir
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(`${process.env.REACT_APP_API_URL}/vote`, requestOptions);
        let status = await response.status

        if (status === 201) {
            let results = await response.json();
            let liked = await results.liked;
            setLiked(liked)

            if (liked) {
                setLikes(likes + 1)
            } else {
                setLikes(likes - 1)
            }
        }
    }

    return (
        <CSSTransition
            key={post.id}
            timeout={500}
            classNames="item"
        >
            <div className="post">
                <Link to={`/profile/${post.Post.user.username}`} >

                    <div className="author"
                        onMouseOver={(e) => {
                            setHovering(true)
                        }}

                        onMouseLeave={(e) => {
                            setHovering(false)
                        }}
                    >
                        <div className="icon">
                            <div className="icon-text">
                                {post.Post.user.username[0].toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <div className="displayname">
                                {post.Post.user.displayname}
                            </div>
                            <div className="username">
                                @{post.Post.user.username}

                                <FadeInOut
                                    show={hovering}
                                    duration={300}
                                >
                                    <UserHover
                                        user={post.Post.user}
                                    />
                                </FadeInOut>

                            </div>
                        </div>


                    </div>
                </Link>
                <div className="content">
                    <div className="content">
                        {parser(post.Post.content)}
                    </div>
                    <div className="info">
                        <div className="date">
                            {date.toLocaleDateString("en-US")}
                        </div>
                        <div className="likes" onClick={(e) => {
                            e.preventDefault();
                            likePost();
                        }}>

                            {
                                liked ? (<span className="liked"> &#x2764; </span>) : (<span className="not-liked"> &#x2764; </span>)
                            }
                        </div>
                        <div className="likes-count">


                            {likes || "0"}
                        </div>
                    </div>


                </div>
            </div>
        </CSSTransition>
    )
}
