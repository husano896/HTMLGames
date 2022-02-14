import * as PIXI from 'pixi.js';
import $R from '../resources';
// 關閉父Sprite用的按鈕

export class Sprite_CloseButton extends PIXI.Sprite {
    constructor() {
        super(PIXI.Texture.from($R.Image.closeBtn));
        this.interactive = true;
        this.buttonMode = true;
		this.on('pointerdown', this.onDown.bind(this));
    }
    onDown() {
        if (this.parent) {
            this.parent.destroy();
        } else {
            console.warn('無Parent可供關閉！');
        }
    }
}