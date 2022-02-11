import * as PIXI from 'pixi.js';
import $R from '../resources';

export class Sprite_Lifes extends PIXI.Container {
    // 目前表示的時間 (動畫用)
    frameTime: number = 0;

    texLife: PIXI.Texture;

    constructor() {
        super();
        this.texLife = PIXI.Texture.from($R.Image.tile);
    }

    setLife(lives: number) {

    }
    update(delta: number) {
        this.frameTime = (this.frameTime + delta) % 60;
    }
}