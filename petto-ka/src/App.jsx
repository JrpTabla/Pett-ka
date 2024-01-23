import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

/* Pages */
import LandingPage from './pages/LandingPage';

import Home from './pages/Home';
import Services from './pages/Services';


import GetStarted from './pages/GetStarted';
import Registration from './pages/Registration';
import Error from './pages/Error';

/* ADmin Page */
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Pets from './pages/Pets';
import Veterinary from './pages/Veterinary';



/* Components */
import NavigationBar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/Services' element={<Services />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/pets' element={<Pets />} />
            <Route path='/veterinary' element={<Veterinary />} />
            <Route path='/Login' element={<GetStarted />} />
            <Route path='/Register' element={<Registration />} />
            <Route path='*' element={<Error />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
