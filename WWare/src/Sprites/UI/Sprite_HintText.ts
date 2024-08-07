import * as PIXI from 'pixi.js';

import { GameConsts, $TextStyle } from '@/constants';

const SHOWLENGTH = 1000;
export class Sprite_HintText extends PIXI.Text {
    // 顯示時間 (ms)
    timeLength = 1000;

    constructor(text: string) {
        super(text, $TextStyle.GameText);
        this.anchor.set(0.5, 0.5);
        this.x = GameConsts.WIDTH / 2;
        this.y = GameConsts.HEIGHT / 3;
    }

    setText(text: string) {
        this.text = text;
        this.timeLength = SHOWLENGTH;
        this.alpha = 1;
    }
    update(delta: number) {
        // 進入時
        this.timeLength -= delta;
        if (this.timeLength > 750) {
            this.scale.set((this.timeLength - 750) / 250 * 3 + 1);
        }
        // 淡出時
        else if (this.timeLength > 0) {
            this.scale.set(1);
            this.alpha = Math.min(1, this.timeLength / 500);
        }
        // 顯示完畢走人
        else {
            this.scale.set(1);
            this.alpha = 0;
        }
    }
}