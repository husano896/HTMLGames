import { Window_Message } from './../Sprites/Window_Message';
import { Map001 } from './../Data/Map001';
import { Sprite_Map } from './../Sprites/Sprite_Map';
import { Game_Battler } from '@/Game/Game_Battler';

import { Window_MapItem } from './../Sprites/Window_MapItem';
import { Sprite_Damage } from './../Sprites/Sprite_Damage';
import { Sprite_HealthBar } from './../Sprites/Sprite_HealthBar';
import Keyboard from 'pixi.js-keyboard';
import { Scene } from './scene';
import { Sprite_Seto } from '../Sprites/Sprite_Seto';
import { Game_Global } from '@/Game';
import { Container, } from 'pixi.js';
export class Scene_Map extends Scene {

	sprite_seto: Sprite_Seto;

	holding: boolean;
	
	sprite_healthBar: Sprite_HealthBar;
	battler: Game_Battler;

	map: Sprite_Map;
	windows_container: Container;
	// 讀取資源區
	constructor() {
		super();

		// 地圖讀取
		this.map = new Sprite_Map(Map001);
		this.addChild(this.map);
		// 角色 Sprite
		this.sprite_seto = new Sprite_Seto();

		// 人物血量框位置
		this.sprite_healthBar = new Sprite_HealthBar(Game_Global.battler);
		this.sprite_healthBar.x = 320;
		this.sprite_healthBar.y = 8;
		this.addChild(this.sprite_healthBar);

		this.on('pointerdown', this.onDown.bind(this));
		this.on('pointermove', this.onMove.bind(this));
		this.on('pointerup', this.onUp.bind(this));

		this.interactive = true;

		this.holding = false;
		// 視窗應該要在常駐UI層之下
		this.windows_container = new Container();
		this.addChild(this.windows_container);


		// 道具視窗
		this.windows_container.addChild(new Window_MapItem());
		const window_message = new Window_Message();
		window_message.y = 240;
		this.windows_container.addChild(window_message);
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

		this.children.forEach((c: any) => c.update?.(delta));
		this.windows_container.children.forEach((c: any) => c.update?.(delta));

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

		if (!this.holding && !target) {
			this.sprite_seto.target = null;
		}
	}

	onDown(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;
		this.holding = true;

		// 傷害Sprite測試
		const dmg = Math.round(Math.random() * 2000 - 1000);
		const dmgSpr = new Sprite_Damage(dmg, Math.random() > 0.5, Math.random() > 0.5);
		dmgSpr.x = x;
		dmgSpr.y = y;
		this.addChild(dmgSpr);
		Game_Global.battler.hp = Game_Global.battler.hp - dmg;
		this.sprite_healthBar.flush();
		console.log(this.sprite_healthBar, Game_Global.battler);
		console.log(dmgSpr);
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
	}
}

