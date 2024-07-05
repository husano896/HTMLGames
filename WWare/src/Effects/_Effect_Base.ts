import { Container } from "pixi.js";

export class Effect_Base extends Container {
    frame: number;
    constructor() {
        super();
    }
    update(delta: number) {
        this.frame += delta;
        if (true) {
            this.destroy();
        }
    }
}