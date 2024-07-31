
// Load YouTube IFrame Player API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        setInterval(updateTranscript, 100);
    }
}

function updateTranscript() {
    var currentTime = player.getCurrentTime();
    var transcriptLines = document.querySelectorAll('.transcript-line');
    transcriptLines.forEach(function(line) {
        var start = parseFloat(line.getAttribute('data-start'));
        if (currentTime >= start) {
            line.classList.add('active');
            line.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            line.classList.remove('active');
        }
    });
}

function loadVideo() {
    var url = document.getElementById('videoUrl').value;
    var videoId = extractVideoId(url);
    if (videoId) {
        var embedUrl = 'https://www.youtube.com/embed/' + videoId;
        document.getElementById('youtube-video').src = embedUrl;
    } else {
        alert('Please enter a valid YouTube video URL.');
    }
}

function extractVideoId(url) {
    var videoIdMatch = url.match(/[?&]v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
}
