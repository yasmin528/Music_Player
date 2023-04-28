//getting all elements of html in js
let song_image = document.getElementById("cover_photo")
let song_title = document.getElementById("title")
let song_singer = document.getElementById("singer")
let song_play = document.getElementById("play")
let song_prev = document.getElementById("prev")
let song_next = document.getElementById("next")
let playIcon = document.querySelector("#play i");

//creating song object list
let songs_list = [
    {
        name: 'Permission to dance',
        Image: 'assets/images/permission_to_dance.png',
        Song: 'assets/music/Permission-to-Dance.mp3',
        Singer: 'BTS'
    },
    {
        name: 'Love Story',
        Image: 'assets/images/taylor_swift_love_story.jpg',
        Song: 'assets/music/Taylor-Swift-Love-Story.mp3',
        Singer: 'Taylor Swift'
    },
    {
        name: 'Red',
        Image: 'assets/images/Taylor_Swift_Red.jpg',
        Song: 'assets/music/Taylor-Swift-Red.mp3',
        Singer: 'Taylor Swift'
    },
    {
        name: 'Control',
        Image: 'assets/images/control.jpg',
        Song: 'assets/music/Control.mp3',
        Singer: 'Zoe Wees'
    }
]

//keeping track of which song is playing and if song is playing or not
let i = 0;
let flag = false;


//showing song name and image on screen
var audio = new Audio(songs_list[i].Song);
song_image.src = songs_list[i].Image
song_title.innerHTML = songs_list[i].name
song_singer.innerHTML = songs_list[i].Singer

//function to play/pause song
song_play.addEventListener("click", function () {

    if (flag === false) {
        audio.play()
        flag = true;
        playIcon.classList.remove("fas", "fa-play");
        playIcon.classList.add("fas", "fa-pause");
    }
    else {
        audio.pause()
        flag = false;
        playIcon.classList.remove("fas", "fa-pause");
        playIcon.classList.add("fas", "fa-play");
    }
})

//function to play next song
song_next.addEventListener("click", function () {

    playIcon.classList.remove("fas", "fa-pause");
    playIcon.classList.add("fas", "fa-play");
    audio.pause()
    flag = false;
    i = i + 1;
    if (i >= songs_list.length) {

        i = 0;
    }

    song_image.src = songs_list[i].Image;
    song_singer.innerHTML = songs_list[i].Singer;
    song_title.innerHTML = songs_list[i].name;
    audio = new Audio(songs_list[i].Song);
})

//function to play previous song
song_prev.addEventListener("click", function () {

    playIcon.classList.remove("fas", "fa-pause");
    playIcon.classList.add("fas", "fa-play");
    audio.pause()
    flag = false;
    i = i - 1;
    if (i <= 0) {
        i = songs_list.length - 1;
    }
    song_image.src = songs_list[i].Image
    song_singer.innerHTML = songs_list[i].Singer
    song_title.innerHTML = songs_list[i].name
    audio = new Audio(songs_list[i].Song)
})

// Get the search input element and add a change event listener
let search_not_found = document.querySelector('.notfound');
let search_found = document.querySelector('.found');
let main_div = document.querySelector('.main_div');
const searchInput = document.querySelector('.search');


searchInput.addEventListener('change', function () {
    search_found.style.display = "none";
    search_not_found.style.display = "none";
    main_div.style.display = "none";
    search_found.innerHTML = ` `;
    // Get the search value
    const searchTerm = this.value.toLowerCase();

    // Filter the songs list based on the search term
    filteredSongs = songs_list.filter(function (song) {
        return song.name.toLowerCase().indexOf(searchTerm) > -1;
    });
    audio.pause();
    flag = false;
    // Check if any song is found
    if (filteredSongs.length > 0) {
        search_found.style.display = "flex";
        for (let index = 0; index < filteredSongs.length; index++) {
            // create a div to display the matching song
            let songDiv = document.createElement("div");
            songDiv.classList.add("searchedsong");
            songDiv.innerHTML = `
            <img src="${filteredSongs[index].Image}" id="searchcover_photo" class="searchcover_photo" />
            <div class="details">
            <h1 id="searchtitle">${filteredSongs[index].name}</h1>
            </div>
            `;
            search_found.appendChild(songDiv);
        }
    } else {
        // No song found, display an alert message
        search_not_found.style.display = "flex";
    }
});
document.addEventListener('click', function (event) {

    let searchInput = document.querySelector('.search');
    searchInput.value = '';
    if (event.target.classList.contains('searchcover_photo')) {
        search_found.style.display = "none";
        search_not_found.style.display = "none";
        main_div.style.display = "flex";
        if (playIcon.classList.contains('fa-pause')) {
            playIcon.classList.remove("fas", "fa-pause");
            playIcon.classList.add("fas", "fa-play");
        }
        let image = (event.target.src).toString();
        image = image.replace("file:///F:/yasmin/sync/Music_App/", "")
        let i = songs_list.findIndex(song => song.Image === image);
        song_image.src = songs_list[i].Image;
        song_singer.innerHTML = songs_list[i].Singer;
        song_title.innerHTML = songs_list[i].name;
        audio = new Audio(songs_list[i].Song);
    }
});

function change() {
    audio.addEventListener('loadedmetadata', function (event) {
        audio.currentTime = 0;
        let seek_slider = document.querySelector('#seek_slider');
        let current_time = document.querySelector('.current-time');

        // Update seek slider value to reflect current playback position
        seek_slider.value = (audio.currentTime / audio.duration) * 100;

        // Update current time label accordingly
        current_time.textContent = formatTime(audio.currentTime);

        let currentAudio = (event.target.src).toString();
        currentAudio = currentAudio.replace("file:///F:/yasmin/sync/Music_App/", "")
        let i = songs_list.findIndex(song => song.Song === currentAudio);
        audio = new Audio(songs_list[i].Song);
        let total_duration = document.querySelector('.total-duration');
        audio.addEventListener('loadeddata', function () {
            total_duration.textContent = formatTime(audio.duration);
        });

        // Add 'timeupdate' event listener to update the progress bar and current time label
        audio.addEventListener('timeupdate', function () {
            let seek_slider = document.querySelector('#seek_slider');
            let current_time = document.querySelector('.current-time');

            // Update seek slider value to reflect current playback position
            seek_slider.value = (audio.currentTime / audio.duration) * 100;

            // Update current time label accordingly
            current_time.textContent = formatTime(audio.currentTime);
        });
    });
}

function seekTo() {
    let seek_slider = document.querySelector('#seek_slider');
    // Set the current time of the audio playback to the value of the seek slider
    audio.currentTime = audio.duration * (seek_slider.value / 100);
    // Update the current time label with the new value
    let current_time = document.querySelector('.current-time');
    current_time.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    return minutes + ":" + remainingSeconds;
}
