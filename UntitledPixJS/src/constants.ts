
import * as PIXI from 'pixi.js';

export const GameConsts = {
	width: 800,
	height: 600
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