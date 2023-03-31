import { Graphics } from 'pixi.js'
/** 點擊地點的提示 */

const AnimLength = 2
export class Anim_ClickPoint extends Graphics {

    text: Text;
    animTime = 0;
    constructor() {
        super();

    }
    update(delta: number) {
        this.animTime += delta;
    }

}