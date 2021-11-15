import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import background from './assets/soundclone_background.png';

import Header from './components/container-content/Header';
import Content from './components/container-content/Content';
import SighupTeaser from './components/container-content/SignupTeaser';
import Footer from './components/container-content/Footer';

import ButtonPrev from './components/playControl-bar/ButtonPrev';
import ButtonPlay from './components/playControl-bar/ButtonPlay';
import ButtonNext from './components/playControl-bar/ButtonNext';
import ButtonShuffle from './components/playControl-bar/ButtonShuffle';
import ButtonRepeat from './components/playControl-bar/ButtonRepeat';
import ButtonVolume from './components/playControl-bar/ButtonVolume';
import Timeline from './components/playControl-bar/Timeline';
import InfoSong from './components/playControl-bar/InfoSong';


const App = () => {
  const [defaultSongs, setDefaultSongs] = useState([
    {
      id: 1
    },
    {
      id: 2
    }
  ]);

  return (
    <Router>
      <div className='container-content'>
        <Header background={background} />
        <Content onPlayDefaultSongs={() => console.log(defaultSongs)} />
        <SighupTeaser />
        <Footer />
      </div>

      <div className='playControl-bar'>
        <section className='playControl-inner'>
          <div className='playControl-container'>
            <div className='playControl-elements'>
              <ButtonPrev />
              <ButtonPlay />
              <ButtonNext />
              <ButtonShuffle />
              <ButtonRepeat />
              <Timeline />
              <ButtonVolume />
              <InfoSong />
            </div>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
