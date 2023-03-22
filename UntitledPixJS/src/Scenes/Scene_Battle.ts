import { Scene } from './scene';
import { Sprite, Container, Text } from 'pixi.js';
import $R from '../resources';
import { Game_Battler } from '../Game/Game_Battler';
import { Mock_Battler_Player } from '../Mock/Mock_Battler_Player';

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
	bg: Sprite;

	battlerPlayer: Array<Game_Battler>;
	battlerEnemy: Array<Game_Battler>;
	phase: Battle_Phase;
	// 讀取資源區
	constructor() {
		super();

		// 借用假的player
		this.battlerPlayer = [new Mock_Battler_Player()];
		this.bg = Sprite.from($R.Image.bgYellow);
		this.addChild(this.bg);
	}
	update(delta: number) {

	}
}

export class Window_Command extends Container {
	bg: Sprite;

	attackButton: Text;
	defenseButton: Text;
	skillButton: Text;
	itemButton: Text;

	afterDecided: (option?: any) => any;
	constructor() {
		super();
		this.bg = Sprite.from($R.Image.bgRed);
		const attackButton = new Text('攻擊');
		const defenseButton = new Text('防禦');
		const skillButton = new Text('技能');
		const itemButton = new Text('物品');

		attackButton.interactive = true;
		defenseButton.interactive = true;
		skillButton.interactive = true;
		itemButton.interactive = true;
		attackButton.on('pointertap', this.onAttackButtonDown.bind(this));
		defenseButton.on('pointertap', this.onDefenseButtonDown.bind(this));
		skillButton.on('pointertap', this.onSkillButtonDown.bind(this));
		itemButton.on('pointertap', this.onItemButtonDown.bind(this));

		attackButton.x = 4;
		attackButton.y = 4;

		// 防禦在攻擊底下
		defenseButton.x = attackButton.x;
		defenseButton.y = attackButton.y + 24;

		// 技能在攻擊右邊
		skillButton.x = attackButton.x + 48;
		skillButton.y = attackButton.y;

		// 物品在技能底下, 防禦右邊
		itemButton.x = skillButton.x
		itemButton.y = defenseButton.y;

		this.addChild(attackButton, defenseButton, skillButton, itemButton);
	}

	private onAttackButtonDown() {
		this.afterDecided?.();
	}
	private onDefenseButtonDown() {

		this.afterDecided?.();
	}
	private onSkillButtonDown() {

	}
	private onItemButtonDown() {

	}

}