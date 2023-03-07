import { Graphics, Text } from 'pixi.js';
import { $TextStyle } from '../constants'

/** 家選單中, 目前剩餘行動值的顯示 */
export class Sprite_Battery extends Graphics {
    value: number = 24;

    text: Text;
    constructor() {
        super();
        this.text = new Text('24', $TextStyle.Sprite_Battery);
        this.updateValue(24);
        this.addChild(this.text);
    }
    update(delta) {
    }

    updateValue(val: number) {
        this.value = val;
        this.text.text = `${val}`;

        this.lineStyle(16, 0x3333DD, 1);
        this.arc(64, 64, 64, 0, Math.PI, true);
        this.text.x = 64 - this.text.width / 2;
    }
}