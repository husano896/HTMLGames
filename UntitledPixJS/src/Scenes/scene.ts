import { IResizeable } from './../Interfaces/IResizeable';
import { Container, Rectangle } from 'pixi.js';
import { GameConsts } from '../constants';

export class Scene extends Container implements IResizeable {

	constructor() {
		super();
		this.hitArea = new Rectangle(0, 0, GameConsts.width, GameConsts.height);
	}

	onInit() {

	}

	onDestroy() {
		this.destroy({ children: true });
	}
	update(delta: number) {
		this.children.forEach(c => (c as any).update?.(delta));
	}

	onWindowResize() {
		this.children.forEach(c => {
			(c as unknown as IResizeable).onWindowResize?.();
		})
	}
}