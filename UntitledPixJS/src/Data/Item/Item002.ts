import { Game_Global_Mobile } from "@/Game";
import { IItem } from "./IItem";

const Item: IItem = {
    name: '生動物肉',
    description: '狩獵後得到的肉品, 適當的調理過後龍族會更喜歡!',
    use: () => {
        Game_Global_Mobile.battler.atk += 1;
        alert('力量上升了1點！')
    }
}

export default Item