import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import '../css/dashboard.css'

export default function UserDashboard() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`http://localhost:5000/users/details`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            firstName: data.firstName, 
            lastName: data.lastName,
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  return (
    <div className='Content'>
      <div className='Content-container'>
        <div className='text-center content-div'>
          <h1 className='Content-header my-3'>Hello, {user.firstName} {user.lastName}! Welcome to Your Dashboard</h1>
          <p className='Content-para my-3'>Here is where you can control things. Let's work together!</p>
          <Link to="/pet" className='Content-button my-3'>Get Started</Link>
        </div>
      </div>
    </div>
  );
}
