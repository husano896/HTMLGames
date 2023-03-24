import { Game_Global_Mobile } from '@/Game';
import { Window_Responsive } from './Window_Responsive';
import { Container, Text } from 'pixi.js';
import { IResizeable } from '../Interfaces/IResizeable';
import $game from '@/main';
import { $TextStyle } from '../constants';

const MAXWIDTH = 320;
const padding = 8;

/** 金錢視窗 */
export class Window_Gold extends Window_Responsive  {

    goldText: Text;
    previousGold?: number = undefined;
    constructor() {
        super();
        this.bg.width = 256;
        this.bg.height = 32;
        this.goldText = new Text('', $TextStyle.Window_HomeWindow_Left)
        this.addChild(this.goldText)
        this.onWindowResize();

        this.interactive = true;
        this.on('pointertap', ()=> {
            Game_Global_Mobile.gold++;
        })
    }

    update(delta: number) { 
        super.update(delta);
        if (Game_Global_Mobile.gold !== this.previousGold) {
            this.previousGold = Game_Global_Mobile.gold;
            this.goldText.text = `${this.previousGold} G`
        }
    }


}