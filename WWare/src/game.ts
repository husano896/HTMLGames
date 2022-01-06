import { GameConsts } from "./constants";
import * as PIXI from 'pixi.js';

// Create the application helper and add its render target to the page
const $game = new PIXI.Application({ width: GameConsts.WIDTH, height: GameConsts.HEIGHT });
const gameContainer = document.querySelector('#game-container');
gameContainer.appendChild($game.view);
export default $game;