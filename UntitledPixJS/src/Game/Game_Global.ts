import { Game_Battler } from './Game_Battler';
export class Game_Global {
    static battler = new Game_Battler({
        maxhp: 1000,
        hp: 1000,
        maxsp: 100,
        sp: 100,
        atk: 10,
        def: 0
    });
}