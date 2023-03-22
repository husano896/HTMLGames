import { Graphics, Text, FederatedPointerEvent } from 'pixi.js';
import { $TextStyle } from '../constants';
import { AudioKeys } from '../resources';

import { sound } from '@pixi/sound'

// 關閉父Sprite用的按鈕
const minWidth = 64;
const minHeight = 32;
export class Sprite_Button extends Graphics {
    callback?: () => void;

    text: Text;

    _disabled: boolean;

    hoverMask: Graphics;

    constructor(text?: string, callback?: () => void, size?: { width: number, height: number }) {

        super();
        this.text = new Text(text, $TextStyle.Sprite_Button);
        this.text.anchor.set(0.5);
        this.beginFill(0x448899, 1);
        this.drawRect(0, 0, Math.max(minWidth, this.text.width + 16, size.width), Math.max(minHeight, this.text.height + 8, size.height));
        this.endFill();

        this.callback = callback;
        this.text.x = this.width / 2;
        this.text.y = this.height / 2;
        this.interactive = true;
        this.on('pointerenter', this.onEnter.bind(this));
        this.on('pointerleave', this.onLeave.bind(this));
        this.on('pointertap', this.onDown.bind(this));
        this.on('pointerup', this.onUp.bind(this));
        this.addChild(this.text);
        this.hoverMask = new Graphics();
        this.hoverMask.beginFill(0x0, 1);
        this.hoverMask.drawRect(0, 0, this.width, this.height);
        this.hoverMask.endFill();
        this.hoverMask.alpha = 0
        this.addChild(this.hoverMask);

    }
    onDown(ev: FederatedPointerEvent) {
        console.log(ev)
        if (this._disabled) { return; }

        this.hoverMask.alpha = 0;
        if (this.callback) {
            this.callback();
        }

        sound.play(AudioKeys.confirm);
        ev.stopPropagation();
        ev.preventDefault();
    }

    onUp(ev: FederatedPointerEvent) {
        if (this._disabled) { return; }

        this.hoverMask.alpha = 0;

        ev.stopPropagation();
        ev.preventDefault();
    }


    /** 滑鼠指到時的事件 */
    onEnter(ev: FederatedPointerEvent) {
        if (this._disabled) { return; }
        this.hoverMask.alpha = 0.2;
        sound.play(AudioKeys.cursor);
        ev.stopPropagation();
        ev.preventDefault();
    }

    /** 滑鼠離開時的事件 */
    onLeave(ev: FederatedPointerEvent) {
        if (this._disabled) { return; }
        this.hoverMask.alpha = 0;
        ev.stopPropagation();
        ev.preventDefault();
    }
}