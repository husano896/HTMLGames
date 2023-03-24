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
        this.texture = Texture.from($R.Image.dragon)
    }
}