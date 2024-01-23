import React from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth
import { Navigate } from "react-router-dom";
import '../css/registration.css';
import Register from '../components/Register';
export default function Registration() {

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
            <h1 className="header-text text-center mb-3">Registration</h1>
            <Register />
          </div>
        </div>
         
        </>
      )}
    </>
  );
}
