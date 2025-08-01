import { EClearMethod, MiniGameBase, MiniGameOption } from '../MiniGameBase';
import { Graphics, Sprite, Texture, Text, Container, FillStyle } from 'pixi.js';
import { $TextStyle, GameConsts } from '@/constants';
import { Howl } from 'howler';
import $R from '@/resources';
import $game from '@/game';
import { Effect_Flash } from '@/Effects/Effect_Flash';

/** 烤雪豹！ */
export class Scene_CookFilm extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 4000;
    // 目標文字
    targetText = '烤熟雪豹！';
    // BGM
    BGM: Howl = $R.Audio.ME_game3;

    // 正在烤的雪豹
    bg: Sprite;

    // 正在烤的雪豹
    film1: Sprite;

    // 雪豹肉排
    film2: Sprite;

    // 正在烤的雪豹 （差分）
    film3: Sprite;

    // 火焰
    fire: Sprite;

    // 烤完成的程度, 8000 = 過關
    cookComplete: number = 0;

    // 完成度量條圖像
    cookGauge: Graphics;

    level: number;
    constructor(option?: MiniGameOption) {
        super();
        // 背景
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);

        this.bg = new Sprite(Texture.from($R.Image.CookFilmBG));
        // 正在被烤的雪豹
        this.film1 = new Sprite(Texture.from($R.Image.CookFilm1));
        this.film1.anchor.set(0.5, 1);
        this.film1.x = GameConsts.WIDTH / 2;
        this.film1.y = GameConsts.HEIGHT - 120;

        // 烤熟的雪豹
        this.film2 = new Sprite(Texture.from($R.Image.CookFilm2));
        this.film2.anchor.set(0.5, 1);
        this.film2.x = GameConsts.WIDTH / 2;
        this.film2.y = GameConsts.HEIGHT - 120;

        // 正在被烤的雪豹 (差分)
        this.film3 = new Sprite(Texture.from($R.Image.CookFilm3));
        this.film3.alpha = 0;
        this.film3.anchor.set(0.5, 1);

        this.film3.x = GameConsts.WIDTH / 2;
        this.film3.y = GameConsts.HEIGHT - 120;


        // FIREEEE feat. 泉叔
        this.fire = new Sprite(Texture.from($R.Image.CookFilmFire));
        this.fire.alpha = 0;
        this.fire.anchor.set(0.5, 1);

        this.fire.x = GameConsts.WIDTH / 2;
        this.fire.y = GameConsts.HEIGHT - 120;

        // 一開始烤熟雪豹不顯示
        this.film2.visible = false;

        // 煮熟量條的位置
        this.cookGauge = new Graphics().drawRect(0, 0, 60, 480);

        this.cookGauge.x = GameConsts.WIDTH - 60 - 16;
        this.cookGauge.y = GameConsts.HEIGHT / 2 - 480 / 2;
        this.cookGauge.pivot.x = 0.5;
        this.cookGauge.pivot.y = 1;

        // 等級
        this.level = option?.level || 0;

        this.addChild(this.bg, this.film1, this.film2, this.film3, this.cookGauge, this.fire);

        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {
        super.update(delta);

        // TODO: 確認delta的單位 
        console.log(delta);

        // 隨時間減少熱度
        if (!this.clearFlag) {
            // 關卡增加時加速冷卻
            this.cookComplete -= delta * (1 + this.level * 0.25);
        }

        if (this.cookComplete < 0) {
            this.cookComplete = 0;
        }
        // 依照烤熟的程度決定烤熟雪豹差分的透明度
        this.film3.alpha = Math.min(1, this.cookComplete / 8000);
        // this.cookGauge.beginFill(0x010000 * 0 + 0x000100 * 0 + 0x000001 * 255 );
        // 以及火的大小跟透明度
        this.fire.scale.set(Math.min(1, this.cookComplete / 8000));
        this.fire.alpha = (Math.min(1, this.cookComplete / 8000));

        this.cookGauge.fill.color = 0xFFFFFF;

        this.cookGauge.beginFill(0x010000 * Math.min(255, Math.floor(this.cookComplete / 8000 * 255)));
        this.cookGauge.drawRect(0, 0, 60, 480);
        this.cookGauge.endFill();
        this.cookGauge.scale.y = Math.min(1, this.cookComplete / 8000);
        this.cookGauge.y = GameConsts.HEIGHT / 2 - this.cookGauge.height / 2;
    }

    onMouseDown(index: number) {

        if (this.clearFlag) {
            return;
        }

        this.cookComplete += 1000;

        $R.Audio.SE_Fire.volume(this.cookComplete / 8000 * 1.5);
        $R.Audio.SE_Fire.play();

        if (this.cookComplete > 8000) {
            this.clearFlag = true;

            $R.Audio.Success.play();
            $R.Audio.SE_HandClap.play();
            this.addChild(new Effect_Flash());

            // 過關後隱藏正在烤的雪豹
            this.film1.visible = false;
            this.film3.visible = false;

            // 雪豹肉排！
            this.film2.visible = true;

            this.fire.visible = false;

            this.cookGauge.visible = false;
        }
    }
}