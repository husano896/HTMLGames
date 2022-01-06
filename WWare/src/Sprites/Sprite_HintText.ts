import * as PIXI from 'pixi.js';

import { GameConsts, $TextStyle } from '../constants';

export class Sprite_HintText extends PIXI.Text {
    // 顯示時間 (秒)
    timeLength = 2;

    constructor(text: string) {
        super(text, $TextStyle.GameText);
        this.anchor.set(0.5, 0.5);
        this.x = GameConsts.WIDTH / 2;
        this.y = GameConsts.HEIGHT / 3;
    }

    setText(text: string) {
        this.text = text;
        this.timeLength = 2;
    }
    update(delta: number) {
        // 進入時
        if (this.timeLength > 1) {
            this.scale.set(this.timeLength * 4);
        }
        // 淡出時
        else if (this.timeLength > 0){
            this.scale.set(1);
            this.alpha = this.timeLength;
        } else {
            // 顯示完畢走人
            this.alpha = 0;
            return;
        }
        this.timeLength -= delta;
    }
}