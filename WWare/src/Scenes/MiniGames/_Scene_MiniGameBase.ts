import { EClearMethod, MiniGameBase } from './MiniGameBase';
import { Graphics } from 'pixi.js';
import { GameConsts } from '../../constants';

export class Scene_MiniGameBase extends MiniGameBase {
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
        Bg.alpha = 0.9;
        this.addChild(Bg);

        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {
    }

    onMouseDown() {
    }
}