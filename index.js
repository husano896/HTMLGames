function random_color(min = 96, plusRange = 128){
  return Math.floor(Math.random() * plusRange + min);
}

class Sprite_Ball {
  constructor() {

    this.vec_x = 4;
    this.vec_y = 0;
    this.gravity = 0.5;
    this.BALL_SIZE = 4;
    this.BALL_COLOR = "";
    this.BOUNCE_POWER = 16;

    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.BALL_COLOR = `rgb(${random_color()} ,${random_color()},${random_color()})`;
  }

  draw() {
    Game.ctx.fillStyle = this.BALL_COLOR;
    Game.ctx.beginPath();
    Game.ctx.arc(this.x, this.y, this.BALL_SIZE, 0, 2 * Math.PI);
    Game.ctx.fill();
  }
  handle_border(groundX) {
    // 扣除圖片的高度後實際的容許Y軸位置
    const borderRight = groundX - this.BALL_SIZE;
    const borderLeft = this.BALL_SIZE;
    // 地板判定
    if (this.vec_x > 0 && this.x >= borderRight || this.vec_x < 0 && this.x <= borderLeft) {
      this.vec_x = -this.vec_x;
    }
    this.x += this.vec_x;
  }
  handle_gravity(groundY) {
    // 扣除圖片的高度後實際的容許Y軸位置
    const bottomY = groundY - this.BALL_SIZE;
    // 地板判定
    if (this.y + this.vec_y >= bottomY && this.vec_y >= 0) {
      this.vec_y = -this.BOUNCE_POWER;
      this.y = bottomY;
      return true;
    }
    // 重力判定
    this.vec_y += this.gravity;
    this.y += this.vec_y;
    return false;
  }
}

var game = class {

  constructor() {
    // 掛載畫布
    this.initalizeCanvas();

    // 掛載事件
    this.canvas.addEventListener('click', this.onCanvasClick.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));

    // 場景初始化
    this.pressedKeys = {};
    this.balls = [];
    // 根據現在時間決定球數量
    for (var i = 0; i < new Date().getHours() * 5; i++) {
      this.balls.push(new Sprite_Ball());
    }

    window.requestAnimationFrame(this.update.bind(this));
  }

  
  // 初始化畫布
  initalizeCanvas() {
    this.canvas = document.getElementById('game');
    if (!this.canvas) { throw new Error('找不到畫布.'); }

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) { throw new Error('找不到Context.'); }

    console.log('畫布', this.canvas);
    console.log('Context', this.ctx);
  }

  // 更新畫布
  update() {
    // 設定畫布大小
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    for (var b of this.balls) {
      b.handle_border(window.innerWidth);
      b.handle_gravity(window.innerHeight);
      b.draw();
    }
    window.requestAnimationFrame(this.update.bind(this));
  }

  // 畫布點擊事件
  onCanvasClick(event) {
    // console.log(event);
    // this.playAudio(this.audio.snd_tada);
  }
  // 滑鼠移動事件
  onMouseMove(event) {
    //滑鼠請抓offsetX, offsetY
    /*if (event.offsetX || event.offsetY) {
      event.x = event.offsetX;
      event.y = event.offsetY;
    }*/
  }

  // 鍵盤點擊事件
  onKeyDown(event) {
    this.pressedKeys[event.code] = true;
  }

  onKeyUp(event) {
    this.pressedKeys[event.code] = false;
  }

  // 取得是否已按下按鍵(包含壓著)
  getPressed(key) {
    return this.pressedKeys[key];
  }

  // 繪製文字
  drawText(text, x, y, ...[args]) {
    this.ctx.font = `${args.size || 14}pt ${args.font || 'Arial'}`;
    this.ctx.textAlign = args.textAlign || 'start';
    this.ctx.fillStyle = args.color || 'white';

    this.ctx.textBaseline = 'top'
    return this.ctx.fillText(text, x, y);
  }


}

Game = new game();