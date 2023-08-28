import React from 'react';
import logo from './gitbub.logo.png';
import Profile from './components/Profile';
import './index.css'

const App = () => {
  return (
    <div className="">
      <div className=''>
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="GitHub Logo" className="w-16 h-16 mr-2" />
          <h1 className="text-xl font-semibold">GitHub Profile Viewer</h1>
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default App;
