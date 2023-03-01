
import { TextStyle } from 'pixi.js';

export const GameConsts = {
    width: 800,
    height: 600
}
export const $TextStyle = {
    Sprite_Window_Title: new TextStyle({
        align: 'center',
        fontFamily: 'Arial',
        fontSize: 24,
        fill: ['#ffffff'], // gradient
        // stroke: '#4a1850',
        // strokeThickness: 5,
        wordWrap: true,
        wordWrapWidth: 440,
    }),
    Window_MapItem: new TextStyle({
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
    Window_ChatLogs: new TextStyle({
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
    Window_Message: new TextStyle({
        align: 'left',
        fontFamily: ['微軟正黑體', '新細明體', 'Arial'],
        fontSize: 24,
        fill: ['#ffffff'], // gradient
        dropShadow: true,
        dropShadowDistance: 2,
        dropShadowColor: '#333333',
        dropShadowAngle: 180,
        // 文字過長的自動換行
        wordWrap: true,
        wordWrapWidth: 320,
        lineHeight: 32,
        breakWords: true,
    }),
    Sprite_Button: new TextStyle({
        align: 'center',
        fontFamily: '微軟正黑體',
        fontSize: 14,
        fill: ['#ffffff'], // gradient
    }),
    Sprite_HealthBar: new TextStyle({
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
    Sprite_Battery: new TextStyle({
        align: 'center',
        fontFamily: 'Sitka Text',
        fontStyle: 'italic',
        fontSize: 48,
        fill: ['#ffffff', '#777777'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
        dropShadowDistance: 2,
        dropShadowColor: '#4444FF',
        dropShadowAngle: 180,
    }),
    Sprite_Damage: new TextStyle({
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
    Sprite_Damage_Critical: new TextStyle({
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
    Sprite_Damage_HP: new TextStyle({
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
    Sprite_Damage_HP_Critical: new TextStyle({
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
    Sprite_Damage_HP_Plus: new TextStyle({
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
    Sprite_Damage_SP: new TextStyle({
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
    Sprite_Damage_SP_Plus: new TextStyle({
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