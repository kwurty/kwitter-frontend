// import { useState } from 'react';

import React from 'react';
import './App.css';
import { UserContextProvider } from './contexts/UserContext';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Nav />
      </UserContextProvider>
    </div>
  );
}

export default App;
