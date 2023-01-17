import { MapEnum } from "../Data/MapEnum";
import * as PIXI from 'pixi.js';
import { FederatedPointerEvent } from "pixi.js";
export interface IMapData {
    // 地圖名稱
    name: string;
    // 地圖大小(px)
    width: number;
    height: number;

    items: Array<{
        layer: MapEnum,
        texture: string
        width?: number,
        height?: number,
        x: number,
        y: number,
        // 固定在畫面上 (如遠景)
        sticky?: boolean,
        // 碰觸時執行
        onCollide?: (spr: PIXI.Sprite) => void,
        // 使用者空白鍵 / 點擊時執行
        onInteract?: (ev: FederatedPointerEvent, spr: PIXI.Sprite) => void,
        update?: (spr: PIXI.Sprite, delta: number) => void
    }>
}