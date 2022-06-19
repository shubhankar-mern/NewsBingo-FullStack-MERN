import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Register from './components/Register';
import Profile from './components/Profile';
import Login from './components/Login';
import App from './App';
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </SkeletonTheme>
);
