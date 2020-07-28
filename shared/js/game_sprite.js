
class Sprite {
    x = 0;
    y = 0;
    vec_x = 0;
    vec_y = 0;
    image;
    transpancy = 1.0
    ready = false;
    constructor(...[args]) {
        //console.log(args);
        if (args) {
            if (args.imageSrc) {
                const i = new Image();
                i.src = args.imageSrc;
                i.onload = function () {
                    this.image = i;
                }.bind(this);
            }
            if (args.image)
                this.image = args.image;
                
            if (args.x)
                this.x = args.x;
            if (args.y)
                this.y = args.y;
        }
    }
    draw() {
        if (!this.image) {
            console.warn(this, '沒有指定圖片!');
            //console.trace();
            return;
        }
        // 超出畫面時不繪製
        if (-this.width > this.x || this.x > Game.WIDTH ||
            -this.height > this.y || this.y > Game.HEIGHT) {
            return;
        }
        Game.drawImage(this.image, this.x, this.y, this.transpancy);
    }

    checkCollide(spr) {
        return this.x < (spr.x + spr.width) && spr.x < (this.x + this.width) && this.y < (spr.y + spr.height) && spr.y < this.y + this.height
    }

    get width() {
        return this.image ? this.image.width : 0;
    }
    get height() {
        return this.image ? this.image.height : 0;
    }
}