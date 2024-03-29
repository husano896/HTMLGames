import { GameConsts } from "./constants";
import { Application } from 'pixi.js'
// Create the application helper and add its render target to the page
const $game = new Application({
  width: GameConsts.width,
  height: GameConsts.height,
  autoDensity: true,
  backgroundColor: 0x333333,
  resolution: window.devicePixelRatio || 1,
});

const gameContainer = document.querySelector('#game-container');
const pressStartPlaceHolder = gameContainer.querySelector('.placeholder');

// 如果在PWA模式下執行, 則跳過Press Start畫面, 因為可以直接播音樂
if (window.matchMedia('(display-mode: standalone)').matches) {
  gameContainer.removeChild(pressStartPlaceHolder)
  gameContainer.appendChild($game.view as HTMLCanvasElement)
} else {
  function starter() {
    gameContainer.removeEventListener('click', starter)
    gameContainer.removeChild(pressStartPlaceHolder)
    gameContainer.appendChild($game.view as HTMLCanvasElement)
  }
  gameContainer.addEventListener('click', starter)
}

export default $game;


// 有需要讓遊戲隨畫面尺寸變更大小再加這段
/*
$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
window.addEventListener("resize", () => {
  $game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
});
*/
