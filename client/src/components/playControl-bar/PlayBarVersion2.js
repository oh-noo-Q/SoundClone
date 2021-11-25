import React, { useState, useEffect, useRef } from 'react';
import ButtonPrev from './ButtonPrev';
import ButtonPlay from './ButtonPlay';
import ButtonNext from './ButtonNext';
import ButtonShuffle from './ButtonShuffle';
import ButtonRepeat from './ButtonRepeat';
import ButtonVolume from './ButtonVolume';
import Timeline from './Timeline';
import { useSelector } from 'react-redux';
import { dataSongsSelector } from '../../redux/reducers/dataSongsReducer';

const PlayBarVersion2 = () => {

    const dataSong = useSelector(dataSongsSelector);

    const [indexSong, setIndexSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    const { title, urlAudio, user:{ fullname } } = dataSong[indexSong];

    const audio = useRef(new Audio(urlAudio));
    const isReady = useRef(false);
    const intervalRef = useRef();

    const [duration, setDuration] = useState(0);
    audio.current.addEventListener('loadedmetadata', () => {
        setDuration(audio.current.duration);
    });

    const [currentPercent, setCurrentPercent] = useState(0);

    const [username, setUsername] = useState(fullname);
    const [titleSong, setTitleSong] = useState(title);

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audio.current.ended) {
                next();
            } else {
                setTrackProgress(audio.current.currentTime);
                setCurrentPercent((audio.current.currentTime / audio.current.duration) * 100);
            }
        }, [1000]);
    }

    useEffect(() => {
        if (isPlaying) {
            audio.current.play();
            startTimer();
        } else {
            audio.current.pause();
        }

    }, [isPlaying]);

    useEffect(() => {
        isMuted ? audio.current.volume = 0 : audio.current.volume = 1.0; 
    });

    useEffect(() => {
        audio.current.pause();
        audio.current = new Audio(urlAudio);

        setUsername(fullname);
        setTitleSong(title);
        
        audio.current.addEventListener('loadedmetadata', () => {
            setDuration(audio.current.duration);
        });

        if (isReady.current) {
            audio.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [indexSong]);

    const next = () => {
        console.log('next');
        if (indexSong === dataSong.length - 1) {
            setIndexSong(0);
        } else {
            setIndexSong(indexSong + 1);
        }
    }

    const playPause = () => {
        console.log('play-pause');
        setIsPlaying(!isPlaying);
        console.log(duration);
    }

    const prev = () => {
        console.log('prev');
        if (indexSong === 0) {
            setIndexSong(dataSong.length - 1);
        } else {
            setIndexSong(indexSong - 1);
        }
    }

    const muted = () => {
        console.log('muted');
        setIsMuted(!isMuted);
    }

    return (
        <div className='playControl-elements'>
            <ButtonPrev onClick={() => prev()} />

            <ButtonPlay onClick={() => playPause()} playing={isPlaying ? 'playing' : ''} />

            <ButtonNext onClick={() => next()} />

            <ButtonShuffle onClick={() => console.log('shuffle')} />
            <ButtonRepeat onClick={() => console.log('repeat')} />
            <Timeline timePassed={trackProgress} duration={duration} currentPercent={currentPercent} />
            <ButtonVolume onClick={() => muted()} muted={isMuted ? 'muted' : ''} />

            <div className='info-song'>
                <div className='user-title'>
                    <h5 id='user-song'>{username}</h5>
                    <h5 id='title-song'>{titleSong}</h5>
                </div>
            </div>

        </div>
    )
}

export default PlayBarVersion2
