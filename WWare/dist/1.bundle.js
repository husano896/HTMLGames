"use strict";
(self["webpackChunkwware"] = self["webpackChunkwware"] || []).push([[1],{

/***/ 68:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Effect_Flash": () => (/* binding */ Effect_Flash)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);


const BASE_LENGTH = 200;
const MAX_ALPHA = 0.8;
class Effect_Flash extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {
    constructor(props) {
        super();
        this.frame = 0;
        this.bg = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        this.bg.beginFill((props === null || props === void 0 ? void 0 : props.color) || 0xFFFFFF);
        this.bg.drawRect(0, 0, _game__WEBPACK_IMPORTED_MODULE_1__["default"].screen.width, _game__WEBPACK_IMPORTED_MODULE_1__["default"].screen.height);
        this.bg.endFill();
        this.bg.alpha = 0;
        this.length = (props === null || props === void 0 ? void 0 : props.length) || BASE_LENGTH;
        this.addChild(this.bg);
        this.zIndex = 999;
    }
    update(delta) {
        if (this.frame > this.length) {
            this.destroy();
            return;
        }
        this.frame += delta;
        this.bg.alpha = Math.sin(Math.PI * this.frame / this.length) * MAX_ALPHA;
    }
}


/***/ }),

/***/ 67:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_CookFilm": () => (/* binding */ Scene_CookFilm)
/* harmony export */ });
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _Effects_Effect_Flash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68);





/** 烤雪豹！ */
class Scene_CookFilm extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.MiniGameBase {
    constructor(option) {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '烤熟雪豹！';
        // BGM
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_game3;
        // 烤完成的程度, 8000 = 過關
        this.cookComplete = 0;
        // 背景
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        this.bg = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CookFilmBG));
        // 正在被烤的雪豹
        this.film1 = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CookFilm1));
        this.film1.anchor.set(0.5, 1);
        this.film1.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH / 2;
        this.film1.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT - 120;
        // 烤熟的雪豹
        this.film2 = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CookFilm2));
        this.film2.anchor.set(0.5, 1);
        this.film2.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH / 2;
        this.film2.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT - 120;
        // 正在被烤的雪豹 (差分)
        this.film3 = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CookFilm3));
        this.film3.alpha = 0;
        this.film3.anchor.set(0.5, 1);
        this.film3.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH / 2;
        this.film3.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT - 120;
        // FIREEEE feat. 泉叔
        this.fire = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CookFilmFire));
        this.fire.alpha = 0;
        this.fire.anchor.set(0.5, 1);
        this.fire.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH / 2;
        this.fire.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT - 120;
        // 一開始烤熟雪豹不顯示
        this.film2.visible = false;
        // 煮熟量條的位置
        this.cookGauge = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics().drawRect(0, 0, 60, 480);
        this.cookGauge.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH - 60 - 16;
        this.cookGauge.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT / 2 - 480 / 2;
        this.cookGauge.pivot.x = 0.5;
        this.cookGauge.pivot.y = 1;
        // 等級
        this.level = (option === null || option === void 0 ? void 0 : option.level) || 0;
        this.addChild(this.bg, this.film1, this.film2, this.film3, this.cookGauge, this.fire);
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }
    update(delta) {
        super.update(delta);
        // TODO: 確認delta的單位 
        console.log(delta);
        // 隨時間減少熱度
        if (!this.clearFlag) {
            // 關卡增加時加速冷卻
            this.cookComplete -= delta * (1 + this.level * 0.25);
        }
        if (this.cookComplete < 0) {
            this.cookComplete = 0;
        }
        // 依照烤熟的程度決定烤熟雪豹差分的透明度
        this.film3.alpha = Math.min(1, this.cookComplete / 8000);
        // this.cookGauge.beginFill(0x010000 * 0 + 0x000100 * 0 + 0x000001 * 255 );
        // 以及火的大小跟透明度
        this.fire.scale.set(Math.min(1, this.cookComplete / 8000));
        this.fire.alpha = (Math.min(1, this.cookComplete / 8000));
        this.cookGauge.fill.color = 0xFFFFFF;
        this.cookGauge.beginFill(0x010000 * Math.min(255, Math.floor(this.cookComplete / 8000 * 255)));
        this.cookGauge.drawRect(0, 0, 60, 480);
        this.cookGauge.endFill();
        this.cookGauge.scale.y = Math.min(1, this.cookComplete / 8000);
        this.cookGauge.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT / 2 - this.cookGauge.height / 2;
    }
    onMouseDown(index) {
        if (this.clearFlag) {
            return;
        }
        this.cookComplete += 1000;
        _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.SE_Fire.volume(this.cookComplete / 8000 * 1.5);
        _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.SE_Fire.play();
        if (this.cookComplete > 8000) {
            this.clearFlag = true;
            _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.Success.play();
            _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.SE_HandClap.play();
            this.addChild(new _Effects_Effect_Flash__WEBPACK_IMPORTED_MODULE_4__.Effect_Flash());
            // 過關後隱藏正在烤的雪豹
            this.film1.visible = false;
            this.film3.visible = false;
            // 雪豹肉排！
            this.film2.visible = true;
            this.fire.visible = false;
            this.cookGauge.visible = false;
        }
    }
}


/***/ }),

/***/ 59:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EClearMethod": () => (/* binding */ EClearMethod),
/* harmony export */   "MiniGameBase": () => (/* binding */ MiniGameBase)
/* harmony export */ });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);


var EClearMethod;
(function (EClearMethod) {
    // 目標達成
    EClearMethod[EClearMethod["TARGET"] = 0] = "TARGET";
    // 撐到時間到
    EClearMethod[EClearMethod["SURVIVE"] = 1] = "SURVIVE";
    // BOSS關, 通常為長遊戲, 
    EClearMethod[EClearMethod["BOSS"] = 2] = "BOSS";
})(EClearMethod || (EClearMethod = {}));
class MiniGameBase extends _scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(option) {
        super();
        /** 過關方式 */
        this.clearMethod = EClearMethod.SURVIVE;
        /** 小遊戲時間長度秒數，設為 -1 則不限時間 */
        this.timeLength = 1;
        /** 目標文字 */
        this.targetText = 'PlaceHolder';
        /** 使用音樂 */
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_1__["default"].Audio.ME_game2;
        this.frame = 0;
    }
    get Succed() {
        // 如果是生存制時, clearFlag須為false
        if (this.clearMethod === EClearMethod.SURVIVE) {
            return !this.clearFlag;
        }
        // 如果是達成目標 / BOSS戰時, clearFlag須為true
        return this.clearFlag;
    }
    update(delta) {
        this.frame += delta;
        this.children.forEach(c => { var _a, _b; return (_b = (_a = c).update) === null || _b === void 0 ? void 0 : _b.call(_a, delta); });
    }
}


/***/ }),

/***/ 66:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _KMN_Scene_CookFilm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67);

const games = [
    //Scene_EscapeDragon,
    //Scene_RotateEviat,
    //Scene_DaisukeMeow,
    //Scene_EatCake,
    //Scene_MaxmaClass,
    //Scene_Caragua100,
    //Scene_KuanKuan,
    // Scene_KC,
    _KMN_Scene_CookFilm__WEBPACK_IMPORTED_MODULE_0__.Scene_CookFilm
    // Scene_Tetris1
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (games);


/***/ }),

/***/ 58:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_Ready": () => (/* binding */ Scene_Ready)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _MiniGames_MiniGameBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59);
/* harmony import */ var _Sprites_UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(53);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(56);
/* harmony import */ var _MiniGames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(66);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(69);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);









const ObjectzIndex = {
    // Index越小越上層
    ScoreText: 0,
    HintText: 999,
    MiniGame: 2,
    Lives: 0,
    timerBomb: 3,
    GameOver: 999,
};
const RestTimeBase = 4000;
class Scene_Ready extends _scene__WEBPACK_IMPORTED_MODULE_4__.Scene {
    constructor() {
        super();
        this.score = 0;
        /** 速度，以120為基準速，最高應為240 */
        this.BPM = 120;
        /** 等級, 0~2, 之後為固定Lv2且加速 */
        this.level = 0;
        // 中場休息剩餘時間
        this.restTimeLeft = RestTimeBase;
        // 電梯背景
        this.lobbySpr = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_5__["default"].Image.lobby));
        this.lobbySpr.anchor.set(0.5);
        this.lobbySpr.setTransform(_game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.width / 2, _game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.height / 2);
        this.addChild(this.lobbySpr);
        // 關卡指示文字
        this.hintTextSpr = new _Sprites_UI__WEBPACK_IMPORTED_MODULE_3__.Sprite_HintText('');
        this.hintTextSpr.zIndex = ObjectzIndex.HintText;
        // 分數文字
        this.scoreTextSpr = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text(this.score.toString().padStart(3, '0'), _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.ScoreText);
        this.scoreTextSpr.anchor.set(0.5, 0.5);
        this.scoreTextSpr.x = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2;
        this.scoreTextSpr.y = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT / 10;
        this.scoreTextSpr.zIndex = ObjectzIndex.ScoreText;
        this.addChild(this.scoreTextSpr);
        // GameOver圖案
        this.gameOverSpr = new _Sprites_UI__WEBPACK_IMPORTED_MODULE_3__.Sprite_GameOver();
        this.gameOverSpr.onrestart = this.onRetry.bind(this);
        this.gameOverSpr.visible = false;
        this.addChild(this.gameOverSpr);
        // 剩餘時間圖案
        this.timerBombSpr = new _Sprites_UI__WEBPACK_IMPORTED_MODULE_3__.Sprite_TimerBomb();
        this.timerBombSpr.x = 8;
        this.timerBombSpr.y = _game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.bottom - this.timerBombSpr.height - 8;
        this.timerBombSpr.zIndex = ObjectzIndex.timerBomb;
        this.addChild(this.timerBombSpr);
        // 剩餘生命圖案
        this.spriteLives = new _Sprites_UI__WEBPACK_IMPORTED_MODULE_3__.Sprite_Lives();
        this.spriteLives.pivot.set(0.5, 0);
        this.spriteLives.x = (_game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.right - this.spriteLives.width) / 2 + 48;
        this.spriteLives.y = (_game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.height) - this.spriteLives.height - 8;
        this.spriteLives.zIndex = ObjectzIndex.Lives;
        this.addChild(this.spriteLives);
        // 暫停按鈕
        this.pauseSpr = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_5__["default"].Image.iconPause));
        this.pauseSpr.interactive = true;
        this.pauseSpr.on('pointerdown', this.onPause.bind(this));
        this.pauseSpr.zIndex = ObjectzIndex.MiniGame + 1;
        this.addChild(this.pauseSpr);
        //
        this.sortableChildren = true;
        // 各個參數初始化用重新開始推（？）
        this.onRetry();
        console.log(this);
    }
    update(delta) {
        // 死了
        if (this.gameover) {
            this.gameOverSpr.update(delta);
            return;
        }
        // 出外跳回來太久不算
        if (delta > 1000) {
            if (!this.pause) {
                this.onPause();
            }
            return;
        }
        // 暫停中
        if (this.pause) {
            return;
        }
        delta *= this.speed;
        this.hintTextSpr.update(delta);
        // 目前分數文字
        this.scoreTextSpr.text = this.score.toString().padStart(3, '0');
        // 目前剩餘時間
        this.timerBombSpr.timeLength = this.currentGame ? this.currentGame.timeLength : 0;
        this.timerBombSpr.timeLeft = Math.max(0, this.miniGameTimeLeft);
        this.timerBombSpr.update(delta);
        // 剩餘生命
        this.spriteLives.lives = this.lives;
        this.spriteLives.update(delta);
        if (this.currentGame) {
            if (this.miniGameTimeLeft <= 0 ||
                (this.currentGame.clearMethod == _MiniGames_MiniGameBase__WEBPACK_IMPORTED_MODULE_2__.EClearMethod.BOSS && this.currentGame.clearFlag !== undefined)) {
                console.log('leave', this.currentGame);
                this.leaveMiniGame();
                return;
            }
            // 進入小遊戲的暖身時間
            if (this.restTimeLeft > 0) {
                this.restTimeLeft -= delta;
                return;
            }
            this.currentGame.interactive = true;
            // BGM 播放
            const bgm = this.currentGame.BGM || _resources__WEBPACK_IMPORTED_MODULE_5__["default"].Audio.ME_game2;
            bgm.rate(this.speed);
            if (!bgm.playing()) {
                bgm.play();
            }
            // 若為BOSS戰，不走剩餘時間
            if ((this.currentGame.clearMethod !== _MiniGames_MiniGameBase__WEBPACK_IMPORTED_MODULE_2__.EClearMethod.BOSS)) {
                this.miniGameTimeLeft -= delta;
            }
            this.currentGame.update(delta);
            // 小遊戲進行中
        }
        else if (this.restTimeLeft > 0) {
            // 剩餘2秒內時準備下一場遊戲
            if (this.restTimeLeft < 2000 && !this.nextGame) {
                this.setNextGame();
                console.log('setNext', this.nextGame);
            }
            this.restTimeLeft -= delta;
            // 中場休息進行中
            // BPM 120 = 60000 / 120 = 500
            this.lobbySpr.scale.set(1 + (this.restTimeLeft % 500) / 500 * 0.05);
        }
        else {
            // 進入小遊戲
            this.enterNextGame();
            this.spriteLives.animate = false;
            this.restTimeLeft = 500; // 等一個BPM = 120 * 八分拍的長度
            console.log('enterNext', this.currentGame, this.miniGameTimeLeft);
        }
    }
    setNextGame() {
        var _a;
        if (this.lives <= 0) {
            this.gameover = true;
            this.gameOverSpr.visible = true;
            this.gameOverSpr.zIndex = ObjectzIndex.GameOver;
            this.gameOverSpr.gameover(this.score);
            this.pauseSpr.alpha = 0;
            this.pauseSpr.interactive = false;
            _resources__WEBPACK_IMPORTED_MODULE_5__["default"].Audio.ME_Gameover.play();
            return;
        }
        if (!((_a = this.nextGameIndexs) === null || _a === void 0 ? void 0 : _a.length)) {
            this.nextGameIndexs = lodash__WEBPACK_IMPORTED_MODULE_8___default().shuffle(lodash__WEBPACK_IMPORTED_MODULE_8___default().range(_MiniGames__WEBPACK_IMPORTED_MODULE_6__["default"].length));
        }
        this.score++;
        this.BPM = Math.min(240, 120 + (Math.floor((this.score - 1) / 2)) * 8);
        const nextGameIndex = this.nextGameIndexs.shift();
        // 等級 ＝ 周目數(分數 / 遊戲總數)
        this.level = Math.floor(this.score / _MiniGames__WEBPACK_IMPORTED_MODULE_6__["default"].length);
        this.nextGame = new _MiniGames__WEBPACK_IMPORTED_MODULE_6__["default"][nextGameIndex]({ level: this.level });
        this.nextGame.interactive = false;
        _resources__WEBPACK_IMPORTED_MODULE_5__["default"].Audio.ME_Midgame.rate(this.speed);
        _resources__WEBPACK_IMPORTED_MODULE_5__["default"].Audio.ME_Midgame.play();
        this.spriteLives.animate = false;
    }
    enterNextGame() {
        this.currentGame = this.nextGame;
        // 設定小遊戲剩餘時間
        this.miniGameTimeLeft = this.nextGame.timeLength;
        // 並顯示在畫面上
        this.currentGame.zIndex = ObjectzIndex.MiniGame;
        this.addChild(this.currentGame);
        this.nextGame = null;
        // 顯示目標文字
        this.hintTextSpr.setText(this.currentGame.targetText);
        this.removeChild(this.hintTextSpr);
        this.addChild(this.hintTextSpr);
        console.log(this.nextGame);
    }
    leaveMiniGame() {
        // BGM 播放
        const bgm = this.currentGame.BGM || _resources__WEBPACK_IMPORTED_MODULE_5__["default"].Audio.ME_game2;
        bgm.stop();
        // SE播放
        const resultSE = this.currentGame.Succed ? _resources__WEBPACK_IMPORTED_MODULE_5__["default"].Audio.ME_Success : _resources__WEBPACK_IMPORTED_MODULE_5__["default"].Audio.ME_Fail;
        if (!this.currentGame.Succed) {
            this.lives--;
        }
        resultSE.rate(this.speed);
        resultSE.play();
        this.spriteLives.animate = true;
        this.restTimeLeft = RestTimeBase;
        this.removeChild(this.currentGame);
        this.currentGame.destroy();
        this.currentGame = null;
    }
    get speed() {
        return this.BPM / 120;
    }
    onRetry() {
        this.lives = 4;
        this.level = 0;
        this.BPM = 120;
        this.score = 0;
        this.restTimeLeft = RestTimeBase / 2;
        this.gameover = false;
        this.pauseSpr.interactive = true;
        this.pauseSpr.alpha = 1;
        this.setNextGame();
    }
    onPause() {
        if (this.pause || this.gameover) {
            return;
        }
        this.pause = true;
        const fullScreenMask = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
        //#region 背景
        const bg = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        bg.beginFill(0x000000);
        bg.drawRect(0, 0, _game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.width, _game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.height);
        bg.endFill();
        bg.alpha = 0.95;
        //#endregion
        //#region 文字
        const textTitle = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('PAUSE', _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.PauseTitleText);
        textTitle.anchor.set(0.5);
        textTitle.x = _game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.width / 2;
        textTitle.y = _game__WEBPACK_IMPORTED_MODULE_7__["default"].screen.height / 2;
        //#endregion
        //#region 元素加入與事件綁定
        fullScreenMask.addChild(bg);
        fullScreenMask.addChild(textTitle);
        fullScreenMask.zIndex = ObjectzIndex.MiniGame + 1;
        fullScreenMask.interactive = true;
        fullScreenMask.on('pointerdown', () => {
            this.pause = false;
            fullScreenMask.destroy();
        });
        //#endregion
        this.addChild(fullScreenMask);
    }
}


/***/ }),

/***/ 61:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_GameOver": () => (/* binding */ Sprite_GameOver)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);




class Sprite_GameOver extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {
    constructor() {
        super();
        /** 目前動畫演到哪 */
        this.frame = 0;
        this.score = 0;
        //#region 背景繪製
        this.bg = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        this.bg.beginFill(0x0);
        this.bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT);
        this.bg.endFill();
        this.bg.alpha = 0.0;
        this.addChild(this.bg);
        //#endregion
        //#region GameOver文字繪製
        this.gameOverText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('GAME OVER', _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.GameOverText);
        this.gameOverText.alpha = 0;
        this.gameOverText.anchor.set(0.5);
        this.gameOverText.x = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.width / 2;
        this.addChild(this.gameOverText);
        //#endregion
        //#region 分數文字繪製
        this.scoreText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('', _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.ScoreResultText);
        this.scoreText.anchor.set(0.5);
        this.scoreText.x = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.width / 2;
        this.scoreText.y = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.height / 2;
        this.scoreText.visible = false;
        this.addChild(this.scoreText);
        //#endregion
        //#region 重新開始按鈕
        this.retryText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('RETRY', _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.GameText);
        this.retryText.pivot.set(0.5);
        this.retryText.x = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.width / 2 - this.retryText.width / 2;
        this.retryText.y = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.height - this.retryText.height - 64;
        this.retryText.visible = false;
        this.retryText.on('pointerdown', this.onRetryClick.bind(this));
        this.addChild(this.retryText);
        //#endregion
    }
    gameover(score) {
        this.frame = 0;
        this.score = score;
        this.visible = true;
    }
    update(delta) {
        this.frame += delta;
        if (this.retrying) {
            if (this.frame < 2000) {
                this.bg.alpha = 1 - this.frame / 2000;
            }
            else {
                this.bg.alpha = 0;
                this.onrestart();
                this.retrying = false;
                this.visible = false;
            }
            return;
        }
        if (this.frame < 1000) {
            // 0秒~1秒：GameOver文字落下
            this.gameOverText.alpha = Math.min((this.frame / 750), 1);
            this.gameOverText.y = this.frame / 1000 * _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.height / 2;
        }
        else if (this.frame < 4000) {
            // 1秒~4秒：GameOver文字晃動
            this.gameOverText.alpha = 1;
            this.gameOverText.x = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.width / 2 + Math.sin(Math.PI / 2 * this.frame / 125) * 16;
        }
        else if (this.frame < 5000) {
            // 4秒~5秒：GameOver文字淡出+黑背景淡入
            this.gameOverText.x = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.width / 2;
            this.gameOverText.alpha = Math.max(0, 1 - (this.frame - 4000) / 1000);
            this.bg.alpha = Math.min(0.9, (this.frame - 4000) / 1000);
        }
        else {
            // 5秒：分數與重新按鈕顯示
            this.bg.alpha = 0.9;
            if (!_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.playing()) {
                _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.play();
                _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.loop(true);
                this.retryText.visible = true;
                this.retryText.interactive = true;
                this.scoreText.text = this.score.toString().padStart(3, '0');
                this.scoreText.visible = true;
            }
            this.scoreText.x = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.width / 2 + Math.sin(Math.PI / 2 * this.frame / 125) * 8;
            this.scoreText.y = _game__WEBPACK_IMPORTED_MODULE_2__["default"].screen.height / 2 + Math.sin(Math.PI / 2 * this.frame / 250) * 4;
        }
    }
    onRetryClick() {
        this.retrying = true;
        this.retryText.visible = false;
        this.retryText.interactive = false;
        this.scoreText.visible = false;
        this.frame = 0;
        _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.stop();
        _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_retry.play();
    }
}


/***/ }),

/***/ 62:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_HintText": () => (/* binding */ Sprite_HintText)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);


const SHOWLENGTH = 1000;
class Sprite_HintText extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text {
    constructor(text) {
        super(text, _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.GameText);
        // 顯示時間 (ms)
        this.timeLength = 1000;
        this.anchor.set(0.5, 0.5);
        this.x = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2;
        this.y = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT / 3;
    }
    setText(text) {
        this.text = text;
        this.timeLength = SHOWLENGTH;
        this.alpha = 1;
    }
    update(delta) {
        // 進入時
        this.timeLength -= delta;
        if (this.timeLength > 750) {
            this.scale.set((this.timeLength - 750) / 250 * 3 + 1);
        }
        // 淡出時
        else if (this.timeLength > 0) {
            this.scale.set(1);
            this.alpha = Math.min(1, this.timeLength / 500);
        }
        // 顯示完畢走人
        else {
            this.scale.set(1);
            this.alpha = 0;
        }
    }
}


/***/ }),

/***/ 63:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_Lives": () => (/* binding */ Sprite_Lives)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);


class Sprite_Lives extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {
    constructor() {
        super();
        // 目前表示的時間 (動畫用)
        this.frameTime = 0;
        this.lives = 0;
        for (let i = 0; i < 4; i++) {
            const liveTex = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_1__["default"].Image.life));
            liveTex.anchor.set(0.5);
            liveTex.x = i * (liveTex.width + 16);
            this.addChild(liveTex);
        }
    }
    update(delta) {
        this.frameTime = (this.frameTime + delta) % 500;
        // 
        for (let i = 0; i < 4; i++) {
            const childSprite = this.children[i];
            if (this.lives > i) {
                childSprite.alpha = 1;
                if (childSprite.y > 100) {
                    childSprite.y = 100;
                }
                else {
                    childSprite.y = Math.max(0, childSprite.y - delta / 2000 * 200);
                }
                //這條命還在
                if (this.animate) {
                    childSprite.angle = 10 - 20 * Math.cos(this.frameTime / 500 * Math.PI / 2);
                }
                else {
                    childSprite.angle = 0;
                }
            }
            else {
                // 這條命沒了
                childSprite.alpha = Math.max(0, childSprite.alpha - delta / 2000);
                childSprite.y = Math.min(100, childSprite.y + delta / 2000 * 100);
            }
        }
    }
}


/***/ }),

/***/ 64:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_Pause": () => (/* binding */ Sprite_Pause)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);


class Sprite_Pause extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {
    constructor(continueCallBack, exitCallBack) {
        super();
        this.pauseBg = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        this.pauseBg.beginFill(0x333333, 0.5);
        this.pauseBg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT);
        this.pauseBg.endFill();
        this.pauseTitleText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('暫停', _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.PauseTitleText);
        this.pauseTitleText.anchor.set(0.5);
        this.pauseTitleText.x = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2;
        this.pauseTitleText.y = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT / 2 - 48;
        this.continueText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('繼續', _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.PauseActionText);
        this.continueText.anchor.set(0.5);
        this.continueText.x = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2 - 96;
        this.continueText.y = this.pauseTitleText.y + 48;
        this.continueText.cursor = 'hover';
        this.continueText.buttonMode = true;
        this.continueText.interactive = true;
        this.continueText.on('pointerdown', continueCallBack);
        this.exitText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('離開', _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.PauseActionText);
        this.exitText.anchor.set(0.5);
        this.exitText.x = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2 + 96;
        this.exitText.y = this.continueText.y;
        this.exitText.cursor = 'hover';
        this.exitText.buttonMode = true;
        this.exitText.interactive = true;
        this.exitText.on('pointerdown', exitCallBack);
        this.addChild(this.pauseBg, this.pauseTitleText, this.continueText, this.exitText);
    }
}


/***/ }),

/***/ 65:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_TimerBomb": () => (/* binding */ Sprite_TimerBomb)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);



class Sprite_TimerBomb extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {
    constructor() {
        super();
        this.timeLength = 0;
        this.timeLeft = 0;
        this.texBomb = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_1__["default"].Image.timerBomb));
        this.timeLeftBar = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        this.timeLeftBar.lineStyle(4, 0x222222);
        this.timeLeftBar.beginFill(0xEEEEEE);
        this.timeLeftBar.drawRoundedRect(0, 0, 200, 24, 8);
        this.timeLeftText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('4', _constants__WEBPACK_IMPORTED_MODULE_2__.$TextStyle.GameText);
        this.addChild(this.texBomb, this.timeLeftBar, this.timeLeftText);
        this.timeLeftText.setTransform(this.texBomb.width / 2 - (Number(_constants__WEBPACK_IMPORTED_MODULE_2__.$TextStyle.GameText.fontSize) / 2), 0);
        this.texBomb.setTransform(0, 48);
        this.timeLeftBar.setTransform(this.texBomb.width, this.texBomb.height);
    }
    update(delta) {
        if (this.timeLength <= 0) {
            this.visible = false;
            return;
        }
        this.visible = true;
        const timeLeftSec = Math.floor(this.timeLeft / 500);
        this.timeLeftBar.scale.x = Math.max(0, this.timeLeft / this.timeLength);
        this.timeLeftText.text = `${timeLeftSec}`;
        this.timeLeftText.visible = timeLeftSec <= 3;
    }
}


/***/ }),

/***/ 60:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_GameOver": () => (/* reexport safe */ _Sprite_GameOver__WEBPACK_IMPORTED_MODULE_0__.Sprite_GameOver),
/* harmony export */   "Sprite_HintText": () => (/* reexport safe */ _Sprite_HintText__WEBPACK_IMPORTED_MODULE_1__.Sprite_HintText),
/* harmony export */   "Sprite_Lives": () => (/* reexport safe */ _Sprite_Lives__WEBPACK_IMPORTED_MODULE_2__.Sprite_Lives),
/* harmony export */   "Sprite_Pause": () => (/* reexport safe */ _Sprite_Pause__WEBPACK_IMPORTED_MODULE_3__.Sprite_Pause),
/* harmony export */   "Sprite_TimerBomb": () => (/* reexport safe */ _Sprite_TimerBomb__WEBPACK_IMPORTED_MODULE_4__.Sprite_TimerBomb)
/* harmony export */ });
/* harmony import */ var _Sprite_GameOver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var _Sprite_HintText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62);
/* harmony import */ var _Sprite_Lives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63);
/* harmony import */ var _Sprite_Pause__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64);
/* harmony import */ var _Sprite_TimerBomb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(65);







/***/ })

}]);