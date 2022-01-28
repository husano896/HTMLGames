import { Scene } from './../scene';
export enum EClearMethod {
	// 目標達成
	TARGET = 0,
	// 撐到時間到
	SURVIVE,
}
export abstract class MiniGameBase extends Scene {
	// 過關flag
	clearFlag: boolean;
	// 過關方式
	clearMethod: EClearMethod;
	// 小遊戲時間長度
	timeLength: number;
	// 目標文字
	targetText: string;
	constructor() { super(); }

	get Succed() {
		// 如果是達成目標時, clearFlag須為true
		// 如果是生存制時, clearFlag須為false
		if (this.clearMethod === EClearMethod.TARGET) {
			return this.clearFlag;
		} else {
			return !this.clearFlag;
		}
	}
}