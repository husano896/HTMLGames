import { Scene } from './scene';
import {Sprite, Text}  from 'pixi.js';

export class Scene_Credits extends Scene {
	bg: Sprite;

	// 讀取資源區
	constructor() {
		super();

		this.bg = Sprite.from('imgs/bg.jpg');

		const text = new Text(`

		`);
		this.addChild(this.bg);
		this.addChild(text);
	}
	update(delta: number) {

	}
}

