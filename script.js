// DOM elements
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-silder input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

// Variables
let allKeys = []
let audio = new Audio()

pianoKeys.forEach((key) => {
    allKeys.push(key.dataset.key)
  key.addEventListener("click", () => playTune(key.dataset.key));
});

// Events

keysCheckbox.addEventListener("click" , showHideKeys)
volumeSlider.addEventListener("input" , handleVolume)
document.addEventListener("keydown" , pressedKey)

// Functions

function playTune(key) {
    if(!audio.src){
        audio.src= "audios/" + key + ".mp3"
        console.log(key);
    }

    audio.play()


    const clickedKey = document.querySelector(`[data-key=${key}]`)
    
    clickedKey.classList.add("active")

    setTimeout(() => {
        clickedKey.classList.remove("active")
    }, 150)
}

function pressedKey(e) {
    allKeys.includes(e.key) && playTune(e.key)
}

function handleVolume(e) {
    audio.volume = e.target.value;
}

function showHideKeys() {
    pianoKeys.forEach(key => key.classList.toggle("hide"))
}