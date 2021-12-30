class Sprite_Player extends Sprite {

	constructor() {
		super({ image: R.Image.Male01, srcX: 0, srcY: 0, srcWidth: 32, srcHeight: 32 });
		// 常數設定
		this.gravity = 1;
		this.jump_power = 20;
		this.move_speed = 4;
		this.snd_jump = R.Audio.SE_Jump;
		this.dstWidth = 48;
		this.dstHeight = 48;
		//
		this.jumping = false;
		this.frame = 0;
		this.direction = '';
		this.moving = false;
		this.attacking = 0;
		this.hp = 150;
		this.maxhp = 150;
		this.sp = 50;
		this.maxsp = 50;
		this.ex = 0;
		this.maxex = 16;
	}

	update() {
		if (this.moving) {
			this.frame = (this.frame + 1) % 60;
			this.srcX = Math.floor(this.frame / 20) * 32;
		} else {
			this.srcX = 32;
		}

		if (this.attacking > 0) {
			this.attacking -= 1;
		}

		switch (this.direction) {
			case 'left':
				this.srcY = 32;
				this.filter = 'brightness(50%)';
				break;
			case 'right':
				this.srcY = 64;
				this.filter = 'drop-shadow(0px 4px 2px black)';
				break;
			case 'up':
				this.srcY = 96;
				this.filter = `blur(2px)`;
				break;
			default:
				this.srcY = 0;
				this.filter = 'none';
		}
	}
	jump() {
		if (this.vec_y !== 0 || this.jumping)
			return;
		this.vec_y = this.jump_power;
		this.jumping = true;
		this.snd_jump.play();
	}

	attack() {
		if (this.attacking > 0) {
			return;
		}
		this.attacking = 10;
	}
}

class Scene_Play extends Scene {
	// 讀取資源區
	constructor() {
		super();
		this.spr_player = new Sprite_Player();
		this.spr_StatUI = new SpriteGroup(new Sprite({ image: R.Image.Stat }))
		this.bg = R.Image.BG;
		console.log(this.spr_player);
	}

	updateUI() {
		// 能力值UI
		this.spr_StatUI.draw();
		Game.ctx.fillStyle = 'rgba(237,28,36,0.5)';
		Game.ctx.fillRect(34, 40, Math.floor(150 * this.spr_player.hp / this.spr_player.maxhp), 6);
		Game.ctx.fillStyle = 'rgba(63,72,204,0.5)';
		Game.ctx.fillRect(34, 87, Math.floor(150 * this.spr_player.sp / this.spr_player.maxsp), 6);
		Game.ctx.fillStyle = 'rgba(255,242,0,0.5)';
		Game.ctx.fillRect(34, 134, Math.floor(150 * this.spr_player.ex / this.spr_player.maxex), 6);
	}

	// 畫面更新
	update() {
		this.spr_player.moving = false;
		// 操控事件
		if (Game.getPressed('ArrowRight')) {
			this.spr_player.x = Math.min(this.spr_player.x + this.spr_player.move_speed, Game.WIDTH - this.spr_player.width);
			this.spr_player.direction = 'right';
			this.spr_player.moving = true;
		} else if (Game.getPressed('ArrowLeft')) {
			this.spr_player.x = Math.max(0, this.spr_player.x - this.spr_player.move_speed);
			this.spr_player.direction = 'left';
			this.spr_player.moving = true;
		}

		if (Game.getPressed('ArrowUp')) {
			this.spr_player.y = Math.max(this.spr_player.y - this.spr_player.move_speed, 0);
			this.spr_player.direction = 'up';
			this.spr_player.moving = true;
		} else if (Game.getPressed('ArrowDown')) {
			this.spr_player.y = Math.min(this.spr_player.y + this.spr_player.move_speed, Game.HEIGHT - this.spr_player.height);
			this.spr_player.direction = 'down';
			this.spr_player.moving = true;
		}
		/*
		// 旋轉☆跳躍
		if (Game.getPressed('ArrowUp')) {
				this.spr_player.jump();
		}
		*/

		//測試用改能力
		if (Game.getPressed('KeyQ')) {
			this.spr_player.hp = Math.max(0, this.spr_player.hp - 1);
		}
		if (Game.getPressed('KeyW')) {
			this.spr_player.hp = Math.min(this.spr_player.maxhp, this.spr_player.hp + 1);
		}
		if (Game.getPressed('KeyE')) {
			this.spr_player.ex = Math.max(0, this.spr_player.ex - 1);
		}
		if (Game.getPressed('KeyR')) {
			this.spr_player.ex = Math.min(this.spr_player.maxex, this.spr_player.ex + 1);
		}

		// 玩家處理
		// this.spr_player.handle_gravity(Game.HEIGHT);
		this.spr_player.update();


	}

	draw() {
		// 描繪
		Game.drawImage(this.bg, Game.WIDTH / 2, Game.HEIGHT, 1, { align: 'center-bottom' });
		this.spr_player.draw();

		this.updateUI();
	}
	
	onClick() {
		console.log(this.spr_player, this.spr_oranges);
	}

	onKeyDown(event) {
		event.preventDefault();
		console.log(event);
		if (event.code === 'F1') {
			Game.$scene = new Scene_Battle();
		}
		if (event.code === 'F2') {
			Game.$scene = new Scene_SwapX();
		}
	}
}

