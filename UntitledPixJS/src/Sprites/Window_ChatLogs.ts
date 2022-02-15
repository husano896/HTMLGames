import * as PIXI from 'pixi.js';
import { $TextStyle } from '../constants';
import { Game_Global } from '../Game/Game_Global';
export class Window_ChatLogs extends PIXI.Container {

    constructor() {
        super();
    }

    update(delta?: number) {
        const logs = Game_Global.ChatLogs;


    }
}