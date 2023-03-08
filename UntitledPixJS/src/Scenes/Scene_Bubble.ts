import { Sprite_BubbleChar } from './../Sprites/Sprite_BubbleChar';
import { Map001 } from './../Data/Map001';
import { Sprite_Map } from './../Sprites/Sprite_Map';

import Keyboard from 'pixi.js-keyboard';
import { Scene } from './scene';

export class Scene_Bubble extends Scene {

	sprite_seto: Sprite_BubbleChar;

	holding: boolean;
	map: Sprite_Map;
	// 讀取資源區
	constructor() {
		super();

		// 地圖讀取
		this.map = new Sprite_Map(Map001);
		this.addChild(this.map);
		// 角色 Sprite
		this.sprite_seto = new Sprite_BubbleChar();
		this.interactive = true;

		this.holding = false;
		this.addChild(this.sprite_seto);
		
		console.log(this);
	}

	easeOutSine(x) {
		return Math.sin((x * Math.PI) / 2);
	}

	easeOutSineFunc(x, start, end) {
		return start + (end - start) * Math.sin((x * Math.PI) / 2);
	}

	update(delta: number) {
		const time = new Date().getTime();
		this.children.forEach((c: any)=>c.update?.(delta));

		const target = { x: 0, y: 0 };
		if (Keyboard.isKeyDown('ArrowUp')) {
			target.y = -1;
		} else if (Keyboard.isKeyDown('ArrowDown')) {
			target.y = 1;
		}
		if (Keyboard.isKeyDown('ArrowLeft')) {
			target.x = -1;
		}
		else if (Keyboard.isKeyDown('ArrowRight')) {
			target.x = 1;
		}
		if (target.x !== 0 || target.y !== 0) {
			this.sprite_seto.target = { x: this.sprite_seto.x + target.x, y: this.sprite_seto.y + target.y };
		}
		else if (!target.x || !target.y) {
			this.sprite_seto.target = null;
		}
	}
}

