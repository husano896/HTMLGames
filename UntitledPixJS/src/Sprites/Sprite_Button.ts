import * as PIXI from 'pixi.js';
import { $TextStyle } from '../constants';
import $R from '../resources';
// 關閉父Sprite用的按鈕

const minWidth = 96;
const minHeight = 32;
export class Sprite_Button extends PIXI.Graphics {
    callback: () => void;
    constructor(text: string, callback?: () => void) {
        super();
        const pixiText = new PIXI.Text(text, $TextStyle.Sprite_Button);
        pixiText.anchor.set(0.5);
        this.beginFill(0x448899, 1);
        this.drawRect(0, 0, Math.max(minWidth, pixiText.width + 16), Math.max(minHeight, pixiText.height + 8))
        this.callback = callback;
        pixiText.x = this.width / 2;
        pixiText.y = this.height / 2;
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', this.onDown.bind(this));
        this.addChild(pixiText);

    }
    onDown() {
        if (this.callback) {
            this.callback();
        }
        if (this.parent) {
            this.parent.destroy();
        } else {
            console.warn('無Parent可供關閉！');
        }
    }
}