import { GameConsts } from "./constants";
import * as PIXI from 'pixi.js';

// Create the application helper and add its render target to the page
const $game = new PIXI.Application({ width: GameConsts.width, height: GameConsts.height });
const gameContainer = document.querySelector('#game-container');
gameContainer.appendChild($game.view);
export default $game;

/*
// 有需要讓遊戲隨畫面尺寸變更大小再加這段
window.addEventListener("resize", () => {
  game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
});
*/