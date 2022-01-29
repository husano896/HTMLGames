import $R from '../../resources';
import { Sprite_Eviat } from './../../Sprites/Sprite_Eviat';
import { EClearMethod, MiniGameBase } from './MiniGameBase';
import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { GameConsts } from '../../constants';
export class Scene_RotateEviat extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 300;
    // 目標文字
    targetText = '對準夢夢的臉！';

    sprEviat: Sprite_Eviat;

    constructor() {
        super();
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.5;
        this.addChild(Bg);

        this.sprEviat = new Sprite_Eviat();

        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
        this.addChild(this.sprEviat);
    }

    update(delta: number): void {
        this.sprEviat.update(delta);
    }

    onMouseDown() {
        // 如果夢夢還在旋轉
        if (!this.sprEviat.locked) {
            // 鎖定夢夢的旋轉
            this.sprEviat.lock();
            // 成功條件取決於夢夢的臉是否對準
            this.clearFlag = this.sprEviat.Succed;
            if (this.clearFlag) {
                $R.Audio.Success.play();
            } else {
                $R.Audio.Fail.play();
            }
        }
    }
}