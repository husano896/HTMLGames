class Sprite_Player extends Sprite {
    jump_power = 20;
    jumping = false;
    constructor() {
        const i = new Image();
        i.src = 'img/a.png';
        super({ image: i });
    }

    jump() {
        if (this.vec_y !== 0 || this.jumping)
            return;

        this.vec_y = this.jump_power;
        this.jumping = true;
    }

}

class Sprite_Orange extends Sprite {
    life = 1.0;
    constructor(i = null) {
        if (!i) {
            i = new Image();
            i.src = 'img/orange0.png';
        }
        super({ image: i, x: Math.random() * (Game.WIDTH - 60) });
    }

    draw = function () {
        if (this.life <= 0.0) {
            return;
        }
        Game.drawImage(this.image, this.x, this.y, this.life);
    }
    handle_gravity(g, groundY) {
        if (!this.life) {
            return;
        }
        if (super.handle_gravity(0.25, groundY)) {
            this.life -= 0.05;
        }
    }
}

class Sprite_Orange2 extends Sprite_Orange {
    constructor() {
        const i = new Image();
        i.src = 'img/orange1.png';
        super(i);
    }
}

class Scene_Play extends Scene {
    time = 0
    score = 0
    gravity = 1
    gameover = false

    // 音效圖片加載
    snd_score;
    spr_player;
    spr_oranges = [];
    // 讀取資源區
    constructor() {
        super();
        this.snd_score = new Audio();
        this.snd_score.onloadeddata = function () {
            this.ready = true;
            this.startGame();
        }.bind(this);
        this.snd_score.src = 'audio/boop.mp3'
        this.snd_score.load();

        this.spr_player = new Sprite_Player();
    }

    // 開始遊戲
    startGame = function () {
        this.time = 1800;
        this.gameover = false;
    }

    // 畫面更新
    update = function () {
        if (!this.ready) {
            return;
        }
        // 時間
        if (this.gameover) {
            Game.drawText('--', Game.WIDTH / 2, 8,
                { size: 32, color: 'rgba(255,255,255,1)', font: 'PressStart2P', textAlign: 'center' });
        } else {
            const timeLeft = Math.floor(this.time / 60);
            const color = Math.round(255 * this.time / 600);
            Game.drawText(timeLeft, Game.WIDTH / 2, 8,
                { size: 32, color: `rgba(255,${color},${color},1)`, font: 'PressStart2P', textAlign: 'center' });
        }

        // 分數
        Game.drawText(this.score, Game.WIDTH / 2, Game.HEIGHT / 2 - 36,
            { size: 72, color: 'rgba(255,255,255,0.25)', font: 'PressStart2P', textAlign: 'center' });

        if (this.gameover) {
            return;
        }

        // 時間計算
        if (this.time && !this.gameover) {
            this.time--;
            // 加入新橘橘
            if (this.time % 60 === 0 || (this.time < 600 && this.time % 30 === 0)) {
                var newOrange = Math.random() > 0.5 ? new Sprite_Orange2() : new Sprite_Orange();
                this.spr_oranges.push(newOrange);
            }
        } else {
            this.gameover = true;
            return;
        }

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
        else if (Game.getPressed('ArrowDown')) {
            // this.spr_player.y = Math.min(this.spr_player.y +4, Game.HEIGHT - this.spr_player.height);
        }
        this.spr_player.handle_gravity(this.gravity, Game.HEIGHT);
        // 繪製
        for (var i=0;i<this.spr_oranges.length;i++) {
            const o = this.spr_oranges[i];
            o.handle_gravity(this.gravity / 2, Game.HEIGHT);
            o.draw();
            // 如果放到時間到?
            if (o.life <= 0) {
                // 漏接壞橘橘
                if (o instanceof Sprite_Orange2) {
                    this.score++;
                } else {
                    this.score--;
                }
                delete this.spr_oranges[i];
            }/* else if (o.checkCollide(this.spr_player, )){

            }*/
            
        }
        
        this.spr_oranges = this.spr_oranges.filter(o => !!o);
        // 分數判定
        this.spr_player.draw();
    }

    onClick = function (event) {
        console.log(this, event);
    }
}

