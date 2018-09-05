let videoPlayer = document.querySelector('.video_player');
let video = videoPlayer.querySelector('.video');
let playPause = videoPlayer.querySelector('#play-pause-button');
let playPauseIcons = playPause.getElementsByTagName('i')[0].getAttribute('class');
console.log(playPauseIcons);

// Play/Pause Function & Event Listener
let playPauseToggle = () => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

playPause.addEventListener('click', playPauseToggle);

// Change Play/Pause Icons
let playPauseIconToggle = () => {
    if (video.paused) {
        playPauseIcons.className = "far fa-pause-circle";
    } else {
        playPauseIcons.className = "fas fa-play-circle";
    }
}

playPause.addEventListener('click', playPauseIconToggle);

