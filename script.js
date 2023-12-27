const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const searchBtn = document.querySelector('.search-btn');
const output = document.querySelector('.output-container');
const audio = document.getElementById('audio');

function getResults(data) {
    // update content of output when user searches a word
    output.innerHTML = `                
    <div class="display">
        <h3 id="word">${data[0].word}</h3>
        <button class="volume" onclick="playAudio()">
            <i class="fas fa-volume-up"></i>
        </button>
    </div>
    <div class="word-details">
        <h4 id="type">${data[0].meanings[0].partOfSpeech}</h4>
        <h4 id="pronounciation">${data[0].phonetic}</h4>
    </div>
    <div class="description">
        <h3 id="definiton">${data[0].meanings[0].definitions[0].definition}</h3>
        <div>
            <h3 id="example">${data[0].meanings[0].definitions[0].example || ""}</h3>
        </div>
    </div>`

    // set audio's src with corresponding link 
    audio.setAttribute('src', `${data[0].phonetics[0].audio}`);
}

function playAudio() {
    audio.play();
}

function displayErrorMessage(error) {
    let warningMsg = document.createElement('h3');

    warningMsg.textContent = 'WORD NOT AVAILABLE';
    warningMsg.style.color = 'red';

    // insert at the top of output content
    output.insertBefore(warningMsg, output.firstChild);
}

searchBtn.addEventListener('click', () => {
    let input = document.getElementById('search-word').value;
    fetch(`${url}${input}`)
        .then((response) => response.json())
        .then((data) => getResults(data))
        .catch((e) => {
            // prevent multiple error messages on top of another
            if (output.firstElementChild.tagName != 'H3') {
                displayErrorMessage(e)
            }
        })
});
