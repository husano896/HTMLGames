var game = class {

  // 畫面大小常數
  get WIDTH() { return 800; }
  get HEIGHT() { return 600; }

  get $scene() {
    return this._scene;
  };

  set $scene(newScene) {
    if (this._scene) {
      this._scene.destroy();
    }
    this._scene = newScene;
  }

  pressedKeys = {};
  // 初始化畫布
  initalizeCanvas() {
    this.canvas = document.getElementById('game');
    if (!this.canvas) { throw new Error('找不到畫布.'); }

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) { throw new Error('找不到Context.'); }

    // 設定畫布大小
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;

    console.log('畫布', this.canvas);
    console.log('Context', this.ctx);
  }

  // 更新畫布
  update() {
    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if (this._scene) {
      this._scene.update();
    }
    window.requestAnimationFrame(this.update.bind(this));
  }

  // 畫布點擊事件
  onCanvasClick(event) {
    // console.log(event);
    // this.playAudio(this.audio.snd_tada);
    if (this._scene)
      this._scene.onClick(event);
  }
  // 滑鼠移動事件
  onMouseMove(event) {
    //滑鼠請抓offsetX, offsetY
    /*if (event.offsetX || event.offsetY) {
      event.x = event.offsetX;
      event.y = event.offsetY;
    }*/
    // 觸碰螢幕?
    if (this._scene)
      this._scene.onMouseMove(event);
  }

  // 鍵盤點擊事件
  onKeyDown(event) {
    // console.log(event);
    this.pressedKeys[event.code] = true;
    if (this._scene)
      this._scene.onKeyDown(event);
  }

  onKeyUp(event) {
    // console.log(event);
    this.pressedKeys[event.code] = false;
    if (this._scene)
      this._scene.onKeyUp(event);
  }

  // 取得是否已按下按鍵(包含壓著)
  getPressed(key) {
    return this.pressedKeys[key];
  }

  // 播放聲音
  playAudio(fileName) {
    const a = new Audio(fileName);
    a.play();
    return a;
  }

  // 繪製文字
  drawText(text, x, y, ...[args]) {
    this.ctx.font = `${args.size || 14}pt ${args.font || 'Arial'}`;
    this.ctx.textAlign = args.textAlign || 'start';
    this.ctx.fillStyle = args.color || 'white';

    this.ctx.textBaseline = 'top'
    return this.ctx.fillText(text, x, y);
  }
  // 繪製圖像
  drawImage(image, x, y, alpha = 1.0, ...[args]) {
    this.ctx.globalAlpha = alpha;
    let align = args?.align || 'left-top';
    let srcX = args?.srcX || 0;
    let srcY = args?.srcY || 0;
    let srcWidth = args?.srcWidth || image.width;
    let srcHeight = args?.srcHeight || image.height;
    let dstWidth = args?.dstWidth || srcWidth;
    let dstHeight = args?.dstHeight || srcHeight;
    switch (align) {
      case 'center':
        this.ctx.drawImage(image, x - dstWidth / 2, y - dstHeight / 2);
        break;
      default:
        this.ctx.drawImage(image, srcX, srcY, srcWidth, srcHeight, x, y, dstWidth, dstHeight);
        break;
    }
    this.ctx.globalAlpha = 1.0;
  }

  constructor() {
    // 掛載畫布
    this.initalizeCanvas();

    // 掛載事件
    this.canvas.addEventListener('click', this.onCanvasClick.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));

    window.requestAnimationFrame(this.update.bind(this));
  }

}
