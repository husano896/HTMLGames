import $game from '@/main';
import { FederatedEvent, FederatedPointerEvent, Sprite } from 'pixi.js';
import { Scene } from './scene'
import $R from '../resources';
import { Sprite_Button } from '../Sprites';

/** 手機版遊戲地圖 */
export class Scene_MobileMap extends Scene {

    bg: Sprite;

    point: Sprite;
    backButton: Sprite_Button;

    constructor() {
        super()

        // 背景
        this.bg = Sprite.from($R.Image.bgRed);
        this.bg.height = $game.screen.height;
        this.addChild(this.bg);

        // 地圖上得點
        for (let i = 0;i < 5; i++) {
            const p = Sprite.from($R.Image.MapPoint);
          
            p.x = Math.random() * this.bg.width;
            p.y = Math.random() * this.bg.height;

        p.interactive = true;
        p.cursor = 'pointer';
            this.bg.addChild(p)
        }

        // 回家路點
        this.point = Sprite.from($R.Image.MapPointHome);


        this.point.x = 200;
        this.point.y = 200;
        this.point.interactive = true;
        this.point.cursor = 'pointer';
        this.bg.addChild(this.point)

        // 回家按鈕
        this.backButton = new Sprite_Button('回家', null, { width: 64, height: 64 });
        this.backButton.callback = async () => {
            const newScene = await import('@/Scenes/Scene_Mobile').then(m => m.Scene_Mobile);

            $game.stage.children.forEach(c => c.destroy({ children: true }));
            $game.stage.removeChildren();
            $game.stage.addChild(new newScene());
        }
        this.addChild(this.backButton);
        this.onWindowResize();
        console.log(this)

        this.interactive = true;

        this.on('pointermove', this.onPointerMove.bind(this))
    }

    update(delta: number) {

    }

    /** 滑鼠移動, 用來處理拖移地圖用 */
    onPointerMove(ev: FederatedPointerEvent) {
        // 有按下按鈕時
        if (ev.buttons && ev.isPrimary) {
            this.bg.x += ev.movementX;
            this.bg.y += ev.movementY;
        }
        ev.preventDefault();
    }

    /** 遊戲視窗變更大小時 */
    onWindowResize() {
        super.onWindowResize();
        // this.window_message.y = $game.screen.height - this.window_message.height - 16;
        this.backButton.x = $game.screen.width - this.backButton.width - 16;
        this.backButton.y = $game.screen.height - this.backButton.height - 16;
    }

}