import * as PIXI from 'pixi.js';
import $R from '../resources';
import { $TextStyle } from '../constants';

export class Sprite_TimerBomb extends PIXI.Container {

    texBomb: PIXI.Sprite;
    timeLeftBar: PIXI.Graphics;

    timeLeftText: PIXI.Text;
    timeLength: number = 0;
    timeLeft: number = 0;
    constructor() {
        super();
        this.texBomb = new PIXI.Sprite(PIXI.Texture.from($R.Image.timerBomb));
        this.timeLeftBar = new PIXI.Graphics();
        this.timeLeftBar.lineStyle(4, 0x222222);
        this.timeLeftBar.beginFill(0xEEEEEE);
        this.timeLeftBar.drawRoundedRect(0, 0, 200, 24, 8);
        this.timeLeftText = new PIXI.Text('4', $TextStyle.GameText);
        this.addChild(this.texBomb, this.timeLeftBar, this.timeLeftText);

        this.timeLeftText.setTransform(this.texBomb.width / 2 - (Number($TextStyle.GameText.fontSize) / 2), 0);
        this.texBomb.setTransform(0, 48);
        this.timeLeftBar.setTransform(this.texBomb.width, this.texBomb.height);
    }

    update(delta: number) {
        if (this.timeLength <= 0) {
            this.visible = false;
            return;
        }
        this.visible = true;
        const timeLeftSec = Math.floor(this.timeLeft / 500);
        this.timeLeftBar.scale.x = Math.max(0, this.timeLeft / this.timeLength);
        this.timeLeftText.text = `${timeLeftSec}`;
        this.timeLeftText.visible = timeLeftSec <= 3;
    }
}