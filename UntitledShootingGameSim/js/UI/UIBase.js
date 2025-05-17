class UIBase extends _UIBase {
  /**
   * 
   * @param {UntitledShootingGame} game 
   */
  /*constructor(game) {
    super(game);
  }*/
  /**
   * 讀取需要載入的素材
   */
  loadAssets() {
    return new Promise(resolve => {
      resolve();
    });
  }
  /**
   * 
   * @param {HTMLElement} parentContainer 
   */
  createElementAndAddToParent(parentContainer) {
    //#region 標題列
    const titleBarEl = document.createElement('div')
    titleBarEl.id = 'title-bar'
    titleBarEl.style.position = 'absolute';
    titleBarEl.style.width = '100%';
    titleBarEl.style.top = '0%';
    titleBarEl.style.display = 'flex';
    titleBarEl.style.flexDirection = 'column';
    titleBarEl.style.gap = '16px';
    //#endregion

    //#region 歌曲名稱
    const songNameEl = document.createElement('span');
    songNameEl.style.whiteSpace = 'nowrap';
    songNameEl.style.overflowX = 'hidden';
    songNameEl.style.textOverflow = 'ellipsis'
    songNameEl.style.color = 'white';
    songNameEl.style.background = 'rgba(0,0,0,0.5)';
    songNameEl.style.textAlign = 'center';
    songNameEl.style.border = '1px cyan solid';
    songNameEl.style.textShadow = '0px 4px black';
    songNameEl.innerText = 'Song Name';
    this.songNameEl = songNameEl;
    titleBarEl.appendChild(songNameEl);
    //#endregion

    //#region 進度條
    const playContainer = document.createElement('div');
    playContainer.style.display = 'flex';
    playContainer.style.flexDirection = 'row';
    playContainer.style.gap = '8px';
    playContainer.style.width = '100%';

    const playPauseButton = document.createElement('button');
    playPauseButton.innerText = '▶▐▐';
    playContainer.appendChild(playPauseButton);
    this.playPauseButton = playPauseButton;

    const optButton = document.createElement('button');
    optButton.innerText = 'Options';
    playContainer.appendChild(optButton);
    this.optButton = optButton;

    const songProgressEl = document.createElement('input')
    songProgressEl.type = 'range'
    songProgressEl.min = 0;
    songProgressEl.value = 0;
    songProgressEl.max = 0;
    songProgressEl.style.width = '100%';
    songProgressEl.style.background = 'rgba(0,0,0,0.5)';
    songProgressEl.style.border = '1px cyan solid';
    songProgressEl.disabled = true;
    songProgressEl.step = 1;
    this.songProgressEl = songProgressEl;
    playContainer.appendChild(songProgressEl);
    titleBarEl.appendChild(playContainer);
    //#endregion

    //#region BPM
    const metaAndScoreContainerEl = document.createElement('div')
    metaAndScoreContainerEl.style.display = 'flex';
    metaAndScoreContainerEl.style.flexDirection = 'row';
    metaAndScoreContainerEl.style.justifyContent = 'space-between';
    const metaContainer = document.createElement('table');
    metaContainer.innerHTML =
      `
      <tr>
        <td>BPM</td>
        <td id="bpm"><td>
      </tr>
      <tr>
        <td>Speed</td>
        <td id="high_speed"></td>
      </tr>
      <!--<tr >
        <td colSpan="2"> <input type="range" min="0.5" max="8.0" value="0" step="0.1"/>  </td>
      </tr>-->
    `
    metaContainer.style.border = '1px cyan solid';
    this.bpmEl = metaContainer.querySelector('td#bpm')
    this.highSpeedEl = metaContainer.querySelector('td#high_speed')
    // this.highSpeedRangeEl = metaContainer.querySelector('input[type="range"]');

    metaAndScoreContainerEl.appendChild(metaContainer);
    titleBarEl.appendChild(metaAndScoreContainerEl);
    //#endregion

    //#region 血條
    const gaugeElContainer = document.createElement('div')
    gaugeElContainer.style.display = 'flex';
    gaugeElContainer.style.flexDirection = 'row';
    gaugeElContainer.style.position = 'absolute';
    gaugeElContainer.style.height = '50%';
    gaugeElContainer.style.width = '64px';
    gaugeElContainer.style.bottom = '25%';
    gaugeElContainer.style.right = '10%';

    const gaugeEl = document.createElement('div')
    gaugeEl.style.background = 'linear-gradient(to bottom, #00000077 0% 50%, pink 50% 100%)';
    gaugeEl.style.border = '6px solid #CFD8DC';
    gaugeEl.style.height = '100%';
    gaugeEl.style.minWidth = '32px';

    const gaugeTextContainerEl = document.createElement('div')
    gaugeTextContainerEl.style.display = 'flex';
    gaugeTextContainerEl.style.flexDirection = 'column';
    gaugeTextContainerEl.style.justifyContent = 'space-between';
    gaugeTextContainerEl.style.width = '100%';
    gaugeTextContainerEl.style.height = '100%';

    const gaugeText = document.createElement('label')
    gaugeText.style.background = '#CFD8DC';
    gaugeText.style.rotate = '90deg';
    gaugeText.style.fontWeight = 'bolder';
    gaugeText.style.whiteSpace = 'nowrap';
    gaugeText.innerText = 'EFFECTIVE RATE';

    const gaugeDifficultyText = document.createElement('label')
    gaugeDifficultyText.style.background = '#CFD8DC';
    gaugeDifficultyText.style.rotate = '90deg';
    gaugeDifficultyText.innerText = 'O O O O O';
    gaugeDifficultyText.style.whiteSpace = 'nowrap';
    gaugeDifficultyText.style.fontWeight = 'bolder';


    gaugeTextContainerEl.appendChild(gaugeText);
    gaugeTextContainerEl.appendChild(gaugeDifficultyText);

    gaugeElContainer.appendChild(gaugeEl);
    gaugeElContainer.appendChild(gaugeTextContainerEl);
    parentContainer.appendChild(titleBarEl);
    parentContainer.appendChild(gaugeElContainer);

    //#endregion

    //#region 事件聆聽
    this.songProgressEl.addEventListener('change', this.onProgressBarChange.bind(this))

    this.playPauseButton.addEventListener('click', this.onPlayClick.bind(this))
    // this.highSpeedRangeEl.addEventListener('change', this.onHighSpeedChange.bind(this));
    this.optButton.addEventListener('click', () => this.game.Windows.find(f => {
      if (f instanceof Window_Base) {
        f.open();
      }
    }))
    //#endregion
  }
  /**
   * 
   * @param {number} delta 
   * @param {HTMLCanvasElement} canvas 
   * @param {UntitledShootingGame} game 
   */
  update(delta, canvas) {
    //#region 歌曲資訊同步
    if (this.game.chart) {
      if (this.songNameEl.innerText !== this.game.chart.meta.title) {
        this.songNameEl.innerText = this.game.chart.meta.title;
      }
      if (this.bpmEl.innerText !== String(this.game.BPM)) {
        this.bpmEl.innerText = String(this.game.BPM);
      }
    }

    //#endregion

    //#region 播放進度同步
    if (this.game.chartHowl && game.chartHowl.state() === 'loaded') {
      if (!Number(this.songProgressEl.max)) {
        this.songProgressEl.disabled = false;
        this.songProgressEl.max = this.game.chartHowl.duration() * 1000;
        // this.highSpeedRangeEl.value = this.game.highSpeed;
      }


    }
    else {
      this.songProgressEl.disabled = true;
      this.songProgressEl.max = 0;
    }
    //#endregion

    // 同步至進度條
    if (this.game.chartHowl?.playing(this.game.audioId.chartHowl)) {
      this.songProgressEl.value = this.game.chartHowl.seek(this.game.audioId.chartHowl) * 1000;
    }

    this.highSpeedEl.innerText = `x${this.game.highSpeed.toFixed(2)}`;
  }

  /**
 * @param {Event} ev;
 */
  onProgressBarChange(ev) {
    ev.preventDefault();
    console.log(ev)
    if (this.game.chartHowl && this.game.audioId.chartHowl) {
      this.game.chartHowl.pause(this.game.audioId.chartHowl);
      console.log(ev.target.value, this.game.audioId.chartHowl, this.game.chartHowl);
      this.game.chartHowl.seek(Number(ev.target.value) / 1000, this.game.audioId.chartHowl);
    }
  }

  onHighSpeedChange(ev) {
    ev.preventDefault();
    console.log(ev)
    this.game.highSpeed = Number(ev.target.value);
    this.highSpeedEl.innerText = `x${this.game.highSpeed.toFixed(1)}`;
  }
  onPlayClick() {
    if (!this.game.chartHowl) {
      return;
    }
    if (this.game.chartHowl.playing(this.game.audioId.chartHowl)) {
      this.game.chartHowl.pause(this.game.audioId.chartHowl);
    }
    else {
      this.game.chartHowl.play(this.game.audioId.chartHowl);
    }
  }
}