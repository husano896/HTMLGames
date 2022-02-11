
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
    }),
    Sprite_HealthBar: new PIXI.TextStyle({
        align: 'right',
        fontFamily: 'Arial',
        fontSize: 16,
        fill: ['#ff0000','#ffffff', '#ffaaaa'], // gradient
        stroke: '#000000',
        strokeThickness: 4,
        wordWrap: true,
        wordWrapWidth: 128,
    })
}