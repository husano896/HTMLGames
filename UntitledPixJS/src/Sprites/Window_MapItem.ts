import * as PIXI from 'pixi.js';
import { $TextStyle } from '../constants';
import { Sprite_CloseButton } from './Sprite_CloseButton';
import $R from '../resources';
// 道具視窗

const WIDTH = 320;
const HEIGHT = 120;
export class Window_MapItem extends PIXI.Container {

    constructor() {
        super();
        const bg = new PIXI.Graphics();
        bg.beginFill(0x555555, 0.5);
        bg.drawRect(0, 0, WIDTH, HEIGHT)

        const spr = PIXI.Sprite.from(PIXI.Texture.from($R.Image.jewelRed));
        spr.x = 8;
        spr.y = 8;
        spr.interactive = true;
        spr.buttonMode = true;
        const text = new PIXI.Text('1', $TextStyle.Window_MapItem);
        spr.addChild(text);
        text.anchor.set(1, 1);
        text.x = 24;
        text.y = 32;

        const closeButton = new Sprite_CloseButton();
        closeButton.anchor.set(0.5);
        closeButton.x = WIDTH - 16;
        closeButton.y = 16;
        this.addChild(closeButton)
        this.addChild(bg);
        this.addChild(spr);
    }
    update() { }
}