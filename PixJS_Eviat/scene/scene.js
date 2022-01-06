class Scene extends PIXI.Container {

	constructor(...args) { super(...args);
		this.hitArea = new PIXI.Rectangle( 0, 0, GameConsts.width, GameConsts.height);
	}
	update(delta) { }
}