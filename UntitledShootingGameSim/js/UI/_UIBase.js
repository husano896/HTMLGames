class _UIBase {
  /**
   * 
   * @param {UntitledShootingGame} game 
   */
  constructor(game, parentContainer) {
    /** @type {UntitledShootingGame} */
    this.game = game;
    this.createElement(parentContainer);
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
  }
  /**
   * 
   * @param {number} delta 
   * @param {HTMLCanvasElement} canvas 
   * @param {UntitledShootingGame} game 
   */
  update(delta, canvas, game) {
  }
}