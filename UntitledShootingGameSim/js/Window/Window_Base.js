class Window_Base {
  /**
   * 
   * @param {UntitledShootingGame} game 
   * @param {HTMLElement} parentContainer 
   */
  constructor(game, parentContainer) {
    /** @type {UntitledShootingGame} */
    this.game = game;
    this.createElementAndAddToParent(parentContainer);
  }

  /**
   * 
   * @param {HTMLElement} parentContainer 
   * @returns 
   */
  createElementAndAddToParent(parentContainer) {
    const w = document.createElement('dialog');
    this.window = w;

    w.innerHTML = `
      <h2>Options</h2>
      <fieldset>
        <legend>Background</legend>
        <select id="background">
          <option value="bg_arrow.png">Arrow</option>
          <option value="bg_wave.png">Wave</option>
          <option value="">None</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>High-Speed</legend>
        <input id="high_speed" type="range" min="0.5" max="8.0" step="0.01"/>
        <label id="high_speed_label">0.5</label>
      </fieldset>
      <hr />
      <div style="display:flex; flex-direction:row; gap:8px; justify-content:center"> 
        <button id="apply">Apply</button>
        <button id="cancel">Cancel</button>
      </div>
    `

    /**
     * @type {HTMLSelectElement}
     */
    this.backgroundEl = w.querySelector('select#background');

    /**
     * @type {HTMLInputElement}
     */
    this.highSpeedEl = w.querySelector('input#high_speed');

    /** @type {HTMLLabelElement} */
    this.highSpeedLabelEl = w.querySelector('label#high_speed_label');

    parentContainer.appendChild(w);

    this.window.querySelector('button#apply').addEventListener('click', this.closeAndApply.bind(this));
    this.window.querySelector('button#cancel').addEventListener('click', this.close.bind(this));
    this.highSpeedEl.addEventListener('change', () => this.highSpeedLabelEl.innerText = this.highSpeedEl.value);
    return w;
  }

  open() {
    this.window.style.display = 'block';

    /**
     * @type {HTMLDivElement}
     */
    const bgEl = document.querySelector('.game-bg-arrow-left')
    console.log(bgEl.style.backgroundImage.replaceAll('"', '').replace('url(imgs/', '').replace(')', ''));
    this.backgroundEl.value = bgEl.style.backgroundImage.replaceAll('"', '').replace('url(imgs/', '').replace(')', '');
    this.highSpeedEl.value = this.game.highSpeed;

    this.highSpeedLabelEl.innerText = this.game.highSpeed;
  }

  closeAndApply() {
    this.window.style.display = 'none';

    const bgLEl = document.querySelector('.game-bg-arrow-left')

    const bgREl = document.querySelector('.game-bg-arrow-right')
    console.log(this.backgroundEl.value);
    bgLEl.style.backgroundImage = `url(imgs/${this.backgroundEl.value})`;
    bgREl.style.backgroundImage = `url(imgs/${this.backgroundEl.value})`;

    this.game.highSpeed = Number(this.highSpeedEl.value);
  }

  close() {
    this.window.style.display = 'none';
  }
}