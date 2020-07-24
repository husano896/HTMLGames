class Sprite {
    x = 0;
    y = 0;
    vec_x = 0;
    vec_y = 0;
    image = null;
    constructor(...[args]) {
        //console.log(args);
        if (args.image)
            this.image = args.image;
        if (args.x)
            this.x = args.x;
        if (args.y)
            this.y = args.y;
    }
    draw() {
        if (!this.image) {
            //console.warn(this, '沒有指定圖片!');
            //console.trace();
            return;
        }
        // 超出畫面時不繪製
        if (-this.image.width > this.x || this.x > Game.WIDTH || 
            -this.image.height > this.y || this.y > Game.HEIGHT) {
            return;
        }
        Game.drawImage(this.image, this.x, this.y);
    }

    checkCollide(spr) {
        //如果距離超過就不會碰到
        const distance_x = Math.abs(this.x - spr.x);
        const distance_y = Math.abs(this.y - spr.y);

        if (distance_x > this.width + spr.width)
            return false;
        if (distance_y > this.height + spr.height)
            return false;
        // 可能還要做一下中線判定?
        
        return true;
    }

    // 處理重力，true時為onground
    handle_gravity(g, groundY) {
        // 扣除圖片的高度後實際的容許Y軸位置
        const bottomY = groundY - this.image.height;
        // 地板判定
        if (this.y - this.vec_y >= bottomY && bottomY >= this.y && this.vec_y <= 0) {
            this.vec_y = 0;
            this.y = bottomY;
            this.jumping = false;
            return true;
        }
        // 重力判定
        this.vec_y -= g;
        this.y -= this.vec_y;
        return false;
    }

    get width() {
        return this.image ? this.image.width : 0;
    }
    get height() {
        return this.image ? this.image.height : 0;
    }
}