class Background_Arrow {
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

  appendStylesToHeader() {
    /**
     * @type {HTMLStyleElement}
     */
    let gameBgEl = document.head.querySelector('style#game-bg');
    if (!gameBgEl) {
      gameBgEl = document.createElement('style');
      document.head.appendChild(gameBgEl);
    }

    gameBgEl.innerHTML = ``;
  }
  /**
   * 
   * @param {HTMLElement} parentContainer 
   */
  createElementAndAddToParent(parentContainer) {    
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