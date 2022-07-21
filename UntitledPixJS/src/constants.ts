
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
    Window_MapItem: new PIXI.TextStyle({
        align: 'right',
        fontFamily: 'Arial',
        fontSize: 16,
        fill: ['#ffffff'], // gradient
        dropShadow: true,
        dropShadowDistance: 2,
        dropShadowColor: '#333333',
        dropShadowAngle: 180,
        wordWrap: true,
        wordWrapWidth: 32,
    }),
    Window_ChatLogs: new PIXI.TextStyle({
        align: 'left',
        fontFamily: '微軟正黑體',
        fontSize: 14,
        fill: ['#ffffff'], // gradient
        dropShadow: true,
        dropShadowDistance: 2,
        dropShadowColor: '#333333',
        dropShadowAngle: 180,
        wordWrap: true,
        wordWrapWidth: 256,
    }),
    Window_Message: new PIXI.TextStyle({
        align: 'left',
        fontFamily: '微軟正黑體',
        fontSize: 16,
        fill: ['#ffffff'], // gradient
        dropShadow: true,
        dropShadowDistance: 2,
        dropShadowColor: '#333333',
        dropShadowAngle: 180,
        wordWrap: true,
        wordWrapWidth: 288,
    }),
    Sprite_Button: new PIXI.TextStyle({
        align: 'center',
        fontFamily: '微軟正黑體',
        fontSize: 14,
        fill: ['#ffffff'], // gradient
    }),
    Sprite_HealthBar: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 16,
        fill: ['#ffffff', '#ff7777'], // gradient
        stroke: '#000000',
        strokeThickness: 4,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#ffffff', '#600000'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
        dropShadowDistance: 2,
        dropShadowColor: '#000000',
        dropShadowAngle: 180,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_Critical: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 24,
        fill: ['#ffffff', '#aaaa00', '#770000'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_HP: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#aaaaaa', '#600000', '#ff3333'], // gradient
        stroke: '#777777',
        strokeThickness: 1,
        dropShadowAngle: 180,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_HP_Critical: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#cccccc', '#333333', '#990000'], // gradient
        stroke: '#777777',
        strokeThickness: 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_HP_Plus: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#66cc66', '#00cc00'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_SP: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#aaaaaa', '#600000', '#ff00ff'], // gradient
        stroke: '#777777',
        strokeThickness: 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_SP_Plus: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#8888ff', '#0000ff'], // gradient
        stroke: '#777777',
        strokeThickness: 1,
        dropShadowAngle: 180,
        wordWrap: true,
        wordWrapWidth: 128,
    })
}