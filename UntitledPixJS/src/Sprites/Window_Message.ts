import { Container, Sprite, Text, Graphics, Texture } from 'pixi.js';
import { $TextStyle } from '../constants';
import $R from '../resources';
// 對話視窗

const WIDTH = 320;
const HEIGHT = 120;
export class Window_Message extends Container {
    animFrame = 0;

    downIcon: Sprite;
    constructor() {
        super();
        const bg = new Graphics();
        bg.beginFill(0x333333, 0.75);
        bg.drawRect(0, 0, WIDTH, HEIGHT)

        const text = new Text('Message\nTest', $TextStyle.Window_Message);
        text.x = 16;
        text.y = 16;

        this.downIcon = new Sprite(Texture.from($R.Image.jewelBlueSmall));
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
        // 提示繼續的Icon動畫
        this.downIcon.y = HEIGHT - 16 + Math.sin(this.animFrame / 8) * 4;
    }
}