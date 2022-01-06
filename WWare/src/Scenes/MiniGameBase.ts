export enum EClearMethod {
	// 目標達成
	TARGET = 0,
	// 撐到時間到
	SURVIVE,
}
export class MiniGameBase {
	// 過關flag
	failed: boolean;
	// 過關方式
	clearMethod: EClearMethod;
	// 小遊戲時間長度
	timeLength: number;
	// 目標文字
	targetText: string;
	constructor() {}

	get Succed() {
		return !this.failed;
	}
}