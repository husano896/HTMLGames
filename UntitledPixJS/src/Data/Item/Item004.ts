import { Game_Global_Mobile } from "@/Game";
import { IItem } from "./IItem";

const Item: IItem = {
    name: '淺水生魚',
    description: '在河邊可捕捉到, 可生吃也可簡單調味就變得很好吃!',
    use: () => {
        Game_Global_Mobile.battler.spd += 1;
        alert('敏捷上升了1點！')
    }
}

export default Item