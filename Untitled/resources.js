class _Resource {

    constructor() {
        // 素材區
        this.Audio = {
            SE_Jump: new Audio().setSrc('audio/SE/boop.mp3'),
            SE_Popup: new Audio().setSrc('audio/SE/decision7.mp3'),
            SE_Cursor: new Audio().setSrc('audio/SE/decision3.mp3'),
            SE_Confirm: new Audio().setSrc('audio/SE/decision22.mp3'),
            SE_Cancel: new Audio().setSrc('audio/SE/decision15.mp3'),
            SE_Positive: new Audio().setSrc('audio/SE/decision5.mp3'),
            // 魔法寶石側
            SE_Down: new Audio().setSrc('audio/SE/down.mp3'),
            SE_Up: new Audio().setSrc('audio/SE/up.mp3'),
            SE_NewLine: new Audio().setSrc('audio/SE/newLine.mp3'),
            SE_GameOver: new Audio().setSrc('audio/SE/gameover.mp3'),
            SE_Combo1: new Audio().setSrc('audio/SE/c1.mp3'),
            SE_Combo2: new Audio().setSrc('audio/SE/c2.mp3'),
            SE_Combo3: new Audio().setSrc('audio/SE/c3.mp3'),
            SE_Combo4: new Audio().setSrc('audio/SE/c4.mp3'),
            SE_Combo5: new Audio().setSrc('audio/SE/c5.mp3'),
            SE_Combo6: new Audio().setSrc('audio/SE/c6.mp3'),
            SE_Combo7: new Audio().setSrc('audio/SE/c7.mp3'),
            SE_Combo8: new Audio().setSrc('audio/SE/c8.mp3')
        };
        this.Image = {
            Male01: new Image().setSrc('img/Male01.png'),
            BG: new Image().setSrc('img/bg/bg.png'),
            Stat: new Image().setSrc('img/stat.png'),
            // 魔法寶石側
            BallBase: new Image().setSrc('img/BallBase.png'),
            Ball1: new Image().setSrc('img/b1.png'),
            Ball2: new Image().setSrc('img/b2.png'),
            Ball3: new Image().setSrc('img/b3.png'),
            Ball4: new Image().setSrc('img/b4.png'),
            Ball5: new Image().setSrc('img/b5.png'),
            Ball6: new Image().setSrc('img/b6.png'),
        };
        this.TIMEOUT = 10000;
        this.error = null;
        this.loaded = false;
        this._onloaded = [];
        this._onerror = [];

        Promise.all([...Object.values(this.Audio), ...Object.values(this.Image)].map(
            asset => new Promise((resolve, reject) => {
                // Audio用callback
                asset.onloadeddata = resolve;
                // Image用callback
                asset.onload = resolve;
                asset.onerror = reject;
            })
        )).then(() => {
            this.loaded = true;
            // 對訂閱者發送成功
            this._onloaded.forEach(o => o(this));
            console.log(this);
        }).catch(err => {
            this.error = err;
            // 對訂閱者發送失敗
            this._onerror.forEach(o => o(err));
            console.error(err);
        });
    }

    AddLoadedListener(f) {
        if (this.loaded) { f(this); return; }
        this._onloaded.push(f);
    }
    AddErrorListener(f) {
        if (this.error) { f(error); return; }
        this._onerror.push(f);
    }
}
var R = new _Resource();