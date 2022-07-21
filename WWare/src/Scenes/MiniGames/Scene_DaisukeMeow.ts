import $R from '../../resources';
import { EClearMethod, MiniGameBase } from './MiniGameBase';
import * as PIXI from 'pixi.js';
import { Graphics, VideoResource, InteractionEvent } from 'pixi.js';
import { GameConsts } from '../../constants';
import Game from '../../game';
import { AnimatedGIF } from '@pixi/gif';
export class Scene_DaisukeMeow extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 600;
    // 目標文字
    targetText = '大助貓貓！';

    sprVideo: AnimatedGIF;

    // 改判定的時間點
    reverseTime = 50;
    reverse: boolean;

    debugText: PIXI.Text = new PIXI.Text('');
    constructor() {
        super();
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.5;
        this.addChild(Bg);

        this.sprVideo = Game.loader.resources.daisukeMeowMeow.animation;
        this.sprVideo.stop();

        this.sprVideo.anchor.set(0.5, 0.5);

        this.sprVideo.x = GameConsts.WIDTH / 2;
        this.sprVideo.y = GameConsts.HEIGHT / 2;
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
        this.addChild(this.sprVideo);
        this.addChild(this.debugText);
    }

    update(delta: number): void {
    }

    onMouseMove($event: InteractionEvent) {
        const movementY = ($event.data.originalEvent as PointerEvent).movementY;
        this.debugText.text = `rev, ${this.reverse}, ${movementY}`;
        if ((!this.reverse && movementY > 0) || (this.reverse && movementY < 0)) {
            this.sprVideo.currentFrame = Math.max(0, Math.min(this.sprVideo.totalFrames - 1,
                this.sprVideo.currentFrame + 1));

            if (this.sprVideo.currentFrame >= this.sprVideo.totalFrames - 2 && this.reverse) {
                // 已經做完向下又向上
                this.reverse = false;
                this.sprVideo.currentFrame = 0;
                // 還沒過關才放音效 當然你可以繼續大助貓貓
                if (!this.clearFlag) {
                    $R.Audio.Success.play();
                    this.clearFlag = true;
                }
            } else if (this.sprVideo.currentFrame > this.reverseTime) {
                this.reverse = true;
            }
        }
    }
}