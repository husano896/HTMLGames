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
        if (this.timeLength > 1000 - 200) {
            this.scale.set((this.timeLength - (1000 - 200)) / 200 * 4 + 1);
        }
        // 淡出時
        else if (this.timeLength > 0) {
            this.scale.set(1);
            this.alpha = this.timeLength / 1000;
        } else {
            // 顯示完畢走人
            this.alpha = 0;
            return;
        }
        this.timeLength -= delta;
    }
}