import { Sprite_Pause } from './../Sprites/Sprite_Pause';
import { Sprite_HintText } from './../Sprites/Sprite_HintText';
import * as PIXI from 'pixi.js';

import { GameConsts, $TextStyle } from '../constants';
import { Scene } from './scene';
import $R from '../resources';
import { InteractionEvent } from 'pixi.js';
export class Scene_Title extends Scene {

	toolBar: PIXI.Container;

	pressed: boolean;

	whygogoTex: PIXI.Texture;
	whygogoTexR: PIXI.Texture;
	whygogoSpr: PIXI.Sprite;

	timerBombTex: PIXI.Texture;
	timerBombSpr: PIXI.Sprite;

	pauseSpr: Sprite_Pause;

	lives: number;
	score: number = 10;

	GRAVITY: number = 3;
	POWER: number = 6;
	// 讀取資源區
	constructor() {
		super();

		this.on('pointerdown', this.onMouseDown.bind(this));

		this.on('pointerup', this.onMouseUp.bind(this));
		this.on('pointermove', this.onMouseMove.bind(this));
		document.oncontextmenu = (ev) => ev.preventDefault();
		document.addEventListener('keydown', this.onKeyDown.bind(this));
		console.log(this);

		this.interactive = true;

		// 背景
		const texture = PIXI.Texture.from($R.Image.tile);
		const tilingSprite = new PIXI.TilingSprite(
			texture,
			GameConsts.WIDTH,
			GameConsts.HEIGHT,
		);
		this.addChild(tilingSprite);

		// 載入whygogo texture
		this.whygogoTex = PIXI.Texture.from($R.Image.whygogo);
		this.whygogoTexR = PIXI.Texture.from($R.Image.whygogoR);

		this.whygogoSpr = this.createWhyGoGo();
		this.whygogoSpr.anchor.set(0.5, 0.5);
		this.whygogoSpr.x = GameConsts.WIDTH / 2;
		this.whygogoSpr.y = GameConsts.HEIGHT / 2;
		this.addChild(this.whygogoSpr);

		// 時間炸彈
		this.timerBombSpr = PIXI.Sprite.from($R.Image.timerBomb);
		this.timerBombSpr.x = 0;
		this.timerBombSpr.y = GameConsts.HEIGHT - this.timerBombSpr.height;
		this.addChild(this.timerBombSpr);

		this.pauseSpr = new Sprite_Pause(this.continueCallBack.bind(this), this.continueCallBack.bind(this));

		// 工具列
		this.toolBar = this.createToolbar();
		this.toolBar.x = 0;
		this.toolBar.y = 0;
		this.addChild(this.toolBar);
		// 衛生紙 和綠帽
		// 位置 左 右 中上
		// 重整前提示
		// window.onbeforeunload = () => confirm('Are you sure you want to quit?');
	}

	continueCallBack() {
		this.removeChild(this.pauseSpr)
	}

	update(delta: number) {
		// 如果按壓中
		if (this.pressed) {
			this.whygogoSpr.x += this.POWER * Math.sin(this.whygogoSpr.rotation) * delta;
			this.whygogoSpr.y -= this.POWER * Math.cos(this.whygogoSpr.rotation) * delta;
		}
		this.whygogoSpr.y += delta * this.GRAVITY;
		const halfHeight = this.whygogoSpr.height / 2;
		if (this.whygogoSpr.y > GameConsts.HEIGHT - halfHeight) {
			this.whygogoSpr.y = GameConsts.HEIGHT - halfHeight;
		} else if (this.whygogoSpr.y < 0) {
			this.whygogoSpr.y = 0;
		}

		const halfWidth = this.whygogoSpr.width / 2;
		if (this.whygogoSpr.x < halfWidth) {
			this.whygogoSpr.x = halfWidth;
		} else if (this.whygogoSpr.x > GameConsts.WIDTH - halfWidth) {
			this.whygogoSpr.x = GameConsts.WIDTH - halfWidth;
		}
	}

	// 目前0度是在上面(12點鐘方向)
	onMouseDown(event: InteractionEvent) {
		console.log(event);
		if (event.data.button === 0) {
			// 按小小
			this.pressed = true;
			this.whygogoSpr.texture = this.whygogoTexR;
		} else if (event.data.button === 2) {
			this.pause();
		}
	}

	onMouseUp(event: InteractionEvent) {
		console.log(event);
		if (event.data.button === 0) {
			this.pressed = false;
			this.whygogoSpr.texture = this.whygogoTex;
		}
	}

	onMouseMove(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;

		// 變更壞狗狗的旋轉
		const dx = x - this.whygogoSpr.x;
		const dy = y - this.whygogoSpr.y;
		const dir = Math.atan2(dy, dx) - Math.PI / 2;
		this.whygogoSpr.anchor.set(0.5, 0.5);
		this.whygogoSpr.rotation = dir;

	}

	onKeyDown(event: KeyboardEvent) {
		console.log(event);
	}


	private createToolbar() {
		const container = new PIXI.Container();
		container.interactive = true;
		// 暫停按鈕
		const pauseButton = PIXI.Sprite.from($R.Image.iconPause);
		pauseButton.cursor = 'hover';
		pauseButton.buttonMode = true;
		pauseButton.interactive = true;

		pauseButton.on('pointerdown', () => {
			this.pause();
		});
		pauseButton.x = 0;

		container.addChild(pauseButton);

		return container;
	}

	private createWhyGoGo() {
		const button = new PIXI.Sprite(this.whygogoTex);
		return button;
	}

	private pause() {
		if (!this.paused) {
			this.addChild(this.pauseSpr);
		}
	}
	get paused() {
		return this.children.includes(this.pauseSpr);
	}
}

