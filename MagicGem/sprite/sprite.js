// 處理重力，true時為onground
Sprite.prototype.handle_gravity = function (groundY) {
    // 扣除圖片的高度後實際的容許Y軸位置
    const bottomY = groundY - this.height;
    // 地板判定
    if (this.y - this.vec_y >= bottomY && this.vec_y <= 0) { //  && bottomY >= this.y 用於在空中的地板用
        this.vec_y = 0;
        this.y = bottomY;
        this.jumping = false;
        return true;
    }
    // 重力判定
    this.vec_y -= this.gravity;
    this.y -= this.vec_y;
    return false;
}
