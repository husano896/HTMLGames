import { Game_Global_Mobile } from '@/Game/Game_Global_Mobile';
import { sound } from '@pixi/sound'
import IInterpreter from '@/Interfaces/IInterpreter';
import { AudioKeys } from '@/resources';

interface IHomeEvent {
    condition: () => boolean;
    payload: (interpreter?: IInterpreter) => Promise<void>;
}

/** 在養成畫面會發生的事件 */
const HomeEvents: Array<IHomeEvent> = [
    {
        // 如果有特殊事件時, 不顯示預設的目前進度
        condition: () => Game_Global_Mobile.triggerNextProgress && (![3, 99, 100, 119, 120].find(a => a === Game_Global_Mobile.progress)),
        payload: async (interpreter) => {
            interpreter.AddText(`目前進度：${Game_Global_Mobile.progress}.`)
            // Game_Global_Mobile.triggerNextProgress = false;
        }
    },
    // 進行度3：相處一小段時間
    {
        condition: () => Game_Global_Mobile.triggerNextProgress && Game_Global_Mobile.progress === 3,
        payload: async (interpreter) => {
            interpreter.AddText(`目前在這個世界搭的還喜歡嗎？希望你有把飛飛照顧好！`)
            Game_Global_Mobile.triggerNextProgress = false;
        }
    },
    // 進行度99：龍的風詩2的參考：
    {
        condition: () => Game_Global_Mobile.triggerNextProgress && Game_Global_Mobile.progress === 99,
        payload: async (interpreter) => {
            sound.stopAll();
            sound.play(AudioKeys.BGM_Kaze2_Midnight, { loop: true });
            interpreter.AddText(`吶吶，是說你有聽過「龍死病」嗎？`);
            interpreter.AddText(`聽說在別的世界是跟人類的癌症一樣可怕的病，`);
            interpreter.AddText(`症狀像呼吸困難一樣越來越難呼吸，到最後會窒息而死。`);
            interpreter.AddText(`在當時帶走了很多像我一樣的龍族同伴`);
            interpreter.AddText(`不知道在這個世界會不會有一樣的病呢？`);
            Game_Global_Mobile.triggerNextProgress = false;
        }
    },
    // 進行度100：龍的風詩2~3的參考
    {
        condition: () => Game_Global_Mobile.triggerNextProgress && Game_Global_Mobile.progress === 100,
        payload: async (interpreter) => {
            sound.stopAll();
            sound.play(AudioKeys.BGM_Kaze2_Sakura, { loop: true });
            interpreter.AddText(`吶吶，後來關於「龍死病」，我後來又找到了新的資訊！`);
            interpreter.AddText(`聽說後來憑藉著龍族跟人類的羈絆，一起尋找到了根治方法，`);
            interpreter.AddText(`而且當時逃離龍死病的龍族還成為了醫生！`);
            interpreter.AddText(`只是後來，雖然方法流傳下來了，但龍醫就像傳說一樣跟著消失了`);
            interpreter.AddText(`希望我們也可以跟他們一樣厲害！`);
            Game_Global_Mobile.triggerNextProgress = false;
        }
    },
    // 進行度119：輪迴前的最後對話
    {
        condition: () => Game_Global_Mobile.triggerNextProgress && Game_Global_Mobile.progress === 119,
        payload: async (interpreter) => {

            sound.stopAll();
            sound.play(AudioKeys.BGM_Kaze2_Midnight, { loop: true });
            if (Game_Global_Mobile.cycle === 0) {
                // 一周目
                interpreter.AddText(`嗚啊...看起來時間快到了...不知道會發生什麼事呢？`)
            } else {
                // 二周目以上
                interpreter.AddText(`時間又快到了呢，這次你會想做出什麼選擇呢？`);

            }
            Game_Global_Mobile.triggerNextProgress = false;
        }
    },
    // 進行度120：時間到了。
    {
        condition: () => Game_Global_Mobile.triggerNextProgress && Game_Global_Mobile.progress === 120,
        payload: async (interpreter) => {

            sound.stopAll();
            sound.play(AudioKeys.BGM_Kaze2_Sakura, { loop: true });
            // TODO: 友好度判定、時間沙漏持有判定、周目判定
            if (Game_Global_Mobile.cycle === 0) {
                // 一周目
                interpreter.AddText(`時間到了，究竟會發生什麼事情呀！？`)
            } else {
                // 二周目以上
                interpreter.AddText(`啊啊...時間到了呢...來吧！不管你的選擇是什麼！`);
            }

            interpreter.AddText(`時間沙漏正在發光著！要接受他所發出的光芒嗎？`);

            await interpreter.WaitForTextComplete();
            // 選是的場合 - 周目+1
            if (confirm('是否要接受時間沙漏的光芒？')) {
                interpreter.AddText(`命運的時鐘完成了他的循環，同樣的歷史即將再度上演...`);
                await interpreter.WaitForTextComplete();
                Game_Global_Mobile.NextCycle();

            } else {
                // 事實上, 打破時間沙漏，影響的範圍只有打破他的人
                interpreter.AddText(`打破時間沙漏後，迎來的是充滿不確定性的時間線。`);
                interpreter.AddText(`這次，沒有回頭路了，希望你在新的時間線能待得順利！`);
                await interpreter.WaitForTextComplete();
                Game_Global_Mobile.NextCycle(true);
            }
            Game_Global_Mobile.triggerNextProgress = false;
        }
    }
]

export default HomeEvents;