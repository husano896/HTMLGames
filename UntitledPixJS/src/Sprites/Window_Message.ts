import { Sprite_Button } from './Sprite_Button';
import * as PIXI from 'pixi.js';
import { $TextStyle } from '../constants';
import $R from '../resources';
// 對話視窗

const WIDTH = 320;
const HEIGHT = 120;
export class Window_Message extends PIXI.Container {
    animFrame = 0;

    downIcon: PIXI.Sprite;
    constructor() {
        super();
        const bg = new PIXI.Graphics();
        bg.beginFill(0x333333, 0.75);
        bg.drawRect(0, 0, WIDTH, HEIGHT)

        const text = new PIXI.Text('Message\nTest', $TextStyle.Window_Message);
        text.x = 16;
        text.y = 16;

        // const closeButton = new Sprite_Button('OK');
        // closeButton.x = WIDTH - 16 - closeButton.width;
        // closeButton.y = HEIGHT - 16 - closeButton.height;

        this.downIcon = new PIXI.Sprite(PIXI.Texture.from($R.Image.jewelBlueSmall));
        this.downIcon.anchor.set(0.5);
        this.downIcon.x = WIDTH - 16;
        this.downIcon.y = HEIGHT - 16;
        this.addChild(bg);
        this.addChild(text);
       // this.addChild(closeButton);
        this.addChild(this.downIcon);
    }
    update(delta?: number) {
        this.animFrame += delta;
        this.downIcon.x = WIDTH - 16 + Math.sin(this.animFrame / 16) * 8;
    }
}