
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Trending.css'

export default function Trending() {

    let [trending, setTrending] = useState([])

    useEffect(() => {

        async function getTrending() {

            let response = await fetch(`${process.env.REACT_APP_API_URL}/hashtags`)

            let status = await response.status
            if (status === 200) {
                let trendingTags = await response.json()
                setTrending(trendingTags)

            }

        }
        getTrending()


    }, [])

    return (
        <div className="trending-bar">
            <h1> What's happening </h1>
            {trending.map((tag, i) => {
                return (

                    <Link to={`/search/${tag.hashtag}`} key={i}>
                        <div className="trending-item">
                            {tag.hashtag}
                        </div>
                    </Link>
                )
            })}
            <div className="trending-item trending-more">
                <Link to="/explore">
                    Show more
                </Link>
            </div>
        </div>
    )
}
