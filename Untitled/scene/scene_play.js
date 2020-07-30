class Sprite_Player extends Sprite {

    constructor() {
        super({ image: R.Image.Male01, srcX: 0, srcY: 0, srcWidth: 32, srcHeight: 32 });
        this.jump_power = 20;
        this.jumping = false;
        this.snd_jump = R.Audio.SE_Jump;
        this.gravity = 1;
    }

    update() {

    }
    jump() {
        if (this.vec_y !== 0 || this.jumping)
            return;
        this.vec_y = this.jump_power;
        this.jumping = true;
        // this.snd_jump.play();
    }
}

class Scene_Play extends Scene {
    // 讀取資源區
    constructor() {
        super();
        this.spr_player = new Sprite_Player();
        console.log(this.spr_player);
    }

    // 畫面更新
    update() {
        // 操控事件
        if (Game.getPressed('ArrowRight')) {
            this.spr_player.x = Math.min(this.spr_player.x + 8, Game.WIDTH - this.spr_player.width);
        }
        else if (Game.getPressed('ArrowLeft')) {
            this.spr_player.x = Math.max(0, this.spr_player.x - 8);
        }
        if (Game.getPressed('ArrowUp')) {
            this.spr_player.jump();
        }

        // 玩家處理
        this.spr_player.handle_gravity(Game.HEIGHT);
        this.spr_player.draw();
    }

    onClick() {
        console.log(this.spr_player, this.spr_oranges);
    }
}

