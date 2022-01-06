// 拍點類型
export enum NoteType {
	// 0視為無效Note 僅供儲存資訊用
	NONE = 0,
	// 點擊
	CLICK,
	// 接
	CATCH,
	// 長條
	LONG,
	// 左旋轉
	LSPIN,
	// 右旋轉
	RSPIN
}

// 長條節點
export interface ILongNoteNode {
	// 時間點(s)
	time: number;
	// 尺寸
	size?: number;
	// 移動幅度
	delta: number;
	// 計算方式
	mathFunc?: 'linear' | 'Si' | 'So' | string;
}

// 拍點
export interface INote {
	// 類型
	type: NoteType;
	// 時間點(s)
	time: number;
	// 尺寸
	size?: number;
	// 給長條使用：長條節點
	nodes?: Array<ILongNoteNode>;
	// 角度
	rotation: number;
}

// 檯面旋轉點
export interface IRotate {
	// 時間點(s)
	time: number;
	// 旋轉幅度
	delta: number;
	// 計算方式
	mathFunc?: 'linear' | 'Si' | 'So' | string;
}

// 譜面流速
export interface IScrollSpeed {
	// 時間點(s)
	time: number;
	// 速度
	BPM: number;
}
// 譜面整體
export interface IChart {
	// 歌曲名稱
	name: string;
	// 譜師名
	charter: string;
	// 難度 (Easy/Normal/Hard)
	diff: 'easy' | 'normal' | 'hard' | string;
	// 等級
	level: number;
	// 拍點
	notes: Array<INote>;
	// 旋轉點
	rotates?: Array<IRotate>
	// 變速點
	scrollSpeeds?: Array<IScrollSpeed>
	// 版本
	version: string;
}

// 
export const exampleChart: IChart = {
	name: '測試歌曲',
	charter: '測試譜師',
	diff: 'normal',
	level: 10,
	notes: [],
	rotates: [],
	scrollSpeeds: [],
	version: '1.0-20211126'
};