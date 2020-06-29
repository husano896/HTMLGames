var game = class {

  canvas = null;
  ctx = null;
  $scene = null;
  audio = {
    'snd_tada': './audio/tada.wav'
  };
  pressedKeys = {};
  // 初始化畫布
  initalizeCanvas = function () {
    this.canvas = document.getElementById('game');
    if (!this.canvas) { console.error('找不到畫布.'); return; }

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) { console.error('找不到Context.'); return; }

    console.log('畫布', this.canvas);
    console.log('Context', this.ctx);
  }

  // 更新畫布
  update = function () {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.$scene) {
      this.$scene.update(this);
    }
    window.requestAnimationFrame(this.update.bind(this));
  }

  // 畫布點擊事件
  onCanvasClick = function (event) {
    console.log(event);
    this.playAudio(this.audio.snd_tada);
  }

  // 鍵盤點擊事件
  onKeyDown = function(event) {
    console.log(event);
    this.pressedKeys[event.key] = true;
  }

  onKeyUp = function(event) {
    console.log(event);
    this.pressedKeys[event.key] = false;
  }

  // 取得是否已按下按鍵(包含壓著)
  getPressed = function(key) {
    return this.pressedKeys[key];
  }

  // 播放聲音
  playAudio = function (fileName) {
    const a = new Audio(fileName);
    a.play();
    return a;
  }

  // 繪製文字
  drawText = function (text, x, y, ...[args]) {
    if (args.size) {
      this.ctx.font = `${args.size}pt ${args.font ? args.font : 'Arial'}`;
    }
    if (args.textAlign) {
      this.ctx.textAlign = args.textAlign;
    }
    if (args.color) {
      this.ctx.fillStyle = args.color;
    }
    this.ctx.textBaseline = 'top'
    return this.ctx.fillText(text, x, y);
  }

  constructor() {
  // 掛載畫布
  this.initalizeCanvas();

  // 掛載事件
  this.canvas.addEventListener('click', this.onCanvasClick.bind(this));
  document.addEventListener('keydown', this.onKeyDown.bind(this));
  document.addEventListener('keyup', this.onKeyUp.bind(this));

  window.requestAnimationFrame(this.update.bind(this));
  }

}
