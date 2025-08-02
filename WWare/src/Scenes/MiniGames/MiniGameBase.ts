import { Howl } from 'howler';
import { Scene } from './../scene';
import $R from '@/resources';

export enum EClearMethod {
	// 目標達成
	TARGET = 0,
	// 撐到時間到
	SURVIVE,
	// BOSS關, 通常為長遊戲, 
	BOSS
}

// 可給予MiniGame目前的等級調整選項或視覺
export interface MiniGameOption {
	level?: number;
	speed?: number;
}

export class MiniGameBase extends Scene {

	/** 過關flag */
	clearFlag: boolean;

	/** 過關方式 */
	clearMethod: EClearMethod = EClearMethod.SURVIVE;

	/** 小遊戲時間長度秒數，設為 -1 則不限時間 */
	timeLength: number = 1;

	/** 目標文字 */
	targetText: string = 'PlaceHolder';

	/** 使用音樂 */
	BGM: Howl = $R.Audio.ME_game2;

	frame: number = 0;

	constructor(option?: MiniGameOption) { super(); }

	get Succed() {
		// 如果是生存制時, clearFlag須為false
		if (this.clearMethod === EClearMethod.SURVIVE) {
			return !this.clearFlag;
		}
		// 如果是達成目標 / BOSS戰時, clearFlag須為true
		return this.clearFlag;
	}
	update(delta: number): void {
		this.frame += delta;
		this.children.forEach(c => (c as any).update?.(delta));
	}
}