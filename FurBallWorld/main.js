var furBallWorld = furBallWorld || function () {
  var furBallImages = [];
  var furBalls = [];
  var canvas = null;
  var ctx = null;
  var furBallSpeed = 10;

  // 生產一隻毛球
  class FurBall {
    constructor(index) {
      if (index === undefined) {
        index = Math.floor(Math.random() * furBallImages.length);
      }
      this.image = furBallImages[index];
      this.x = 0;
      this.y = 0;
      this.rotate = 0;
      this.vecX = Math.random() * furBallSpeed + 1;
      this.vecY = Math.random() * furBallSpeed + 1;
      this.vecRotate = Math.random() * 3 + 1;
      console.log('生產了一隻毛球', this);
    }
    update() {
      this.rotate = (this.rotate + this.vecRotate) % 360;
      this.x += this.vecX;
      this.y += this.vecY;

      // 邊界偵測
      if ((this.x > canvas.width - this.image.width * 0.25) && (this.vecX > 0) || (this.x < this.image.width * 0.25 && this.vecX < 0)) {
        this.vecX *= -1;
      }
      if ((this.y > canvas.height - this.image.height * 0.25) && (this.vecY > 0) || (this.y < this.image.width * 0.25 && this.vecY < 0)) {
        this.vecY *= -1;
      }
      ctx.save();
      // rotate the canvas to the specified degrees
      ctx.setTransform(0.5, 0, 0, 0.5, this.x, this.y); // sets scale and origin
      ctx.rotate(this.rotate * Math.PI / 180);
      ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
      ctx.restore();
    }
  }
  // 初始化毛球圖片
  initalizeImages = function () {
    for (const img of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12', '13', '14', '15']) {
      let i = new Image()
      i.src = `./imgs/${img}.png`;
      // 讀取完後才放入毛球陣列中
      i.addEventListener("load", function () {
        furBallImages.push(i);
        console.log(`毛球 ${i.src} 讀取完畢.`);
      }, false);
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
	
	// 系統暗色模式支援
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		canvas.style.backgroundColor = '#303030';
	}

  }

  // 更新畫布
  update = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    furBalls.forEach(f => {
      f.update();
    });
    window.requestAnimationFrame(update);
  }

  // 畫布點擊事件
  onCanvasClick = function (event) {
    console.log(event);
    furBalls.push(new FurBall());
    console.log('毛球數量：', furBalls.length);
  }

  initalizeImages();
  initalizeCanvas();
  canvas.addEventListener('click', onCanvasClick);
  window.requestAnimationFrame(update);
}

furBallWorld();

