import { Graphics, Container, Text } from "pixi.js";
import { $TextStyle, GameConsts } from '@/constants';
import $game from "@/game";
import $R from "@/resources";
export class Sprite_GameOver extends Container {

    /** 給外部帶入Function用，按下重新開始且動畫完後重新開始遊戲的callback */
    onrestart: () => void;

    /** 背景 */
    private bg: Graphics;

    /** 遊戲結束文字 */
    private gameOverText: Text;

    /** 重試文字 */
    private retryText: Container;

    /** 分數文字 */
    private scoreText: Text;
    /** 目前動畫演到哪 */
    private frame: number = 0;

    private score: number = 0;
    retrying: boolean;
    constructor() {
        super();
        //#region 背景繪製
        this.bg = new Graphics();
        this.bg.beginFill(0x0);
        this.bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        this.bg.endFill();
        this.bg.alpha = 0.0;
        this.addChild(this.bg);
        //#endregion

        //#region GameOver文字繪製
        this.gameOverText = new Text('GAME OVER', $TextStyle.GameOverText);
        this.gameOverText.alpha = 0;
        this.gameOverText.anchor.set(0.5);
        this.gameOverText.x = $game.screen.width / 2;
        this.addChild(this.gameOverText);
        //#endregion

        //#region 分數文字繪製
        this.scoreText = new Text('', $TextStyle.ScoreResultText);
        this.scoreText.anchor.set(0.5);
        this.scoreText.x = $game.screen.width / 2;
        this.scoreText.y = $game.screen.height / 2;
        this.scoreText.visible = false;
        this.addChild(this.scoreText);
        //#endregion

        //#region 重新開始按鈕
        this.retryText = new Text('RETRY', $TextStyle.GameText);
        this.retryText.pivot.set(0.5);
        this.retryText.x = $game.screen.width / 2 - this.retryText.width / 2;
        this.retryText.y = $game.screen.height - this.retryText.height - 64;
        this.retryText.visible = false;
        this.retryText.on('pointerdown', this.onRetryClick.bind(this))
        this.addChild(this.retryText);
        //#endregion
    }

    gameover(score: number) {
        this.frame = 0;
        this.score = score;
        this.visible = true;
    }

    update(delta: number) {
        this.frame += delta;
        if (this.retrying) {
            if (this.frame < 2000) {
                this.bg.alpha = 1 - this.frame / 2000;
            } else {
                this.bg.alpha = 0;
                this.onrestart();
                this.retrying = false;
                this.visible = false;
            }
            return;
        }
        if (this.frame < 1000) {
            // 0秒~1秒：GameOver文字落下
            this.gameOverText.alpha = Math.min((this.frame / 750), 1);
            this.gameOverText.y = this.frame / 1000 * $game.screen.height / 2;
        }
        else if (this.frame < 4000) {
            // 1秒~4秒：GameOver文字晃動
            this.gameOverText.alpha = 1;
            this.gameOverText.x = $game.screen.width / 2 + Math.sin(Math.PI / 2 * this.frame / 125) * 16;
        }
        else if (this.frame < 5000) {
            // 4秒~5秒：GameOver文字淡出+黑背景淡入
            this.gameOverText.x = $game.screen.width / 2;
            this.gameOverText.alpha = Math.max(0, 1 - (this.frame - 4000) / 1000);
            this.bg.alpha = Math.min(0.9, (this.frame - 4000) / 1000);
        }
        else {
            // 5秒：分數與重新按鈕顯示
            this.bg.alpha = 0.9;
            if (!$R.Audio.ME_result.playing()) {
                $R.Audio.ME_result.play();
                $R.Audio.ME_result.loop(true);
                this.retryText.visible = true;
                this.retryText.interactive = true;
                this.scoreText.text = this.score.toString().padStart(3, '0');
                this.scoreText.visible = true;
            }

            this.scoreText.x = $game.screen.width / 2 + Math.sin(Math.PI / 2 * this.frame / 125) * 8;
            this.scoreText.y = $game.screen.height / 2 + Math.sin(Math.PI / 2 * this.frame / 250) * 4;
        }
    }
    onRetryClick() {
        this.retrying = true;
        this.retryText.visible = false;
        this.retryText.interactive = false;
        this.scoreText.visible = false;
        this.frame = 0;
        $R.Audio.ME_result.stop();
        $R.Audio.ME_retry.play();
    }
}