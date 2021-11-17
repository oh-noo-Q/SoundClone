import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import background from './assets/soundclone_background.png';

import Header from './components/container-content/Header';
import Content from './components/container-content/Content';
import SighupTeaser from './components/container-content/SignupTeaser';
import Footer from './components/container-content/Footer';

import PlayControlBar from './components/playControl-bar/PlayControlBar';


const App = () => {
  const [defaultSongs, setDefaultSongs] = useState([]);

  const getDefaultSongs = async () => {
    const songsFromServer = await axiosDefaultSongs();
    setDefaultSongs(songsFromServer);
  }

  // Fetch tasks
  const axiosDefaultSongs = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/api/song/getDefault`);
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

  return (
    <Router>
      <div className='container-content'>
        <Header background={background} />
        <Content onPlayDefaultSongs={() => getDefaultSongs()} />
        <SighupTeaser />
        <Footer />
      </div>

      {defaultSongs.length > 0 ? <div className='playControl-bar'>
        <section className='playControl-inner'>
          <div className='playControl-container'>
            <PlayControlBar defaultSongs={defaultSongs} />
          </div>
        </section>
      </div> : <div></div>}

      {/* <div className='playControl-bar'>
        <section className='playControl-inner'>
          <div className='playControl-container'>
            <PlayControlBar defaultSongs={defaultSongs} />
          </div>
        </section>
      </div> */}
      
    </Router>
  );
}

export default App;
