class Scene_Battle extends Scene {

	constructor() {
		super();
		// 常數定義
		this.COMMANDTIMELENGTH = 20000;
		this.commandTimeStart = 0;
		this.pharse = this.Pharse_EnterAnim;

		this.sprites = [];
	}

	update(...args) {
		// 全局要用的腳色繪畫

		// 執行目前階段
		if (this.pharse) {
			this.pharse();
		}

		this.sprites.forEach(s => {
			s.update()
			s.draw();
		});
	}
	destroy(...args) { }
	onClick(event) {
		this.sprites.push(new Sprite_Damage({ x: event.layerX, y: event.layerY, damage: Math.random() * 1000 - 500 }));
	}
	onMouseMove(...args) { }
	onKeyUp(...args) { }

	// 階段：入場時
	Pharse_EnterAnim() {
		// 紀錄指令開始時間
		this.commandTimeStart = Date.now();
		this.pharse = this.Pharse_StartCommand;
	}

	// 指令階段開始時
	Pharse_StartCommand() {
		// 紀錄指令開始時間
		this.commandTimeStart = Date.now();
		this.pharse = this.Pharse_UserCommand;
	}

	// 階段：使用者指令
	Pharse_UserCommand() {
		var timeLeft = this.commandTimeStart + this.COMMANDTIMELENGTH - Date.now();
		if (timeLeft < 0) {
			// 時間到
			this.pharse = this.Pharse_AttackCalc;
			return;
		}

		// 計時繪畫
		var timeLeftStr = Math.floor(timeLeft / 1000);
		Game.ctx.beginPath();
		var color = `rgb(0,255,255)`;
		if (timeLeft < 10000) {
			color = `rgb(${Math.round((10000 - timeLeft) * 255 / 10000)}, ${Math.round((timeLeft) * 255 / 10000)}, ${Math.round((timeLeft) * 255 / 10000)})`;
		}
		Game.ctx.strokeStyle = color;
		Game.ctx.arc(Game.WIDTH / 2, Game.HEIGHT / 2, 64, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * timeLeft / this.COMMANDTIMELENGTH);
		Game.ctx.stroke();
		Game.drawText(timeLeftStr, Game.WIDTH / 2, Game.HEIGHT / 2 - 24,
			{ size: 'italic bold 48', textAlign: 'center', color: color});
	}
	// 階段：攻擊計算
	Pharse_AttackCalc() {
		// TODO: 算攻擊次序
		this.pharse = this.Pharse_AttackStart;
	}
	// 階段：攻擊開始
	Pharse_AttackStart() {
		this.pharse = this.Pharse_BattleEndCalc;
	}
	// 階段：戰鬥結束判定
	Pharse_BattleEndCalc() {
		this.pharse = this.Pharse_BattleEnd;
	}
	// 階段：戰鬥結束時
	Pharse_BattleEnd() {
		Game.$scene = new Scene_Play();
	}

	onKeyDown(event) {
		event.preventDefault();
		console.log(event);
		if (event.code === 'F1') {
			Game.$scene = new Scene_Play();
		}
	}
}