import "./index.scss";

const app = document.querySelector("#app");
const pathImages = "./assets/";
const pathIcons = "./assets/icons/";
const pathSounds = "./assets/sounds/";
const soundList = [
  {
    background: `${pathImages}summer-bg.jpg`,
    icon: `${pathIcons}sun.svg`,
    sound: createAudio(pathSounds + "summer.mp3")
  },
  {
    background:`${pathImages}rainy-bg.jpg`,
    icon: `${pathIcons}cloud-rain.svg`,
    sound: createAudio(pathSounds + "rain.mp3")
  },
  {
    background:`${pathImages}winter-bg.jpg`,
    icon: `${pathIcons}cloud-snow.svg`,
    sound: createAudio(pathSounds + "winter.mp3")
  }
];
let currentSoundIndex = 0;

function createAudio(src) {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.controls = true;
  return audio;
}

const selectSound = (event) => {
  currentSoundIndex = Number(event.target.id.replace("sound_", ""));
  const soundIcons = document.querySelectorAll(".list-carts__item img");
  soundIcons.forEach((icon, index) => icon.src = soundList[index].icon);
  if (!soundList[currentSoundIndex].sound.paused) soundList[currentSoundIndex].sound.pause();
  else {
    soundList.forEach(({ sound }) => {
      sound.pause();
      sound.currentTime = 0.0;
    });
    soundList[currentSoundIndex].sound.play();
    soundIcons[currentSoundIndex].src = `${pathIcons}pause.svg`;
  }
  document.querySelector(".main").style.background = `url(${soundList[currentSoundIndex].background}) no-repeat center/cover`;
};

const editVolume = (e) => {
  soundList.forEach(({sound}) => sound.volume = e.target.value / 100);
};

const renderContent = () => {
  app.innerHTML = `
    <div class="main" style="background: url(${soundList[currentSoundIndex].background}) no-repeat center/cover;">
      <div class="main__content">
        <h1>Weather sounds</h1>
        <ul class="list-carts">
          ${soundList.map((sound, index) =>
            `<li class="list-carts__item">
              <button class="list-carts__button" id="sound_${index}" style="background: url(${sound.background}) no-repeat top left/cover">
                <img src="${sound.icon}" alt="">
              </button>
            </li>`
          ).join('')}
        </ul>
        <div>
          <label>
            <input type="range" class="sound-volume">
          </label>
        </div>
      </div>
    </div>
  `;
  const buttons = document.querySelectorAll(".list-carts__button");
  buttons.forEach((button, index) => button.addEventListener("click", selectSound));
  document.querySelector(".sound-volume").addEventListener("input", editVolume)
  soundList[currentSoundIndex].sound.play();
};

renderContent();