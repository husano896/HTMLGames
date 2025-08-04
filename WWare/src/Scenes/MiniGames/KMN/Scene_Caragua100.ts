import { EClearMethod, MiniGameBase } from '../MiniGameBase';
import { Graphics, Sprite, Texture, Text } from 'pixi.js';
import { $TextStyle, GameConsts } from '@/constants';
import { Howl } from 'howler';
import $R from '@/resources';
import $game from '@/game';

/** 小卡-100 */
export class Scene_Caragua100 extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 4000;
    // 目標文字
    targetText = '小卡+100！';
    // BGM
    BGM: Howl = $R.Audio.ME_game5;

    sprTop: Sprite;
    sprBottom: Sprite;
    sprM100: Sprite;

    // 小卡伸長度
    length: number = 1;

    pressed: boolean;

    bottom: number;

    
    constructor() {
        super();
        // 背景
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);

        // 設定小卡
        this.sprTop = Sprite.from(Texture.from($R.Image.CaraguaTop));
        this.sprBottom = Sprite.from(Texture.from($R.Image.CaraguaBottom));
        this.sprM100 = Sprite.from(Texture.from($R.Image.CaraguaM100));
        this.sprTop.anchor.set(0.5, 1);
        this.sprBottom.anchor.set(0.5, 1);
        this.sprM100.anchor.set(0.5, 1);

        this.addChild(this.sprTop, this.sprBottom, this.sprM100);

        // 顯示的最下範圍
        this.bottom = $game.screen.bottom;
        this.sprM100.x = $game.screen.width / 2;
        this.sprM100.y = this.bottom;
        this.sprBottom.x = $game.screen.width / 2;
        this.sprBottom.y = this.bottom;
        this.sprTop.x = $game.screen.width / 2;
        this.sprTop.y = this.sprBottom.y - this.sprBottom.height;
        this.sprM100.visible = false;

        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {
        super.update(delta);
        // 過關
        if (this.clearFlag) {
            this.sprBottom.scale.y = 2;
            this.sprTop.y = this.sprBottom.y - this.sprBottom.height;
            return;
        }
        if (this.pressed) {
            this.sprBottom.visible = false;
            this.sprTop.visible = false;
            this.sprM100.visible = true;
            return;
        }

        this.length = Math.sin(Math.PI * (this.frame % 1000) / 1000);
        this.sprBottom.scale.y = 1 + this.length * 1;
        this.sprTop.y = this.sprBottom.y - this.sprBottom.height;
    }

    onMouseDown() {
        if (this.pressed) {
            return;
        }
        this.pressed = true;
        // 伸的夠長即過關
        this.clearFlag = this.sprBottom.scale.y > 1.75;
        $R.Audio.SE_Decision39.play();
        if (this.clearFlag) {
            const text = new Text('+100', $TextStyle.GameText);
            text.anchor.set(0.5);
            this.addChild(text)
            text.y = 128;
            text.x = $game.screen.width / 2;
        }
    }
}