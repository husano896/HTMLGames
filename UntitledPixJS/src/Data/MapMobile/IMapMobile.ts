import IInterpreter from '@/Interfaces/IInterpreter'

/** 地圖資料的格式 */
export default interface IMapMobile {
  /** 地圖名稱 */
  name: string | (() => string);

  /** 地圖說明 */
  description: string | (() => string);

  /** 在地圖上的位置 (x) */
  x: number | (() => number);

  /** 在地圖上的位置 (y) */
  y: number | (() => number);

  /** 地圖上顯示的圖片 */
  image?: string | (() => string);

  /** 是否在地圖可見 */
  visible: boolean | (() => boolean);

  /** 進地圖之後的事件 */
  events: Array<{
    /** 是否觸發事件, 同時多件事情可觸發時, 以陣列前方的為優先 */
    condition: () => boolean;
    payload: (interpreter?: IInterpreter) => void;
  }>;

  /** 是否為家 */
  home?: boolean;
}
