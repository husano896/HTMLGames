import { EClearMethod, MiniGameBase } from '../MiniGameBase';
import { Graphics, Sprite, Texture, Text, Container } from 'pixi.js';
import { $TextStyle, GameConsts } from '@/constants';
import { Howl } from 'howler';
import $R from '@/resources';
import $game from '@/game';

/** 小卡-100 */
export class Scene_KC extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 8000;
    // 目標文字
    targetText = '面向同一邊！';
    // BGM
    BGM: Howl = $R.Audio.ME_game5;

    KCcontainer: Container;

    KCVictoryContainer: Container;

    kcL: Sprite;
    kcR: Sprite;
    constructor() {
        super();
        // 背景
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);

        this.KCcontainer = new Container();
        // 設定KC
        for (let i = 0; i < 5; i++) {
            const newKC = new Sprite(Texture.from($R.Image.KC1));
            newKC.anchor.set(0.5);
            newKC.interactive = true;
            newKC.on('pointerdown', () => this.onMouseDown(i))
            newKC.x = 144 * i + 80;
            newKC.y = GameConsts.HEIGHT / 2 + 128;
            this.KCcontainer.addChild(newKC)
        }
        // 若KC一直骰到同一邊，重骰
        while (this.KCcontainer.children.every(c => c.scale.x === this.KCcontainer.children[0].scale.x)) {
            for (let i = 0; i < 5; i++) {
                this.KCcontainer.children[i].scale.x = Math.random() > 0.5 ? 1 : -1;
            }
        }
        this.KCcontainer.pivot.set(0.5);
        this.KCcontainer.x = GameConsts.WIDTH / 2 - this.KCcontainer.width / 2;
        // 過關KC
        this.addChild(this.KCcontainer);

        this.KCVictoryContainer = new Container();
        this.KCVictoryContainer.visible = false;
        this.KCVictoryContainer.pivot.set(0.5)
        this.kcL = new Sprite(Texture.from($R.Image.KC2));
        this.kcR = new Sprite(Texture.from($R.Image.KC2));
        this.kcL.anchor.set(0.5);
        this.kcR.anchor.set(0.5);
        this.kcL.angle = 45;
        this.kcR.angle = -45;

        this.kcL.x = 144;
        this.kcL.y = 144;
        this.kcR.x = GameConsts.WIDTH - 144;
        this.kcR.y = 144;
        this.kcL.scale.x = -1;
        this.KCVictoryContainer.addChild(this.kcL, this.kcR);
        this.addChild(this.KCVictoryContainer);
        //
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {
        super.update(delta);
        // 過關
        if (this.clearFlag) {
            for (let i = 0; i < 5; i++) {
                this.KCcontainer.children[i].y = GameConsts.HEIGHT / 2 + 128 + Math.sin(Math.PI / 2 * (this.frame + i * 200) / 250) * 64;
            }
            this.KCVictoryContainer.visible = true;
            this.kcL.scale.x = -(1 + 0.5 * (this.frame % 500 / 500));
            this.kcL.scale.y = 1 + 0.5 * (this.frame % 500 / 500);
            this.kcR.scale.x = 1 + 0.5 * (this.frame % 500 / 500);
            this.kcR.scale.y = 1 + 0.5 * (this.frame % 500 / 500);
        }
    }

    onMouseDown(index: number) {

        if (this.clearFlag) {
            return;
        }
        $R.Audio.SE_Decision39.play();
        this.KCcontainer.children[index].scale.x *= -1;

        if (this.KCcontainer.children.every(c => c.scale.x === this.KCcontainer.children[0].scale.x)) {
            this.clearFlag = true;
            $R.Audio.Correct.play();
        }
    }
}