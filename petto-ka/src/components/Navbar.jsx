// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../css/Navbar.css';

const NavigationBar = () => {

  const { user, logout } = useAuth();


  const handleLogout = () => {
    logout();
  };


  
  return (
    <>
      <Navbar expand="lg" className="Navbar">
        <Container>
          <Link to="/" className="Nav-Logo my-2">Petto-ka</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center">
            {user ? (
            
                user.isAdmin ? (
                  <>
                    <li><Link to="/dashboard" className="Nav-link mx-3">Dashboard</Link></li>
                    <li><Link to="/users" className="Nav-link mx-3">Users</Link></li>
                    <li><Link to="/pets" className="Nav-link mx-3">Pets</Link></li>
                    <li><Link to="/veterinary" className="Nav-link mx-3">Veterinary</Link></li>
                    <li><Link href="/logout" className="Nav-link mx-3" onClick={handleLogout}>Logout</Link></li>
                  </>

                ) : (
                  <>
                    <li><Link to="/dashboard" className="Nav-link mx-5">Dashboard</Link></li>
                    <li><Link href="/logout" className="Nav-link mx-5" onClick={handleLogout}>Logout</Link></li>
                  </>
                  
                )
                
              ) : (
                <>
                  <li><Link to="/" className="Nav-link mx-5 my-2">Home</Link></li>
                  <div className='d-flex m-auto'>
                    <li><Link to="/login" className="Nav-link mx-2 my-2">Login</Link></li>
                    <li><Link className="Nav-link">|</Link></li>
                    <li><Link to="/register" className="Nav-link mx-2 my-2">Register</Link></li>
                  </div>

                </>
              )
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

    
  );
};

export default NavigationBar;


