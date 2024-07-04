"use strict";
(self["webpackChunkwware"] = self["webpackChunkwware"] || []).push([[1],{

/***/ 65:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EClearMethod": () => (/* binding */ EClearMethod),
/* harmony export */   "MiniGameBase": () => (/* binding */ MiniGameBase)
/* harmony export */ });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);

var EClearMethod;
(function (EClearMethod) {
    // 目標達成
    EClearMethod[EClearMethod["TARGET"] = 0] = "TARGET";
    // 撐到時間到
    EClearMethod[EClearMethod["SURVIVE"] = 1] = "SURVIVE";
})(EClearMethod || (EClearMethod = {}));
class MiniGameBase extends _scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor(option) {
        super();
        // 過關方式
        this.clearMethod = EClearMethod.SURVIVE;
        // 小遊戲時間長度秒數，設為 -1 則不限時間
        this.timeLength = 1;
        // 目標文字
        this.targetText = 'PlaceHolder';
    }
    get Succed() {
        // 如果是達成目標時, clearFlag須為true
        if (this.clearMethod === EClearMethod.TARGET) {
            return this.clearFlag;
        }
        // 如果是生存制時, clearFlag須為false
        return !this.clearFlag;
    }
}


/***/ }),

/***/ 69:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_DaisukeMeow": () => (/* binding */ Scene_DaisukeMeow)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);






class Scene_DaisukeMeow extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '大助貓貓！';
        // 改判定的時間點
        this.reverseTime = 50;
        this.debugText = new pixi_js__WEBPACK_IMPORTED_MODULE_2__.Text('');
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_2__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.5;
        this.addChild(Bg);
        this.sprVideo = _game__WEBPACK_IMPORTED_MODULE_4__["default"].loader.resources.daisukeMeowMeow.animation;
        this.sprVideo.stop();
        this.sprVideo.anchor.set(0.5, 0.5);
        this.sprVideo.x = _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH / 2;
        this.sprVideo.y = _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT / 2;
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
        this.addChild(this.sprVideo);
        this.addChild(this.debugText);
    }
    update(delta) {
    }
    onMouseMove($event) {
        const movementY = $event.data.originalEvent.movementY;
        this.debugText.text = `rev, ${this.reverse}, ${movementY}`;
        if ((!this.reverse && movementY > 0) || (this.reverse && movementY < 0)) {
            this.sprVideo.currentFrame = Math.max(0, Math.min(this.sprVideo.totalFrames - 1, this.sprVideo.currentFrame + Math.abs(movementY)));
            if (this.sprVideo.currentFrame >= this.sprVideo.totalFrames - 2 && this.reverse) {
                // 已經做完向下又向上
                this.reverse = false;
                this.sprVideo.currentFrame = 0;
                // 還沒過關才放音效 當然你可以繼續大助貓貓
                if (!this.clearFlag) {
                    _resources__WEBPACK_IMPORTED_MODULE_0__["default"].Audio.Success.play();
                    this.clearFlag = true;
                }
            }
            else if (this.sprVideo.currentFrame > this.reverseTime) {
                this.reverse = true;
            }
        }
    }
}


/***/ }),

/***/ 64:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_EscapeDragon": () => (/* binding */ Scene_EscapeDragon)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
/* harmony import */ var _Sprites_Sprite_AnWolf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66);






class Scene_EscapeDragon extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__.EClearMethod.SURVIVE;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '不要被抓到！';
        // 嘎嗚吼的移動速度
        this.DraSpeed = 3;
        // 距離小於一定時判定為被抓到
        this.CatchDistance = 32;
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_2__.Graphics();
        Bg.beginFill(0xBBBBFF);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        this.sprAnDra = new pixi_js__WEBPACK_IMPORTED_MODULE_2__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_2__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_0__["default"].Image.anDra));
        this.sprAnWolf = new _Sprites_Sprite_AnWolf__WEBPACK_IMPORTED_MODULE_4__.Sprite_AnWolf();
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
        this.addChild(this.sprAnDra);
        this.addChild(this.sprAnWolf);
        this.sprAnDra.anchor.set(0.5);
        this.sprAnWolf.anchor.set(0.5);
        this.sprAnWolf.x = _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH / 2;
        this.sprAnWolf.y = _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT / 2;
    }
    update(delta) {
        // 被抓到惹
        if (this.clearFlag) {
            this.sprAnWolf.update(delta);
            return;
        }
        const dx = this.sprAnWolf.x - this.sprAnDra.x;
        const dy = this.sprAnWolf.y - this.sprAnDra.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        // 嘎嗚吼的轉向
        if (dx > 0) {
            this.sprAnDra.scale.x = -1;
        }
        else {
            // 往左跑時
            this.sprAnDra.scale.x = 1;
        }
        // 被抓到惹
        if (distance < this.CatchDistance) {
            this.fail();
            return;
        }
        // 嘎嗚吼的移動
        const mvx = dx / (distance) * this.DraSpeed;
        const mvy = dy / (distance) * this.DraSpeed;
        this.sprAnDra.x += mvx;
        this.sprAnDra.y += mvy;
    }
    onMouseMove(event) {
        if (this.clearFlag) {
            return;
        }
        const x = event.data.global.x;
        const y = event.data.global.y;
        // 嗷嗚處理
        // 往右跑時
        if (x >= this.sprAnWolf.x) {
            this.sprAnWolf.scale.x = -1;
        }
        else {
            // 往左跑時
            this.sprAnWolf.scale.x = 1;
        }
        // 不能跑到畫面外
        this.sprAnWolf.x = Math.min(_constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH, Math.max(x, 0));
        this.sprAnWolf.y = Math.min(_constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT, Math.max(y, 0));
    }
    fail() {
        this.clearFlag = true;
        this.sprAnWolf.catch();
        // wow!
        const pinkBg = new pixi_js__WEBPACK_IMPORTED_MODULE_2__.Graphics();
        pinkBg.beginFill(0xFFA0BC);
        pinkBg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT);
        pinkBg.endFill();
        pinkBg.alpha = 0.5;
        this.addChild(pinkBg);
        // 啊嗚
        _resources__WEBPACK_IMPORTED_MODULE_0__["default"].Audio.anWolfFail.play();
    }
}


/***/ }),

/***/ 67:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_RotateEviat": () => (/* binding */ Scene_RotateEviat)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _Sprites_Sprite_Eviat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52);





class Scene_RotateEviat extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_2__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_2__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '對準夢夢的臉！';
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_3__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_4__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_4__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        this.sprEviat = new _Sprites_Sprite_Eviat__WEBPACK_IMPORTED_MODULE_1__.Sprite_Eviat();
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
        this.addChild(this.sprEviat);
    }
    update(delta) {
        this.sprEviat.update(delta);
    }
    onMouseDown() {
        // 如果夢夢還在旋轉
        if (!this.sprEviat.locked) {
            // 鎖定夢夢的旋轉
            this.sprEviat.lock();
            // 成功條件取決於夢夢的臉是否對準
            this.clearFlag = this.sprEviat.Succed;
            if (this.clearFlag) {
                _resources__WEBPACK_IMPORTED_MODULE_0__["default"].Audio.Success.play();
            }
            else {
                _resources__WEBPACK_IMPORTED_MODULE_0__["default"].Audio.Fail.play();
            }
        }
    }
}


/***/ }),

/***/ 63:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Scene_EscapeDragon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
/* harmony import */ var _Scene_RotateEviat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67);
/* harmony import */ var _Scene_DaisukeMeow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69);



const games = [
    _Scene_EscapeDragon__WEBPACK_IMPORTED_MODULE_0__.Scene_EscapeDragon,
    _Scene_RotateEviat__WEBPACK_IMPORTED_MODULE_1__.Scene_RotateEviat,
    _Scene_DaisukeMeow__WEBPACK_IMPORTED_MODULE_2__.Scene_DaisukeMeow
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
/* harmony import */ var _Sprites_Sprite_HintText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59);
/* harmony import */ var _Sprites_Sprite_TimerBomb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
/* harmony import */ var _Sprites_Sprite_Lives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61);
/* harmony import */ var _Sprites_Sprite_GameOver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(62);
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(53);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(56);
/* harmony import */ var _MiniGames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(63);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(54);










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
class Scene_Ready extends _scene__WEBPACK_IMPORTED_MODULE_6__.Scene {
    constructor() {
        super();
        this.score = 0;
        /** 速度，以120為基準速，最高240 */
        this.BPM = 120;
        /** 等級, 0~2, 之後為固定Lv2且加速 */
        this.level = 0;
        // 中場休息剩餘時間
        this.restTimeLeft = RestTimeBase;
        // 電梯背景
        this.lobbySpr = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_7__["default"].Image.lobby));
        this.lobbySpr.anchor.set(0.5);
        this.lobbySpr.setTransform(_game__WEBPACK_IMPORTED_MODULE_9__["default"].screen.width / 2, _game__WEBPACK_IMPORTED_MODULE_9__["default"].screen.height / 2);
        // this.lobbySpr.pivot.set(0.5);
        this.addChild(this.lobbySpr);
        // 關卡指示文字
        this.hintTextSpr = new _Sprites_Sprite_HintText__WEBPACK_IMPORTED_MODULE_2__.Sprite_HintText('拿到衛生紙！');
        this.hintTextSpr.zIndex = ObjectzIndex.HintText;
        // 分數文字
        this.scoreTextSpr = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text(this.score.toString().padStart(3, '0'), _constants__WEBPACK_IMPORTED_MODULE_1__.$TextStyle.ScoreText);
        this.scoreTextSpr.anchor.set(0.5, 0.5);
        this.scoreTextSpr.x = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2;
        this.scoreTextSpr.y = _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT / 10;
        this.scoreTextSpr.zIndex = ObjectzIndex.ScoreText;
        this.addChild(this.scoreTextSpr);
        // GameOver圖案
        this.gameOverSpr = new _Sprites_Sprite_GameOver__WEBPACK_IMPORTED_MODULE_5__.Sprite_GameOver();
        this.gameOverSpr.onrestart = this.onRetry.bind(this);
        this.gameOverSpr.visible = false;
        this.addChild(this.gameOverSpr);
        // 剩餘時間圖案
        this.timerBombSpr = new _Sprites_Sprite_TimerBomb__WEBPACK_IMPORTED_MODULE_3__.Sprite_TimerBomb();
        this.timerBombSpr.x = 8;
        this.timerBombSpr.y = _game__WEBPACK_IMPORTED_MODULE_9__["default"].screen.bottom - this.timerBombSpr.height - 8;
        this.timerBombSpr.zIndex = ObjectzIndex.timerBomb;
        this.addChild(this.timerBombSpr);
        // 剩餘生命圖案
        this.spriteLives = new _Sprites_Sprite_Lives__WEBPACK_IMPORTED_MODULE_4__.Sprite_Lives();
        this.spriteLives.pivot.set(0.5, 0);
        this.spriteLives.x = (_game__WEBPACK_IMPORTED_MODULE_9__["default"].screen.right - this.spriteLives.width) / 2 + 48;
        this.spriteLives.y = (_game__WEBPACK_IMPORTED_MODULE_9__["default"].screen.height) - this.spriteLives.height - 8;
        this.spriteLives.zIndex = ObjectzIndex.Lives;
        this.addChild(this.spriteLives);
        this.sortableChildren = true;
        this.onRetry();
        console.log(this);
    }
    update(delta) {
        if (this.gameover) {
            this.gameOverSpr.update(delta);
            return;
        }
        this.hintTextSpr.update(delta);
        // 目前分數文字
        this.scoreTextSpr.text = this.score.toString().padStart(3, '0');
        // 目前剩餘時間
        this.timerBombSpr.timeLength = this.currentGame ? this.currentGame.timeLength : 0;
        this.timerBombSpr.timeLeft = Math.max(0, this.miniGameTimeLeft);
        // 剩餘生命
        this.spriteLives.lives = this.lives;
        this.timerBombSpr.update(delta);
        this.spriteLives.update(delta);
        if (this.currentGame && this.miniGameTimeLeft > 0) {
            this.miniGameTimeLeft -= delta;
            this.currentGame.update(delta);
            // 小遊戲進行中
        }
        else if (this.restTimeLeft > 0) {
            if (this.currentGame) {
                console.log('leave', this.currentGame);
                this.leaveMiniGame();
            }
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
            this.restTimeLeft = RestTimeBase;
            console.log('enterNext', this.currentGame, this.miniGameTimeLeft);
        }
    }
    setNextGame() {
        if (this.lives <= 0) {
            this.gameover = true;
            _resources__WEBPACK_IMPORTED_MODULE_7__["default"].Audio.ME_Gameover.play();
            this.gameOverSpr.visible = true;
            this.gameOverSpr.zIndex = ObjectzIndex.GameOver;
            this.gameOverSpr.gameover(this.score);
            return;
        }
        this.score++;
        this.nextGame = new _MiniGames__WEBPACK_IMPORTED_MODULE_8__["default"][Math.floor(Math.random() * _MiniGames__WEBPACK_IMPORTED_MODULE_8__["default"].length)];
        _resources__WEBPACK_IMPORTED_MODULE_7__["default"].Audio.ME_Midgame.play();
        this.spriteLives.animate = false;
    }
    enterNextGame() {
        var _a, _b;
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
        if ((_a = this.nextGame) === null || _a === void 0 ? void 0 : _a.BGM) {
            (_b = this.nextGame) === null || _b === void 0 ? void 0 : _b.BGM.play();
        }
        else {
            _resources__WEBPACK_IMPORTED_MODULE_7__["default"].Audio.ME_game2.play();
        }
    }
    leaveMiniGame() {
        if (!this.currentGame.Succed) {
            this.lives--;
            _resources__WEBPACK_IMPORTED_MODULE_7__["default"].Audio.ME_Fail.play();
        }
        else {
            _resources__WEBPACK_IMPORTED_MODULE_7__["default"].Audio.ME_Success.play();
        }
        this.spriteLives.animate = true;
        this.removeChild(this.currentGame);
        this.currentGame = null;
    }
    get soundRate() {
        return this.BPM / 120;
    }
    onRetry() {
        this.lives = 4;
        this.level = 1;
        this.BPM = 120;
        this.score = 0;
        this.restTimeLeft = RestTimeBase / 2;
        this.gameover = false;
        this.setNextGame();
    }
}


/***/ }),

/***/ 66:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_AnWolf": () => (/* binding */ Sprite_AnWolf)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);


class Sprite_AnWolf extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite {
    constructor() {
        // 一開始時是正常狀態
        super(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_1__["default"].Image.anWolf));
        // 被抓到後才是彩虹
        this.texAAA = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_1__["default"].Image.anWolfAAA);
        this.texRainbow = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_1__["default"].Image.anWolfRainbow);
        this.caughtDelta = 0;
    }
    update(delta) {
        if (!this.caught) {
            return;
        }
        // 被抓到了之後開始超自然震動
        this.caughtDelta += delta;
        if (this.caughtDelta > 1000) {
            if (this.texture !== this.texRainbow) {
                // 震動完彩虹
                this.texture = this.texRainbow;
                _resources__WEBPACK_IMPORTED_MODULE_1__["default"].Audio.anWolfWow.play();
            }
        }
        else {
            this.y += this.caughtDelta % 100 > 50 ? 4 : -4;
        }
    }
    // 被抓到了
    catch() {
        if (this.caught) {
            return;
        }
        this.caught = true;
        this.caughtDelta = 0;
        this.texture = this.texAAA;
    }
}


/***/ }),

/***/ 68:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite_Eviat": () => (/* binding */ Sprite_Eviat)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56);



const fallSpeed = 0.1;
const rotateSpeed = 0.004;
class Sprite_Eviat extends pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {
    // 夢夢的旋轉速度
    // 每秒180度
    constructor() {
        super();
        this.ballSpr = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_2__["default"].Image.eviatBall));
        this.faceSpr = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_2__["default"].Image.eviatFace));
        this.ballSpr.anchor.set(0.5);
        this.faceSpr.anchor.set(0.5);
        this.ballSpr.rotation = Math.random() * 2 * Math.PI;
        this.faceSpr.rotation = 0;
        this.addChild(this.ballSpr);
        this.addChild(this.faceSpr);
        this.ballSpr.position.set(_constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2, _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT / 2);
        this.faceSpr.position.set(_constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.WIDTH / 2, _constants__WEBPACK_IMPORTED_MODULE_1__.GameConsts.HEIGHT / 2);
    }
    lock() {
        if (this.locked) {
            return;
        }
        this.locked = true;
        console.log(this.ballSpr.rotation);
        if (this.Succed) {
            // 如果有對準成功時, 將兩邊臉誤差歸0
            this.ballSpr.rotation = 0;
        }
    }
    update(delta) {
        if (!this.locked) {
            this.ballSpr.rotation += delta * rotateSpeed;
        }
        else if (!this.Succed) {
            // 失敗時本體掉出去
            this.ballSpr.y += delta * fallSpeed;
        }
    }
    get Succed() {
        // 2pi = 一圈 = 360度
        return (this.ballSpr.rotation % (Math.PI * 2)) < Math.PI * 2 / (360 / 20) ||
            (2 * Math.PI - (this.ballSpr.rotation % (Math.PI * 2))) < Math.PI * 2 / (360 / 20);
    }
}


/***/ }),

/***/ 62:
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
                _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.stop();
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
            this.bg.alpha = Math.min(0.75, (this.frame - 4000) / 1000);
        }
        else {
            // 5秒：分數與重新按鈕顯示
            this.bg.alpha = 0.75;
            if (!_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.playing()) {
                _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.play();
                _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_result.loop(true);
                this.retryText.visible = true;
                this.retryText.interactive = true;
                this.scoreText.text = this.score.toString().padStart(3, '0');
                this.scoreText.visible = true;
            }
        }
    }
    onRetryClick() {
        this.retrying = true;
        this.retryText.visible = false;
        this.retryText.interactive = false;
        this.scoreText.visible = false;
        this.frame = 0;
    }
}


/***/ }),

/***/ 59:
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
        if (this.timeLength > 1000 - 200) {
            this.scale.set((this.timeLength - (1000 - 200)) / 200 * 4 + 1);
        }
        // 淡出時
        else if (this.timeLength > 0) {
            this.scale.set(1);
            this.alpha = this.timeLength / 1000;
        }
        else {
            // 顯示完畢走人
            this.alpha = 0;
            return;
        }
        this.timeLength -= delta;
    }
}


/***/ }),

/***/ 61:
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

/***/ 60:
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


/***/ })

}]);