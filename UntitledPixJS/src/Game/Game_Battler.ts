const MAXHP_LIMIT = 9999;
const MAXSP_LIMIT = 999;
const MAXATK_LIMIT = 999;
const MAXDEF_LIMIT = 999;

export class Game_Battler {
    private _hp: number;
    private _sp: number;
    private _maxhp: number;
    private _maxsp: number;

    private _atk: number;
    private _def: number;
    private _states: any[];
    constructor(p?: { [param: string]: number }) {
        if (p) {
            Object.entries(p).forEach(([param, value]) => this[param] = value)
        }
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
}