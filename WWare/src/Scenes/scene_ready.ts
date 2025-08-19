import * as PIXI from 'pixi.js';
import { GameConsts, $TextStyle } from '../constants';
import { EClearMethod, MiniGameBase } from './MiniGames/MiniGameBase';
import { Sprite_Lives, Sprite_GameOver, Sprite_TimerBomb, Sprite_HintText } from '@/Sprites/UI';
import { Scene } from './scene';
import $R from '../resources';
import MiniGameScenes from './MiniGames';
import $game from '../game';
import _ from 'lodash';

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

    gameOverSpr: Sprite_GameOver;

    /** 暫停按鈕 */
    pauseSpr: PIXI.Sprite;

    /** 暫停中 */
    pause: boolean;

    /** 目前遊戲instance */
    currentGame: MiniGameBase;

    /** 下個遊戲instance */
    nextGame: MiniGameBase;

    nextGameIndexs: Array<number>;

    /** 速度，以120為基準速，最高應為240 */
    BPM: number = 120;

    /** 等級, 0~2, 之後為固定Lv2且加速 */
    level: number = 0;

    //剩餘生命數
    lives: number;
    // 小遊戲剩餘時間
    miniGameTimeLeft: number;
    // 中場休息剩餘時間
    restTimeLeft: number = RestTimeBase;
    /** 死去 */
    gameover: boolean;

    constructor() {
        super();

        // 電梯背景
        this.lobbySpr = PIXI.Sprite.from(PIXI.Texture.from($R.Image.lobby));
        this.lobbySpr.anchor.set(0.5);
        this.lobbySpr.setTransform($game.screen.width / 2, $game.screen.height / 2);
        this.addChild(this.lobbySpr);

        // 關卡指示文字
        this.hintTextSpr = new Sprite_HintText('')
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

        // 暫停按鈕
        this.pauseSpr = PIXI.Sprite.from(PIXI.Texture.from($R.Image.iconPause))
        this.pauseSpr.interactive = true;
        this.pauseSpr.on('pointerdown', this.onPause.bind(this))
        this.pauseSpr.zIndex = ObjectzIndex.MiniGame + 1;
        this.addChild(this.pauseSpr);

        //
        this.sortableChildren = true;

        // 各個參數初始化用重新開始推（？）
        this.onRetry();
        console.log(this);
    }

    update(delta: number) {
        // 死了
        if (this.gameover) {
            this.gameOverSpr.update(delta);
            return;
        }

        // 出外跳回來太久不算
        if (delta > 1000) {
            if (!this.pause) {
                this.onPause();
            }
            return;
        }

        // 暫停中
        if (this.pause) {
            return;
        }

        delta *= this.speed;

        this.hintTextSpr.update(delta);
        // 目前分數文字
        this.scoreTextSpr.text = this.score.toString().padStart(3, '0');

        // 目前剩餘時間
        this.timerBombSpr.timeLength = this.currentGame ? this.currentGame.timeLength : 0;
        this.timerBombSpr.timeLeft = Math.max(0, this.miniGameTimeLeft);
        this.timerBombSpr.update(delta);

        // 剩餘生命
        this.spriteLives.lives = this.lives;
        this.spriteLives.update(delta);

        if (this.currentGame) {
            if (this.miniGameTimeLeft <= 0 ||
                (this.currentGame.clearMethod == EClearMethod.BOSS && this.currentGame.clearFlag !== undefined)) {
                console.log('leave', this.currentGame);
                this.leaveMiniGame();
                return;
            }
            // 進入小遊戲的暖身時間
            if (this.restTimeLeft > 0) {
                this.restTimeLeft -= delta;
                this.currentGame.scale.set(Math.min(1, 1 - this.restTimeLeft ** 2 / 250000));
                this.currentGame.x = GameConsts.WIDTH / 2 - this.currentGame.width / 2;
                this.currentGame.y = GameConsts.HEIGHT / 2 - this.currentGame.height / 2;
                return;
            } else {
                this.currentGame.scale.set(1);
                this.currentGame.x = 0;
                this.currentGame.y = 0;
            }

            this.currentGame.interactive = true;
            // BGM 播放
            const bgm = this.currentGame.BGM || $R.Audio.ME_game2;
            bgm.rate(this.speed);
            if (!bgm.playing()) {
                bgm.play()
            }

            // 若為BOSS戰，不走剩餘時間
            if ((this.currentGame.clearMethod !== EClearMethod.BOSS)) {
                this.miniGameTimeLeft -= delta;
            }
            this.currentGame.update(delta);
            // 小遊戲進行中

        } else if (this.restTimeLeft > 0) {
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
            this.restTimeLeft = 500; // 等一個BPM = 120 * 八分拍的長度

            console.log('enterNext', this.currentGame, this.miniGameTimeLeft);
        }
    }

    setNextGame() {
        if (this.lives <= 0) {
            this.gameover = true;
            this.gameOverSpr.visible = true;
            this.gameOverSpr.zIndex = ObjectzIndex.GameOver;
            this.gameOverSpr.gameover(this.score);
            this.pauseSpr.alpha = 0;
            this.pauseSpr.interactive = false;
            $R.Audio.ME_Gameover.play();
            return;
        }
        if (!this.nextGameIndexs?.length) {
            this.nextGameIndexs = _.shuffle(_.range(MiniGameScenes.length));
        }
        this.score++;
        this.BPM = Math.min(240, 120 + (Math.floor((this.score - 1) / 2)) * 8);
        const nextGameIndex: number = this.nextGameIndexs.shift();
        // 等級 ＝ 周目數(分數 / 遊戲總數), 最高lv = 2 (1~3)
        this.level = Math.min(2, Math.floor(this.score / MiniGameScenes.length));
// (this.score - 1) % 3 
        this.nextGame = new MiniGameScenes[nextGameIndex]({ level: this.level, speed: this.speed });

        this.nextGame.interactive = false;
        $R.Audio.ME_Midgame.rate(this.speed);
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

        console.log(this.nextGame);

    }

    leaveMiniGame() {
        // BGM 播放
        const bgm = this.currentGame.BGM || $R.Audio.ME_game2;
        bgm.stop();

        // SE播放
        const resultSE = this.currentGame.Succed ? $R.Audio.ME_Success : $R.Audio.ME_Fail;
        if (!this.currentGame.Succed) {
            this.lives--;
        }
        resultSE.rate(this.speed);
        resultSE.play()

        this.spriteLives.animate = true;
        this.restTimeLeft = RestTimeBase;
        this.removeChild(this.currentGame);
        this.currentGame.destroy();
        this.currentGame = null;
    }

    get speed() {
        return this.BPM / 120;
    }

    onRetry() {
        this.lives = 4;
        this.level = 0;
        this.BPM = 120;
        this.score = 0;
        this.restTimeLeft = RestTimeBase / 2;
        this.gameover = false;

        this.pauseSpr.interactive = true;
        this.pauseSpr.alpha = 1;
        this.setNextGame();
    }

    onPause() {
        if (this.pause || this.gameover) {
            return;
        }
        this.pause = true;
        const fullScreenMask = new PIXI.Container();

        //#region 背景
        const bg = new PIXI.Graphics();
        bg.beginFill(0x000000)
        bg.drawRect(0, 0, $game.screen.width, $game.screen.height);
        bg.endFill();
        bg.alpha = 0.95;
        //#endregion

        //#region 文字
        const textTitle = new PIXI.Text('PAUSE', $TextStyle.PauseTitleText);
        textTitle.anchor.set(0.5);
        textTitle.x = $game.screen.width / 2;
        textTitle.y = $game.screen.height / 2;
        //#endregion

        //#region 元素加入與事件綁定
        fullScreenMask.addChild(bg);
        fullScreenMask.addChild(textTitle);
        fullScreenMask.zIndex = ObjectzIndex.MiniGame + 1;
        fullScreenMask.interactive = true;
        fullScreenMask.on('pointerdown', () => {
            this.pause = false;
            fullScreenMask.destroy();
        })
        //#endregion

        this.addChild(fullScreenMask);
    }
}