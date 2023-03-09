import _ from "lodash-es";

const LOCALSTORAGE_SAVE_KEY = 'untitledpixjs_mobile'
/** 給Scene_Mobile系列使用的全域參數 */
export class Game_Global_Mobile {

    /** 持有金幣數量 */
    private static _gold: number = 0;

    private static _goldValueChanged: boolean = false;

    private static _progress: number = 0;

    private static _energy: number = 24;
    static init() {
        this.loadFromLocalStorage();
        this.checkNextProgress()
    }

    public static get gold(): number {
        return this._gold;
    }

    public static set gold(value: number) {
        this._gold = value;
        this.SaveToLocalStorage();
        this._goldValueChanged = true;
    }

    public static get goldValueChanged() {
        return this._goldValueChanged;
    }

    public static get progress() {
        return this._progress;
    }

    public static get energy() {
        return this._energy;
    }

    public static set energy(value: number) {
        this._energy = Math.max(0, Math.min(48, value));
        this.SaveToLocalStorage();
    }

    static update(delta?: number) {

    }

    static postUpdate(delta?: number) {
        this._goldValueChanged = false;
    }

    /** 自LocalStorage取得上次存檔 */
    static loadFromLocalStorage() {
        const save = localStorage.getItem(LOCALSTORAGE_SAVE_KEY);
        if (!save) {
            return;
        }

        try {
            const dto = JSON.parse(save) as {};
            if (!dto) {
                return;
            }
            _.forEach(dto, (value, key) => {
                this[key] = value;
            })
        } catch (err) {
            console.warn('[Game_Global_Mobile] 本地存檔讀取失敗.', err)
        } finally {
            // 假如沒有存檔要做的事
        }
    }

    static SaveToLocalStorage() {
        try {
            localStorage.setItem(LOCALSTORAGE_SAVE_KEY, this.ToJSON())
        } catch (err) {
            console.warn('[Game_Global_Mobile] 本地存檔讀取失敗.', err)
        } finally {
            // 假如沒有存檔要做的事
        }
    }

    /** 如果距離上次離開已經超過一小時, 推進進度 */
    static checkNextProgress() {
        this._progress += 1;
    }

    static ToJSON() {
        return JSON.stringify(Object.fromEntries(Object.entries(this)))
    }
}