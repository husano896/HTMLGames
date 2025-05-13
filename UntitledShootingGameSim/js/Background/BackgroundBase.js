class BackgroundBase {
  constructor() {
    this.frame = 0;
  }

  /**
   * 讀取需要載入的素材
   */
  loadAssets() {
    return new Promise(async resolve => {
      resolve();
    });
  }
  /**
   * 
   * @param {HTMLElement} parentContainer 
   */
  createElement(parentContainer) {
    const el = document.createElement('div')
    el.style.position = 'absolute';
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.contain = 'content';

  }
  /**
   * 
   * @param {number} delta 
   * @param {HTMLCanvasElement} canvas 
   * @param {UntitledShootingGame} game 
   */
  update(delta, canvas, game) {
    if (!game.chartHowl || !game.chart?.BPM) {
      this.frame = 0;
      return;
    }

    if (!game.chartHowl.playing(game.audioId.chartHowl)) {
      return;
    }

    this.frame = (game.chartHowl.seek(game.audioId.chartHowl) * 1000) / 60000 / game.BPM;
  }
}