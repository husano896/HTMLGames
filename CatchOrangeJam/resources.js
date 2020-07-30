class _Resource {

    constructor() {
        // 素材區
        this.Audio = {
            SE_Jump: new Audio().setSrc('audio/boop.mp3'),
            SE_Score: new Audio().setSrc('../shared/Audio/SE/decision7.mp3'),
            SE_ScoreDec: new Audio().setSrc('../shared/Audio/SE/decision15.mp3'),
            SE_TimeUp: new Audio().setSrc('audio/timeUp.mp3')
        };
        this.Image = {
            Apple: new Image().setSrc('img/a.png'),
            Orange0: new Image().setSrc('img/orange0.png'),
            Orange1: new Image().setSrc('img/orange1.png')
        };

        this.error = null;
        this.loaded = false;
        this._onloaded = [];
        this._onerror = [];
        Promise.all([...Object.values(this.Audio), ...Object.values(this.Image)].map(
            asset => new Promise((resolve, reject) =>{
                // Audio用callback
                asset.onloadeddata = resolve;
                // Imae用callback
                asset.onload = resolve;
                asset.onerror = reject;
            })
        )).then(()=>{
            this.loaded = true;
            this._onloaded.forEach(o => o(this));
            console.log(this);
        }).catch(err => {
            this.error = err;
            this._onerror.forEach(o => o(err));
            console.error(err);
        });
    };

    AddLoadedListener(f) {
        if (this.loaded) {
            f(this);
            return;
        }
        this._onloaded.push(f);
    }
    AddErrorListener(f) {
        if (this.error) {
            f(error);
            return;
        }
        this._onerror.push(f);
    } 
};
var R = new _Resource();