import * as PIXI from 'pixi.js';
import $R from '../resources';

export class Sprite_AnWolf extends PIXI.Sprite {
    texAAA: PIXI.Texture;
    texRainbow: PIXI.Texture;
    // 被抓到&抓到後的動畫
    caught: boolean;
    caughtDelta: number;

    constructor() {
        // 一開始時是正常狀態
        super(PIXI.Texture.from($R.Image.anWolf));
        // 被抓到後才是彩虹
        this.texAAA = PIXI.Texture.from($R.Image.anWolfAAA);
        this.texRainbow = PIXI.Texture.from($R.Image.anWolfRainbow);
        this.caughtDelta = 0;
    }

    update(delta: number) {
        if (!this.caught) {
            return;
        }
        // 被抓到了之後開始超自然震動
        this.caughtDelta += delta;
        if (this.caughtDelta > 1000) {
            if (this.texture !== this.texRainbow) {
                // 震動完彩虹
                this.texture = this.texRainbow;
                $R.Audio.anWolfWow.play();
            }
        } else {
            this.y += this.caughtDelta % 100 > 50 ? 4 : -4;
        }
    }

    // 被抓到了
    catch() {
        if (this.caught) {
            return;
        }
        this.caught = true;
        this.caughtDelta = 0;
        this.texture = this.texAAA;
    }
}