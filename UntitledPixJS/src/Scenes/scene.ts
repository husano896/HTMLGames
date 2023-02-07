import { Container, Rectangle } from 'pixi.js';
import { GameConsts } from '../constants';

export class Scene extends Container {

	constructor() {
		super();
		this.hitArea = new Rectangle(0, 0, GameConsts.width, GameConsts.height);
	}

	onInit() {

	}

	onDestroy() {

	}
	update(delta: number) { }
}