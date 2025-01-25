import { EClearMethod, MiniGameBase, MiniGameOption } from '../MiniGameBase';
import { Graphics } from 'pixi.js';
import { GameConsts } from '@/constants';
import { Howl } from 'howler';
import $R from '@/resources';

/**
 * 俄羅斯方塊PC挑戰
 * Lv1: 兩方塊
 * Lv2: 三方塊
 * Lv3: 四方塊且須旋轉
 */

const tetrMinoColors = [
    // T purple 400
    0xAB47BC,
    // S green 400
    0x66BB6A,
    // Z red 400
    0xEF5350,
    // O yellow 400
    0xFFEE58,
    // L orange 400
    0xFFA726,
    // J indigo 400
    0x5C6BC0,
    // I lightblue 400
    0x29B6F6
]
const tetrMinos = [
    // T
    [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
    ],
    // S
    [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    // Z
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0]
    ],
    // O
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    // L
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    // J
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    // I
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
]
export class Scene_Tetris1 extends MiniGameBase {
    // 過關方式：達成目標
    clearMethod = EClearMethod.TARGET;
    // 小遊戲時間長度
    timeLength = 4000;
    // 目標文字
    targetText = '完美消除！';

    BGM: Howl = $R.Audio.ME_game6;

    constructor(option?: MiniGameOption) {
        super();
        const Bg = new Graphics();
        Bg.beginFill(0xBBBBBB);
        Bg.drawRect(0, 0, GameConsts.WIDTH, GameConsts.HEIGHT);
        Bg.endFill();
        Bg.alpha = 1;
        this.addChild(Bg);

        
    }

    update(delta: number): void {
        super.update(delta);
    }

}