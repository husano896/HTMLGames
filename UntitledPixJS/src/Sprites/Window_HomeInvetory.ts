import { Window_Responsive } from './Window_Responsive';
import { Container } from 'pixi.js';
import { IResizeable } from '../Interfaces/IResizeable';
import $game from '../game';

const MAXWIDTH = 320;
const padding = 8;

/** 在養成畫面使用的道具欄視窗 */
export class Window_HomeInvetory extends Window_Responsive implements IResizeable {

    constructor() {
        super();
        this.visible = false;
    }
    update(delta: number) { super.update(delta); }

    onWindowResize() {
        super.onWindowResize();
        this.bg.width = Math.min(MAXWIDTH, $game.screen.width / 2) - 32;
        this.bg.height = $game.screen.height - padding * 2 - 64;
    }
}