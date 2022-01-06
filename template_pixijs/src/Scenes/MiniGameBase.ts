export enum EClearMethod {
	// 目標達成
	TARGET = 0,
	// 撐到時間到
	SURVIVE,
}
export class MiniGameBase {
	failed: boolean;
	clearMethod: EClearMethod;
	
	timeLength: number;
	constructor() {}
}