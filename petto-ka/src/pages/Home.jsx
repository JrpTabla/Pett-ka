import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


import '../css/home.css'
/* import img from '../assets/image-3.png' */

import img from '../assets/landing.png'
import ellipse from "../assets/Ellipse.png"


export default function Home() {

return (

  <div className='container-Home'>
    <div className="div-Home container row">
      <div className='container-left col-lg-5 col-12 order-lg-1 order-2'>
          <h1 className="home-header-text my-3">Your Amazing Pets are Important to us</h1>
          <p className="home-p-text my-3">We are on duty 24 hours a day for the health of your beautiful pets.</p>
          <Link to="/Login" className='home-btn my-3'>Get Started</Link>
      </div>
      <div className='container-left col-lg-7 order-lg-2 order-1'>
        <img src={ellipse} alt="" className='home-img-ellipse'/>
        <img src={img} alt="" className='home-img'/>
      </div>
    </div>
  </div>
      
)
}

