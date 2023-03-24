import _ from 'lodash-es';

// 各種能力的上限
const MAXHP_LIMIT = 9999;
const MAXSP_LIMIT = 999;
const MAXATK_LIMIT = 999;
const MAXDEF_LIMIT = 999;
const MAXSPD_LIMIT = 999;

export class Game_Battler_Mobile {
    private _hp: number = 100;
    private _sp: number = 10;
    private _maxhp: number = 100;
    private _maxsp: number = 10;

    /** 力量 */
    private _atk: number = 10;
    /** 強度 */
    private _def: number = 10;
    /** 速度 */
    private _spd: number = 10;
    private _states: any[];

    // 屬性
    private _elements: Array<any>;

    constructor(p?: { [param: string]: number }) {
        if (p) {
            Object.entries(p).forEach(([param, value]) => this[param] = value)
        }
        this.fullRecover();
    }

    get hp() {
        return this._hp;
    }

    set hp(v: number) {
        this._hp = Math.max(0, Math.min(v, this._maxhp));
    }

    get maxhp() {
        return this._maxhp;
    }

    set maxhp(v: number) {
        this._maxhp = Math.max(0, Math.min(v, MAXHP_LIMIT));
    }

    get sp() {
        return this._sp;
    }

    set sp(v: number) {
        this._sp = Math.max(0, Math.min(v, this._maxsp));
    }

    get maxsp() {
        return this._maxsp;
    }

    set maxsp(v: number) {
        this._maxsp = Math.max(0, Math.min(v, MAXSP_LIMIT));
    }

    get atk() {
        return this._atk;
    }

    set atk(v: number) {
        this._atk = Math.max(0, Math.min(v, MAXATK_LIMIT));
    }

    get def() {
        return this._def;
    }

    set def(v: number) {
        this._def = Math.max(0, Math.min(v, MAXDEF_LIMIT));
    }

    get spd() {
        return this._spd;
    }

    set spd(v: number) {
        this._def = Math.max(0, Math.min(v, MAXSPD_LIMIT));
    }


    get states() {
        return this._states;
    }

    fullRecover() {
        this._hp = this._maxhp;
        this._sp = this._maxsp;
    }
    addState(state) {
        this._states.push(state);
    }

    removeState(state) {
        _.remove(this._states, state);
    }

    damage(
        baseDmg: number,        // 傷害基礎值
        ratio: number,          // 分散度   (0~100%)
        fixed?: boolean,        // 固定傷害?
        element?: string,       // 攻擊屬性
        battler?: Game_Battler_Mobile  // 攻擊者, 計算修正值用?
    ): number {
        // 固定傷害的場合?
        let dmg = baseDmg;
        if (!fixed) {

            // 假設分散 = 50%
            // 基礎傷害100, Math.random() - 0.5 = 0.5, 傷害 = 150
            // Math.random() - 0.5 = -0.5, 傷害 = 50
            // 分散度為0時, 本行無效, 分散度為1.0(100%), 可能造成0或2倍的傷害
            dmg += dmg * (Math.random() - 0.5) * ratio * 2;

            // 攻擊的情況下才進行防禦力抵銷
            if (baseDmg > 0) {
                dmg -= this._def;
            }
        }
        // 如果基礎值大於0(攻擊)，且傷害計算完之後小於0, 則歸0, 避免變為回復
        // 如果基礎值小於0(回覆)，且傷害計算為之後大於0, 則歸0, 避免自傷
        dmg = Math.round((dmg * baseDmg < 0) ? 0 : dmg);
        this.hp -= dmg;
        return dmg;
    }
}