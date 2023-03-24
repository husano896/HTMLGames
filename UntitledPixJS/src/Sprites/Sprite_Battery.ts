import { Game_Global_Mobile } from '@/Game';
import { Graphics, Text, Rectangle } from 'pixi.js';
import { $TextStyle } from '../constants'

/** 家選單中, 目前剩餘行動值的顯示 */
export class Sprite_Battery extends Graphics {

    text: Text;
    constructor() {
        super();
        this.text = new Text('', $TextStyle.Sprite_Battery);
        this.text.anchor.set(0.5, 1);
        this.addChild(this.text);

    }
    update(delta) {
        const val = Game_Global_Mobile.energy;

        if (this.text.text !== String(val)) {
            this.updateValue(val)
        }
    }

    updateValue(val: number) {
        this.text.text = `${val}`;
        this.clear();
        this.lineStyle(16, 0x7777FF, 1);
        this.arc(64, 64, 64, Math.PI, Math.PI + Math.PI * (Math.min(val / 24, 1)));
        this.text.x = 64;
        this.text.y = 64;
    }
}