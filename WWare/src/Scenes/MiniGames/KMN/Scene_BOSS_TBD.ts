import { EClearMethod, MiniGameBase } from '../MiniGameBase';
import { Graphics, Sprite, Texture, Text, InteractionEvent, Container, } from 'pixi.js';
import { $TextStyle, GameConsts } from '@/constants';
import { Howl } from 'howler';
import $R from '@/resources';

/** 
 * 全遊戲中第一個BOSS關！！！ 
 * 你遊果然還是變音遊了嗎
*/
export class Scene_BOSS_TBD extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.BOSS;

    // 小遊戲時間長度
    timeLength = 16000;

    // 目標文字
    targetText = '抵達終點！';

    // BGM
    BGM: Howl = $R.Audio.ME_game5;

    constructor() {
        super();
        // 背景
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);

        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {
        if (this.clearFlag) {
            return;
        }

        const MusicProgress = this.BGM.seek();
        super.update(delta);

    }

    onMouseMove(event: InteractionEvent) {
        if (this.clearFlag) {
            return;
        }
        const x = event.data.global.x;

        // 不能跑到畫面外
    }

    /**
     * 第一階段：打節拍（單點）
     */
    phase1() {

    }

    /** 
     * 第二階段：滑（拍子上時手在始點即可）
     */
    phase2() {

    }

    /**
     * 第三階段：點滑（始點要對）
     */
    phase3() {

    }

    /**
     * 最終階段：蓄力！（快速連打）
     */
    phase4() {

    }
}