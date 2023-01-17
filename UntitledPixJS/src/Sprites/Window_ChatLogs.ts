import { Container } from 'pixi.js';
import { Game_Global } from '../Game/Game_Global';
export class Window_ChatLogs extends Container {

    constructor() {
        super();
    }

    update(delta?: number) {
        const logs = Game_Global.ChatLogs;
    }
}