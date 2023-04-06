import $game from '../main';
import { $TextStyle } from '../constants';
import { Container, Text, Graphics } from "pixi.js";
import { IResizeable } from '../Interfaces/IResizeable';

export class Sprite_Loading extends Container implements IResizeable {
    particles: Container;
    loadingText: Container;
    constructor() {
        super();

        this.loadingText = new Text('Loading', $TextStyle.Sprite_Loading);
        this.loadingText.y = (this.loadingText.width - this.loadingText.height) / 2;

        this.particles = new Container();
        this.particles.x = this.loadingText.width / 2;
        this.particles.y = this.loadingText.width / 2;
        for (let i = 0; i < 6; i++) {
            const particle = new Graphics();
            particle.beginFill(0xCCCCCC, 0.75);
            particle.drawCircle(0, 0, 8);
            particle.endFill();
            particle.beginFill(0xFFFFFF, 1);
            particle.drawCircle(0, 0, 4);
            particle.endFill();
            this.particles.addChild(particle);
        }

        this.addChild(this.loadingText, this.particles);
        console.log(this);
    }

    update(delta: number) {
        const time = new Date().getTime();
        // 更新每個粒子的位置

        this.particles.children.forEach((particle, index) => {
            particle.scale.set(Math.cos((Math.PI * 2 * index / this.particles.children.length) + time / 720) * 0.75 + 1)
            particle.x = (this.loadingText.width / 2) * Math.sin((Math.PI * 2 * index / this.particles.children.length) + time / 720);
            particle.y = (this.loadingText.width / 2) * Math.sin((Math.PI * 2 * index / this.particles.children.length) + time / 720);
        });

        this.particles.angle = ((time / 72));

    }
    onWindowResize() {
        // 畫面置中
        this.x = $game.screen.width / 2 - this.width / 2;
        this.y = $game.screen.height / 2 - this.width / 2;
    }
}