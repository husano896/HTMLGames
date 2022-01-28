import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';

import { GameConsts, $TextStyle } from '../constants';
import $R from '../resources';

export class Sprite_Eviat extends PIXI.Container {
    // 夢夢基座
    ballSpr: PIXI.Sprite;
    // 夢夢臉
    faceSpr: PIXI.Sprite;
    // 夢夢不轉了
    locked: boolean;

    // 夢夢的旋轉速度
    // 每秒180度
    rotateSpeed = 0.05;
    constructor() {
        super();
        this.ballSpr = PIXI.Sprite.from(PIXI.Texture.from($R.Image.eviatBall));
        this.faceSpr = PIXI.Sprite.from(PIXI.Texture.from($R.Image.eviatFace));
        this.ballSpr.anchor.set(0.5);
        this.faceSpr.anchor.set(0.5);
        this.ballSpr.rotation = Math.random() * 2 * Math.PI;
        this.faceSpr.rotation = 0;
        this.addChild(this.ballSpr);
        this.addChild(this.faceSpr);
        this.ballSpr.position.set(GameConsts.WIDTH / 2, GameConsts.HEIGHT / 2);
        this.faceSpr.position.set(GameConsts.WIDTH / 2, GameConsts.HEIGHT / 2);
    }

    lock() {
        if (this.locked) {
            return;
        }
        this.locked = true;
        console.log(this.ballSpr.rotation);
        if (this.Succed) {
            // 如果有對準成功時, 將兩邊臉誤差歸0
            this.ballSpr.rotation = 0;
        }
    }
    update(delta: number) {
        if (!this.locked) {
            this.ballSpr.rotation += delta * this.rotateSpeed;
        } else if (!this.Succed) {
            // 失敗時本體掉出去
            this.ballSpr.y += delta * 4;
        }
    }

    get Succed() {
        // 2pi = 一圈 = 360度
        return (this.ballSpr.rotation % (Math.PI * 2)) < Math.PI * 2 / (360 / 15) ||
            (2 * Math.PI - (this.ballSpr.rotation % (Math.PI*2))) < Math.PI * 2 / (360 / 15);
    }
}