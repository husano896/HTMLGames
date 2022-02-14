// 地圖中物件的zIndex
export enum MapEnum {
    // 最低層 用於地圖或遠景
    Layer_None = 0,
    // 一般角色使用, 地圖之上
    Layer_Normal = 5,
    // 建築物等會蓋在角色身上的物體使用
    Layer_High = 10,
}