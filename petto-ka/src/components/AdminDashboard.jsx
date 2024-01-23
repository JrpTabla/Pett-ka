import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import '../css/dashboard.css'

export default function AdminDashboard() {
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
          <h1 className='Content-header'>Hello, {user.firstName} {user.lastName}! Welcome to Admin Dashboard</h1>
          <p className='Content-para'>Here is where you can control things. Let's work together!</p>

          <Link to="/users" className='Content-button'>Get Started</Link>
        </div>
      </div>
    </div>
  );
}
