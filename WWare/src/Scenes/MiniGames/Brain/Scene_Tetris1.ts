import { EClearMethod, MiniGameBase } from '../MiniGameBase';
import { Graphics } from 'pixi.js';
import { GameConsts } from '@/constants';

/**
 * 俄羅斯方塊PC挑戰
 * Lv1: 兩方塊
 * Lv2: 三方塊
 * Lv3: 四方塊且須旋轉
 */
export class Scene_Tetris1 extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 4000;
    // 目標文字
    targetText = '';

    constructor() {
        super();
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 1;
        this.addChild(Bg);
        this.interactive = true;
    }

    update(delta: number): void {
        super.update(delta);
    }

    onMouseDown() {
    }
}