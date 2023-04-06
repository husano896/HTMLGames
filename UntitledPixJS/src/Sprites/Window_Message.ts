import { Sprite_TypingText } from './Sprite_TypingText';
import { Sprite, Texture } from 'pixi.js';
import { Window_Responsive } from './Window_Responsive'
import $R from '../resources';
import $game from '@/main';


// 對話視窗

const MAXWIDTH = 640;
const HEIGHT = 144;
const padding = 8;
export class Window_Message extends Window_Responsive {
    animFrame = 0;
    downIcon: Sprite;
    minWidth = 288;
    sprite_typingText: Sprite_TypingText;

    /** 用來計算反饋效果的有效時間 */
    clickTime: number;
    constructor() {
        super();

        this.sprite_typingText = new Sprite_TypingText();
        this.sprite_typingText.x = padding;
        this.sprite_typingText.y = padding;

        this.downIcon = new Sprite(Texture.from($R.Image.jewelBlueSmall));
        this.downIcon.anchor.set(1, 1);

        this.addChild(this.downIcon, this.sprite_typingText);

        this.on('pointertap', this.onPointerTap);
        this.on('pointerdown', this.onPointerDown);
        this.interactive = true;
        this.cursor = 'pointer';
        this.visible = false;
        this.onWindowResize();
        console.log(this, 'window_message')
    }

    update(delta?: number) {
        super.update(delta);
        this.animFrame += delta;

        if (!this.typing) {
            this.downIcon.visible = true;
            // 提示繼續的Icon動畫
            this.downIcon.y = HEIGHT - 16 + Math.sin(this.animFrame / 8) * 4;
        }
        /*
        if (this.clickTime > 0) {
            this.clickTime -= delta;
            if (this.clickTime <= 0) {
                t
            }
        }*/
    }

    onPointerDown() {
        this.alpha = 0.8;
    }
    onPointerTap() {
        if (this.IsEmpty()) {
            this.visible = false;
        } else {
            this.nextSentence();
            this.visible = true;
            // this.clickTime = 3.0;

        }
    }
    /** 跟Sprite_TypingText 依賴的部分 */
    get typing() {
        return this.sprite_typingText.typing;
    }

    nextSentence() {
        return this.sprite_typingText.nextSentence();
    }
    /** 新增文字到佇列, 同時會開啟對話視窗 */
    appendText(text: string) {
        this.visible = true;
        return this.sprite_typingText.appendText(text);
    }

    /** 等待所有佇列的文字都輸入完 */
    waitForEmpty() {
        return this.sprite_typingText.waitForEmpty();
    }

    /** 是否話說完, 佇列中也沒文字了 */
    IsEmpty() {
        return this.sprite_typingText.IsEmpty();
    }

    /** 該句話是否說完了 */
    IsSentenceCompleted() {
        return this.sprite_typingText.IsSentenceCompleted();
    }

    onWindowResize() {
        if (!this.downIcon) {
            return;
        }
        super.onWindowResize();
        this.bg.width = Math.min(MAXWIDTH, $game.screen.width) - 32;
        this.bg.height = HEIGHT;
        console.log(this.bg, this.bg.width, this)
        this.downIcon.x = this.bg.width - 16;
        this.downIcon.y = this.bg.height - 16;

        this.sprite_typingText.textStyle.wordWrapWidth = this.bg.width - padding * 2;

        this.x = $game.screen.width / 2 - this.bg.width / 2;
        this.y = $game.screen.height - this.height - 16;
    }

    /** 典型應用場景
 *  if (this.IsSentenceCompleted() && !this.typing) {
 *      // 該句話說完了, 等待使用者按下按鍵繼續
 * 
 *      // 通常還會有提示繼續按的動畫演出
 *      update(delta)
 *      
 *      // 繼續說話
 *      if (this.confirmButton) {
 *          this.typing = true;
 *      }
 *  }
 */
}