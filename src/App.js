// import { useState } from 'react';

import React from 'react';
import './App.css';
import { UserContextProvider } from './contexts/UserContext';
import Nav from './components/Nav/Nav';
import PostList from './components/PostList/PostList';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { render } from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Homescreen from './views/Homescreen';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Nav />
          <div className="center">

            <Routes>
              <Route path="/" element={<Homescreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
