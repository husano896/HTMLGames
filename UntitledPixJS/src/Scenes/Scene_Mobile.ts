import { Window_Message } from './../Sprites/Window_Message';
import { Sprite_TypingText } from './../Sprites/Sprite_TypingText';
import { Scene } from "./scene";
import $game from '../game'
import { Sprite, FederatedPointerEvent, IDestroyOptions } from 'pixi.js'
import $R from "../resources";
import { IResizeable } from '../Interfaces/IResizeable';

/** 練習做手機版介面用... */
export class Scene_Mobile extends Scene implements IResizeable {
    bg: Sprite;
    dragon: Sprite

    window_message: Window_Message;
    constructor() {
        super();
        // 背景
        this.bg = Sprite.from($R.Image.bgYellow);
        this.bg.anchor.set(0.5);

        // 乖龍龍
        this.dragon = Sprite.from($R.Image.dragon);
        this.dragon.anchor.set(0.5);
        this.window_message = new Window_Message();
        this.window_message.x = 8;

        this.addChild(this.bg, this.dragon, this.window_message);

        this.interactive = true;
        this.on('pointerdown', this.onClick.bind(this));

        console.log(this);

        [
            '試著說第一句話',
            '然後說第二句話',
            '接著說第三句很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長很長的話\n而且是有換行那種'
        ].forEach(t => this.window_message.appendText(t))

        this.window_message.waitForEmpty().then(() => {
            console.log('說完話了！')
        })

        this.dragon.on('pointerdown', () => {
            if (this.window_message.typing) {
                return;
            }
            this.window_message.appendText('飛飛乖！\n咕姆姆姆姆姆姆...');
        });
        this.dragon.interactive = true;
        this.onWindowResize();
    }
    destroy(options?: boolean | IDestroyOptions): void {
        document.removeEventListener('resize', this.onWindowResize.bind(this), true);
        super.destroy(options);
    }
    update(delta: number) {
        super.update(delta);
    }

    onClick(event: FederatedPointerEvent) {
    }

    /** 遊戲視窗變更大小時 */
    onWindowResize() {
        super.onWindowResize();
        console.log('resize');

        this.bg.x = $game.screen.width / 2;
        this.bg.y = $game.screen.height / 2;

        this.dragon.x = $game.screen.width / 2;
        this.dragon.y = $game.screen.height / 2;

        // this.window_message.y = $game.screen.height - this.window_message.height - 16;
    }
}