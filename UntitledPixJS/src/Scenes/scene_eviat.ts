import { Scene } from './scene';
import { Sprite_Eviat } from '../Sprites/Sprite_Eviat';
import { sound } from '@pixi/sound'
import { Sprite } from 'pixi.js';

export class Scene_Eviat extends Scene {
	bg: Sprite;

	sprite_eviat: Sprite_Eviat;

	holding: boolean;

	lastClickTime: number;

	// 讀取資源區
	constructor() {
		super();

		this.bg = Sprite.from('imgs/bg.jpg');
		this.addChild(this.bg);

		this.sprite_eviat = new Sprite_Eviat();
		this.addChild(this.sprite_eviat);

		this.on('pointertap', this.onDown.bind(this));
		this.on('pointermove', this.onMove.bind(this));
		this.on('pointerup', this.onUp.bind(this));

		this.interactive = true;

		this.holding = false;
		this.lastClickTime = 0;
		console.log(this);
	}

	easeOutSine(x) {
		return Math.sin((x * Math.PI) / 2);
	}

	easeOutSineFunc(x, start, end) {
		return start + (end - start) * Math.sin((x * Math.PI) / 2);
	}
	update(delta) {

		const time = new Date().getTime();
		// 按壓判定
		if (this.holding) {
			if (this.lastClickTime + 1000 >= time) {
				this.sprite_eviat.scale.y = 1 - this.easeOutSine((time - this.lastClickTime) / 1000) * 0.25;
			}
			return;
		}
		this.sprite_eviat.scale.y = 1.0;
		this.sprite_eviat.rotation += 0.01 * delta;
		if (this.lastClickTime + 1000 >= time) {
			this.sprite_eviat.x = this.easeOutSineFunc((time - this.lastClickTime) / 1000, this.sprite_eviat.startPos.x, this.sprite_eviat.target.x);
			this.sprite_eviat.y = this.easeOutSineFunc((time - this.lastClickTime) / 1000, this.sprite_eviat.startPos.y, this.sprite_eviat.target.y);
		}
	}

	onDown(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;
		console.log(event);
		this.holding = true;
		this.lastClickTime = new Date().getTime();
	}
	onMove(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;
	}
	onUp(event) {
		this.holding = false;
		const x = event.data.global.x;
		const y = event.data.global.y;
		console.log(event);
		this.sprite_eviat.startPos = { x: this.sprite_eviat.x, y: this.sprite_eviat.y };
		this.sprite_eviat.target = { x: x, y: y };
		this.lastClickTime = new Date().getTime();
		sound.play('jump')
	}
}

