"use strict";
(self["webpackChunkwware"] = self["webpackChunkwware"] || []).push([[1],{

/***/ 71:
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

/***/ 74:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_EatCake": () => (/* binding */ Scene_EatCake)
/* harmony export */ });
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);





/** */
class Scene_EatCake extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '吃光蛋糕！';
        // BGM
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_game3;
        this.nomPhase = 0;
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
        Bg.beginFill(0xEEEEEE);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        this.cakeTextures = [
            pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.EatCake1),
            pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.EatCake2),
            pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.EatCake3),
            pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.EatCake4),
        ];
        this.sprCake = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(this.cakeTextures[0]);
        this.sprCake.anchor.set(0.5);
        this.sprCake.x = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width / 2;
        this.sprCake.y = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.height / 2;
        this.addChild(this.sprCake);
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }
    update(delta) {
    }
    onMouseDown() {
        if (this.nomPhase >= 4) {
            return;
        }
        _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.SE_Nom.play();
        this.nomPhase++;
        this.sprCake.texture = this.cakeTextures[this.nomPhase];
        if (this.nomPhase >= 4) {
            this.sprCake.visible = false;
            this.clearFlag = true;
            _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.Success.play();
        }
    }
}


/***/ }),

/***/ 73:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_Caragua100": () => (/* binding */ Scene_Caragua100)
/* harmony export */ });
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);





/** 小卡-100 */
class Scene_Caragua100 extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '小卡+100！';
        // BGM
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_game5;
        // 小卡伸長度
        this.length = 1;
        // 背景
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        // 設定小卡
        this.sprTop = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CaraguaTop));
        this.sprBottom = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CaraguaBottom));
        this.sprM100 = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.CaraguaM100));
        this.sprTop.anchor.set(0.5, 1);
        this.sprBottom.anchor.set(0.5, 1);
        this.sprM100.anchor.set(0.5, 1);
        this.addChild(this.sprTop, this.sprBottom, this.sprM100);
        // 顯示的最下範圍
        this.bottom = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.bottom;
        this.sprM100.x = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width / 2;
        this.sprM100.y = this.bottom;
        this.sprBottom.x = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width / 2;
        this.sprBottom.y = this.bottom;
        this.sprTop.x = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width / 2;
        this.sprTop.y = this.sprBottom.y - this.sprBottom.height;
        this.sprM100.visible = false;
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }
    update(delta) {
        super.update(delta);
        // 過關
        if (this.clearFlag) {
            this.sprBottom.scale.y = 2;
            this.sprTop.y = this.sprBottom.y - this.sprBottom.height;
            return;
        }
        if (this.pressed) {
            this.sprBottom.visible = false;
            this.sprTop.visible = false;
            this.sprM100.visible = true;
            return;
        }
        this.length = Math.sin(Math.PI * (this.frame % 1000) / 1000);
        this.sprBottom.scale.y = 1 + this.length * 1;
        this.sprTop.y = this.sprBottom.y - this.sprBottom.height;
    }
    onMouseDown() {
        if (this.pressed) {
            return;
        }
        this.pressed = true;
        // 伸的夠長即過關
        this.clearFlag = this.sprBottom.scale.y > 1.75;
        _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.SE_Decision39.play();
        if (this.clearFlag) {
            const text = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Text('+100', _constants__WEBPACK_IMPORTED_MODULE_2__.$TextStyle.GameText);
            text.anchor.set(0.5);
            this.addChild(text);
            text.y = 128;
            text.x = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width / 2;
        }
    }
}


/***/ }),

/***/ 72:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_DaisukeMeow": () => (/* binding */ Scene_DaisukeMeow)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);
/* harmony import */ var _Effects_Effect_Flash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71);







class Scene_DaisukeMeow extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '膜拜大助貓貓！';
        // BGM
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_0__["default"].Audio.ME_game1;
        // 改判定的時間點
        this.reverseTime = 50;
        this.debugText = new pixi_js__WEBPACK_IMPORTED_MODULE_2__.Text('');
        this.lastPointerY = null;
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_2__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.5;
        this.addChild(Bg);
        this.sprVideo = _game__WEBPACK_IMPORTED_MODULE_4__["default"].loader.resources.daisukeMeowMeow.animation;
        // this.sprVideo.play();
        this.sprVideo.stop();
        this.sprVideo.anchor.set(0.5, 0.5);
        this.sprVideo.x = _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH / 2;
        this.sprVideo.y = _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT / 2;
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
        this.addChild(this.sprVideo);
        this.addChild(this.debugText);
    }
    update(delta) {
        super.update(delta);
    }
    onMouseDown($event) {
        this.lastPointerY = $event.data.originalEvent.clientY;
    }
    onMouseMove($event) {
        console.log($event);
        const newY = $event.data.originalEvent.clientY;
        if (this.lastPointerY !== null) {
            const movementY = this.lastPointerY - newY;
            if (Math.abs(movementY) < 1) {
                return;
            }
            this.debugText.text = `rev, ${this.reverse}, ${movementY}`;
            if ((!this.reverse && movementY > 0) || (this.reverse && movementY < 0)) {
                this.sprVideo.currentFrame = Math.round(Math.max(0, Math.min(this.sprVideo.totalFrames - 1, this.sprVideo.currentFrame + movementY)));
                console.log(movementY, this.sprVideo.currentFrame, this.sprVideo.totalFrames);
                if (this.sprVideo.currentFrame <= 3 && this.reverse) {
                    // 已經做完向下又向上
                    this.reverse = false;
                    this.sprVideo.currentFrame = 0;
                    // 還沒過關才放音效 當然你可以繼續大助貓貓
                    if (!this.clearFlag) {
                        _resources__WEBPACK_IMPORTED_MODULE_0__["default"].Audio.Success.play();
                        this.clearFlag = true;
                        this.addChild(new _Effects_Effect_Flash__WEBPACK_IMPORTED_MODULE_5__.Effect_Flash());
                    }
                }
                else if (this.sprVideo.currentFrame > this.reverseTime) {
                    this.reverse = true;
                }
            }
        }
        this.lastPointerY = newY;
    }
}


/***/ }),

/***/ 67:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_EscapeDragon": () => (/* binding */ Scene_EscapeDragon)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52);
/* harmony import */ var _Sprites_Sprite_AnWolf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68);






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
        if (Math.random() > 0.5) {
            this.sprAnDra.y = Math.random() * _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.HEIGHT;
        }
        else {
            this.sprAnDra.x = Math.random() * _constants__WEBPACK_IMPORTED_MODULE_3__.GameConsts.WIDTH;
        }
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

/***/ 77:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_KC": () => (/* binding */ Scene_KC)
/* harmony export */ });
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);




/** 小卡-100 */
class Scene_KC extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '面向同一邊！';
        // BGM
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_game5;
        // 背景
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        this.KCcontainer = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Container();
        // 設定KC
        for (let i = 0; i < 5; i++) {
            const newKC = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.KC1));
            newKC.anchor.set(0.5);
            newKC.interactive = true;
            newKC.on('pointerdown', () => this.onMouseDown(i));
            newKC.x = 144 * i + 80;
            newKC.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT / 2 + 128;
            this.KCcontainer.addChild(newKC);
        }
        // 若KC一直骰到同一邊，重骰
        while (this.KCcontainer.children.every(c => c.scale.x === this.KCcontainer.children[0].scale.x)) {
            for (let i = 0; i < 5; i++) {
                this.KCcontainer.children[i].scale.x = Math.random() > 0.5 ? 1 : -1;
            }
        }
        this.KCcontainer.pivot.set(0.5);
        this.KCcontainer.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH / 2 - this.KCcontainer.width / 2;
        // 過關KC
        this.addChild(this.KCcontainer);
        this.KCVictoryContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Container();
        this.KCVictoryContainer.visible = false;
        this.KCVictoryContainer.pivot.set(0.5);
        this.kcL = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.KC2));
        this.kcR = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.KC2));
        this.kcL.anchor.set(0.5);
        this.kcR.anchor.set(0.5);
        this.kcL.angle = 45;
        this.kcR.angle = -45;
        this.kcL.x = 144;
        this.kcL.y = 144;
        this.kcR.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH - 144;
        this.kcR.y = 144;
        this.kcL.scale.x = -1;
        this.KCVictoryContainer.addChild(this.kcL, this.kcR);
        this.addChild(this.KCVictoryContainer);
        //
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
    }
    update(delta) {
        super.update(delta);
        // 過關
        if (this.clearFlag) {
            for (let i = 0; i < 5; i++) {
                this.KCcontainer.children[i].y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT / 2 + 128 + Math.sin(Math.PI / 2 * (this.frame + i * 200) / 250) * 64;
            }
            this.KCVictoryContainer.visible = true;
            this.kcL.scale.x = -(1 + 0.5 * (this.frame % 500 / 500));
            this.kcL.scale.y = 1 + 0.5 * (this.frame % 500 / 500);
            this.kcR.scale.x = 1 + 0.5 * (this.frame % 500 / 500);
            this.kcR.scale.y = 1 + 0.5 * (this.frame % 500 / 500);
        }
    }
    onMouseDown(index) {
        if (this.clearFlag) {
            return;
        }
        _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.SE_Decision39.play();
        this.KCcontainer.children[index].scale.x *= -1;
        if (this.KCcontainer.children.every(c => c.scale.x === this.KCcontainer.children[0].scale.x)) {
            this.clearFlag = true;
            _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.Correct.play();
        }
    }
}


/***/ }),

/***/ 76:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_KuanKuan": () => (/* binding */ Scene_KuanKuan)
/* harmony export */ });
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);




/** 框框寬寬 */
class Scene_KuanKuan extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.EClearMethod.SURVIVE;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '避開食物！';
        // BGM
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_game5;
        // 背景
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        // 寬寬
        this.sprKuan = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.KuangKuan1));
        this.sprKuan.anchor.set(0.5, 1);
        this.sprKuan.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH / 2;
        this.sprKuan.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT;
        this.addChild(this.sprKuan);
        // 食物容器
        this.foodsContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Container();
        this.addChild(this.foodsContainer);
        this.on('pointermove', this.onMouseMove.bind(this));
        this.interactive = true;
    }
    update(delta) {
        if (this.clearFlag) {
            return;
        }
        super.update(delta);
        // 畫面上應該要有的食物數量
        const foods = Math.ceil(this.frame / 2000);
        // 食物不夠 產生食物
        if (this.foodsContainer.children.length < foods) {
            const newFood = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.EatCake1));
            newFood.anchor.set(0.5, 1);
            newFood.scale.set(0.5);
            newFood.x = Math.random() * (_constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH - newFood.width / 2) + newFood.width / 2;
            newFood.y = 0;
            this.foodsContainer.addChild(newFood);
        }
        // 食物掉落
        this.foodsContainer.children.forEach(c => {
            c.y += delta * 0.5;
            const bounds1 = c.getBounds();
            const bounds2 = this.sprKuan.getBounds();
            // 碰到惹
            if (bounds1.x < bounds2.x + bounds2.width
                && bounds1.x + bounds1.width > bounds2.x
                && bounds1.y < bounds2.y + bounds2.height
                && bounds1.y + bounds1.height > bounds2.y) {
                this.clearFlag = true;
                _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.SE_Decision39.play();
                // 變寬
                this.sprKuan.texture = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.KuangKuan2);
                this.sprKuan.scale.x = 3;
                // BUFFET!
                const buffet = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_1__.Texture.from(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].Image.KuangKuanBuffet));
                buffet.anchor.set(0.5);
                buffet.scale.set(2);
                buffet.x = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH / 2;
                buffet.y = _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT / 2 - 128;
                this.addChild(buffet);
            }
        });
    }
    onMouseMove(event) {
        if (this.clearFlag) {
            return;
        }
        const x = event.data.global.x;
        // 不能跑到畫面外
        this.sprKuan.x = Math.min(_constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH - this.sprKuan.width / 2, Math.max(x, this.sprKuan.width / 2));
    }
}


/***/ }),

/***/ 69:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_RotateEviat": () => (/* binding */ Scene_RotateEviat)
/* harmony export */ });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);
/* harmony import */ var Sprites_Sprite_Eviat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70);
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52);
/* harmony import */ var _Effects_Effect_Flash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71);






class Scene_RotateEviat extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_2__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_2__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 4000;
        // 目標文字
        this.targetText = '對準！';
        const Bg = new pixi_js__WEBPACK_IMPORTED_MODULE_3__.Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_4__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_4__.GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 0.9;
        this.addChild(Bg);
        this.sprEviat = new Sprites_Sprite_Eviat__WEBPACK_IMPORTED_MODULE_1__.Sprite_Eviat();
        this.on('pointerdown', this.onMouseDown.bind(this));
        this.interactive = true;
        this.addChild(this.sprEviat);
    }
    update(delta) {
        super.update(delta);
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
                this.addChild(new _Effects_Effect_Flash__WEBPACK_IMPORTED_MODULE_5__.Effect_Flash());
            }
            else {
                _resources__WEBPACK_IMPORTED_MODULE_0__["default"].Audio.Fail.play();
            }
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

/***/ 75:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene_MaxmaClass": () => (/* binding */ Scene_MaxmaClass)
/* harmony export */ });
/* harmony import */ var _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52);
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54);





/**
 * Lv1: [0,x,1,x,3,x,3,x] (4下)
 * Lv2: [1,x,2,x,0,0,0,x] (5下)
 * Lv3: [0,1,2,3,0,0,0,x] (7下)
 */
const answers = [0, 1, 2, 3, 0, 0, 0];
/** */
class Scene_MaxmaClass extends _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.MiniGameBase {
    constructor() {
        super();
        // 過關方式：達成目標
        this.clearMethod = _MiniGameBase__WEBPACK_IMPORTED_MODULE_0__.EClearMethod.TARGET;
        // 小遊戲時間長度
        this.timeLength = 8000;
        // 目標文字
        this.targetText = '跟著順序按！';
        // BGM
        this.BGM = _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.ME_game4;
        this.buttonsContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Container();
        this.pressedButtons = [];
        // BG
        this.bg = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
        this.bg.beginFill(0x777777);
        this.bg.drawRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.WIDTH, _constants__WEBPACK_IMPORTED_MODULE_2__.GameConsts.HEIGHT);
        this.bg.endFill();
        this.bg.alpha = 1;
        this.addChild(this.bg);
        //Buttons
        for (let i = 0; i < 4; i++) {
            const btn = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
            btn.beginFill(0xFFFFFF);
            btn.drawRoundedRect(0, 0, 64, 64, 8);
            btn.endFill();
            btn.interactive = true;
            btn.on('pointerdown', () => this.onMouseDown(i));
            btn.x = i * (64 + 16);
            this.buttonsContainer.addChild(btn);
        }
        this.buttonsContainer.x = (_game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width - this.buttonsContainer.width) / 2;
        this.buttonsContainer.y = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.height / 2 + 32;
        this.addChild(this.buttonsContainer);
        // Hint
        this.hintText = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Text('重複！', _constants__WEBPACK_IMPORTED_MODULE_2__.$TextStyle.GameText);
        this.hintText.anchor.set(0.5);
        this.hintText.x = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width / 2;
        this.hintText.y = _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.height / 2 - 128;
        this.hintText.visible = false;
        this.addChild(this.hintText);
        //
        this.on('pointerup', this.onMouseUp.bind(this));
        this.interactive = true;
    }
    update(delta) {
        super.update(delta);
        this.buttonsContainer.children.forEach(b => {
            b.y = 0;
            if (this.frame < 3500) {
                b.alpha = 1;
            }
        });
        if (this.frame < 500) {
            this.buttonsContainer.children[0].y = this.frame % 500 / 500 * 32;
            this.buttonsContainer.children[0].alpha = 0.5;
        }
        else if (this.frame < 1000) {
            this.buttonsContainer.children[1].y = this.frame % 500 / 500 * 32;
            this.buttonsContainer.children[1].alpha = 0.5;
        }
        else if (this.frame < 1500) {
            this.buttonsContainer.children[2].y = this.frame % 500 / 500 * 32;
            this.buttonsContainer.children[2].alpha = 0.5;
        }
        else if (this.frame < 2000) {
            this.buttonsContainer.children[3].y = this.frame % 500 / 500 * 32;
            this.buttonsContainer.children[3].alpha = 0.5;
        }
        else if (this.frame < 2500) {
            this.buttonsContainer.children[0].y = this.frame % 500 / 500 * 32;
            this.buttonsContainer.children[0].alpha = 0.5;
        }
        else if (this.frame < 3000) {
            this.buttonsContainer.children[0].y = this.frame % 500 / 500 * 32;
            this.buttonsContainer.children[0].alpha = 0.5;
        }
        else if (this.frame < 3500) {
            this.buttonsContainer.children[0].y = this.frame % 500 / 500 * 32;
            this.buttonsContainer.children[0].alpha = 0.5;
        }
        else {
            this.hintText.visible = true;
        }
    }
    onMouseDown(btn) {
        if (this.failed || this.clearFlag) {
            return;
        }
        if (this.frame < 3500) {
            return;
        }
        this.buttonsContainer.children.forEach(b => b.alpha = 1);
        // 按錯了
        if (btn !== answers[this.pressedButtons.length]) {
            this.failed = true;
            _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.InCorrect.play();
            this.bg.beginFill(0x222222);
            this.bg.drawRect(0, 0, _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width, _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.height);
            this.bg.endFill();
            return;
        }
        this.buttonsContainer.children.forEach((b, index) => b.alpha = btn === index ? 0.5 : 1);
        this.pressedButtons.push(btn);
        // 都按對了
        if (answers.length === this.pressedButtons.length) {
            this.clearFlag = true;
            this.bg.beginFill(0x77BB77);
            this.bg.drawRect(0, 0, _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.width, _game__WEBPACK_IMPORTED_MODULE_4__["default"].screen.height);
            this.bg.endFill();
            _resources__WEBPACK_IMPORTED_MODULE_3__["default"].Audio.Correct.play();
        }
    }
    onMouseUp() {
    }
}


/***/ }),

/***/ 66:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _KMN_Scene_EscapeDragon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67);
/* harmony import */ var _KMN_Scene_RotateEviat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69);
/* harmony import */ var _KMN_Scene_DaisukeMeow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72);
/* harmony import */ var _KMN_Scene_Caragua__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73);
/* harmony import */ var _Brainless_Scene_EatCake__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74);
/* harmony import */ var _Rhythm_Scene_MaxmaClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(75);
/* harmony import */ var _KMN_Scene_KuanKuan__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76);
/* harmony import */ var _KMN_Scene_KC__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(77);








const games = [
    _KMN_Scene_EscapeDragon__WEBPACK_IMPORTED_MODULE_0__.Scene_EscapeDragon,
    _KMN_Scene_RotateEviat__WEBPACK_IMPORTED_MODULE_1__.Scene_RotateEviat,
    _KMN_Scene_DaisukeMeow__WEBPACK_IMPORTED_MODULE_2__.Scene_DaisukeMeow,
    _Brainless_Scene_EatCake__WEBPACK_IMPORTED_MODULE_4__.Scene_EatCake,
    _Rhythm_Scene_MaxmaClass__WEBPACK_IMPORTED_MODULE_5__.Scene_MaxmaClass,
    _KMN_Scene_Caragua__WEBPACK_IMPORTED_MODULE_3__.Scene_Caragua100,
    _KMN_Scene_KuanKuan__WEBPACK_IMPORTED_MODULE_6__.Scene_KuanKuan,
    _KMN_Scene_KC__WEBPACK_IMPORTED_MODULE_7__.Scene_KC,
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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(78);
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
        this.nextGame = new _MiniGames__WEBPACK_IMPORTED_MODULE_6__["default"][nextGameIndex];
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
        this.level = 1;
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

/***/ 68:
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

/***/ 70:
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