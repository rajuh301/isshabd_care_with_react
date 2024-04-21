import React from 'react';
import Navbar from '../Shair/Navbar';
import { Outlet } from 'react-router-dom';
import PublicPage from './PublicPage/PublicPage';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
  <PublicPage/>
        </div>
    );
};

export default Main;