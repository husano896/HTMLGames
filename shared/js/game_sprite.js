
class Sprite {

    constructor(...[args]) {
        this.x = 0;
        this.y = 0;
        this.vec_x = 0;
        this.vec_y = 0;
        this.image = null;
        this.transpancy = 1.0
        this.subX = 0;
        this.subY = 0;
        this.srcWidth = 0;
        this.srcHeight = 0;
        this.dstWidth = 0;
        this.dstHeight = 0;
        // console.log(args);
        if (args) {
            if (args.imageSrc) {
                const i = new Image();
                i.src = args.imageSrc;
                i.onload = function () {
                    this.image = i;
                }.bind(this);
            }
            if (args.image) {
                this.image = args.image;
                // console.log(args.image);
            }
            if (args.x)
                this.x = args.x;
            if (args.y)
                this.y = args.y;

            this.setSubRect(args.srcX, args.srcY, args.srcWidth, args.srcHeight);
        }
    }

    update() {}
    draw() {
        if (!this.image) {
            console.error(this);
            throw new Error('沒有指定圖片!');
        }
        // 超出畫面時不繪製
        if (-this.width > this.x || this.x > Game.WIDTH ||
            -this.height > this.y || this.y > Game.HEIGHT) {
            return;
        }
        Game.drawImage(this.image, this.x, this.y, this.transpancy, {
            srcX: this.srcX,
            srcY: this.srcY,
            srcWidth: this.srcWidth,
            srcHeight: this.srcHeight,
            dstWidth: this.dstWidth,
            dstHeight: this.dstHeight
        });
    }

    checkCollide(spr) {
        return this.x < (spr.x + spr.width) && spr.x < (this.x + this.width) && this.y < (spr.y + spr.height) && spr.y < this.y + this.height
    }

    setSubRect(srcX, srcY, subWidth, subHeight) {
        this.srcX = srcX !== undefined ? srcX : this.srcX || 0;
        this.srcY = srcY !== undefined ? srcY : this.srcY || 0;
        this.srcWidth = subWidth !== undefined ? subWidth : this.srcWidth || 0;
        this.srcHeight = subHeight !== undefined ? subHeight : this.srcHeight || 0;
    }

    get width() {
        return this.image ? this.dstWidth || this.srcWidth || this.image.width : 0;
    }
    get height() {
        return this.image ? this.dstHeight || this.srcHeight || this.image.height : 0;
    }

    getX(pos) {
        switch (pos) {
            case 'center':
                return this.x + this.width / 2;
            case 'right':
                return this.x + this.width;
        }
        return this.x;
    }


    getY(pos) {
        switch (pos) {
            case 'center':
                return this.y + this.height / 2;
            case 'bottom':
                return this.y + this.height;
        }
        return this.y;
    }
}

class SpriteGroup {
    constructor(...args) {
        this.x = 0;
        this.y = 0;
        this.sprites = args || [];
    }

    draw() {
        this.sprites.forEach(s => {
            const x = s.x + this.x;
            const y = s.y + this.y;
            // 超出畫面時不繪製
            if (-s.width > x || x > Game.WIDTH ||
                -s.height > y || y > Game.HEIGHT) {
                return;
            }
            Game.drawImage(s.image, s.x, s.y, s.transpancy, {
                srcX: s.srcX,
                srcY: s.srcY,
                srcWidth: s.srcWidth,
                srcHeight: s.srcHeight,
                dstWidth: s.dstWidth,
                dstHeight: s.dstHeight
            });
        });
    }
    push(spr) {
        this.sprites.push(spr);
    }
    moveToTop(spr) {
        const index = this.sprites.findIndex(s => s === spr);
        if (index > 0) {
            this.sprites = this.sprites.filter(s !== spr)
            this.sprites.unshift(spr);
        }
    }
    moveToBottom(spr) {
        const index = this.sprites.findIndex(s => s === spr);
        if (index >= 0) {
            this.sprites = this.sprites.filter(s !== spr)
            this.sprites.push(spr);
        }
    }
}