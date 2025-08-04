import { EClearMethod, MiniGameBase, MiniGameOption } from '../MiniGameBase';
import { Graphics, Sprite, Texture, Text, InteractionEvent, Container, } from 'pixi.js';
import { $TextStyle, GameConsts } from '@/constants';
import { Howl } from 'howler';
import $R from '@/resources';
import { Effect_Flash } from '@/Effects/Effect_Flash';

/** 起司接小卡 */
export class Scene_CaraguaCheese extends MiniGameBase {

    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;

    // 小遊戲時間長度
    timeLength = 4000;

    // 目標文字
    targetText = '接住！';

    // BGM
    BGM: Howl = $R.Audio.ME_game5;

    // 起司Spr
    sprCheese: Sprite;

    // 小卡spr
    sprCaragua: Sprite;

    timeLeft: number;

    level: number = 0;
    constructor(option?: MiniGameOption) {
        super();
        // 背景
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);

        // 起司
        this.sprCheese = new Sprite(Texture.from($R.Image.SadCheese));
        this.sprCheese.anchor.set(0.5, 1);
        this.sprCheese.scale.set(0.5)
        this.sprCheese.x = GameConsts.WIDTH / 2;
        this.sprCheese.y = GameConsts.HEIGHT;

        // 卡拉呱
        this.sprCaragua = new Sprite(Texture.from($R.Image.FallingCaragua));
        this.sprCaragua.scale.set(0.5)
        this.sprCaragua.anchor.set(0.5, 0.5);
        this.sprCaragua.x = Math.random() * (GameConsts.WIDTH - this.sprCaragua.width / 2) + this.sprCaragua.width / 2;
        this.sprCaragua.y = 0;
        this.timeLeft = this.timeLength;

        this.level = option.level;

        this.addChild(this.sprCaragua, this.sprCheese);
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {

        super.update(delta);
        if (this.clearFlag) {
            return;
        }
        this.timeLeft -= delta;

        // 小卡掉落
        switch (this.level) {

            case 1: {
                //差分1：掉落速度加快
                this.sprCaragua.y = GameConsts.HEIGHT * ((this.timeLength - this.timeLeft) / (this.timeLength * 2 / 4));
                break;
            }
            case 2: {
                //差分2：旋轉掉落的小卡
                this.sprCaragua.y = GameConsts.HEIGHT * ((this.timeLength - this.timeLeft) / (this.timeLength * 2 / 4));
                this.sprCaragua.angle = this.timeLeft / 4;
                break;
            }
            default: {
                // 原始：正常掉落小卡
                this.sprCaragua.y = GameConsts.HEIGHT * ((this.timeLength - this.timeLeft) / (this.timeLength * 3 / 4));
                break;
            }
        }

        const bounds1 = this.sprCaragua.getBounds();
        const bounds2 = this.sprCheese.getBounds();

        // 碰到惹
        if (
            bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y
            && Math.abs(bounds1.x - bounds2.x) < bounds2.width / 2
        ) {
            this.clearFlag = true;
            $R.Audio.Success.play();

            const bg = new Graphics();
            bg.beginFill(0xFFEE58);
            bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
            bg.endFill();
            bg.alpha = 0.0;
            (bg as any).update = (delta: number) => {
                bg.alpha = Math.min(0.5, bg.alpha + delta / 1000);
            }
            this.addChild(bg);

            this.sprCheese.texture = Texture.from($R.Image.HugCaragua);
            this.sprCaragua.visible = false;

            this.addChild(new Effect_Flash());
        }

    }

    onMouseMove(event: InteractionEvent) {
        if (this.clearFlag) {
            return;
        }
        const x = event.data.global.x;

        // 不能跑到畫面外
        this.sprCheese.x = Math.min(GameConsts.WIDTH - this.sprCheese.width / 2, Math.max(x, this.sprCheese.width / 2));
    }
}