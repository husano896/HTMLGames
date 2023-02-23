import { Container, Text } from 'pixi.js'
import { $TextStyle } from '../constants';

/** 輸入每個字的間格時間 */
const TYPING_INTERVAL = 1;

/** TODO: 有打字效果的文字框 */
export class Sprite_TypingText extends Container {

    /**  */
    // autoStart: boolean = true;

    /** 是否正在輸入中 */
    typing: boolean;

    /** 等待輸入中的文字佇列 */
    bufferTexts: Array<string> = [];

    bufferText: string = '';

    /** 目前畫面上的可見文字 */
    displayingText: string = '';

    private _nextCharCooldown: number = 0;
    /**  用於真正顯示的PIXI.Text物件 */
    private _text: Text;

    private _typingPromise: Promise<any> | null = null;

    private _typingPromiseResolver: Function | null = null;

    constructor(props?: { text?: string, texts?: Array<string> }) {
        super();
        this._text = new Text('',
            $TextStyle.Window_Message,
        );
        this.addChild(this._text);

        if (props) {
            if (props.text) {
                this.appendText(props.text);
            }

            if (props.texts) {
                props.texts.forEach(t => this.appendText(t));
            }
        }
        console.log(this);
    }

    update(delta: number) {

        // 非輸入中不動作
        if (!this.typing) {
            return;
        }

        if (this._nextCharCooldown >= 0) {
            this._nextCharCooldown -= delta;
            return;
        }
        // 嘿, 如果人家已經卡很久了, 等多久就顯示多少字
        while (this._nextCharCooldown <= 0 && this.typing) {

            if (!this.bufferText?.length) {
                // 我說完話了！
                if (!this.bufferTexts?.length) {
                    this.typing = false;

                    // 跟人家說我說完話了！
                    if (this._typingPromiseResolver) {
                        this._typingPromiseResolver();
                        this._typingPromiseResolver = null;
                        this._typingPromise = null;
                    }
                    return;
                }
                // 目前已輸入完時, 取得佇列中下一個句子
                this.typing = false;
            } else {
                this._text.text = `${this._text.text}${this.bufferText.at(0)}`;
                this.bufferText = this.bufferText.slice(1);
                console.log('[Sprite_TypingText] 目前文字', this._text, '剩餘文字', this.bufferText);
                this._nextCharCooldown += TYPING_INTERVAL;
            }
        }
    }

    nextSentence() {
        if (this.typing) {
            return;
        }
        this._text.text = '';

        this.bufferText = this.bufferTexts.shift()!;
        this.typing = true;
    }
    /** 新增文字到佇列 */
    appendText(text: string) {
        console.log('[Sprite_TypingText] 加入了文字：', text);
        this.bufferTexts.push(text);
        if (!this.typing) {
            this.nextSentence();
        }
        this.typing = true;
        if (!this._typingPromise) {
            this._typingPromise = new Promise((resolve, reject) => {
                this._typingPromiseResolver = resolve;
            });
        }

    }

    /** 等待所有佇列的文字都輸入完 */
    waitForEmpty() {
        if (!this.typing && !this.bufferTexts.length && !this.bufferText) {
            // 我目前沒有在說任何話了, 直接回傳
            return Promise.resolve();
        }
        return this._typingPromise;
    }

    /** 是否沒話可講惹 */
    IsEmpty() {
        return !this.bufferTexts?.length && !this.bufferText?.length;
    }
    /** 該句話是否說完了 */
    IsSentenceCompleted() {
        return this.bufferText?.length === 0;
    }

    get textStyle() {
        return this._text.style;

    }

    set textStyle(v) {
        this._text.style = v;
    }
}