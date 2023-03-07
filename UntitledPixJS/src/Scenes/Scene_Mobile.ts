import { Window_HomeStatus } from './../Sprites/Window_HomeStatus';
import { Window_HomeInvetory } from './../Sprites/Window_HomeInvetory';
import { Sprite_Button } from './../Sprites/Sprite_Button';
import { Window_Message } from './../Sprites/Window_Message';
import { Sprite_TypingText } from './../Sprites/Sprite_TypingText';
import { Sprite_Battery } from '../Sprites/Sprite_Battery';

import { Scene } from "./scene";
import $game from '../game'
import { Container, Sprite, FederatedPointerEvent, IDestroyOptions } from 'pixi.js'
import $R from "../resources";
import { IResizeable } from '../Interfaces/IResizeable';

/** 在家 */
class HomeUIContainer extends Container implements IResizeable {

    OpenItemButton: Sprite_Button;
    OpenMapButton: Sprite_Button;
    OpenWorkButton: Sprite_Button;

    BatterySprite: Sprite_Battery;
    disabled: boolean;
    constructor() {
        super();

        this.OpenItemButton = new Sprite_Button('物品', null, { width: 64, height: 64 });
        this.OpenWorkButton = new Sprite_Button('工作', null, { width: 64, height: 64 });
        this.OpenMapButton = new Sprite_Button('地圖', null, { width: 64, height: 64 });
        this.BatterySprite = new Sprite_Battery();

        this.OpenItemButton.interactive = true;
        this.OpenItemButton.cursor = 'pointer';

        this.OpenWorkButton.interactive = true;
        this.OpenWorkButton.cursor = 'pointer';

        this.OpenMapButton.interactive = true;
        this.OpenMapButton.cursor = 'pointer';

        this.BatterySprite.interactive = true;
        this.BatterySprite.cursor = 'pointer';

        this.addChild(this.OpenItemButton, this.OpenMapButton, this.OpenWorkButton, this.BatterySprite);
        this.onWindowResize();
    }

    update(delta: number) {
        // this.OpenItemButton._disabled = this.disabled;
        // this.OpenMapButton._disabled = this.disabled;
    }

    // Container內自己的寬度
    onWindowResize() {

        const gap = Math.min(128, Math.max($game.screen.width / (this.children.length - 1) / 2, 16));

        // 選單按鈕們
        this.OpenItemButton.x = 0;
        this.OpenWorkButton.x = this.OpenItemButton.x + this.OpenWorkButton.width + gap;
        this.OpenMapButton.x = this.OpenWorkButton.x + this.OpenMapButton.width + gap;

        // 剩餘行動值
        this.BatterySprite.x = this.width / 2 - this.BatterySprite.width / 2;
        this.BatterySprite.y = 48;
    }
}
/** 練習做手機版介面用... */
export class Scene_Mobile extends Scene implements IResizeable {
    bg: Sprite;
    dragon: Sprite

    window_message: Window_Message;

    window_homeInvetory: Window_HomeInvetory;

    window_homeStatus: Window_HomeStatus;

    /** 在家時可使用的按鈕們*/
    homeUIContainer: HomeUIContainer;

    BackButton: Sprite_Button;
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

        // 道具視窗
        this.window_homeInvetory = new Window_HomeInvetory();
        // 能力視窗
        this.window_homeStatus = new Window_HomeStatus();

        // 滑鼠事件綁定

        // this.on('pointerdown', this.onClick.bind(this));

        console.log(this);

        // 點擊乖龍龍說話
        this.dragon.on('pointerdown', () => {
            if (!this.homeUIContainer.visible) {
                return;
            }
            this.window_message.appendText('飛飛乖！\n咕姆姆姆姆姆姆...');
        });
        this.dragon.interactive = true;
        this.dragon.cursor = 'pointer';

        // 在自己家場景時能用的UI
        this.homeUIContainer = new HomeUIContainer();
        this.homeUIContainer.OpenItemButton.callback = (() => {
            if (this.window_message.typing) {
                return;
            }

            this.window_homeStatus.visible = true;
            this.window_homeInvetory.visible = true;
        }).bind(this)

        this.homeUIContainer.OpenMapButton.callback = (() => {
            if (this.window_message.typing) {
                return;
            }
            this.window_message.appendText('地圖選單');
        }).bind(this)

        this.homeUIContainer.OpenWorkButton.callback = (() => {
            if (this.window_message.typing) {
                return;
            }
            this.window_message.appendText('工作選單');
        }).bind(this)


        this.BackButton = new Sprite_Button('返回', null, { width: 64, height: 64 });
        this.BackButton.interactive = true
        this.BackButton.cursor = 'pointer'
        this.BackButton.visible = false
        this.BackButton.on('pointerdown', () => {
            // 返回主頁面
            this.window_homeInvetory.visible = false
            this.window_homeStatus.visible = false
        });
        this.addChild(
            this.bg,
            this.dragon,
            this.homeUIContainer,
            this.window_homeInvetory,
            this.window_homeStatus,
            this.window_message,
            this.BackButton);
        this.onWindowResize();
    }
    destroy(options?: boolean | IDestroyOptions): void {
        document.removeEventListener('resize', this.onWindowResize.bind(this), true);
        super.destroy(options);
    }
    update(delta: number) {
        super.update(delta);

        /** 目前文字視窗進行中, 或狀態顯示中 */
        this.homeUIContainer.visible = !(
            this.window_message.visible ||
            this.window_homeStatus.visible ||
            this.window_homeInvetory.visible
        );

        /** 返回按鈕只在開啟功能選單時顯示 */
        this.BackButton.visible = (
            this.window_homeStatus.visible ||
            this.window_homeInvetory.visible
        )
    }

    /** 遊戲視窗變更大小時 */
    onWindowResize() {
        super.onWindowResize();
        console.log('resize');

        this.bg.x = $game.screen.width / 2;
        this.bg.y = $game.screen.height / 2;

        this.dragon.x = $game.screen.width / 2;
        this.dragon.y = $game.screen.height / 2;

        // HomeUI
        this.homeUIContainer.x = $game.screen.width / 2 - this.homeUIContainer.width / 2;
        this.homeUIContainer.y = $game.screen.height - this.homeUIContainer.height;

        // this.window_message.y = $game.screen.height - this.window_message.height - 16;
        this.BackButton.x = $game.screen.width - 8 - this.BackButton.width - 16;
        this.BackButton.y = $game.screen.height - this.BackButton.height - 16;
    }
}