import * as PIXI from 'pixi.js';

import { GameConsts, $TextStyle } from '../constants';
import { Sprite_HintText } from '../Sprites/Sprite_HintText';
import { MiniGameBase } from './MiniGames/MiniGameBase';
import { Sprite_TimerBomb, } from '../Sprites/Sprite_TimerBomb';
import { Sprite_Lives } from '../Sprites/Sprite_Lives';
import { Sprite_GameOver } from '../Sprites/Sprite_GameOver';
import { Scene } from './scene';
import $R from '../resources';
import MiniGameScenes from './MiniGames';
import $game from '../game';

const ObjectzIndex = {
    // Index越小越上層
    ScoreText: 0,
    HintText: 999,
    MiniGame: 2,
    Lives: 0,
    timerBomb: 3,
    GameOver: 999,
}

const RestTimeBase = 4000;
export class Scene_Ready extends Scene {
    score = 0;

    hintTextSpr: Sprite_HintText;

    scoreTextSpr: PIXI.Text;

    timerBombSpr: Sprite_TimerBomb;

    spriteLives: Sprite_Lives;

    lobbySpr: PIXI.Sprite;

    currentGame: MiniGameBase;
    nextGame: MiniGameBase;

    gameOverSpr: Sprite_GameOver;

    /** 速度，以120為基準速，最高240 */
    BPM: number = 120;

    /** 等級, 0~2, 之後為固定Lv2且加速 */
    level: number = 0;

    //剩餘生命數
    lives: number;
    // 小遊戲剩餘時間
    miniGameTimeLeft: number;
    // 中場休息剩餘時間
    restTimeLeft: number = RestTimeBase;

    gameover: boolean;
    constructor() {
        super();

        // 電梯背景
        this.lobbySpr = PIXI.Sprite.from(PIXI.Texture.from($R.Image.lobby));
        this.lobbySpr.anchor.set(0.5);
        this.lobbySpr.setTransform($game.screen.width / 2, $game.screen.height / 2);
        // this.lobbySpr.pivot.set(0.5);
        this.addChild(this.lobbySpr);
        // 關卡指示文字
        this.hintTextSpr = new Sprite_HintText('拿到衛生紙！')
        this.hintTextSpr.zIndex = ObjectzIndex.HintText;
        // 分數文字
        this.scoreTextSpr = new PIXI.Text(this.score.toString().padStart(3, '0'), $TextStyle.ScoreText);
        this.scoreTextSpr.anchor.set(0.5, 0.5);
        this.scoreTextSpr.x = GameConsts.WIDTH / 2;
        this.scoreTextSpr.y = GameConsts.HEIGHT / 10;
        this.scoreTextSpr.zIndex = ObjectzIndex.ScoreText;
        this.addChild(this.scoreTextSpr);

        // GameOver圖案
        this.gameOverSpr = new Sprite_GameOver();
        this.gameOverSpr.onrestart = this.onRetry.bind(this);
        this.gameOverSpr.visible = false;
        this.addChild(this.gameOverSpr);

        // 剩餘時間圖案
        this.timerBombSpr = new Sprite_TimerBomb();

        this.timerBombSpr.x = 8;
        this.timerBombSpr.y = $game.screen.bottom - this.timerBombSpr.height - 8;
        this.timerBombSpr.zIndex = ObjectzIndex.timerBomb;
        this.addChild(this.timerBombSpr);
        // 剩餘生命圖案
        this.spriteLives = new Sprite_Lives();
        this.spriteLives.pivot.set(0.5, 0);
        this.spriteLives.x = ($game.screen.right - this.spriteLives.width) / 2 + 48;
        this.spriteLives.y = ($game.screen.height) - this.spriteLives.height - 8;
        this.spriteLives.zIndex = ObjectzIndex.Lives;
        this.addChild(this.spriteLives);

        this.sortableChildren = true;


        this.onRetry();
        console.log(this);
    }

    update(delta: number) {
        if (this.gameover) {
            this.gameOverSpr.update(delta);
            return;
        }
        this.hintTextSpr.update(delta);
        // 目前分數文字
        this.scoreTextSpr.text = this.score.toString().padStart(3, '0');

        // 目前剩餘時間
        this.timerBombSpr.timeLength = this.currentGame ? this.currentGame.timeLength : 0;
        this.timerBombSpr.timeLeft = Math.max(0, this.miniGameTimeLeft);

        // 剩餘生命
        this.spriteLives.lives = this.lives;

        this.timerBombSpr.update(delta);
        this.spriteLives.update(delta);

        if (this.currentGame && this.miniGameTimeLeft > 0) {
            this.miniGameTimeLeft -= delta;
            this.currentGame.update(delta);
            // 小遊戲進行中
        } else if (this.restTimeLeft > 0) {
            if (this.currentGame) {
                console.log('leave', this.currentGame);
                this.leaveMiniGame();
            }
            // 剩餘2秒內時準備下一場遊戲
            if (this.restTimeLeft < 2000 && !this.nextGame) {
                this.setNextGame();
                console.log('setNext', this.nextGame);
            }
            this.restTimeLeft -= delta;
            // 中場休息進行中
            // BPM 120 = 60000 / 120 = 500
            this.lobbySpr.scale.set(1 + (this.restTimeLeft % 500) / 500 * 0.05);
        } else {
            // 進入小遊戲
            this.enterNextGame();
            this.spriteLives.animate = false;
            this.restTimeLeft = RestTimeBase;

            console.log('enterNext', this.currentGame, this.miniGameTimeLeft);
        }
    }

    setNextGame() {
        if (this.lives <= 0) {
            this.gameover = true;
            $R.Audio.ME_Gameover.play();
            this.gameOverSpr.visible = true;
            this.gameOverSpr.zIndex = ObjectzIndex.GameOver;
            this.gameOverSpr.gameover(this.score);
            return;
        }
        this.score++;
        this.nextGame = new MiniGameScenes[Math.floor(Math.random() * MiniGameScenes.length)];
        $R.Audio.ME_Midgame.play();
        this.spriteLives.animate = false;
    }

    enterNextGame() {
        this.currentGame = this.nextGame;
        // 設定小遊戲剩餘時間
        this.miniGameTimeLeft = this.nextGame.timeLength;
        // 並顯示在畫面上
        this.currentGame.zIndex = ObjectzIndex.MiniGame;
        this.addChild(this.currentGame);
        this.nextGame = null;
        // 顯示目標文字
        this.hintTextSpr.setText(this.currentGame.targetText);
        this.removeChild(this.hintTextSpr);
        this.addChild(this.hintTextSpr);

        if (this.nextGame?.BGM) {
            this.nextGame?.BGM.play()
        } else {
            $R.Audio.ME_game2.play();
        }
    }

    leaveMiniGame() {
        if (!this.currentGame.Succed) {
            this.lives--;
            $R.Audio.ME_Fail.play()
        } else {
            $R.Audio.ME_Success.play()
        }

        this.spriteLives.animate = true;
        this.removeChild(this.currentGame);
        this.currentGame = null;
    }

    get soundRate() {
        return this.BPM / 120;
    }

    onRetry() {
        this.lives = 4;
        this.level = 1;
        this.BPM = 120;
        this.score = 0;
        this.restTimeLeft = RestTimeBase / 2;
        this.gameover = false;
        this.setNextGame();
    }
}