
import * as PIXI from 'pixi.js';

export const Version = '0.1 - 20211126';
export const GameConsts = {
	width: 1280,
	height: 800
}
export const $TextStyle = {
    Sprite_Window_Title: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'], // gradient
        // stroke: '#4a1850',
        // strokeThickness: 5,
        wordWrap: true,
        wordWrapWidth: 440,
    })
}