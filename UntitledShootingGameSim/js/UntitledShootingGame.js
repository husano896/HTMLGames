/**
 * @property {String} images
 */
class UntitledShootingGame {

  /**
   * @param {{canvas: HTMLCanvasElement}} ev
   */
  constructor({ canvas, songNameEl, progressBarEl }) {

    //#region 綁定HTML元素
    /**
      * @type {HTMLCanvasElement}
      * @public
    */
    this.canvas = canvas;
    /**
      * @type {HTMLElement}
      * @public
    */
    this.songNameEl = songNameEl;
    /**
      * @type {HTMLInputElement}
      * @public
    */
    this.progressBarEl = progressBarEl
    //#endregion

    /**
      * @type {CanvasRenderingContext2D}
      * @public
    */
    this.ctx = canvas.getContext('2d')

    /**
      * @type {{[imageName: string]: HTMLImageElement}}
      * @public
    */
    this.images = {};

    /**
      * @type {{[audioName: string]: Howl}}
      * @public
    */
    this.audio = {
      tick1: new Howl({ src: ['audio/tick1.mp3'], html5: true }),
      tick2: new Howl({ src: ['audio/tick2.mp3'], html5: true })
    }

    /**
      * @type {Howl}
      * @public
    */
    this.chartHowl = null;

    /**
      * @type {{[audioName: string]: Number}}
      * @public
    */
    this.audioId = {}
    /**
      * 左旋鈕指標現在在的位置，以左開始，範圍為0.0~1.0
      * @type {Number}
      * @public
    */
    this.cursorLPos = 0;
    /**
      * 右旋鈕指標現在在的位置，以左開始，範圍為0.0~1.0
      * @type {Number}
      * @public
    */
    this.cursorRPos = 1;

    /**
     * 目前讀取的譜面
     * @type {UntitledChart}
     * @public
     */
    this.chart = null;

    /** 
     * 目前壓住的按鍵 
     * @type {{[keyName:string] : boolean}}
    */
    this.keyPressed = {}

    /**
      * 繪製開始到現在的秒數
      * @type {Number}
      * @public
    */
    this.currentFrameTime = 0;

    this.rotateX = 15;
    this.rotateZ = 0;

    // 旋鈕渲染文字
    this.ctx.font = "90px Arial Black";
    this.ctx.textAlign = 'center'

    this.BTfillStyle = this.ctx.createLinearGradient(0, 0, 90, 0);
    this.BTfillStyle.addColorStop(0, '#CFD8DC');
    this.BTfillStyle.addColorStop(0.5, '#FAFAFA');
    this.BTfillStyle.addColorStop(1, '#CFD8DC');

    this.BTChipfillStyle = this.ctx.createLinearGradient(0, 0, 90, 0);
    this.BTChipfillStyle.addColorStop(0, '#FAFAFA');
    this.BTChipfillStyle.addColorStop(0.5, '#FAFAFA');
    this.BTChipfillStyle.addColorStop(1, '#FAFAFA');

    this.FXfillStyle = this.ctx.createLinearGradient(0, 0, 180, 0);
    this.FXfillStyle.addColorStop(0, '#FFA726AA');
    this.FXfillStyle.addColorStop(0.5, '#BF360CFF');
    this.FXfillStyle.addColorStop(1, '#FFA726AA');

    this.FXChipfillStyle = this.ctx.createLinearGradient(0, 0, 180, 0);
    this.FXChipfillStyle.addColorStop(0, '#FFA726');
    this.FXChipfillStyle.addColorStop(0.5, '#BF360C');
    this.FXChipfillStyle.addColorStop(1, '#FFA726');

    this.LaserLFillStyle = this.ctx.createLinearGradient(0, 0, 90, 0);
    this.LaserLFillStyle.addColorStop(0, '#42A5F5BB');
    this.LaserLFillStyle.addColorStop(0.5, '#1565C0FF');
    this.LaserLFillStyle.addColorStop(1, '#42A5F5BB');

    this.LaserRFillStyle = this.ctx.createLinearGradient(0, 0, 90, 0);
    this.LaserRFillStyle.addColorStop(0, '#EC407ABB');
    this.LaserRFillStyle.addColorStop(0.5, '#AD1457FF');
    this.LaserRFillStyle.addColorStop(1, '#EC407ABB');

    this.textFillStyle = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    this.textFillStyle.addColorStop(0, '#AAAAAA');
    this.textFillStyle.addColorStop(0.5, '#FFFFFF');
    this.textFillStyle.addColorStop(1, '#AAAAAA');
    this.ctx.lineWidth = 1;
    /**
     * @type {UntitledChart}
     */
    this.chart = null;

    this.highSpeed = 3.0;

    this.fixedTilt = null;

    //#region 事件聆聽
    document.addEventListener('focus', ev => ev.preventDefault());
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this))
    document.addEventListener('pointermove', this.onPointerMove.bind(this))
    document.addEventListener('drop', this.onDrop.bind(this))
    document.addEventListener('dragover', this.onDragOver.bind(this))
    //#endregion

    // 給外部註冊的callback
    /** 音檔讀取完成事件 */
    this._onAudioLoaded = [];
    /** 畫面更新事件 */
    this._onPostUpdate = [];
    //#region UI
    this.UI = new UIBase(this, document.querySelector('div#scene-play-UI'));
    //#endregion
  }

  /**
 * 
 * @param {HTMLElement} parentContainer 
 */
  createElementAndAddToParent(parentContainer) {

  }
  updateCamera() {
    // cameraEl.style.perspective = `${perspective}px`;

    /* rotateX越大, zoom-bottom越大 zoom-top越小*/
    /* rotateY為旋鈕導致的左右傾斜 */

    this.canvas.style.transform = `rotateX(${this.rotateX}deg) rotateY(0deg) rotateZ(${this.getTilt()}deg)`;
  }

  /**
   * 
   * @param {string} url
   * @returns {Promise<Image>} 
   */
  loadImage(name, url) {
    return new Promise(resolve => {
      const laneImage = new Image();
      laneImage.src = url;
      laneImage.onload = () => resolve([name, laneImage]);
    })
  }

  loadImages() {
    return Promise.all([
      this.loadImage('lane', 'imgs/lane.png'),
      this.loadImage('cursorl', 'imgs/cursorl.png'),
      this.loadImage('cursorr', 'imgs/cursorr.png'),
    ])
  }
  update(currentTime) {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const delta = currentTime - this.currentFrameTime;
    this.updateCamera()
    // 旋鈕敏感度
    const sensivity = 1 / 16 / 60;

    //#region 旋鈕按鍵處理 
    let keyVolLL = '1';
    let keyVolLR = '2';
    let keyVolRL = '9';
    let keyVolRR = '0';
    if (this.keyPressed[keyVolLL]) {
      this.cursorLPos = Math.max(0, Math.min(this.cursorLPos - delta * sensivity, 1));
    } else if (this.keyPressed[keyVolLR]) {
      this.cursorLPos = Math.max(0, Math.min(this.cursorLPos + delta * sensivity, 1));
    }
    if (this.keyPressed[keyVolRL]) {
      this.cursorRPos = Math.max(0, Math.min(this.cursorRPos - delta * sensivity, 1));
    } else if (this.keyPressed[keyVolRR]) {
      this.cursorRPos = Math.max(0, Math.min(this.cursorRPos + delta * sensivity, 1));
    }
    //#endregion

    //#region 長條判定處理
    //#endregion

    /** 繪製軌道 */
    this.ctx.drawImage(this.images.lane,
      this.canvas.width / 2 - this.images.lane.width / 2,
      0,
      this.images.lane.width,
      this.canvas.height
    )

    /** 繪製譜面 */
    if (this.chart && this.chartHowl) {
      const seeTime = this.BPM ? 4000 / (this.highSpeed) : 1000;
      const audioPos = this.chartHowl.seek(this.audioId.chartHowl) * 1000 || 0;
      const endTimePos = audioPos + seeTime;
      const baseBPM = this.chart.BPM[0][1];
      //#region 長鍵渲染
      const longNoteFilter = note => note[1] && note[0] >= audioPos - note[1]
      // 以變速將繪製的長Note分段
      const longSegmentsByNote = note => {

      }
      /**
       * 
       * @param {[number,number][]} noteArr
       * @param {number} lane FX第幾軌道  
       */
      const fxLongRenderer = (noteArr, lane) => {
        noteArr.filter(longNoteFilter).forEach(note => {
          const timeDiff = note[0] - audioPos;
          const lengthToHeight = this.canvas.height * note[1] / seeTime;
          this.ctx.fillRect(
            this.canvas.width / 2 - this.images.lane.width / 2 + 90 + 180 * lane,
            this.canvas.height * (1 - timeDiff / seeTime),
            180,
            -lengthToHeight);
        });
      }

      /**
       * 
       * @param {[number,number][]} noteArr
       * @param {number} lane BT第幾軌道  
       */
      const btLongRenderer = (noteArr, lane) => {
        noteArr.filter(longNoteFilter).forEach(note => {
          const timeDiff = note[0] - audioPos;
          const lengthToHeight = this.canvas.height * note[1] / seeTime;
          this.ctx.fillRect(
            this.canvas.width / 2 - this.images.lane.width / 2 + 90 + 5 + 90 * lane,
            this.canvas.height * (1 - timeDiff / seeTime),
            80,
            -lengthToHeight);
        });
      }

      // 橘鍵
      this.ctx.fillStyle = this.FXfillStyle;
      fxLongRenderer.bind(this)(this.chart.fxL, 0);
      fxLongRenderer.bind(this)(this.chart.fxR, 1);

      // 白鍵
      this.ctx.fillStyle = this.BTfillStyle;
      btLongRenderer.bind(this)(this.chart.btA, 0);
      btLongRenderer.bind(this)(this.chart.btB, 1);
      btLongRenderer.bind(this)(this.chart.btC, 2);
      btLongRenderer.bind(this)(this.chart.btD, 3);
      //#endregion


      //#region 旋鈕渲染

      // 若目前時間為 該節點位置與他至下個節點之中間時，繪製
      this.chart.laserL.forEach((note, index, arr) => {

        const nextNote = this.chart.laserL[index + 1];
        if (!nextNote) {
          return;
        }
        if (note[0] > endTimePos || nextNote[0] < audioPos) {
          return;
        }
        // 不繪製結束節點
        if (note[2] === 2) {
          return;
        }

        this.ctx.fillStyle = this.LaserLFillStyle

        const timeDiff = note[0] - audioPos;
        const lengthToHeight = this.canvas.height * (nextNote[0] - note[0]) / seeTime;

        // 2x範圍標籤
        const laserStartXPos = note[3] ? 0 : this.canvas.width / 2 - this.images.lane.width / 2;
        const laneWidth = (note[3] ? this.images.lane.width * 2 : this.images.lane.width);

        // 起始點繪製
        if (note[2] === 1) {
          if (nextNote[0] - note[0] === 0) {
            this.ctx.fillRect(
              laserStartXPos + (laneWidth - 90) * note[1],
              this.canvas.height * (1 - timeDiff / seeTime) + 90,
              90,
              -90);
          }
          this.ctx.fillStyle = this.textFillStyle;
          this.ctx.fillText('L',
            laserStartXPos + (laneWidth - 90) * note[1] + 45,
            this.canvas.height * (1 - timeDiff / seeTime) + 90)
        }
        // 直角
        this.ctx.fillStyle = this.LaserLFillStyle
        if (nextNote?.[0] === note[0]) {
          this.ctx.fillRect(
            laserStartXPos + (laneWidth) * note[1],
            this.canvas.height * (1 - timeDiff / seeTime),
            laneWidth * (nextNote[1] - note[1]),
            -30);
          // 若下一節點為結束時，額外繪製
          if (nextNote?.[2] === 2) {
            this.ctx.fillRect(
              laserStartXPos + (laneWidth - 90) * nextNote[1],
              this.canvas.height * (1 - timeDiff / seeTime),
              90,
              Math.max(-120, -60 * this.highSpeed));
          }
        }
        else {
          this.ctx.beginPath();
          // 左下
          this.ctx.moveTo(
            laserStartXPos + (laneWidth - 90) * note[1],
            this.canvas.height * (1 - timeDiff / seeTime));
          // 右下
          this.ctx.lineTo(
            laserStartXPos + (laneWidth - 90) * note[1] + 90,
            this.canvas.height * (1 - timeDiff / seeTime));
          // 右上
          this.ctx.lineTo(
            laserStartXPos + (laneWidth - 90) * nextNote[1] + 90,
            this.canvas.height * (1 - timeDiff / seeTime) - lengthToHeight);
          // 左上
          this.ctx.lineTo(
            laserStartXPos + (laneWidth - 90) * nextNote[1],
            this.canvas.height * (1 - timeDiff / seeTime) - lengthToHeight);
          this.ctx.closePath();
          this.ctx.fill();
        }

      });

      // 若目前時間為 該節點位置與他至下個節點之中間時，繪製
      this.chart.laserR.forEach((note, index, arr) => {

        const nextNote = this.chart.laserR[index + 1];
        if (!nextNote) {
          return;
        }
        if (note[0] > endTimePos || nextNote[0] < audioPos) {
          return;
        }

        // 不繪製結束節點
        if (note[2] === 2) {
          return;
        }

        this.ctx.fillStyle = this.LaserRFillStyle;

        const timeDiff = note[0] - audioPos;
        const lengthToHeight = this.canvas.height * (nextNote[0] - note[0]) / seeTime;

        // 2x範圍標籤
        const laneWidth = note[3] ? this.images.lane.width * 2 : this.images.lane.width;
        const laserStartXPos = note[3] ? 0 : this.canvas.width / 2 - this.images.lane.width / 2;
        // 起始點繪製
        if (note[2] === 1) {

          if (nextNote[0] - note[0] === 0) {
            this.ctx.fillRect(
              laserStartXPos + (laneWidth - 90) * note[1],
              this.canvas.height * (1 - timeDiff / seeTime) + 90,
              90,
              -90);
          }

          this.ctx.fillStyle = this.textFillStyle;
          this.ctx.fillText('R',
            laserStartXPos + (laneWidth - 90) * note[1] + 45,
            this.canvas.height * (1 - timeDiff / seeTime) + 90)

        }

        this.ctx.fillStyle = this.LaserRFillStyle;
        // 直角
        if (nextNote?.[0] === note[0]) {
          this.ctx.fillRect(
            laserStartXPos + (laneWidth) * note[1],
            this.canvas.height * (1 - timeDiff / seeTime),
            laneWidth * (nextNote[1] - note[1]),
            -30);
          // 若下一節點為結束時，額外繪製
          if (nextNote?.[2] === 2) {
            this.ctx.fillRect(
              laserStartXPos + (laneWidth - 90) * nextNote[1],
              this.canvas.height * (1 - timeDiff / seeTime),
              90,
              Math.max(-120, -60 * this.highSpeed));
          }
        }
        else {
          this.ctx.beginPath();
          this.ctx.moveTo(
            laserStartXPos + (laneWidth - 90) * note[1],
            this.canvas.height * (1 - timeDiff / seeTime));
          this.ctx.lineTo(
            laserStartXPos + (laneWidth - 90) * note[1] + 90,
            this.canvas.height * (1 - timeDiff / seeTime));
          this.ctx.lineTo(
            laserStartXPos + (laneWidth - 90) * nextNote[1] + 90,
            this.canvas.height * (1 - timeDiff / seeTime) - lengthToHeight);
          this.ctx.lineTo(
            laserStartXPos + (laneWidth - 90) * nextNote[1],
            this.canvas.height * (1 - timeDiff / seeTime) - lengthToHeight);
          this.ctx.closePath();
          this.ctx.fill();
        }
      });

      //#endregion


      //#region 短鍵渲染
      const chipNoteFilter = note => !note[1] && note[0] >= audioPos && note[0] <= endTimePos
      /**
       * 
       * @param {[number,number][]} noteArr
       * @param {number} lane FX第幾軌道  
       */
      const fxChipRenderer = (noteArr, lane) => {
        noteArr.filter(chipNoteFilter).forEach(note => {
          const timeDiff = note[0] - audioPos;
          this.ctx.fillRect(
            this.canvas.width / 2 - this.images.lane.width / 2 + 90 + lane * 180,
            this.canvas.height * (1 - timeDiff / seeTime),
            180,
            -30);
        });
      }
      /**
       * 
       * @param {[number,number][]} noteArr
       * @param {number} lane BT第幾軌道  
       */
      const btChipRenderer = (noteArr, lane) => {
        // 白鍵
        noteArr.filter(chipNoteFilter).forEach(note => {
          const timeDiff = note[0] - audioPos;
          this.ctx.fillRect(
            this.canvas.width / 2 - this.images.lane.width / 2 + 90 + 5 + 90 * lane,
            this.canvas.height * (1 - timeDiff / seeTime),
            80,
            -20);
        });
      }
      // 橘鍵
      this.ctx.fillStyle = this.FXChipfillStyle;
      fxChipRenderer(this.chart.fxL, 0);
      fxChipRenderer(this.chart.fxR, 1);

      // 白鍵
      this.ctx.fillStyle = this.BTChipfillStyle;
      btChipRenderer.bind(this)(this.chart.btA, 0)
      btChipRenderer.bind(this)(this.chart.btB, 1)
      btChipRenderer.bind(this)(this.chart.btC, 2)
      btChipRenderer.bind(this)(this.chart.btD, 3)

      //#endregion 


      const currentLaserLPos = this.currentLaserLPos;
      const currentLaserRPos = this.currentLaserRPos;

      // AUTO模式下跟隨旋鈕
      if (true) {
        if (currentLaserLPos[0] !== -1) {
          this.cursorLPos = currentLaserLPos[0];
        }

        if (currentLaserRPos[0] !== -1) {
          this.cursorRPos = currentLaserRPos[0];
        }
      }

      this.ctx.strokeStyle = this.LaserLFillStyle;
      this.ctx.lineWidth = 8;
      // 若目前沒有左旋鈕，不顯示指標
      if (currentLaserLPos[0] !== -1) {

        const laserStartXPos = currentLaserLPos[2] ? 0 : this.canvas.width / 2 - this.images.lane.width / 2;
        const laneWidth = (currentLaserLPos[2] ? this.images.lane.width * 2 : this.images.lane.width);
        /** 繪製旋鈕位置 */
        this.ctx.drawImage(this.images.cursorl,
          laserStartXPos + (laneWidth - this.images.cursorl.width) * this.cursorLPos,
          this.canvas.height - this.images.cursorl.height
        );

        this.ctx.beginPath();
        /** 旋鈕外圈 */
        this.ctx.arc(
          laserStartXPos + (laneWidth) * this.cursorLPos,
          this.canvas.height - this.images.cursorl.height,
          this.images.cursorl.width * (1 - 0.2 * Math.sin(audioPos * this.BPM / 2000 / Math.PI)),
          0, 2 * Math.PI);
        this.ctx.stroke();
      }

      this.ctx.strokeStyle = this.LaserRFillStyle;
      // 若目前沒有右旋鈕，不顯示指標
      if (currentLaserRPos[0] !== -1) {

        const laserStartXPos = currentLaserRPos[2] ? 0 : this.canvas.width / 2 - this.images.lane.width / 2;
        const laneWidth = (currentLaserRPos[2] ? this.images.lane.width * 2 : this.images.lane.width);

        this.ctx.drawImage(this.images.cursorr,
          laserStartXPos + (laneWidth - this.images.cursorr.width) * this.cursorRPos,
          this.canvas.height - this.images.cursorr.height
        );

        this.ctx.beginPath();
        /** 旋鈕外圈 */
        this.ctx.arc(
          laserStartXPos + (laneWidth) * this.cursorRPos,
          this.canvas.height - this.images.cursorr.height,
          this.images.cursorr.width * (1 - 0.2 * Math.sin(audioPos * this.BPM / 2000 / Math.PI)),
          0, 2 * Math.PI);
        this.ctx.stroke();
        // 
      }

    }
    // filter

    if (this.filter) {
      this.filter.frequency.value = Math.max(currentLaserLPos[0], currentLaserRPos[0], 0);
    }
    this.UI.update(delta, this.canvas);

    this._onPostUpdate.forEach(e => e());
    this.currentFrameTime = currentTime;
    requestAnimationFrame(this.update.bind(this));
  }

  judgeKey(key) {
    let keyA = 'a';
    let keyB = 'b';
    let keyC = 'c';
    let keyD = 'd';
    let keyL = 'j';
    let keyR = 'i';
    switch (key) {
      case keyA:
        this.audio.tick1.play();
        break;
      case keyB:
        this.audio.tick1.play();
        break;
      case keyC:
        this.audio.tick1.play();
        break;
      case keyD:
        this.audio.tick1.play();
        break;
      case keyL:
        this.audio.tick2.play();
        break;
      case keyR:
        this.audio.tick2.play();
        break;
    }
  }


  async FullScreen() {
    // make the element go to full-screen mode
    document.body.requestFullscreen()
      .then(function () {
        // element has entered fullscreen mode successfully
        document.body.requestPointerLock();
      })
      .catch(function (error) {
        // element could not enter fullscreen mode
      });
  }


  getTilt() {
    if (this.fixedTilt != null) {
      return this.fixedTilt;
    }
    const lp = this.currentLaserLPos;
    const l = lp[1] && lp[0] !== -1 ? lp[0] : 0;
    const rp = this.currentLaserRPos;
    const r = rp[1] && rp[0] !== -1 ? rp[0] : 1;
    const tilt = l - (1 - r);
    return tilt * 5;
  }


  /**
   * 以Note時間取得該Note所在的BPM 
   * @param {number} notePos note時間
   * @returns number
   */
  getBPMByNotePos(notePos) {
    if (!this.chart?.BPM?.length) {
      return 0;
    }
    return this.chart.BPM.findLast(b => notePos >= b[0])?.[1] || 0;
  }
  //#region Document聆聽事件
  /**
   * @param {KeyboardEvent} ev
   */
  onKeyDown(ev) {
    ev.preventDefault();
    switch (ev.key) {
      case 'ArrowUp':
        this.rotateX -= 0.1;
        break;
      case 'ArrowDown':
        this.rotateX += 0.1;
        break;
      case 'ArrowLeft':
        this.highSpeed -= 0.1;
        break;
      case 'ArrowRight':
        this.highSpeed += 0.1;
        break;
      case ' ':
        if (this.chartHowl) {
          if (this.audioId.chartHowl && this.chartHowl.playing(this.audioId.chartHowl)) {
            this.chartHowl.pause();
          }
          else {
            this.audioId.chartHowl = this.chartHowl.play();
          }
        }
        break;
    }
    this.keyPressed[ev.key] = true;

    this.judgeKey(ev.key);
  }

  /**
   * @private 
   * @param {KeyboardEvent} ev
   */
  onKeyUp(ev) {
    this.keyPressed[ev.key] = false;
  }

  onPointerMove(ev) {
    ev.preventDefault();
    // console.log(ev);
    // 全螢幕模式下還是會輸出movementXY！
    // laserLVal = Math.max(0, Math.min(laserLVal + ev.movementX, 1000));
    // laserRVal = Math.max(0, Math.min(laserRVal + ev.movementY, 1000));
    //laserLVal = Math.max(0, Math.min(ev.clientX, 1000));
    // laserRVal = Math.max(0, Math.min(ev.clientY, 1000));

    // this.cursorLPos = Math.max(0, Math.min(this.cursorLPos - delta * sensivity, 1));

  }

  /**
   * 檔案拖拉事件
   * @param {DragEvent} ev
   */
  onDrop(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach(async (item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
          console.log(file);
          if (file.name.endsWith('.ksh')) {
            const chart = UntitledChart.createFromKSHString(await file.text())
            this.chart = chart;
            console.log(this.chart)
          } else if (file.name.endsWith('.vox')) {
            const chart = UntitledChart.createFromVOXString(await file.text())
            this.chart = chart;
            console.log(this.chart)

          } else if (file.name.endsWith('.mp3') || file.name.endsWith('.ogg')) {
            this.chartHowl = new Howl({
              src: URL.createObjectURL(
                new Blob([await file.arrayBuffer()], { type: file.type }),
              ),
              format: file.name.slice(file.name.lastIndexOf('.') + 1)
            })
            console.log(this.chartHowl);


            this.chartHowl.once('load', () => {
              console.log(ev);
              console.log(this.chartHowl);
              this.audioCtx = Howler.ctx;
              this.audioId.chartHowl = this.chartHowl.play();
              this.chartHowl.pause(this.audioId.chartHowl);
              Howler.masterGain.connect(this.filter)
              this.filter = this.audioCtx.createBiquadFilter();
              this.filter.type = 'bandpass';
              this.filter.connect(this.ctx.destination);
              // 事件推送
              this._onAudioLoaded.forEach(e => e());
            })
          }
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }

  onDragOver(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  //#endregion


  async Start() {
    console.log('loading Start')
    const loadedImages = await this.loadImages();
    this.images = Object.fromEntries(loadedImages);
    console.log(this.images)
    console.log('loading End');

    this.update();
  }

  /**
   * 給予外部插件聆聽事件
   * @param {*} event 
   * @param {Function} callback 
   */
  addEventListener(event, callback) {
    switch (event) {
      case 'audioLoaded': {
        this._onAudioLoaded.push(callback)
      }
    }
  }
  //#region GET區
  get songPos() {
    return this.chartHowl?.seek(this.audioId.chartHowl) * 1000 || 0;
  }

  get BPM() {
    if (!this.chart) {
      return 0;
    }
    const bpmNote = this.chart.BPM.findLast(b => this.songPos >= b[0])?.[1] || 0;
    if (!bpmNote) {
      console.warn('目前無BPM Note, 這不應該發生！');
    }
    return bpmNote;
  }

  get currentLaserLPos() {

    if (!this.chart) {
      return [-1, false, false];
    }

    const endNoteIndex = this.chart.laserL.findIndex(l => l[0] >= this.songPos);
    if (endNoteIndex <= 0) {
      return [-1, false, false];
    }
    const startNoteIndex = endNoteIndex - 1;
    const startNote = this.chart.laserL[startNoteIndex];
    if (startNote[2] === 2) {
      return [-1, false, false];
    }
    const endNote = this.chart.laserL[endNoteIndex];
    const timeDiff = endNote[0] - startNote[0];

    return [
      // 位置
      (startNote[1] * (timeDiff + startNote[0] - this.songPos) + endNote[1] * (timeDiff + this.songPos - endNote[0])) / timeDiff,
      // 是否生效（開始前)
      true,
      // 出界
      startNote[3]
    ]
  }

  get currentLaserRPos() {

    if (!this.chart) {
      return [-1, false, false];
    }
    const endNoteIndex = this.chart.laserR.findIndex(l => l[0] >= this.songPos);
    if (endNoteIndex <= 0) {
      return [-1, false, false];
    }
    const startNoteIndex = endNoteIndex - 1;
    const startNote = this.chart.laserR[startNoteIndex];
    if (startNote[2] === 2) {
      return [-1, false, false];
    }
    const endNote = this.chart.laserR[endNoteIndex];
    const timeDiff = endNote[0] - startNote[0];

    return [
      // 位置
      (startNote[1] * (timeDiff + startNote[0] - this.songPos) + endNote[1] * (timeDiff + this.songPos - endNote[0])) / timeDiff,
      // 是否生效
      true,
      // 出界
      startNote[3]
    ]
  }
  //#endregion
}
