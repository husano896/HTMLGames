export interface IItem {
    name: string;
    description: string;

    /** 使用道具, 回傳true時不減少道具個數 */
    use?: () => boolean | void
}