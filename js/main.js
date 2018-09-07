let videoPlayer = document.querySelector('.video_player');
let video = videoPlayer.querySelector('.video');
let playPause = videoPlayer.querySelector('#play-pause-button');
let playPauseIcons = playPause.getElementsByTagName('i')[0];
let progress = videoPlayer.querySelector('.progress');
let mute = videoPlayer.querySelector('.mute_button');
let muteIcon = mute.getElementsByTagName('i')[0];
let volumeDown = videoPlayer.querySelector('.volume_down');
let volumeUp = videoPlayer.querySelector('.volume_up');
let fullscreen = videoPlayer.querySelector('.fullscreen');
let current = videoPlayer.querySelector('.current');
let duration = videoPlayer.querySelector('.duration');
let textData = document.getElementsByClassName('textSec');



//Progress Bar Function & Event Listener + Current Time & Duration
let progressUpdate = () => {
    let videoProgress = video.currentTime / video.duration;
    progress.style.width = videoProgress * 100 + '%';
    if (video.ended){
        playPauseIcons.className = "fas fa-play-circle";
    }
    // Time Tracker for Current Time & Duration Left
    let timeCurrent = video.currentTime;
    current.innerHTML = parseFloat(timeCurrent).toFixed(2);
    let timeDuration = video.duration;
    duration.innerHTML = (parseFloat(timeDuration).toFixed(2)) - (parseFloat(timeCurrent).toFixed(2));
    // Highlight Text that Matches current time
    let textArr = [];
    for (let i = 0; i < textData.length; i ++) {
        // console.log(textData[i]);
        if (textData[i].getAttribute('data-start') >= video.currentTime && textData[i].getAttribute('data-end') <= video.currentTime) {
            textArr.push(textData[i]);
            console.log(textArr[0]);
            textArr.style.color="$light_blue";
        }
    }
}
video.addEventListener('timeupdate', progressUpdate);

// Mute/Unmute Function & Event Listener 

let muteVideo = () => {
    if (video.muted) {
        video.muted = false;
        muteIcon.className = "fas fa-volume-up";
    } else {
        video.muted = true;
        muteIcon.className = "fas fa-volume-off";
    }
}
mute.addEventListener('click', muteVideo);

// Volume Function & Event Listener

let currentVolume = Math.floor(video.volume * 10) / 10;
console.log(currentVolume);

volumeDown.addEventListener('click', () => {
    if (currentVolume > 0.0) {
        video.volume -= 0.2;
        console.log(video.volume);
    }
});
volumeUp.addEventListener('click', () => {
    if (currentVolume < 1.0 || currentVolume >= 0.0) {
        video.volume += 0.2;
        console.log(video.volume);
    }
});

// Play/Pause Function & Event Listener + Icon Change
let playPauseToggle = () => {
    if(video.paused) {
        video.play();
        playPauseIcons.className = "far fa-pause-circle";
    } else {
        video.pause();
        playPauseIcons.className = "fas fa-play-circle";
    }
}
playPause.addEventListener('click', playPauseToggle);

// Full Screen Function & Event Listener

toggleFullScreen = () => {
    if(video.requestFullscreen){
        video.requestFullscreen();
    } else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}

fullscreen.addEventListener('click', toggleFullScreen);

