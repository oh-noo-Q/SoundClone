const audio = document.querySelector('.audio');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const volumeBtn = document.querySelector('.volume');

const progress = document.querySelector('.progressBar');
const progressContainer = document.querySelector('.playbackTimeline_progress');
const totalDuration = document.querySelector('.duration');
const totalTimePassed = document.querySelector('.timePassed');

const musicContainer = document.querySelector('.playControl-element');
const singer = document.querySelector('#singer_song');
const title = document.querySelector('#title_song');

// Some events...
let songsTitle = [];
let songsAudio = [];
let songsSinger = [];
let songIndex;

fetch('test_audio/songs_info.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((song) => {
            songsSinger.push(song.singer);
            songsTitle.push(song.title);
            songsAudio.push(song.audio);
        });

        songIndex = 0;

        // load songs
        loadSong(songsSinger[songIndex], songsTitle[songIndex], songsAudio[songIndex]);

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

        volumeBtn.addEventListener('click', () => {
            const isMuted = musicContainer.classList.contains('mute');
            if (isMuted) {
                unMuted();
            } else {
                muted();
            }
        });

        // Progress bar event
        audio.addEventListener('timeupdate', updateProgress);
        progressContainer.addEventListener('click', setProgress);
        audio.addEventListener('ended', nextSong);

    });



function loadSong(songSinger, songTit, songAu) {
    singer.innerHTML = songSinger;
    title.innerHTML = songTit;
    audio.src = `test_audio/${songAu}`;

    audio.addEventListener("loadedmetadata", () => {
        let minute = parseInt(audio.duration / 60);
        let second = parseInt(audio.duration % 60);
        totalDuration.innerHTML = `${minute}:${second}`;
    });
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.classList.add('playing');

    audio.play();
}

function muted() {
    musicContainer.classList.add('mute');
    volumeBtn.classList.add('muted');
    audio.volume = 0;
}

function unMuted() {
    musicContainer.classList.remove('mute');
    volumeBtn.classList.remove('muted');
    audio.volume = 1.0;
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
    loadSong(songsSinger[songIndex], songsTitle[songIndex], songsAudio[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songsTitle.length - 1) {
        songIndex = 0;
    }

    loadSong(songsSinger[songIndex], songsTitle[songIndex], songsAudio[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    progressContainer.setAttribute('aria-valuenow', parseInt(currentTime).toString());
    let minute = parseInt(currentTime / 60);
    let second = parseInt(currentTime % 60);
    totalTimePassed.innerHTML = `${minute}:` +  (second < 10 ? '0':'') +`${second}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}