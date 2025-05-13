/** 譜面格式 */
class UntitledChart {
  /**
   * @param {string} rawText
   */
  constructor(rawText) {
    this.laserL = [];
    this.btA = [];
    this.btB = [];
    this.btC = [];
    this.btD = [];
    this.fxL = [];
    this.fxR = [];
    this.laserR = [];
    this.camera = [];
    /**
     * @type {[number,number][]}
     */
    this.BPM = [];
    this.beats = [];
    this.meta = {}

    /** @type {string} */
    this.laserPosString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmno'
  }

  /**
   * 自K-Shoot MANIA 相容檔案中讀取譜面資料
   * @param {string} str
   */
  static createFromKSHString(str) {
    const _this = new UntitledChart();

    /**
     * 以換行做間隔的文字
     * @type {string[]}
     */
    const data = str.replaceAll('\r\n', '\n').replaceAll('\r', '\n').split('\n');

    /**
     * 小節線, 0時為譜面資訊
     */
    let measures = 0;
    let currentTime = 0;
    let noteDivisionCountPos = 0;
    /**
     * @type {string[]}
     */
    let measureBuffer = [];
    let currentBPM = 0;
    let currentBeat = [4, 4];
    let longDivTime = 0;
    let longLength = [0, 0, 0, 0, 0, 0, 0, 0];
    let laserL2xFlag = false;
    let laserR2xFlag = false;

    /**
     * 
     * @param {string} input 
     * @param {number} longLengthIndex
     * @param {Array<[number, number]>} noteArr  
     */
    function HandleBT(input, noteArr, longLengthIndex) {
      switch (input) {
        case '0':
          if (longLength[longLengthIndex] > 0) {
            noteArr.push([currentTime - longLength[longLengthIndex], longLength[longLengthIndex]])
            longLength[longLengthIndex] = 0;
          }
          break;
        case '1':
          if (longLength[longLengthIndex] > 0) {
            noteArr.push([currentTime - longLength[longLengthIndex], longLength[longLengthIndex]])
            longLength[longLengthIndex] = 0;
          }
          noteArr.push([currentTime, 0])
          break;
        case '2':
          longLength[longLengthIndex] += longDivTime;
          break;
      }
    }

    /**
     * 
     * @param {string} input 
     * @param {number} longLengthIndex
     * @param {Array<[number, number]>} noteArr  
     */
    function HandleFX(input, noteArr, longLengthIndex) {
      switch (input) {
        case '0':
          if (longLength[longLengthIndex] > 0) {
            noteArr.push([currentTime - longLength[longLengthIndex], longLength[longLengthIndex]])
            longLength[longLengthIndex] = 0;
          }
          break;
        case '1':
          if (longLength[longLengthIndex] > 0) {
            noteArr.push([currentTime - longLength[longLengthIndex], longLength[longLengthIndex]])
            longLength[longLengthIndex] = 0;
          }
          longLength[longLengthIndex] += longDivTime;
          break;
        case '2':
          noteArr.push([currentTime, 0])
          break;
      }
    }


    //#region 處理每行資訊
    data.forEach(row => {

      //#region 小節線
      if (row === '--') {
        measures++;
        noteDivisionCountPos = 0;
        //#region 譜面資料
        // 要把小節分成幾等份
        const noteDivisionCount = measureBuffer.filter(b => b.split('|').length === 3).length;
        longDivTime = currentBPM > 0 ? 60000 / currentBPM * currentBeat[0] / noteDivisionCount : 0;
        measureBuffer.forEach((b) => {
          // 參數設定
          if (b.includes('=')) {

            const [key, value] = b.split('=')
            switch (key) {
              case 'beat':
                currentBeat = value.split('/').map(v => Number(v))
                break;
              case 't':
                console.log('set bpm', value)
                currentBPM = Number(value)
                _this.BPM.push([currentTime, currentBPM]);
                longDivTime = currentBPM > 0 ? 60000 / currentBPM * currentBeat[0] / noteDivisionCount : 0;
                break;
              case 'zoom_top':
              case 'zoom_bottom':
              case 'tilt':
                _this.camera.push([currentTime, key, value])
                break;
              case 'laserrange_l':
                laserL2xFlag = true;
                break;
              case 'laserrange_r':
                laserR2xFlag = true;
                break;
              case 'filtertype':
                break;
            }
          }
          // Note資料
          else if (b.split('|').length === 3) {
            HandleBT(b[0], _this.btA, 0);
            HandleBT(b[1], _this.btB, 1);
            HandleBT(b[2], _this.btC, 2);
            HandleBT(b[3], _this.btD, 3);

            HandleFX(b[5], _this.fxL, 4);
            HandleFX(b[6], _this.fxR, 5);
            // LaserL

            const lastLaserLNote = _this.laserL[_this.laserL.length - 1];
            switch (b[8]) {
              case ':': {
                break;
              }
              case '-': {
                // 旋鈕結束, 調整最後一個旋鈕節點的開始結束標記
                if (lastLaserLNote && lastLaserLNote[2] !== 2) {
                  lastLaserLNote[2] = 2;
                }
                laserL2xFlag = false;
                break;
              }
              default: {
                const laserPosToNumber = _this.laserPosString.indexOf(b[8]) / (_this.laserPosString.length - 1)

                // ksh直角判定, 64分+前兩個為node時
                const isSlam = lastLaserLNote && (Math.abs(currentTime - lastLaserLNote[0] - longDivTime * noteDivisionCount / 32) < 1)

                _this.laserL.push([
                  isSlam && lastLaserLNote[2] !== 2 ? lastLaserLNote[0] : currentTime,
                  laserPosToNumber,
                  (!lastLaserLNote || lastLaserLNote[2] === 2) ? 1 : 0,
                  laserL2xFlag
                ])
              }
            }
            const lastLaserRNote = _this.laserR[_this.laserR.length - 1];
            switch (b[9]) {
              case ':': {
                break;
              }
              case '-': {
                // 旋鈕結束, 調整最後一個旋鈕節點的開始結束標記
                if (lastLaserRNote && lastLaserRNote[2] !== 2) {
                  lastLaserRNote[2] = 2;
                }
                laserR2xFlag = false;
                break;
              }
              default: {
                const laserPosToNumber = _this.laserPosString.indexOf(b[9]) / (_this.laserPosString.length - 1)

                // ksh直角判定, 64分+前兩個為node時
                const isSlam = lastLaserRNote && (Math.abs(currentTime - lastLaserRNote[0] - longDivTime * noteDivisionCount / 32) < 1)
                _this.laserR.push([
                  isSlam && lastLaserRNote[2] !== 2 ? lastLaserRNote[0] : currentTime,
                  laserPosToNumber,
                  (!lastLaserRNote || lastLaserRNote[2] === 2) ? 1 : 0,
                  laserR2xFlag
                ])
              }
            }
            // LaserR
            // 處理下一個間格
            //  console.log(currentTime, currentBPM, currentBeat, noteDivisionCount, longDivTime)
            if (longDivTime === 0) {
              console.warn('longDivTime = 0!')
            }
            currentTime += longDivTime;
            noteDivisionCountPos++;
          }
          //#endregion
        })
        // 處理譜面資料
        measureBuffer = [];
      }
      //#endregion
      //#region 處理meta
      else if (measures === 0) {
        const [key, value] = row.split('=')
        _this.meta[key] = value;
        // BPM偵測，若非變速時BPM只會記錄在這
        if (key === 't' && !value.includes('-')) {
          _this.BPM.push([0, Number(value)])
          currentBPM = Number(value);
        }
      }
      //#endregion
      else {
        measureBuffer.push(row);
      }
    });
    //#endregion
    console.log('currentTime', currentTime);
    return _this;
  }

  /**
   * 自K-Shoot MANIA 相容檔案中讀取譜面資料
   * @param {string} str 
   */
  static createFromVOXString(str) {
    const _this = new UntitledChart();

    throw new Error('尚未實作完成！')
    return _this;
  }
}