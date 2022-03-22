import { Scene } from './scene';
import * as PIXI from 'pixi.js';

export class Scene_Credits extends Scene {
	bg: PIXI.Sprite;

	// 讀取資源區
	constructor() {
		super();

		this.bg = PIXI.Sprite.from('imgs/bg.jpg');

		const text = new PIXI.Text(`

		`);
		this.addChild(this.bg);
		this.addChild(text);
	}
	update(delta: number) {

	}
}

