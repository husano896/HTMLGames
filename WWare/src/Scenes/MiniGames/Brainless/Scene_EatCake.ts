import { EClearMethod, MiniGameBase } from '../MiniGameBase';
import { Graphics, Sprite, Texture } from 'pixi.js';
import { GameConsts } from '@/constants';
import $R from '@/resources';
import $game from '@/game';
import { Howl } from 'howler';

/** */
export class Scene_EatCake extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 4000;
    // 目標文字
    targetText = '吃光蛋糕！';
    // BGM
    BGM: Howl = $R.Audio.ME_game3;
    
    // 蛋糕
    sprCake: Sprite;
    nomPhase: number = 0;
    cakeTextures: Texture[]
    constructor() {
        super();
        const Bg = new Graphics();
        Bg.beginFill(0xEEEEEE);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);

        this.cakeTextures = [
            Texture.from($R.Image.EatCake1),
            Texture.from($R.Image.EatCake2),
            Texture.from($R.Image.EatCake3),
            Texture.from($R.Image.EatCake4),
        ]
        this.sprCake = Sprite.from(this.cakeTextures[0]);
        this.sprCake.anchor.set(0.5);
        this.sprCake.x = $game.screen.width / 2;
        this.sprCake.y = $game.screen.height / 2;
        this.addChild(this.sprCake);

        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {

    }

    onMouseDown() {
        if (this.nomPhase >= 4) {
            return;
        }
        $R.Audio.SE_Nom.play();
        this.nomPhase++;
        this.sprCake.texture = this.cakeTextures[this.nomPhase];
        if (this.nomPhase >= 4) {
            this.sprCake.visible = false;
            this.clearFlag = true;
            $R.Audio.Success.play();
        }
    }
}