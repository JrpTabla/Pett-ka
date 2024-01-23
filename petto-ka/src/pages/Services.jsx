import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from "../assets/Radiology.png"
import img2 from "../assets/Ambulance.png"
import img3 from "../assets/Dental.png"
import img4 from "../assets/Surgical.png"
import img5 from "../assets/Partution.png"
import img6 from "../assets/Hotel.png"
import '../css/services.css'


export default function Services() {

    return (
        <div className='services-container pt-5 p-2'>
            <div className='services-div container'>
                <h1 className='service-header-txt text-center'>What we Offer?</h1>
                <p className='service-p-txt text-center mt-3'>We offer a wide range of services which includes the following below</p>
                <div className='services-cards row my-5'>
                    <Card className='card col-3 p-3 mt-3'>
                        <img src={img} alt="" className='card-svg' />
                        <Card.Body className='mt-3'>
                            <Card.Title className='card-title'>Radiology Assistant</Card.Title>
                            <Card.Text className='card-text'>
                                Radiology is the medical discipline that usees radiology to diagnose patients.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='card col-3 p-3 mt-3'>
                        <img src={img2} alt="" className='card-svg' />
                        <Card.Body className='mt-3'>
                            <Card.Title className='card-title'>Ambulance Service</Card.Title>
                            <Card.Text className='card-text'>
                                We are just a phone call away. we have standby ambulances to help solve emmergencies
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='card col-3 p-3 mt-3'>
                        <img src={img3} alt="" className='card-svg' />
                        <Card.Body className='mt-3'>
                            <Card.Title className='card-title'>Dental Care Service</Card.Title>
                            <Card.Text className='card-text'>
                                All animals should have healthy teeths , so we ensure to provide care for all animals
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='card col-3 p-3 mt-3'>
                        <img src={img4} alt="" className='card-svg' />
                        <Card.Body className='mt-3'>
                            <Card.Title className='card-title'>Surgical Operation</Card.Title>
                            <Card.Text className='card-text'>
                                We provide surgical operations to all animals that are in need of it 24/7
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='card col-3 p-3 mt-3'>
                        <img src={img5} alt="" className='card-svg' />
                        <Card.Body className='mt-3'>
                            <Card.Title className='card-title'>Partution service</Card.Title>
                            <Card.Text className='card-text'>
                                Our maternity service provides services with our private and hygenic delivery
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='card col-3 p-3 mt-3'>
                        <img src={img6} alt="" className='card-svg' />
                        <Card.Body className='mt-3'>
                            <Card.Title className='card-title'>Pet Hotel service</Card.Title>
                            <Card.Text className='card-text'>
                                Our hotel service works for you when you’re on vacation or at work
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        </div>

    )
}

