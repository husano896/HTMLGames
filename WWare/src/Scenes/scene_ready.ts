import * as PIXI from 'pixi.js';

import { GameConsts, $TextStyle } from '../constants';
import { Sprite_HintText } from '../Sprites/Sprite_HintText';
import { MiniGameBase } from './MiniGames/MiniGameBase';
import { Scene } from './scene';
import $R from '../resources';
import MiniGameScenes from './MiniGames';

const ObjectzIndex = {
    // Index越小越上層
    ScoreText: 0,
    HintText: 999,
    MiniGame: 2,
}
export class Scene_Ready extends Scene {
    score = 0;

    hintTextSpr: Sprite_HintText;

    scoreTextSpr: PIXI.Text;

    timerBombTex: PIXI.Texture;
    timerBombSpr: PIXI.Sprite;
    lobbySpr: PIXI.Sprite;

    currentGame: MiniGameBase;
    nextGame: MiniGameBase;

    //剩餘生命數
    lives: number;
    // 小遊戲剩餘時間
    miniGameTimeLeft: number;
    // 中場休息剩餘時間
    restTimeLeft: number = 60;
    constructor() {
        super();

        // 電梯背景
        this.lobbySpr = PIXI.Sprite.from(PIXI.Texture.from($R.Image.lobby));
        this.addChild(this.lobbySpr);
        // 關卡指示文字
        this.hintTextSpr = new Sprite_HintText('拿到衛生紙！')
        this.hintTextSpr.zIndex = ObjectzIndex.HintText;
        // this.addChild(this.hintTextSpr);
        this.scoreTextSpr = new PIXI.Text(this.score.toString().padStart(3, '0'), $TextStyle.ScoreText);
        this.scoreTextSpr.anchor.set(0.5, 0.5);
        this.scoreTextSpr.x = GameConsts.WIDTH / 2;
        this.scoreTextSpr.y = GameConsts.HEIGHT / 10;
        this.scoreTextSpr.zIndex = ObjectzIndex.ScoreText;
        this.addChild(this.scoreTextSpr);
        //
        this.restTimeLeft = 60;
        this.lives = 4;
        // 
        this.setNextGame();
    }

    update(delta: number) {
        this.hintTextSpr.update(delta);
        // 目前分數文字
        this.scoreTextSpr.text = this.score.toString().padStart(3, '0') + `(${this.lives})`;
        if (this.currentGame && this.miniGameTimeLeft > 0) {
            this.miniGameTimeLeft -= delta;

            this.currentGame.update(delta);
            // 小遊戲進行中
        } else if (this.restTimeLeft > 0) {
            if (this.currentGame) {
                console.log('leave', this.currentGame);
                this.leaveMiniGame();
            }
            // 剩餘3秒內時準備下一場遊戲
            if (this.restTimeLeft <= 18 && !this.nextGame) {
                this.setNextGame();
                console.log('setNext', this.nextGame);
            }
            this.restTimeLeft -= delta;
            // 中場休息進行中
        } else {
            // 進入小遊戲
            this.enterNextGame();
            this.restTimeLeft = 60;

            console.log('enterNext', this.currentGame, this.miniGameTimeLeft);
        }
    }

    setNextGame() {
        this.score++;
        this.nextGame = new MiniGameScenes[Math.floor(Math.random() * MiniGameScenes.length)];
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
    }

    leaveMiniGame() {
        if (this.currentGame.Succed) {
        } else {
            this.lives--;
        }
        this.removeChild(this.currentGame);
        this.currentGame = null;
    }
}