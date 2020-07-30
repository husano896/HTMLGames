class _Resource {

    constructor() {
        // 素材區
        this.Audio = {
        };
        this.Image = {
            Male01: new Image().setSrc('img/Male01.png')
        };

        this.error = null;
        this.loaded = false;
        this._onloaded = [];
        this._onerror = [];
        this.timeout = 10000;
        Promise.all([...Object.values(this.Audio), ...Object.values(this.Image)].map(
            asset => new Promise((resolve, reject) =>{
                // Audio用callback
                asset.onloadeddata = resolve;
                // Image用callback
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