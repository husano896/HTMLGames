import { EClearMethod, MiniGameBase } from '../MiniGameBase';
import { Graphics, Sprite, Texture, Text, InteractionEvent, Container, } from 'pixi.js';
import { $TextStyle, GameConsts } from '@/constants';
import { Howl } from 'howler';
import $R from '@/resources';
import $game from '@/game';

/** 框框寬寬 */
export class Scene_KuanKuan extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.SURVIVE;
    // 小遊戲時間長度
    timeLength = 4000;
    // 目標文字
    targetText = '避開食物！';
    // BGM
    BGM: Howl = $R.Audio.ME_game5;

    sprKuan: Sprite;

    foodsContainer: Container;
    constructor() {
        super();
        // 背景
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);

        // 寬寬
        this.sprKuan = new Sprite(Texture.from($R.Image.KuangKuan1));
        this.sprKuan.anchor.set(0.5, 1);
        this.sprKuan.x = GameConsts.WIDTH / 2;
        this.sprKuan.y = GameConsts.HEIGHT;
        this.addChild(this.sprKuan);
        // 食物容器
        this.foodsContainer = new Container();
        this.addChild(this.foodsContainer);
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
    }

    update(delta: number): void {
        if (this.clearFlag) {
            return;
        }
        super.update(delta);

        // 畫面上應該要有的食物數量
        const foods = Math.ceil(this.frame / 2000);
        console.log(foods);
        // 食物不夠 產生食物
        if (this.foodsContainer.children.length < foods) {
            const newFood = new Sprite(Texture.from($R.Image.EatCake1));
            newFood.anchor.set(0.5, 1);
            newFood.scale.set(0.5);
            newFood.x = Math.random() * (GameConsts.WIDTH - newFood.width / 2) + newFood.width / 2;
            newFood.y = 0;
            this.foodsContainer.addChild(newFood);

        }

        // 食物掉落
        this.foodsContainer.children.forEach(c => {
            c.y += delta * 0.5;
            const bounds1 = c.getBounds();
            const bounds2 = this.sprKuan.getBounds();

            // 碰到惹
            if (
                bounds1.x < bounds2.x + bounds2.width
                && bounds1.x + bounds1.width > bounds2.x
                && bounds1.y < bounds2.y + bounds2.height
                && bounds1.y + bounds1.height > bounds2.y
            ) {
                this.clearFlag = true;
                $R.Audio.SE_Decision39.play();

                // 變寬
                this.sprKuan.texture = Texture.from($R.Image.KuangKuan2);
                this.sprKuan.scale.x = 3;
                // BUFFET!
                const buffet = Sprite.from(Texture.from($R.Image.KuangKuanBuffet));
                buffet.anchor.set(0.5);
                buffet.scale.set(2);
                buffet.x = GameConsts.WIDTH / 2;
                buffet.y = GameConsts.HEIGHT / 2 - 128;
                this.addChild(buffet);
            }
        })
    }

    onMouseMove(event: InteractionEvent) {
        if (this.clearFlag) {
            return;
        }
        const x = event.data.global.x;

        // 不能跑到畫面外
        this.sprKuan.x = Math.min(GameConsts.WIDTH - this.sprKuan.width / 2, Math.max(x, this.sprKuan.width / 2));
    }
}