import { Sprite, Texture } from 'pixi.js';

export class Sprite_Eviat extends Sprite {
  target: { x: number, y: number };
  startPos: { x: number, y: number };
  constructor() {
    const texture = Texture.from('imgs/5.png');
    super(texture);
    this.anchor.set(0.5);
    this.target = { x: 0, y: 0 };
    this.startPos = null;
  }
  update() { }
}