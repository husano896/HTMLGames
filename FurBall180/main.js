var furBallWorld = furBallWorld || function () {
  var furBall = null;
  var canvas = null;
  var ctx = null;
  var furBallSpeed = 1;

  // 生產一隻毛球
  class FurBall {
    constructor() {
      this.face = new Image();
      this.face.src = './face.png';
      this.ball = new Image();
      this.ball.src = './ball.png';
      this.rotate = 0;
      this.stop = false;
    }
    update() {
      if (!this.face.complete || !this.ball.complete) {
        return;
      }
      if (!this.stop) {
        this.rotate = (this.rotate + furBallSpeed) % 360;
      }
      ctx.save();
      // rotate the canvas to the specified degrees
      ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2); // sets scale and origin
      ctx.rotate(this.rotate * Math.PI / 180);
      ctx.drawImage(this.ball, -this.ball.width / 2, -this.ball.height / 2);
      ctx.restore();
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2); // sets scale and origin
      ctx.drawImage(this.face, -this.face.width / 2, -this.face.height / 2);
      ctx.restore();
    }
  }

  // 初始化畫布
  initalizeCanvas = function () {
    canvas = document.getElementById('furBallWorld');
    if (!canvas) { console.error('找不到畫布.'); return; }

    ctx = canvas.getContext('2d');
    if (!ctx) { console.error('找不到Context.'); return; }

    console.log('畫布', canvas);
    console.log('Context', ctx);

    furBall = new FurBall();

    canvas.addEventListener('click', onCanvasClick);
  }

  onCanvasClick = function() {
    furBall.stop = !furBall.stop;
  }
  // 更新畫布
  update = function () {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    furBall.update();
    window.requestAnimationFrame(update);
  }

  initalizeCanvas();
  window.requestAnimationFrame(update);
}

furBallWorld();
