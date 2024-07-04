import * as PIXI from 'pixi.js';

import { $TextStyle } from '../constants';
import { Scene } from './scene';
import $game from '../game';
export class Scene_Title extends Scene {

	// 讀取資源區
	constructor() {
		super();

		const text = new PIXI.Text('Press to start', $TextStyle.GameText);
		text.setTransform(($game.screen.width - text.width) / 2, ($game.screen.height - text.height) / 2);
		this.on('pointerdown', this.onMouseDown.bind(this));
		this.interactive = true;
		this.addChild(text);
	}
	update(delta: number) {
	}

	async onMouseDown() {
		this.off('pointerdown', this.onMouseDown.bind(this));
		const scene = await import('./scene_ready').then(s => s.Scene_Ready);
		$game.stage.removeChildren()
		const s = new scene();
		$game.stage.addChild(s);
	}
}

