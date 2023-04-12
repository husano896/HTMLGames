import { Game_Global_Mobile } from '@/Game';
import { Window_Responsive } from './Window_Responsive';
import { Container, Text } from 'pixi.js';
import { IResizeable } from '../Interfaces/IResizeable';
import $game from '@/main';
import { $TextStyle } from '../constants';

const MAXWIDTH = 320;
const padding = 8;

/** 金錢視窗 */
export class Window_Gold extends Window_Responsive {

    minHeight: number = 32;
    minWidth: number = 192;
    padding: number = 8;
    goldText: Text;
    previousGold?: number = undefined;
    constructor() {
        super();
        this.goldText = new Text('', $TextStyle.Window_Gold)
        this.goldText.x = this.padding;
        this.goldText.y = this.padding;
        this.addChild(this.goldText)
        this.onWindowResize();
    }

    update(delta: number) {
        super.update(delta);
        if (Game_Global_Mobile.gold !== this.previousGold) {
            this.previousGold = Game_Global_Mobile.gold;
            this.goldText.text = `${this.previousGold} G`
        }
    }


}