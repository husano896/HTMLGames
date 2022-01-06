import * as PIXI from 'pixi.js';

import { Version, GameConsts } from '../constants';
import { IChart, INote } from '../Interfaces/IChart';
import { Scene } from './scene';
import $R from '../resources';
import { Howl } from 'howler';
export class Scene_Title extends Scene {

	toolBar: PIXI.Container;

	// 讀取資源區
	constructor() {
		super();

		this.on('pointerdown', this.onMouseDown.bind(this));
		this.on('pointermove', this.onMouseMove.bind(this));
		this.on('mousewheel', this.onMouseWheel.bind(this));

		document.oncontextmenu = (ev) => ev.preventDefault();
		document.addEventListener('keydown', this.onKeyDown.bind(this));
		console.log(this);

		this.interactive = true;
		// 工具列
		this.toolBar = this.createToolbar();
		this.toolBar.x = GameConsts.height;
		this.addChild(this.toolBar);

		// 重整前提示
		window.onbeforeunload = () => confirm('Are you sure you want to quit?');

		// 滑鼠滾輪事件
		document.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
	}

	update(delta) {

	}

	createToolbar() {
		const container = new PIXI.Container();

		// 暫停按鈕
		const pauseButton = PIXI.Sprite.from($R.Image.iconPause);
		pauseButton.interactive = true;
		pauseButton.buttonMode = true;
		pauseButton.on('pointerdown', () => {
			
		});
		pauseButton.x = 0;

		container.addChild(pauseButton);

		return container;
	}


	// 目前0度是在上面(12點鐘方向)
	onMouseDown(event) {
		console.log(event);
	}

	onMouseMove(event) {
		const x = event.data.global.x;
		const y = event.data.global.y;

	}

	onKeyDown(event: KeyboardEvent) {
		console.log(event);
	}

	onMouseWheel(e: Event) {
		const event = e as WheelEvent;
	}
}

