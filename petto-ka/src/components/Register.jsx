import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Register() {
    const [registrationFirstName, setRegistrationFirstName] = useState('');
    const [registrationLastName, setRegistrationLastName] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [registrationMobileNo, setRegistrationMobileNo] = useState('');

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/register', {
                firstName: registrationFirstName,
                lastName: registrationLastName,
                email: registrationEmail,
                password: registrationPassword,
                mobileNo: registrationMobileNo,
            });

            

            if (response.data === 'Email is already in use.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed!',
                    text: response.data,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful',
                    text: response.data,
                });

                setRegistrationFirstName('');
                setRegistrationLastName('');
                setRegistrationEmail('');
                setRegistrationPassword('');
                setRegistrationMobileNo('');
            }
        } catch (error) {
            console.error('Registration error', error);
        }
    };

    return (
        <Form onSubmit={handleRegistrationSubmit} className="form-reg">
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Control
                    type="text"
                    className="form-input px-2"
                    required
                    value={registrationFirstName}
                    onChange={(e) => setRegistrationFirstName(e.target.value)}
                    placeholder="Enter First Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Control
                    type="text"
                    className="form-input px-2"
                    required
                    value={registrationLastName}
                    onChange={(e) => setRegistrationLastName(e.target.value)}
                    placeholder="Enter Last Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobileNo">
                <Form.Control
                    type="tel"
                    className="form-input px-2"
                    required
                    value={registrationMobileNo}
                    onChange={(e) => setRegistrationMobileNo(e.target.value)}
                    placeholder="Enter Phone Number"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="email"
                    className="form-input px-2"
                    required
                    value={registrationEmail}
                    onChange={(e) => setRegistrationEmail(e.target.value)}
                    placeholder="Enter Email"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                    type="password"
                    className="form-input px-2"
                    required
                    value={registrationPassword}
                    onChange={(e) => setRegistrationPassword(e.target.value)}
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

