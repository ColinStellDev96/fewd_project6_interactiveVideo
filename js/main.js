let videoPlayer = document.querySelector('.video_player');
let video = videoPlayer.querySelector('.video');
let playPause = videoPlayer.querySelector('#play-pause-button');
let playPauseIcons = playPause.getElementsByTagName('i')[0];
let progressBar = videoPlayer.querySelector('.progress_bar');
let progress = videoPlayer.querySelector('.progress');
let mute = videoPlayer.querySelector('.mute_button');
let muteIcon = mute.getElementsByTagName('i')[0];
let volumeDown = videoPlayer.querySelector('.volume_down');
let volumeUp = videoPlayer.querySelector('.volume_up');
let fullscreen = videoPlayer.querySelector('.fullscreen');
let current = videoPlayer.querySelector('.current');
let duration = videoPlayer.querySelector('.duration');
let textData = document.getElementsByClassName('textSec');
let textPar = document.querySelector('.textHighlight').getElementsByTagName('span');

//Progress Bar Function & Event Listener + Current Time & Duration
let progressUpdate = () => {
    let videoProgress = video.currentTime / video.duration;
    progress.style.width = videoProgress * 100 + '%';
    if (video.ended){
        playPauseIcons.className = "fas fa-play-circle";
    }

    // Click on Progress Bar and jump to that
    progressBar.addEventListener('click', (event) => {
        let percent = event.offsetX / progressBar.offsetWidth;
        video.currentTime = percent * parseInt(video.duration).toFixed(2);
        progress.style.width = percent / 100;
      });

    // Time Tracker for Current Time & Duration Left
    let timeCurrent = parseFloat(video.currentTime).toFixed(2);
    current.innerHTML = timeCurrent;
    let timeDuration = parseFloat(video.duration).toFixed(2);
    duration.innerHTML = (timeDuration) - (timeCurrent);
    // Highlight Text that Matches current time
    for (let i = 0; i < textData.length; i++) {
        if (video.currentTime > textData[i].getAttribute('data-start') && video.currentTime < textData[i].getAttribute('data-end')) {
            textData[i].style.backgroundColor = "rgb(0, 234, 215)" ;
        } else {
            textData[i].style.backgroundColor = "";
        }
    }

}
video.addEventListener('timeupdate', progressUpdate);

// Time Jump Functionality when a user clicks on a section in the text

for (let i = 0; i < textPar.length; i++) {
    textPar[i].addEventListener('click', () => {
        var timeJump = textPar[i].getAttribute('data-start');
        video.currentTime = timeJump;
        video.play();
    });
}

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

let fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled);

if (!fullScreenEnabled) {
    video.style.display = 'none';
 }

 let isFullScreen = () => {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
 }

let setFullscreenData = (state) => {
    video.setAttribute('data-fullscreen', !!state);
 }

toggleFullScreen = () =>  {
        if (isFullScreen()) {
           if (document.exitFullscreen) document.exitFullscreen();
           else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
           else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
           else if (document.msExitFullscreen) document.msExitFullscreen();
           setFullscreenData(false);
        }
        else {
           if (video.requestFullscreen) video.requestFullscreen();
           else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
           else if (video.webkitRequestFullScreen) video.webkitRequestFullScreen();
           else if (video.msRequestFullscreen) video.msRequestFullscreen();
           setFullscreenData(true);
        }
     }

fullscreen.addEventListener('click', toggleFullScreen);

document.addEventListener('fullscreenchange', function() {
    setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
 });
 document.addEventListener('webkitfullscreenchange', function() {
    setFullscreenData(!!document.webkitIsFullScreen);
 });
 document.addEventListener('mozfullscreenchange', function() {
    setFullscreenData(!!document.mozFullScreen);
 });
 document.addEventListener('msfullscreenchange', function() {
    setFullscreenData(!!document.msFullscreenElement);
 });

