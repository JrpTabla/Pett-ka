import React from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth
import { Navigate } from "react-router-dom";



import '../css/login.css';

import Login from '../components/Login';


export default function GetStarted() {

  const {user} = useAuth();

  console.log(user);

  return (
    <>
    {user ? (
      <Navigate to="/Dashboard" />
    ) : (
      <>
      <div className='container-reg'>
        <div className="div-reg container p-3">
          <h1 className="header-text text-center mb-3">Sign-In</h1>
          <Login />
        </div>
      </div>
      
      </>
    )}
    </>
  );
}
