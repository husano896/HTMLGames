import $R from '../../resources';
import { Sprite_Eviat } from './../../Sprites/Sprite_Eviat';
import { EClearMethod, MiniGameBase } from './MiniGameBase';

import * as PIXI from 'pixi.js';
import { Graphics, InteractionEvent } from 'pixi.js';
import { GameConsts } from '../../constants';
import { Sprite_AnWolf } from '../../Sprites/Sprite_AnWolf';
export class Scene_EscapeDragon extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.SURVIVE;
    // 小遊戲時間長度
    timeLength = 300;
    // 目標文字
    targetText = '不要被抓到！';

    texAnWolf: PIXI.Texture;
    texAnWolfAAA: PIXI.Texture;
    
    sprAnDra: PIXI.Sprite;
    sprAnWolf: Sprite_AnWolf;

    // 嘎嗚吼的移動速度
    DraSpeed = 3;
    // 距離小於一定時判定為被抓到
    CatchDistance = 32;
    constructor() {
        super();
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBFF);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.5;
        this.addChild(Bg);
        this.sprAnDra = new PIXI.Sprite(PIXI.Texture.from($R.Image.anDra))
        this.sprAnWolf = new Sprite_AnWolf();
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
        
        this.addChild(this.sprAnDra);
        this.addChild(this.sprAnWolf);

        this.sprAnDra.anchor.set(0.5);
        this.sprAnWolf.anchor.set(0.5);
        this.sprAnWolf.x = GameConsts.WIDTH / 2;
        this.sprAnWolf.y = GameConsts.HEIGHT / 2;
    }

    update(delta: number): void {
        if (this.clearFlag) {
            this.sprAnWolf.update(delta);
            return;
        }

        const dx = this.sprAnWolf.x - this.sprAnDra.x;
        const dy = this.sprAnWolf.y - this.sprAnDra.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        // 嘎嗚吼的轉向
        if (dx > 0) {
            this.sprAnDra.scale.x = -1;
        } else {
            // 往左跑時
            this.sprAnDra.scale.x = 1;
        }

        // 被抓到惹
        if (distance < this.CatchDistance) {
            this.fail();
            return;
        }

        // 嘎嗚吼的移動
        const mvx = dx / (distance) * this.DraSpeed;
        const mvy = dy / (distance) * this.DraSpeed;
        this.sprAnDra.x += mvx;
        this.sprAnDra.y += mvy;
    }

    onMouseMove(event: InteractionEvent) {
        if (this.clearFlag) {
            return;
        }
        const x = event.data.global.x;
        const y = event.data.global.y;

        // 嗷嗚處理
        // 往右跑時
        if (x >= this.sprAnWolf.x) {
            this.sprAnWolf.scale.x = -1;
        } else {
            // 往左跑時
            this.sprAnWolf.scale.x = 1;
        }
        // 不能跑到畫面外
        this.sprAnWolf.x = Math.min(GameConsts.WIDTH, Math.max(x, 0));
        this.sprAnWolf.y = Math.min(GameConsts.HEIGHT, Math.max(y, 0));
    }

    fail() {
        this.clearFlag = true;
        this.sprAnWolf.catch();
        // wow!
        const pinkBg = new Graphics();
        pinkBg.beginFill(0xFFA0BC);
        pinkBg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        pinkBg.endFill();
        pinkBg.alpha = 0.5;
        this.addChild(pinkBg);
        // 啊嗚
        $R.Audio.anWolfFail.play();
    }
}