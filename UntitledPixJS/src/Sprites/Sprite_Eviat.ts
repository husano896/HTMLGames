import * as PIXI from 'pixi.js';

export class Sprite_Eviat extends PIXI.Sprite {
    target: {x: number, y: number};
    startPos: {x: number, y: number};
    constructor() {
		const texture = PIXI.Texture.from('img/5.png');
        super(texture);
		this.anchor.set(0.5);
		this.target = {x:0, y: 0};
		this.startPos = null;
    }
    update() { }
}