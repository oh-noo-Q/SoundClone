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

// song titles
const songs = ['aiiyl_blackpink', 'em_dao_nay', 'pho_khong_em', 'trai_tim'];
let songIndex = 3;

// load songs
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerHTML = song;
    audio.src = `test_audio/${song}.mp3`;
}

const duration = audio.duration;
console.log(duration);

// Event listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function playSong() {
    musicContainer.classList.add('play');
    playBtn.classList.add('playing');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.classList.remove('playing');

    audio.pause();
}

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Progress bar event
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);


function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    // totalDuration.innerHTML = `${Math.round(duration / 60)}:${Math.round(duration % 60)}`;
    // totalTimePassed.innerHTML = `${Math.round(currentTime / 60)}:${Math.round(currentTime % 60)}`;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}