
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
        fill: ['#ffffff', '#777777'], // gradient
        stroke: '#000000',
        strokeThickness: 4,
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_Critical: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 24,
        fill: ['#ffffff', '#aaaa00', '#770000'], // gradient
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_HP: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#ffffff', '#777777', '#ff3333'], // gradient
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_HP_Critical: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#ffffff', '#333333', '#990000'], // gradient
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_HP_Plus: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#ffffff', '#22cc22'], // gradient
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_SP: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#ffffff', '#777777', '#ff00ff'], // gradient
        wordWrap: true,
        wordWrapWidth: 128,
    }),
    Sprite_Damage_SP_Plus: new PIXI.TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 32,
        fill: ['#ffffff', '#777777', '#7777ff'], // gradient
        wordWrap: true,
        wordWrapWidth: 128,
    })
}