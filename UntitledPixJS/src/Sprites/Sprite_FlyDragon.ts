import $game from '@/main';
import { Sprite, Texture } from "pixi.js";

import $R from "../resources";

/** 飛飛Sprite~ */
export class Sprite_FlyDragon extends Sprite {
    constructor() {
        super()

        this.changeEmotion();
    }

    update(delta: number) {

    }

    changeEmotion() {
        // 目前先按照當地時間給圖片
        const hour = new Date().getHours();

        if (hour >= 22 || hour < 6) {
            // 晚上10點 ~ 隔天早上6點是睡覺時間~
            this.texture = Texture.from($R.Image.dragonSleep);
        } else if (hour >= 6 && hour < 8) {
            // 人家... 還在起床...
            this.texture = Texture.from($R.Image.dragonWake);
        } else if (hour >= 8 && hour < 12) {
            // 早上的小量活動移動中
            this.texture = Texture.from($R.Image.dragon);
        } else if (hour >= 12 && hour < 18) {
            // 飛行中~狩獵中~採集中~
            this.texture = Texture.from($R.Image.dragonFlying);
        } else if (hour >= 18 && hour < 20) {
            // 回家中 & 在整理自己的東西中
            this.texture = Texture.from($R.Image.dragonBack);
        } else {
            // 20~22
            // 回家了 來一起玩！
            this.texture = Texture.from($R.Image.dragonShy);
        }
        this.width = Math.min(768, Math.min($game.screen.width / 2, $game.screen.height / 2))
        this.height = this.width;
    }
}