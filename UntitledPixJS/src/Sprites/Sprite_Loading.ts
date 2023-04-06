import $game from '../main';
import { $TextStyle } from '../constants';
import { Container, Text, Graphics } from "pixi.js";
import { IResizeable } from '../Interfaces/IResizeable';

export class Sprite_Loading extends Container implements IResizeable {
    bg: Graphics;
    particles: Container;
    constructor() {
        super();

        this.bg = new Graphics();
        const loadingText = new Text('Loading', $TextStyle.Sprite_Loading);
        loadingText.y = (loadingText.width - loadingText.height) / 2;
        this.bg.beginFill(0x0, 0.5);
        this.bg.drawRect(0, 0, loadingText.width, loadingText.width);


        this.particles = new Container();
        this.particles.x = this.bg.width / 2;
        this.particles.y = this.bg.height / 2;
        for (let i = 0; i < 6; i++) {
            const particle = new Graphics();
            particle.beginFill(0xFFFFFF, 0.5);
            particle.drawCircle(0, 0, 8);
            this.particles.addChild(particle);
        }

        this.addChild(this.bg, loadingText, this.particles);
        console.log(this);
    }

    update(delta: number) {
        const time = new Date().getTime();
        // 更新每個粒子的位置

        this.particles.children.forEach((particle, index) => {
            particle.scale.set(Math.cos((Math.PI * 2 * index / this.particles.children.length) + time / 1000) + 1)
            particle.x = (this.bg.width / 2) * Math.sin((Math.PI * 2 * index / this.particles.children.length) + time / 1000);
            particle.y = (this.bg.width / 2) * Math.sin((Math.PI * 2 * index / this.particles.children.length) + time / 1000);
        });

        this.particles.angle = ((time / 36));

    }
    onWindowResize() {
        // 畫面置中
        this.x = $game.screen.width / 2 - this.width / 2;
        this.y = $game.screen.height / 2 - this.height / 2;
    }
}