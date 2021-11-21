import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Routes, Link } from 'react-router-dom';
import axios from 'axios';

import background from './assets/soundclone_background.png';
import aboutUsImg from './assets/SoundcloneLogo.png';

import Header from './components/container-content/Header';
import Content from './components/container-content/Content';
import SighupTeaser from './components/container-content/SignupTeaser';
import Footer from './components/container-content/Footer';
import Button from './components/container-content/Button';

import DashboardSearch from './components/container-content/DashboardSearch';
import HeaderOthers from './components/HeaderOthers';
import AboutUs from './components/AboutUs';

import PlayControlBar from './components/playControl-bar/PlayControlBar';

import { apiUrl, apiUrlAuth } from './contexts/Constants';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AuthContextProvider from './contexts/AuthContext';
import Discovery from './components/auth/Discovery';


const App = () => {
  // const navigate = useNavigate();

  const [dataSongsToPlay, setDataSongsToPlay] = useState([]);

  const [searchForm, setSearchForm] = useState({
    titleSearch: ''
  });

  const { titleSearch } = searchForm;

  const [searchDataSongs, setSearchDataSongs] = useState([]);

  const getDefaultSongs = async () => {
    const songsFromServer = await axiosDefaultSongs();
    setDataSongsToPlay(songsFromServer);
  }

  // axios default songs
  const axiosDefaultSongs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/song/getDefault`);
      if (response.data.success) {
        return response.data.songs;
      }
    } catch (err) {
      if (err.response.data) {
        return err.response.data;
      }
      return {
        success: false,
        message: 'Something wrong :((('
      }
    }
  }

  // search songs
  const searchSongs = async searchForm => {
    try {
      const response = await axios.post(`${apiUrl}/song/search`, searchForm);
      if (response.data.success) {
        return response.data.songs;
      }
      return response.data;
    } catch (err) {
      if (err.response.data) {
        return err.response.data;
      }
      return {
        success: false,
        message: 'Something wrong :((('
      }
    }
  }

  const onChangeSearchForm = event => setSearchForm({ ...searchForm, titleSearch: event.target.value });

  const search = async event => {
    event.preventDefault();
    try {
      const searchData = await searchSongs(searchForm);
      setSearchDataSongs(searchData);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Router>
      <div className='container-content'>
        <Routes>
          <Route exact path='/' element={<div>
            <Header background={background} />

            <div className='content-search'>
              <span>
                <form className='search-bar' onSubmit={search}>
                  <input className='search-input' type='search' placeholder='Search for tracks' value={titleSearch} onChange={onChangeSearchForm} />
                  <button className='search-submit' type='submit' onClick={() => console.log('')} ></button>
                </form>
              </span>
            </div>

            {searchDataSongs.length > 0 ? <div className='searchDashboard'>
              <DashboardSearch searchDataSongs={searchDataSongs} />
              <Button text='Play List Search' onClick={() => setDataSongsToPlay(searchDataSongs)} />
            </div> : <div></div>}

            <Content onPlayDefaultSongs={() => getDefaultSongs()} />
            <SighupTeaser />
            <Footer />
          </div>} />

          <Route path='/about' element={<AboutUs aboutUsImg={aboutUsImg} />} />
        </Routes>
      </div>

      <AuthContextProvider>
        <Routes>
          <Route exact path='/login' element={<LoginForm authImg={aboutUsImg} />} />
          <Route exact path='/register' element={<RegisterForm authImg={aboutUsImg} />} />
          <Route exact path='/discovery' element={<Discovery />} />
        </Routes>
      </AuthContextProvider>

      <Routes>
        <Route path='/:somestring' element={<HeaderOthers littleLogo={aboutUsImg} />} />
      </Routes>

      {dataSongsToPlay.length > 0 ? <div className='playControl-bar'>
        <section className='playControl-inner'>
          <div className='playControl-container'>
            <PlayControlBar dataSongsToPlay={dataSongsToPlay} />
          </div>
        </section>
      </div> : <div></div>}

    </Router>
  );
}

export default App;
