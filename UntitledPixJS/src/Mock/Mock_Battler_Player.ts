import { Game_Battler } from "../Game/Game_Battler";

// 測試用的我方戰鬥角色
export class Mock_Battler_Player extends Game_Battler {
    constructor() {
        super({
            maxhp: 1000,
            maxsp: 1000,
            atk: 100,
            def: 10
        });
    }
}