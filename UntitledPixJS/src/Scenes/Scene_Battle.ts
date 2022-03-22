import { Scene } from './scene';
import * as PIXI from 'pixi.js';
import $R from '../resources';
import { Game_Battler } from '../Game/Game_Battler';

enum Battle_Phase {
	// Scene剛建立起來
	NONE = 0,
	// 入場
	ENTER,
	// 使用者指令
	COMMAND,
	// 執行戰鬥指令中
	ACTING,
	// 判定是否戰鬥結束
	JUDGE,
	//戰鬥結束
	END
}
export class Scene_Battle extends Scene {
	bg: PIXI.Sprite;

	battlerPlayer: Array<Game_Battler>;
	battlerEnemy: Array<Game_Battler>;
	// 讀取資源區
	constructor() {
		super();

		this.bg = PIXI.Sprite.from($R.Image.bgYellow);
		this.addChild(this.bg);
	}
	update(delta: number) {

	}
}

