class Sprite_Eviat extends PIXI.Sprite {

    constructor() {
		const texture = PIXI.Texture.from('img/5.png');
        super(texture);
		this.anchor.set(0.5);
		this.target = {x:0, y: 0};
		this.startPos = null;
    }
    update() { }
}