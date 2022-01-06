import * as PIXI from 'pixi.js';
import { GameConsts } from '../constants';

export class Scene extends PIXI.Container {

	constructor() {
		super();
		this.hitArea = new PIXI.Rectangle(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
	}
	update(delta: number) { }
}