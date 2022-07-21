import $R from "../resources";
import { Scene } from "./scene";
import PIXI from 'pixi.js';

export class Scene_Title extends Scene {
	bg: PIXI.Sprite;

	// 讀取資源區
	constructor() {
		super();

		this.bg = PIXI.Sprite.from($R.Image.bgYellow);
	}
	update(delta: number) {

	}
}