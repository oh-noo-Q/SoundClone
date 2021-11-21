import { useState, useEffect } from 'react';

import ButtonPrev from './ButtonPrev';
import ButtonPlay from './ButtonPlay';
import ButtonNext from './ButtonNext';
import ButtonShuffle from './ButtonShuffle';
import ButtonRepeat from './ButtonRepeat';
import ButtonVolume from './ButtonVolume';
import Timeline from './Timeline';


const PlayControlBar = ({ dataSongsToPlay }) => {
    // const [duration, setDuration] = useState();
    // const [showPlayBar, setShowPlayBar] = useState(false);
    // const [playing, setPlaying] = useState(false);

    // let [songIndex, setSongIndex] = useState(0);
    // let [audio] = useState(new Audio(dataSongsToPlay[songIndex].urlAudio));

    // useEffect(() => {
    //     playing ? audio.play() : audio.pause();
    // }, [playing]);

    // useEffect(() => {
    //     audio.addEventListener('ended', nextSong);
    // });

    let showPlayBar = false;
    let playing = false;
    let songIndex = 0;
    let audio = new Audio(dataSongsToPlay[songIndex].urlAudio);

    const loadSong = () => {
        document.getElementById('user-song').innerHTML = dataSongsToPlay[songIndex].user.fullname;
        document.getElementById('title-song').innerHTML = dataSongsToPlay[songIndex].title;
        // audio.addEventListener("loadedmetadata", () => {
        //     setDuration(audio.duration);
        // });
    }

    const prevSong = () => {
        songIndex--;
        if (songIndex < 0) {
            songIndex = dataSongsToPlay.length - 1;
        }

        console.log(songIndex);
        loadSong();
        audio.src = dataSongsToPlay[songIndex].urlAudio;
        audio.play();
        playing = true;
    }

    const nextSong = () => {
        songIndex++;
        if (songIndex > dataSongsToPlay.length - 1) {
            songIndex = 0;
        }
        loadSong();
        audio.src = dataSongsToPlay[songIndex].urlAudio;
        audio.play();
        playing = true;
    }

    const play_pause = () => {
        if (playing) {
            audio.pause();
            playing = false;
        } else {
            audio.play();
            playing = true;
        }
    }

    audio.addEventListener('ended', nextSong);

    return (
        <div className={playing ? 'playControl-elements play' : 'playControl-elements'}>
            <ButtonPrev onClick={() => prevSong()} />

            <ButtonPlay playing={playing ? 'playing' : ''} onClick={() => {
                if (!showPlayBar) {
                    loadSong();
                    audio.play()
                    showPlayBar = true;
                }
                play_pause();
            }} />

            <ButtonNext onClick={() => nextSong()} />
            <ButtonShuffle onClick={() => console.log('shuffle')} />
            <ButtonRepeat onClick={() => console.log('repeat')} />
            <Timeline timePassed={0} duration={0} />
            <ButtonVolume onClick={() => console.log('muted')} />

            <div className='info-song'>
                <div className='user-title'>
                    <h5 id='user-song'></h5>
                    <h5 id='title-song'></h5>
                </div>
            </div>

        </div>
    )
}

export default PlayControlBar
