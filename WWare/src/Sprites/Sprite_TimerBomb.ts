import * as PIXI from 'pixi.js';
import $R from '../resources';

export class Sprite_TimerBomb extends PIXI.Container {

    texBomb: PIXI.Texture;
    constructor() {
        super();
        this.texBomb = PIXI.Texture.from($R.Image.timerBomb);
    }
}