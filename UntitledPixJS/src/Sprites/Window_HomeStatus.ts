import { Window_Responsive } from './Window_Responsive';
import { Container, Text } from 'pixi.js';
import { IResizeable } from '../Interfaces/IResizeable';
import $game from '@/main';
import { $TextStyle } from '../constants';

const MAXWIDTH = 320;
const padding = 16;

/** 在養成畫面使用的能力值視窗 */
export class Window_HomeStatus extends Window_Responsive implements IResizeable {

    stateTexts: Text;
    stateValues: Text;

    // 元素文字和數值
    stateElementTexts: Text;
    stateElementValues: Text;

    constructor() {
        super();
        this.stateTexts = new Text('HP\n力量\n敏捷\n耐力', $TextStyle.Window_HomeWindow_Left)
        this.stateValues = new Text('9999/9999\n9999\n9999\n9999', $TextStyle.Window_HomeWindow_Right)
        this.stateTexts.anchor.set(0, 0);
        this.stateValues.anchor.set(1, 0);
        this.stateElementTexts = new Text('火\n木\n水\n光\n暗', $TextStyle.Window_HomeWindow_Left)
        this.stateElementValues = new Text('100\n100\n100\n100\n100', $TextStyle.Window_HomeWindow_Right)
        this.stateElementTexts.anchor.set(0, 1);
        this.stateElementValues.anchor.set(1, 1);
        this.visible = false;
        this.addChild(this.stateTexts, this.stateValues, this.stateElementTexts, this.stateElementValues)

        this.stateTexts.x = padding;
        this.stateValues.x = this.width - padding;
        this.stateTexts.y = padding;
        this.stateValues.y = padding;

        this.stateElementTexts.x = padding;
        this.stateElementValues.x = this.width - padding;
        this.stateElementTexts.y = padding + 24 + 8;
        this.stateElementValues.y = padding + 24 + 8;
        this.onWindowResize();
    }

    update(delta: number) { super.update(delta); }

    onWindowResize() {
        if (!this.stateElementTexts || !this.stateElementValues) {
            return;
        }
        super.onWindowResize();
        this.bg.width = Math.min(MAXWIDTH, $game.screen.width / 2) - 32;
        this.bg.height = $game.screen.height - padding * 2 - 64;
        
        this.stateValues.x = this.width - padding;
        this.stateElementTexts.y = this.bg.height- padding;
        this.stateElementValues.y = this.bg.height - padding;

        this.stateElementValues.x = this.width - padding;
    }
}