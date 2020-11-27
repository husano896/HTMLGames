class Sprite_ClearParticle extends Sprite {
    constructor(args) {
        super(args);

        this.particles = [];
    }

    update() {
        this.transpancy = Math.max(0, this.transpancy - 0.02);
    }

    draw() {

    }
}