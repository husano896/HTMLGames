import _, { values } from "lodash-es";
import { Game_Battler_Mobile } from './Game_Battler_Mobile'
const LOCALSTORAGE_SAVE_KEY = 'untitledpixjs_mobile'

/** 給Scene_Mobile系列使用的全域參數 */
export class Game_Global_Mobile {

    /** 持有金幣數量 */
    private static _gold: number = 0;

    /** 遊戲進度, 目前預想為 120為終點 */
    private static _progress: number = 0;

    /** 行動值 */
    private static _energy: number = 24;

    /** 離開前最後動作的時間 */
    private static _lastLogin: number;
    /** 
     * 獨立性, 越高時越獨立, 否則越依賴 
     * 太依賴或太獨立飛飛都不會喜歡哦...
    */
    private static _independency: number = 0;

    /** 
     * 距離每次上次登入的時間, 只計超過1小時(同progress計算) 
     * 與安定性數值相關
     */
    private static _lastLoginInterval: Array<number> = [];

    /** 
     * 飛飛肚子餓了
     * ［！］太久沒有吃東西的話飛飛會死掉的！
     * 判定方式為連續進度推進前飢餓度為負時
     * 正數時代表有吃飽, 推進進度時為正時歸0, 否則-3
     */
    private static _hunger = 0;

    /** 
     * 信任度
     * 類似友好度, 但說話不算話時會降低的哦！
     * 例如太久沒回來又沒說一聲
     * 可以想成Plurk的卡瑪
     */
    private static _reliability = 0;

    /** 
     * 假期模式
     * 啟動後, 鎖定信任度的值
     * */
    private static _freezeMode = false;

    /** 打架用角色 */
    private static _battler = new Game_Battler_Mobile();

    /** 是否觸發下段劇情 */
    public static triggerNextProgress = true;

    static init() {
        this.loadFromLocalStorage();
        this.checkNextProgress()
        console.log(this)
    }

    public static get gold(): number {
        return this._gold;
    }

    public static set gold(value: number) {
        this._gold = value;
        this.SaveToLocalStorage();
    }

    public static get progress() {
        return this._progress;
    }

    public static get energy() {
        return this._energy;
    }

    public static get battler() {
        return this._battler;
    }

    /** 行動值範圍為0~48 */
    public static set energy(value: number) {
        this._energy = Math.max(0, Math.min(48, value));
        this.SaveToLocalStorage();
    }

    static update(delta?: number) {

    }

    /** 自LocalStorage取得上次存檔 */
    static loadFromLocalStorage() {
        const save = localStorage.getItem(LOCALSTORAGE_SAVE_KEY);
        if (!save) {
            return;
        }

        try {
            const dto = JSON.parse(save) as any;
            if (!dto) {
                return;
            }
            _.forEach(dto, (value, key) => {
                this[key] = value;
            })
            // 需特別轉換的項目
            if (dto._battler) {
                this._battler = new Game_Battler_Mobile(dto._battler);
            }
        } catch (err) {
            console.warn('[Game_Global_Mobile] 本地存檔讀取失敗.', err)
        } finally {
            // 假如沒有存檔要做的事
        }
    }

    static SaveToLocalStorage() {
        this._lastLogin = Date.now();
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
        const dateNow = Date.now();
        if ((dateNow - this._lastLogin) / 1000 > 3600) {
            this._progress += 1;
            // 跟場景說要過劇情了~
            this.triggerNextProgress = true;
        }
    }

    static ToJSON() {
        return JSON.stringify(Object.fromEntries(Object.entries(this)))
    }
}