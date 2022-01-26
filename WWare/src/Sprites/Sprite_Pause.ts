import * as PIXI from 'pixi.js';

import { GameConsts, $TextStyle } from '../constants';

export class Sprite_Pause extends PIXI.Container {
    pauseTitleText: PIXI.Text;

    continueText: PIXI.Text;
    exitText: PIXI.Text;

    pauseBg: PIXI.Graphics;
    constructor(continueCallBack: () => any, exitCallBack: () => any) {
        super();

        this.pauseBg = new PIXI.Graphics();
        this.pauseBg.beginFill(0x333333, 0.5);
        this.pauseBg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        this.pauseBg.endFill();

        this.pauseTitleText = new PIXI.Text('暫停', $TextStyle.PauseTitleText);
        this.pauseTitleText.anchor.set(0.5);
        this.pauseTitleText.x = GameConsts.WIDTH / 2;
        this.pauseTitleText.y = GameConsts.HEIGHT / 2 - 48;

        this.continueText = new PIXI.Text('繼續', $TextStyle.PauseActionText);
        this.continueText.anchor.set(0.5);
        this.continueText.x = GameConsts.WIDTH / 2 - 96;
        this.continueText.y = this.pauseTitleText.y + 48;
        this.continueText.cursor = 'hover';
        this.continueText.buttonMode = true;
        this.continueText.interactive = true;
        this.continueText.on('pointerdown', continueCallBack);

        this.exitText = new PIXI.Text('離開', $TextStyle.PauseActionText);
        this.exitText.anchor.set(0.5);
        this.exitText.x = GameConsts.WIDTH / 2 + 96;
        this.exitText.y = this.continueText.y;
        this.exitText.cursor = 'hover';
        this.exitText.buttonMode = true;
        this.exitText.interactive = true;
        this.exitText.on('pointerdown', exitCallBack);

        this.addChild(this.pauseBg, this.pauseTitleText, this.continueText, this.exitText);
    }
}