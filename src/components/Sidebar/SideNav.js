import React from 'react'
import { UserContext } from '../../contexts/UserContext'
import './SideNav.css'
import defaultProfilePicture from '../../images/usericon.png'
import { Link } from 'react-router-dom'
import Kwitter from '../../images/kwitter.png'


export default function SideNav() {

    const user = React.useContext(UserContext)

    return (
        <nav className="sidebar">
            <ul className="navbar">
                <li className="navbar-brand">
                    <Link to="/">
                        <img src={Kwitter} alt="kwitter" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/">
                        <a href="#/" className="item-icon home">
                            <ion-icon name="home-outline"></ion-icon>
                        </a>
                        <a href="#/" className="item-link">Home</a>
                    </Link>
                </li>
                <li className="nav-item hash">
                    <Link to="/explore">

                        <a href="#/" className="item-icon hash">
                            #
                        </a>
                        <a href="#/" className="item-link">Explore</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${user.user.username}`}>
                        <a href="#/" className="item-icon">
                            <ion-icon name="person-outline"></ion-icon>
                        </a>
                        <a href="#/" className="item-link">Profile</a>
                    </Link>
                </li>

                <a href="#/" className="tweet-btn"><ion-icon name="pencil"></ion-icon> <div className="text">Tweet</div></a>

            </ul>

            <Link to="/profile">
                <div className="profile-info">
                    <img src={defaultProfilePicture} alt='' className="profile-picture"></img>
                    <div>
                        <p className="name">{user.user.username}</p>
                        <p className="username">{user.user.displayname}</p>
                    </div>
                </div>
            </Link>

        </nav>

    )
}
