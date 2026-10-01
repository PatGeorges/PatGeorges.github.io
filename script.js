// 1. Core Variable Hooks
const themeToggleBtn = document.getElementById('theme-toggle');
const mainPlayer = document.getElementById('main-player');
const videoSource = document.getElementById('video-source');
const activeVideoTitle = document.getElementById('active-video-title');
const playPauseBtn = document.getElementById('play-pause-btn');
const videoStatus = document.getElementById('video-status');
const thumbCards = document.querySelectorAll('.thumb-card');

// 2. Light / Dark Switch Logic
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// 3. Custom Main Window Player Controls
playPauseBtn.addEventListener('click', () => {
    if (mainPlayer.paused) {
        mainPlayer.play();
        videoStatus.textContent = "Status: Playing ▶️";
    } else {
        mainPlayer.pause();
        videoStatus.textContent = "Status: Paused ⏸️";
    }
});

// 4. Grid Click-Playlist Controller
thumbCards.forEach(card => {
    card.addEventListener('click', () => {
        // Extract metadata attributes tied on the specific HTML node
        const targetSrc = card.getAttribute('data-src');
        const targetTitle = card.getAttribute('data-title');

        // Swap out active references inside the video tag block elements
        videoSource.src = targetSrc;
        activeVideoTitle.textContent = `Playing: ${targetTitle}`;
        
        // Force reload engine commands so pipeline fetches next source sequence file
        mainPlayer.load();
        mainPlayer.play();
        videoStatus.textContent = "Status: Playing ▶️";

        // Shift visual borders highlight selector to newly focused card grid cell 
        thumbCards.forEach(item => item.classList.remove('active-thumb'));
        card.classList.add('active-thumb');
    });
});
