import $game from '@/main';
import { Sprite } from 'pixi.js';
import { Scene } from './scene'
import $R from '../resources';
import { Sprite_Button } from '../Sprites';

/** 手機版遊戲地圖 */
export class Scene_MobileMap extends Scene {

    bg: Sprite;
    backButton: Sprite_Button;

    constructor() {
        super()

        // 背景
        this.bg = Sprite.from($R.Image.bgRed);
        this.bg.anchor.set(0.5);

        this.addChild(this.bg);

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
    }

    update(delta: number) {

    }

    /** 遊戲視窗變更大小時 */
    onWindowResize() {
        super.onWindowResize();
        console.log('resize');

        this.bg.x = $game.screen.width / 2;
        this.bg.y = $game.screen.height / 2;

        // this.window_message.y = $game.screen.height - this.window_message.height - 16;
        this.backButton.x = $game.screen.width - this.backButton.width - 16;
        this.backButton.y = $game.screen.height - this.backButton.height - 16;
    }

}