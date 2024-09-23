// import { useState } from 'react';

import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Search from './components/Search/Search';
import Profile from './components/UserProfile/UserProfile'
import EditProfile from './components/UserProfile/EditProfile'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Homescreen from './views/Homescreen';
import SideNav from './components/Sidebar/SideNav';

import Trending from './components/Sidebar/Trending'
import Searchbar from './components/Search/Searchbar'
import NotLogged from './components/Login/NotLogged';
import Explore from './views/Explore';

import { UserContext } from './contexts/UserContext';

function App() {


  const user = React.useContext(UserContext)

  return (
    <div className="App" id="app">
      <BrowserRouter>
        {
          user.user.auth ? (
            <div className="center">
              <div className="left-panel">
                <SideNav />
              </div>
              <div className="middle-panel">
                <div className="search-bar">
                  <Searchbar />
                </div>
                <Routes>
                  <Route path="/" element={<Homescreen />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search/:keyword" element={<Search />} />
                  <Route path="/explore" element={<Explore />} />
                </Routes>
              </div>

              <div className="right-panel">
                <Searchbar />
                <Trending></Trending>

              </div>

            </div>
          )
            :
            (
              <NotLogged />
            )
        }

      </BrowserRouter>
    </div>
  );
}

export default App;
