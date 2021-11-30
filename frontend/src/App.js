import './App.css';
import React, {useState, useEffect, Component} from "react";
import Axios from 'axios';
import {BrowserRouter as Router,Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Login from './Pages/Login';
import UserPage from './Pages/UserPage';
import ProtectedRoute from './Pages/ProtectedRoute';



function App(){


    return(
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/userPage' element={<UserPage/>}/>
          </Routes>
        </Router>
      </div>
    )


}

export default App;

// to run: npm start