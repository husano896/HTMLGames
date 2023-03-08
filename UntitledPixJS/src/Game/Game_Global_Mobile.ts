/** 給Scene_Mobile系列使用的全域參數 */
export class Game_Global_Mobile {

    /** 持有金幣數量 */
    private static _gold = 0;

    private static _goldValueChanged = false;

    public static get gold(): number {
        return this._gold;
    }

    public static set gold(value: number) {
        this._gold = value;
        this._goldValueChanged = true;
    }

    public static get goldValueChanged() {
        return this._goldValueChanged;
    }

    static update(delta?: number) {

    }
    static postUpdate(delta?: number) {
        this._goldValueChanged = false;
    }
}