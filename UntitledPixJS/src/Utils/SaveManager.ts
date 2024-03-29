// 用來處理存檔資訊與格式的Class

const localStorageKey = 'untitled_save'

/**
 * 玩RPG遊戲總要有存檔可以累積吧 是否
 */
export class SaveFile {
    constructor(input?: { [key: string]: any }) {
        if (input) {
            Object.entries(input).forEach(([key, value]) => {
                this[key] = value;
            })
        }
    }
}
export class SaveManger {

    load() {
        const raw = localStorage.getItem(localStorageKey);
        if (!raw) {
            return null;
        }
        return new SaveFile(JSON.parse(raw));
    }
    save(input: {}) {
        const file = new SaveFile(input);
        localStorage.setItem(localStorageKey, JSON.stringify(file));
    }
}