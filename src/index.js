import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import Home from './Home'

ReactDOM.render(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>,
    document.getElementById('root')
);