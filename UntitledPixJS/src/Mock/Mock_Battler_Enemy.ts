import { Game_Battler } from "../Game/Game_Battler";

// 測試用的敵方戰鬥角色
export class Mock_Battler_Enemy extends Game_Battler {
    constructor() {
        super({
            maxhp: 500,
            maxsp: 10,
            atk: 50,
            def: 50
        });
    }
}