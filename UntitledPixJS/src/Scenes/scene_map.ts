import { Scene } from './scene';

import { Sprite_Seto } from '../Sprites/Sprite_Seto';

export class Scene_Map extends Scene {

	sprite_seto: Sprite_Seto;

	holding: boolean;

	lastClickTime: number;

	
	// 讀取資源區
	constructor() {
		super();

		this.sprite_seto = new Sprite_Seto();
		this.addChild(this.sprite_seto);

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
		if (this.holding) {
			// 根據距離變更移動幅度
			const rad = Math.atan2(this.sprite_seto.target.y - this.sprite_seto.y, this.sprite_seto.target.x - this.sprite_seto.x);
			const dx = Math.cos(rad) * this.sprite_seto.moveSpeed;
			const dy = Math.sin(rad) * this.sprite_seto.moveSpeed;
			this.sprite_seto.x += dx;
			this.sprite_seto.y += dy;
			const directionAngle = (180 * rad / Math.PI + 360) % 360;
			const direction = [6,3,2,1,4,7,8,9][Math.floor(directionAngle / 45)];
			console.log(directionAngle, direction);
			this.sprite_seto.setMoving(direction, true);
			// 3點鐘 = 0度
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
		this.sprite_seto.target = {x, y};
	}
	onUp(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;
		this.holding = false;
		this.sprite_seto.setMoving(-1, false);
	}
}

