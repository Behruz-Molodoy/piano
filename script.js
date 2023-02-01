// DOM elements
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-silder input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

// Variables
let allKeys = [];
let audio = new Audio();
audio.playbackRate = 0.5;

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key);
  audio.pause();
  audio.src = "audios/" + key + ".mp3";
  key.addEventListener("click", () => playTune(key.dataset.key));
});

// Events

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

// Functions

function playTune(key) {
  audio.src = "audios/" + key + ".mp3";

  audio.play();

  const clickedKey = document.querySelector(`[data-key=${key}]`);

  clickedKey.classList.add("active");

  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
}

function pressedKey(e) {
  audio.pause();
  allKeys.includes(e.key) && playTune(e.key);
}

function handleVolume(e) {
  audio.volume = e.target.value;
}

function showHideKeys() {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
}
