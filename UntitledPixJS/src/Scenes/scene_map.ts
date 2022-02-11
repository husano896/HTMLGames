import { Sprite_HealthBar } from './../Sprites/Sprite_HealthBar';
import Keyboard from 'pixi.js-keyboard';
import { Scene } from './scene';
import { Sprite_Seto } from '../Sprites/Sprite_Seto';

export class Scene_Map extends Scene {

	sprite_seto: Sprite_Seto;

	holding: boolean;

	lastClickTime: number;

	sprite_healthBar: Sprite_HealthBar;
	// 讀取資源區
	constructor() {
		super();

		this.sprite_seto = new Sprite_Seto();
		this.sprite_healthBar = new Sprite_HealthBar();
		this.addChild(this.sprite_seto, this.sprite_healthBar);
		this.sprite_healthBar.x = 320;
		this.sprite_healthBar.y = 8;
		this.on('pointerdown', this.onDown.bind(this));
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
		this.sprite_healthBar.update(delta);
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

		if (this.holding || target.x !== 0 || target.y !== 0) {
			// 根據距離變更移動幅度
			const rad = Math.atan2(this.sprite_seto.target.y - this.sprite_seto.y, this.sprite_seto.target.x - this.sprite_seto.x);
			const dx = Math.cos(rad) * this.sprite_seto.moveSpeed;
			const dy = Math.sin(rad) * this.sprite_seto.moveSpeed;
			this.sprite_seto.x += dx;
			this.sprite_seto.y += dy;
			const directionAngle = (180 * rad / Math.PI + 360) % 360;
			const direction = [6, 3, 2, 1, 4, 7, 8, 9][Math.floor(directionAngle / 45)];
			this.sprite_seto.setMoving(direction, true);
			// 3點鐘 = 0度
		} else {
			this.sprite_seto.setMoving(null, false);
		}
	}

	onDown(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;
		this.holding = true;
		this.lastClickTime = new Date().getTime();
	}
	onMove(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;
		this.sprite_seto.target = { x, y };
	}
	onUp(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;
		this.holding = false;
		this.sprite_seto.setMoving(-1, false);
	}
}

