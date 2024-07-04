class Game {
    /**
     * 
     * @param {HTMLElement} el 初始化遊戲元素的宿主，未指定時為document.body 
     */
    constructor(el) {
        this.parentEl = el || document.body;

        //
        this.el = document.createElement('div');
        this.el.className = 'game-pnd-container';

        // 生成地圖場景
        this.mapEl = document.createElement('div')
        this.mapEl.className = 'map';

        this.el.appendChild(this.mapEl);

        // 生成Playfield
        this.playfieldEl = document.createElement('div')
        this.playfieldEl.className = 'playfield';

        // 生成playField內所有元素
        for (let i = 0; i < 30; i++) {
            const orb = document.createElement('div')
            orb.className = 'orb'
            this.playfieldEl.appendChild(orb)
        }
        this.el.appendChild(this.playfieldEl);
        // 加入到宿主元素內
        this.parentEl.appendChild(this.el);
    }
}

const game = new Game()