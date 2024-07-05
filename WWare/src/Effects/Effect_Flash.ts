import { Container, Graphics } from "pixi.js";
import $game from '@/game';
interface Props {
    color?: number;
    length?: number;
}
const BASE_LENGTH = 200;
const MAX_ALPHA = 0.8
export class Effect_Flash extends Container {
    frame: number = 0;

    bg: Graphics;
    length: number;
    constructor(props?: Props) {
        super();

        this.bg = new Graphics();
        this.bg.beginFill(props?.color || 0xFFFFFF)
        this.bg.drawRect(0, 0, $game.screen.width, $game.screen.height);
        this.bg.endFill();
        this.bg.alpha = 0;
        this.length = props?.length || BASE_LENGTH;
        this.addChild(this.bg);
        this.zIndex = 999;
    }
    update(delta: number) {
        if (this.frame > this.length) {
            this.destroy();
            return
        }
        this.frame += delta;
        this.bg.alpha = Math.sin(Math.PI * this.frame / this.length) * MAX_ALPHA;

    }
}