import { Scene } from "./scene";
import $game from '../game'
import PIXI from 'pixi.js'
import $R from "../resources";

/** 練習做手機版介面用... */
export class Scene_Mobile extends Scene {
    bg: PIXI.Sprite;
    dragon: PIXI.Sprite
    constructor() {
        super();
        // 背景
        this.bg = PIXI.Sprite.from($R.Image.bgYellow);

        // 乖龍龍
        this.dragon = PIXI.Sprite.from($R.Image.dragon);
        this.addChild( this.bg, this.dragon)

    }
    update(delta: number) {

    }
}