/** 對於事件的解釋器 */
export default interface IInterpreter {

    /** 文章... */
    AddText: (text: string) => void

    /** 播放音樂 */
    // PlayMusic: (audioName: string) => void

    /** 等待當前文字結束 */
    WaitForTextComplete: ()=> Promise<void>
}