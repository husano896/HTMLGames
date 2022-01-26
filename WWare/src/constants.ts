
import * as PIXI from 'pixi.js';

export const GameConsts = {
    WIDTH: 800,
    HEIGHT: 600
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
    GameText: new PIXI.TextStyle({
        align: 'center',
        fontFamily: '微軟正黑體',
        fontSize: 48,
        fontWeight: 'bold',
        fill: ['#dddddd', '#ffffff'], // gradient
        stroke: '#000000',
        strokeThickness: 4,
        dropShadow: true,
        lineJoin: 'round',
    }),
    ScoreText: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Arial Black',
        fontSize: 72,
        fontWeight: 'bold',
        fill: '#ffffff', // gradient
        stroke: '#000000',
        strokeThickness: 8,
        padding: 8, 
        dropShadow: true,
        lineJoin: 'round',
    }),
    PauseTitleText: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Arial',
        fontSize: 48,
        fontWeight: 'bold',
        fill: '#ffffff', // gradient
        stroke: '#000000',
        strokeThickness: 4,
        padding: 8, 
        dropShadow: true,
        lineJoin: 'round',
    }),
    PauseActionText: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Arial',
        fontSize: 32,
        fill: '#ffffff', // gradient
        padding: 8, 
        dropShadow: true,
        lineJoin: 'round',
    }),
}
