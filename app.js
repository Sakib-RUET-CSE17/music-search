const searchSongs = async() => {
    const searchText = document.getElementById('search-field').value
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    toggleSpinner()
    try {
        // load data
        const res = await fetch(url)
        const data = await res.json()
        displaySongs(data.data)

    } catch (error) {
        displayError(error)
    }

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySongs(data.data))
    //     .catch(error => displayError('Something Went Wrong!! Please try again later!'))

}

document.getElementById("search-field").addEventListener("keypress", function(event) {
    console.log('Working!!!')
        // event.preventDefault(); // stop default behaviour
        // console.log('keycode', event.key, event.keyCode)
    if (event.key == 'Enter') {
        document.getElementById("search-button").click();
    }

})

const displayError = (error) => {
    const errorTag = document.getElementById('error-message')
    errorTag.innerText = error
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container')
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerHTML = ''
    songs.forEach(song => {
        // console.log(song)
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
                Your browser does not support the audio element.
            </audio> 
        </div>
        <div class="col-md-3 text-md-right text-center">
            <a href="#song-lyrics"><button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button></a>
        </div>
        `
        songContainer.appendChild(songDiv)
    });
    toggleSpinner()
}

const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
        // console.log(url)
    toggleSpinner()
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics)
    } catch (error) {
        displayError('Sorry I failed to load lyrics!')
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics')
    if (lyrics !== undefined)
        lyricsDiv.innerText = lyrics
    else {
        lyricsDiv.innerText = 'Not Found'
    }
    toggleSpinner()
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner')
    const songs = document.getElementById('song-container')

    spinner.classList.toggle('d-none')
    songs.classList.toggle('d-none')
}