import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import background from './assets/soundclone_background.png';
import aboutUsImg from './assets/SoundcloneLogo.png';

import Header from './components/container-content/Header';
import Content from './components/container-content/Content';
import SighupTeaser from './components/container-content/SignupTeaser';
import Footer from './components/container-content/Footer';

import DashboardSearch from './components/container-content/DashboardSearch';
import HeaderOthers from './components/HeaderOthers';
import AboutUs from './components/AboutUs';

import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AuthContextProvider from './contexts/AuthContext';
import Discovery from './components/auth/Discovery';
import ProtectedRoute from './components/ProtectedRoute';
import PlayBarVersion2 from './components/playControl-bar/PlayBarVersion2';
import SearchHome from './components/container-content/SearchHome';

const App = () => {

  return (
    <AuthContextProvider>
      <Router>
        <div className='container-content'>
          <Routes>
            <Route exact path='/' element={<div>
              <Header background={background} />
              <SearchHome />
              <Content />
              <SighupTeaser />
              <Footer />
            </div>} />

            <Route path='/about' element={<AboutUs aboutUsImg={aboutUsImg} />} />
          </Routes>

          <Routes>
            <Route exact path='/discovery' element={<ProtectedRoute Component={Discovery} />} />
          </Routes>

          <Routes>
            <Route exact path='/search' element={<DashboardSearch />} />
          </Routes>
        </div>

        <Routes>
          <Route exact path='/login' element={<LoginForm authImg={aboutUsImg} />} />
          <Route exact path='/register' element={<RegisterForm authImg={aboutUsImg} />} />
        </Routes>

        <Routes>
          <Route path='/:somestring' element={<HeaderOthers littleLogo={aboutUsImg} />} />
        </Routes>

        <div className='playControl-bar'>
          <section className='playControl-inner'>
            <div className='playControl-container'>
              <PlayBarVersion2 />
            </div>
          </section>
        </div>

      </Router>

    </AuthContextProvider>

  );
}

export default App;
