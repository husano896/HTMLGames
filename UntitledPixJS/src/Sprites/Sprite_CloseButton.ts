import { Sprite, Texture } from 'pixi.js';
import $R from '../resources';
// 關閉父Sprite用的按鈕

export class Sprite_CloseButton extends Sprite {
    constructor() {
        super(Texture.from($R.Image.closeBtn));
        this.interactive = true;
        this.on('pointertap', this.onDown.bind(this));
    }
    onDown() {
        if (this.parent) {
            this.parent.destroy();
        } else {
            console.warn('無Parent可供關閉！');
        }
    }
}