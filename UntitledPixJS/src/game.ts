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
gameContainer.appendChild($game.view as HTMLCanvasElement);
export default $game;


// 有需要讓遊戲隨畫面尺寸變更大小再加這段
/*
$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
window.addEventListener("resize", () => {
  $game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
});
*/
