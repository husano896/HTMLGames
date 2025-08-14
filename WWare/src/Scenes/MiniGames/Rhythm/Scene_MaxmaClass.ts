import { EClearMethod, MiniGameBase, MiniGameOption } from '../MiniGameBase';
import { Container, Graphics, Sprite, Texture, Text } from 'pixi.js';
import { $TextStyle, GameConsts } from '@/constants';
import $R from '@/resources';
import $game from '@/game';
import { Howl } from 'howler';

/**
 * Lv1: [0,x,1,x,3,x,3,x] (4下)
 * Lv2: [1,x,2,x,0,0,0,x] (5下)
 * Lv3: [0,1,2,3,0,0,0,x] (7下)
 */
// const answers = [0, 1, 2, 3, 0, 0, 0]

/** */
export class Scene_MaxmaClass extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 8000;
    // 目標文字
    targetText = '跟著順序按！';
    // BGM
    BGM: Howl = $R.Audio.ME_game4;

    buttonsContainer: Container = new Container();

    pressedButtons: Array<number> = [];

    failed: boolean;

    bg: Graphics;
    hintText: Text;

    level: number;

    answers: Array<number> = [];
    constructor(option?: MiniGameOption) {
        super();
        // BG
        this.bg = new Graphics();
        this.bg.beginFill(0x777777);
        this.bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        this.bg.endFill();
        this.bg.alpha = 1;
        this.addChild(this.bg)

        this.level = option.level;

        //#region Buttons
        for (let i = 0; i < 4; i++) {
            const btn = new Graphics();
            btn.beginFill(0xFFFFFF);
            btn.drawRoundedRect(0, 0, 96, 96, 8);
            btn.endFill();
            btn.interactive = true;
            btn.on('pointerdown', () => this.onMouseDown(i))
            btn.x = i * (96 + 16);
            this.buttonsContainer.addChild(btn);
        }
        this.buttonsContainer.x = ($game.screen.width - this.buttonsContainer.width) / 2;
        this.buttonsContainer.y = $game.screen.height / 2 + 32;
        this.addChild(this.buttonsContainer);
        //#endregion

        // Hint
        this.hintText = new Text('重複！', $TextStyle.GameText);
        this.hintText.anchor.set(0.5)
        this.hintText.x = $game.screen.width / 2;
        this.hintText.y = $game.screen.height / 2 - 128;
        this.hintText.visible = false;
        this.addChild(this.hintText);

        this.interactive = true;

        switch (this.level) {
            case 1: {
                this.answers = [1, -1, 3, -1, 0, 0, 0];
                break;
            }
            case 2: {
                this.answers = [0, 1, 2, 3, 0, 0, 0];
                break;
            }
            default: {
                this.answers = [0, -1, 1, -1, 2, -1, 3];
                break;
            }
        }
    }

    update(delta: number): void {
        super.update(delta);
        this.buttonsContainer.children.forEach(b => {
            b.y = 0;
            if (this.frame < 3500) {
                b.alpha = 1;
            }
        });

        if (this.frame <= 3500) {
            const currentButtonIndex = Math.floor(this.frame / 500);
            const currentButton = this.answers[currentButtonIndex];

            if (currentButton > 0) {
                this.buttonsContainer.children[currentButton].y = this.frame % 500 / 500 * 32;
                this.buttonsContainer.children[currentButton].alpha = 0.5;
            }
        } else {
            this.hintText.visible = true;
        }

    }

    onMouseDown(btn: number) {
        if (this.failed || this.clearFlag) {
            return;
        }
        if (this.frame < 3500) {
            return;
        }

        this.buttonsContainer.children.forEach(b => b.alpha = 1);
        // 按錯了
        if (btn !== this.answers[this.pressedButtons.length]) {
            this.failed = true;
            $R.Audio.InCorrect.play();
            this.bg.beginFill(0x222222);
            this.bg.drawRect(0, 0, $game.screen.width, $game.screen.height);
            this.bg.endFill();
            return;
        }

        this.buttonsContainer.children.forEach((b, index) => b.alpha = btn === index ? 0.5 : 1);
        this.pressedButtons.push(btn);
        // 空拍在按的當下自動補齊
        if (this.answers[this.pressedButtons.length] === -1) {
            this.pressedButtons.push(-1);
        }
        // 都按對了
        if (this.answers.length === this.pressedButtons.length) {
            this.clearFlag = true;
            this.bg.beginFill(0x77BB77);
            this.bg.drawRect(0, 0, $game.screen.width, $game.screen.height);
            this.bg.endFill();
            $R.Audio.Correct.play();
        }
    }

}