class Scene_Battle extends Scene {

	constructor() {
		super();
		// 常數定義
		this.COMMANDTIMELENGTH = 20000;

		this.commandTimeStart = 0;

		this.pharse = null;
	}

	update(...args) {
		// 全局要用的腳色繪畫

		// 執行目前階段
		if (this.pharse) {
			this.pharse();
		}

	}
	destroy(...args) { }
	onClick(...args) {

	}
	onMouseMove(...args) { }
	onKeyUp(...args) { }

	// 階段：入場時
	Pharse_BattleStart() {

	}

	// 階段：使用者指令
	Pharse_UserCommand() {
		var timeLeft = this.commandTimeStart + this.COMMANDTIMELENGTH - Date.now();
		if (timeLeft < 0) {
			// 時間到
			this.pharse = this.Pharse_AttackCalc;
			return;
		}

	}
	// 階段：攻擊計算
	Pharse_AttackCalc() {
		// TODO: 算攻擊次序
	}
	// 階段：攻擊開始
	Pharse_AttackStart() {

	}
	// 階段：戰鬥結束判定
	Pharse_BattleEndCalc() {

	}
	// 階段：戰鬥結束時
	Pharse_BattleEnd() {

	}

	onKeyDown(event) {
		event.preventDefault();
		console.log(event);
		if (event.code === 'F1') {
			Game.$scene = new Scene_Play();
		}
	}
}