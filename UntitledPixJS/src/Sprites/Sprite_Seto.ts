import * as PIXI from 'pixi.js';

export class Sprite_Seto extends PIXI.AnimatedSprite {

  target: { x: number, y: number };

  moveSpeed: number;

  moving: boolean;
  sprTextures: { [direction: number]: any[] }
  direction: number;
  constructor() {
    const tex: { [direction: number]: any[] } = {};
    for (let i = 1; i <= 9; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === 5) {
          continue;
        }
        const frameKey = `M_ ${i}_${j}.ase`;
        if (!tex[i]) {
          tex[i] = [];
        }
        tex[i].push({ texture: PIXI.Texture.from(frameKey), time: 133 });
      }
    }
    super(tex[2]);
    this.sprTextures = tex;
    this.moveSpeed = 4;
    this.anchor.set(0.5);
    this.animationSpeed = 1.0;
    this.target = {x:0, y:0};
    this.play();
  }
  setMoving(direction?: number, moving?: boolean) {
    if (this.sprTextures[direction] && direction >= 0) {
      if (this.direction != direction) {
        this.textures = this.sprTextures[direction];
        this.animationSpeed = 1.0;
        this.play();
        this.direction = direction;
      }
    }
    
    if (this.moving != moving) {
      if (moving) {
        this.play();
      } else {
        this.stop();
      }
    }
    
    this.moving = moving;
  }
}