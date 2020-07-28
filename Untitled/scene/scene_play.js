class Sprite_Player extends Sprite {
    jump_power = 20;
    jumping = false;
    snd_jump = new Audio().setSrc('audio/boop.mp3');
    gravity = 1
    image = new Image().setSrc('img/a.png');
    constructor() {
        super();
        
    }

    jump() {
        if (this.vec_y !== 0 || this.jumping)
            return;
        this.vec_y = this.jump_power;
        this.jumping = true;
        this.snd_jump.play();
    }
}

class Sprite_Orange extends Sprite {
    life = 1.0;
    gravity = 0.25
    image = new Image().setSrc('img/orange0.png');
    constructor() {
        // 初始化時設定位置
        super({x: Math.random() * (Game.WIDTH - 60) });
    }

    draw() {
        if (this.life <= 0.0) {
            return;
        }
        this.transpancy = this.life;
        super.draw();
    }
    handle_gravity(groundY) {
        if (!this.life) {
            return;
        }
        // 掉到地上後逐漸消失的橘
        if (super.handle_gravity(groundY)) {
            this.life -= 0.05;
        }
    }
}

// 壞橘
class Sprite_Orange2 extends Sprite_Orange {
    image = new Image().setSrc('img/orange1.png');
}

class Scene_Play extends Scene {
    time = 0
    score = 0

    gameover = false

    // 音效圖片加載
    snd_score = new Audio().setSrc('../shared/Audio/SE/decision7.mp3');
    snd_scoreDec = new Audio().setSrc('../shared/Audio/SE/decision15.mp3');
    snd_timeUp = new Audio().setSrc('audio/timeUp.mp3');
    spr_player;
    spr_oranges = [];
    
    // 讀取資源區
    constructor() {
        super();
        this.snd_score.load();
        this.snd_scoreDec.load();
        this.snd_timeUp.load();

        // 素材讀取完後才開始
        Promise.all([this.snd_score, this.snd_scoreDec, this.snd_timeUp].map(snd =>
            new Promise((resolve, reject) => {
                snd.onloadeddata = resolve
                snd.onerror = reject
            })
        )).then(() => {
            this.ready = true;
        });
    }

    // 開始遊戲
    startGame() {
        this.spr_oranges = [];
        this.spr_player = new Sprite_Player();
        this.time = 1800;
        this.gameover = false;
        this.score = 0;
    }

    // 畫面更新
    update() {
        if (!this.ready) {
            return;
        }
        // 遊戲尚未開始時
        if (!this.spr_player) {
            Game.drawText(`Catch`, Game.WIDTH / 2, 120,
                { size: 24, color: 'rgb(255,255,255)', font: 'PressStart2P', textAlign: 'center' });
            Game.drawText(`OrangeJam`, Game.WIDTH / 2, 120 + 48,
                { size: 48, color: 'rgb(255,127,39)', font: 'PressStart2P', textAlign: 'center' });
            Game.drawText(`Press Space to start`, Game.WIDTH / 2, Game.HEIGHT - 72 - 36,
                { size: 24, color: 'rgb(255,255,0)', font: 'PressStart2P', textAlign: 'center' });
            if (Game.getPressed('Space')) {
                this.startGame();
            }
            return;
        }
        // 重新開始
        if (Game.getPressed('KeyR')) {
            this.startGame();
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

            // 分數
            Game.drawText(this.score, Game.WIDTH / 2, Game.HEIGHT / 2 - 36,
                { size: 72, color: 'rgba(255,255,255,0.25)', font: 'PressStart2P', textAlign: 'center' });
        }

        // 已經遊戲結束時
        if (this.gameover) {
            Game.drawText(`SCORE`, Game.WIDTH / 2, Game.HEIGHT / 2 - 36 - 108,
                { size: 48, color: 'rgb(255,255,255)', font: 'PressStart2P', textAlign: 'center' });
            Game.drawText(`${this.score}`, Game.WIDTH / 2, Game.HEIGHT / 2 - 36,
                { size: 72, color: 'rgb(255,255,0)', font: 'PressStart2P', textAlign: 'center' });
            Game.drawText(`Press R to Restart`, Game.WIDTH / 2, Game.HEIGHT - 72 - 36,
                { size: 24, color: 'rgb(255,255,255)', font: 'PressStart2P', textAlign: 'center' });
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
            // 時間到
            this.gameover = true;
            this.snd_timeUp.play();
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

        // 玩家處理
        this.spr_player.handle_gravity(Game.HEIGHT);
        this.spr_player.draw();

        // 繪製
        for (var i = 0; i < this.spr_oranges.length; i++) {
            const o = this.spr_oranges[i];
            o.handle_gravity(Game.HEIGHT);
            o.draw();
            // 如果把橘橘放到壞掉?
            if (o.life <= 0) {
                // 漏接壞橘橘
                if (o instanceof Sprite_Orange2) {
                    this.score++;
                    this.snd_score.play();
                } else {
                    this.score--;
                    this.snd_scoreDec.play();
                }
                delete this.spr_oranges[i];
            } else if (o.checkCollide(this.spr_player)) {
                // 接到壞橘橘
                if (o instanceof Sprite_Orange2) {
                    this.score--;
                    this.snd_scoreDec.play();
                } else {
                    this.score++;
                    this.snd_score.play();
                }
                delete this.spr_oranges[i];
            }
        }
        // 去除過期橘橘
        this.spr_oranges = this.spr_oranges.filter(o => !!o);

    }

    onClick() {
        console.log(this.spr_player, this.spr_oranges);
    }
}

