// DOM elements
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-silder input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

// Variables
let allKeys = [];
let audio = new Audio();

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key);
  audio.pause();
  key.addEventListener("click", () => playTune(key.dataset.key));
});

// cashe all sounds

let requests = []
  .concat(allKeys)
  .map((key) => fetch(`https://piano-virid.vercel.app/audios/${key}.mp3`));
Promise.all(requests);

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

// others

if (!sessionStorage.getItem("sizes")) {
  let h = window.innerHeight,
    w = window.innerWidth;
  sessionStorage.setItem("sizes", JSON.stringify({h,w}))
}

let sizes = JSON.parse(sessionStorage.getItem("sizes"))

window.onresize = function () {
  if (sizes.h != window.innerHeight || sizes.w != window.innerWidth) {
    window.location.href =
      "https://i.pinimg.com/originals/a1/9f/09/a19f09386c8bf4a5ba48d07a7b4171f2.gif";
  }
};
