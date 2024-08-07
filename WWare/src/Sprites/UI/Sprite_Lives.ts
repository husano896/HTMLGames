import * as PIXI from 'pixi.js';
import $R from '@/resources';

export class Sprite_Lives extends PIXI.Container {
    // 目前表示的時間 (動畫用)
    frameTime: number = 0;

    texLife: PIXI.Texture;
    lives: number = 0;

    animate: boolean;
    constructor() {
        super();
        for (let i = 0; i < 4; i++) {
            const liveTex = new PIXI.Sprite(PIXI.Texture.from($R.Image.life));
            liveTex.anchor.set(0.5);
            liveTex.x = i * (liveTex.width + 16);
            this.addChild(liveTex);
        }
    }

    update(delta: number) {

        this.frameTime = (this.frameTime + delta) % 500;
        // 
        for (let i = 0; i < 4; i++) {
            const childSprite = this.children[i];

            if (this.lives > i) {
                childSprite.alpha = 1;
                if (childSprite.y > 100) {
                    childSprite.y = 100;
                } else {
                    childSprite.y = Math.max(0, childSprite.y - delta / 2000 * 200);
                }
                //這條命還在
                if (this.animate) {
                    childSprite.angle = 10 - 20 * Math.cos(this.frameTime / 500 * Math.PI / 2);
                } else {
                    childSprite.angle = 0;
                }
            } else {
                // 這條命沒了
                childSprite.alpha = Math.max(0, childSprite.alpha - delta / 2000);
                childSprite.y = Math.min(100, childSprite.y + delta / 2000 * 100);
            }
        }
    }
}