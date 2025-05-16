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

    gameBgEl.innerHTML = `
        .game-bg-arrow-left {
      width: 50%;
      height: auto;
      background-image: url(imgs/bg_arrow.png);
      background-repeat: repeat-x;
      background-size: 200% 100%;
      aspect-ratio: 2 / 1;
      transform-origin: left center;

      animation: 3s anim-game-bg-arrow linear infinite;
    }

    .game-bg-arrow-right {
      width: 50%;
      height: auto;
      background-image: url(imgs/bg_arrow.png);
      background-repeat: repeat-x;
      background-size: 200% 100%;
      aspect-ratio: 2 / 1;
      transform-origin: right center;
      animation: 3s anim-game-bg-arrow linear infinite;
    }

    @keyframes anim-game-bg-arrow {
      0% {
        background-position: 0% center;
      }

      to {
        background-position: 200% center;
      }
    }
    `;
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