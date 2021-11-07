const audio = document.querySelector('.audio');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const progress = document.querySelector('.progressBar');
const progressContainer = document.querySelector('.playbackTimeline_progress');
const totalDuration = document.querySelector('.duration');
const totalTimePassed = document.querySelector('timePassed');

const musicContainer = document.querySelector('.playControl-element');
const title = document.querySelector('#title_song');

// Some events...
let songsTitle = [];
let songsAudio = [];
let songIndex;
let checkPlay = false;

fetch('test_audio/songs_info.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((song) => {
            songsTitle.push(song.title);
            songsAudio.push(song.audio);
        });

        songIndex = 0;

        // load songs
        loadSong(songsTitle[songIndex], songsAudio[songIndex]);

        // Event listener
        playBtn.addEventListener('click', () => {
            const isPlaying = musicContainer.classList.contains('play');

            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });

        // Change song events
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);

        // Progress bar event
        audio.addEventListener('timeupdate', updateProgress);
        progressContainer.addEventListener('click', setProgress);
        audio.addEventListener('ended', nextSong);


    });



function loadSong(songTit, songAu) {
    title.innerHTML = songTit;
    audio.src = `test_audio/${songAu}`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.classList.add('playing');

    audio.play();
    
    // let minute = Math.round(audio.duration / 60) - 1;
    // let second = Math.round(audio.duration % 60) - 1;
    // let cur_minute = Math.round(audio.currentTime / 60) - 1;
    // let cur_second = Math.round(audio.currentTime % 60) - 1;
    
    // totalDuration.innerHTML = `${minute}:${second}`;
    // totalTimePassed.innerHTML = `${cur_minute}:${cur_second}`
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.classList.remove('playing');
    audio.pause();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songsTitle.length - 1;
    }
    loadSong(songsTitle[songIndex], songsAudio[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songsTitle.length - 1) {
        songIndex = 0;
    }

    loadSong(songsTitle[songIndex], songsAudio[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}