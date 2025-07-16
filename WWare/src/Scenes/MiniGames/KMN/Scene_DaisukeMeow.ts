import $R from '@/resources';
import { EClearMethod, MiniGameBase } from '../MiniGameBase';
import * as PIXI from 'pixi.js';
import { Graphics, VideoResource, InteractionEvent } from 'pixi.js';
import { GameConsts } from '@/constants';
import Game from '@/game';
import { AnimatedGIF } from '@pixi/gif';
import { Howl } from 'howler';
import { Effect_Flash } from '@/Effects/Effect_Flash';

export class Scene_DaisukeMeow extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 4000;
    // 目標文字
    targetText = '膜拜大助貓貓！';
    // BGM
    BGM: Howl = $R.Audio.ME_game1;
    sprVideo: AnimatedGIF;
    // 改判定的時間點
    reverseTime = 50;
    reverse: boolean;

    debugText: PIXI.Text = new PIXI.Text('');

    lastPointerY: number = null;
    constructor() {
        super();
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.5;
        this.addChild(Bg);

        this.sprVideo = Game.loader.resources.daisukeMeowMeow.animation;
        // this.sprVideo.play();
        this.sprVideo.stop();

        this.sprVideo.anchor.set(0.5, 0.5);

        this.sprVideo.x = GameConsts.WIDTH / 2;
        this.sprVideo.y = GameConsts.HEIGHT / 2;
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
        this.addChild(this.sprVideo);
        this.addChild(this.debugText);
    }

    update(delta: number): void {
        super.update(delta);
    }

    onMouseDown($event: InteractionEvent) {
        this.lastPointerY = ($event.data.originalEvent as PointerEvent).clientY;
    }
    onMouseMove($event: InteractionEvent) {
        console.log($event)
        const newY = ($event.data.originalEvent as PointerEvent).layerY
        if (this.lastPointerY !== null) {
            const movementY = this.lastPointerY - newY;

            if (Math.abs(movementY) < 1) {
                return;
            }
            this.debugText.text = `rev, ${this.reverse}, ${movementY}`;
            if ((!this.reverse && movementY > 0) || (this.reverse && movementY < 0)) {
                this.sprVideo.currentFrame = Math.round(
                    Math.max(
                        0, Math.min(this.sprVideo.totalFrames - 1,
                            this.sprVideo.currentFrame + movementY)
                    )
                );
                // console.log(movementY, this.sprVideo.currentFrame, this.sprVideo.totalFrames)
                if (this.sprVideo.currentFrame <= 3 && this.reverse) {
                    // 已經做完向下又向上
                    this.reverse = false;
                    this.sprVideo.currentFrame = 0;
                    // 還沒過關才放音效 當然你可以繼續大助貓貓
                    if (!this.clearFlag) {
                        $R.Audio.Success.play();
                        this.clearFlag = true;
                        this.addChild(new Effect_Flash());
                    }
                } else if (this.sprVideo.currentFrame > this.reverseTime) {
                    this.reverse = true;
                }
            }
        }
        this.lastPointerY = newY;
    }
}