import { Game_Global_Mobile } from "@/Game";
import { IItem } from "./IItem";

const Item: IItem = {
    name: '生菜',
    description: '在草原地帶採集到, 越新鮮越有自然的風味!',
    use: () => {
        Game_Global_Mobile.battler.def += 1;
        alert('強度上升了1點！')
    }
}

export default Item