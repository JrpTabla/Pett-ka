import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useAuth } from '../AuthContext'; // Import the useAuth hook

export default function Login() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const { login } = useAuth(); // Use the useAuth hook to access login function
    
    const handleEmailCheck = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/checkEmail', {
                email:      loginEmail,
            });

            console.log(response.data);



            if (response.data == true) {

                // Swal.fire({
                //     icon: 'success',
                //     title: 'Email Exist',
                //     text: `Proceed to Login`,
                // });

                handleLogin(e);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Email not Exist',
                    text: `Proceed to Registration`,
                });
            }

        } catch (error) {
            console.error('Login error', error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                email: loginEmail,
                password: loginPassword
            });

            if (response.data.access) {
                login(response.data.access);
                const decodedToken = jwt_decode(response.data.access); // Decode the token

                if (decodedToken.isAdmin == true) {
                     // Set the user data in the context

                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successfully!',
                        text: 'Welcome Back Admin!!',
                    });
                } else {
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successfully!',
                        text: 'Welcome Back User!!',
                    });
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed!',
                    text: 'Email and Password do not match.',
                });
            }

        } catch (error) {
            console.error('Login error', error);
        }
    }


return (
        <Form className="form-reg" onSubmit={handleEmailCheck}>
           
            <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Control
                    type="email" 
                    className="form-input" 
                    required value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter Email"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Control
                    type="password" 
                    className="form-input" 
                    required 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter Password"
                />
            </Form.Group>
            <div className='w-100 text-center'>
                <Button variant="primary" type="submit" className="btn-reg text-center px-3">
                    Submit
                </Button>
            </div>
        
        </Form>
    );
}