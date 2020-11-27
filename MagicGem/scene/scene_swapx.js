/* 童年Flash的魔法寶石...吧 */
class Scene_SwapX {

	constructor() {
		// 直行縱顆數
		this.ROW = 12
		// 橫行牌數
		this.COLUMN = 8;
		// 最小消除顆數
		this.MINCLEAR = 3;
		// 攻擊傷害表
		this.DAMAGETABLE = [1, 2, 4, 6, 9, 12, 16, 20];
		// 最小有額外加成的Combo數
		this.MINCOMBO = 2;
		// 球顏色數量
		this.DIFFICULTY = 6;
		this.BALL_IMAGE = [
			R.Image.Ball1,
			R.Image.Ball2,
			R.Image.Ball3,
			R.Image.Ball4,
			R.Image.Ball5,
			R.Image.Ball6
		];
		// Combo聲音
		this.COMBO_SE = [
			R.Audio.SE_Combo1,
			R.Audio.SE_Combo2,
			R.Audio.SE_Combo3,
			R.Audio.SE_Combo4,
			R.Audio.SE_Combo5,
			R.Audio.SE_Combo6,
			R.Audio.SE_Combo7,
			R.Audio.SE_Combo8
		]
		this.BG_IMG = [
			R.Image.BG_01,
			R.Image.BG_02,
			R.Image.BG_03,
			R.Image.BG_04,
			R.Image.BG_05,
			R.Image.BG_06,
		]
		// 球大小
		this.BALL_SIZE = 48;
		this.resetGame();
	}
	update() {
		// 背景
		if (this.background) {
			Game.drawImage(this.background, 0, 0);
		}
		// 繪製版面
		for (let x = 0; x < this.COLUMN; x++) {
			for (let y = 0; y < this.playField[x].length; y++) {
				Game.drawImage(this.BALL_IMAGE[this.playField[x][y] - 1],
					x * this.BALL_SIZE,
					y * this.BALL_SIZE, 1.0,
				);
			}
		}
		/*
		for (let x = 0; x < this.COLUMN; x++) {
			for (let y = 0; y < this.playField[x].length; y++) {
				Game.drawImage(this.BALL_IMAGE[this.playField[x][y] - 1],
					Game.WIDTH / 2 + x * this.BALL_SIZE,
					y * this.BALL_SIZE, 1.0,
				);
			}
		}
		*/
		// 警戒線
		Game.ctx.fillStyle = 'rgba(255,64,64,0.75)';
		Game.ctx.fillRect(0, this.ROW * this.BALL_SIZE + 2, Game.WIDTH, 4)

		// 繪製玩家
		if (this.playerBall) {
			Game.drawImage(this.BALL_IMAGE[this.playerBall - 1], this.playerX * this.BALL_SIZE, Game.HEIGHT - this.BALL_SIZE - 4);
		}
		// 目前球數
		Game.drawText(
			this.playerBallCount.toString(),
			this.playerX * this.BALL_SIZE + this.BALL_SIZE / 2,
			Game.HEIGHT - this.BALL_SIZE - 4,
			{ color: 'white', size: 14, textAlign: 'center' })
		// 目前分數
		Game.drawText(
			`分數：${this.score}`,
			Game.WIDTH - 16,
			32,
			{ color: 'white', size: 14, textAlign: 'right' })
		// 目前Combo數
		Game.drawText(
			`Combo：${this.combo}`,
			Game.WIDTH - 16,
			64,
			{ color: 'white', size: 14, textAlign: 'right' });
		// 等待延遲
		Game.drawText(
			`TimeWait：${this.Interval}`,
			Game.WIDTH - 16,
			96,
			{ color: 'white', size: 14, textAlign: 'right' });
		// 定時生垃圾行判定
		// 最後一次增加垃圾行的時間
		const currentTime = new Date().getTime();
		if (this.lastBumpUp + this.Interval < currentTime) {
			this.lastBumpUp = currentTime;
			this.newLine();

		}
		// 隨分數設定產生速度
		this.Interval = Math.max(1000, 7500 - this.score / 20);
	}
	destroy() { }

	onClick(event) { }
	onMouseMove(event) { }
	onKeyDown(event) {
		event.preventDefault();
		if (event.code === 'ArrowDown') {
			// 目前球道(直)
			const currentRow = this.playField[this.playerX];
			// 目前所選排的球的顏色
			const selectedBall = currentRow[currentRow.length - 1];
			// 跟玩家所持球種不同時不動作
			if (!selectedBall || this.playerBall !== selectedBall && this.playerBallCount > 0) {
				return;
			}
			// 下拉聲音
			R.Audio.SE_Down.play();
			// 將球拿到手上
			this.playerBall = selectedBall;
			// 能取得的同色球的長度
			const takeableBalls = _.takeRightWhile(currentRow, b => b === this.playerBall);
			this.playerBallCount += takeableBalls.length;
			// 移除該排最下開始選的顏色
			this.playField[this.playerX] = _.dropRightWhile(currentRow, n => n === selectedBall);
			console.log(takeableBalls);
		}
		else if (event.code === 'ArrowUp') {
			R.Audio.SE_Up.play();
			// 玩家手上沒球時不動作
			if (!this.playerBall) {
				return;
			}

			// 目前球道(直)
			const currentRow = this.playField[this.playerX];
			// 推球上去
			currentRow.push(...Array(this.playerBallCount).fill(this.playerBall));
			// 玩家手持球數歸0
			this.playerBallCount = 0;
			// 消除判定
			const clearableBalls = _.takeRightWhile(currentRow, b => b === this.playerBall);
			this.playerBall = 0;
			if (clearableBalls.length < this.MINCLEAR) {
				// 如果顆數小於可消除數量時不執行
				this.combo = 0;
				return;
			}
			// 該行去除掉可消除的球
			this.playField[this.playerX] = _.dropRight(currentRow, clearableBalls.length);

			// 分數與攻擊力計算
			this.addScore(clearableBalls.length, this.combo);
			this.addDamage(clearableBalls.length, this.combo);
			// Combo聲音
			this.COMBO_SE[Math.min(this.combo, this.COMBO_SE.length - 1)].play();
			// Combo增加
			this.combo += 1;
			// 消除動畫
		}
		if (event.code === 'ArrowLeft') {
			this.playerX = (this.playerX - 1 + this.COLUMN) % this.COLUMN;
		}
		else if (event.code === 'ArrowRight') {
			this.playerX = (this.playerX + 1) % this.COLUMN;
		}
		if (event.code === 'KeyQ') {
			this.newLine();
		}
		if (event.code === 'KeyR') {
			this.resetGame();
		}
	}
	// 消除分數計算
	addScore(ballCount, combo) {
		// 公式： (10 + (消除數量 - 基礎數量)*5) * 顆數
		this.score += (10 + (ballCount - this.MINCLEAR) * 5) * ballCount;
		if (combo >= this.MINCOMBO) {
			// Combo分數公式：10*combo
			this.score += 10 * combo;
		}
	}

	// 傷害計算
	addDamage(ballCount, combo) {
		const extraBallCount = ballCount - this.MINCLEAR;
		const extraComboCount = combo - this.MINCOMBO;
		// 公式：(消除數量 - 基礎數量)
		if (extraBallCount) {
			this.damage += this.DAMAGETABLE[Math.min(extraBallCount, this.DAMAGETABLE.length) - 1];
		}
		if (extraComboCount) {
			this.damage += Math.min(extraComboCount * 2, 20);
		}
	}
	// 加入新行
	newLine() {
		this.playField.forEach(a => {
			a.unshift(Math.ceil(Math.random() * this.DIFFICULTY));
		})
		console.log(this.playField);
		// 新行效果音
		R.Audio.SE_NewLine.play();

		// 死亡判定
		if (_.some(this.playField, a => a.length > this.ROW)) {
			R.Audio.SE_GameOver.play();
			// 先用Reset擋著
			this.resetGame();
		}
	}

	resetGame() {
		// 玩家版面
		this.playField = [...Array(this.COLUMN)].map(x => Array());
		// 玩家橫位置
		this.playerX = 0;
		// 目前玩家持有球種
		this.playerBall = 0;
		// 目前玩家持有球數量
		this.playerBallCount = 0;
		// 分數
		this.score = 0;
		// 目前受攻擊的傷害緩衝
		this.damage = 0;
		// 目前連擊
		this.combo = 0;
		// 隨機選一張背景
		this.background = this.BG_IMG[_.random(this.BG_IMG.length - 1)];
		// 生新版面
		for (let i = 0; i < 6; i++) {
			this.newLine();
		}
		// 最後一次增加垃圾行的時間
		this.lastBumpUp = new Date().getTime();
		this.Interval = 10000;
	}
}