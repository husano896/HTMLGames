import { Game_Global_Mobile } from "@/Game";
import { Container, Sprite, Text, IDestroyOptions } from "pixi.js";
import { Window_HomeStatus } from "./../Sprites/Window_HomeStatus";
import { Window_HomeInvetory } from "./../Sprites/Window_HomeInvetory";
import { Window_Gold } from "./../Sprites/Window_Gold";
import { Sprite_Button } from "./../Sprites/Sprite_Button";
import { Window_Message } from "./../Sprites/Window_Message";
import { Sprite_Battery } from "@/Sprites/Sprite_Battery";
import { Sprite_FlyDragon } from "@/Sprites/Sprite_FlyDragon";
import { AudioKeys } from "../resources";
import { Scene } from "./scene";

import { IResizeable } from "../Interfaces/IResizeable";
import $game from "@/main";
import $R from "../resources";
import { $TextStyle, ChangeScene } from "@/constants";
import { sound } from "@pixi/sound";

/** 在家 */
class HomeUIContainer extends Container implements IResizeable {
  OpenItemButton: Sprite_Button;
  OpenMapButton: Sprite_Button;
  OpenWorkButton: Sprite_Button;

  BatterySprite: Sprite_Battery;
  disabled: boolean;
  constructor() {
    super();

    this.OpenItemButton = new Sprite_Button("物品", null, {
      width: 64,
      height: 64,
    });
    this.OpenWorkButton = new Sprite_Button("工作", null, {
      width: 64,
      height: 64,
    });
    this.OpenMapButton = new Sprite_Button("地圖", null, {
      width: 64,
      height: 64,
    });
    this.BatterySprite = new Sprite_Battery();

    this.OpenItemButton.interactive = true;
    this.OpenItemButton.cursor = "pointer";

    this.OpenWorkButton.interactive = true;
    this.OpenWorkButton.cursor = "pointer";

    this.OpenMapButton.interactive = true;
    this.OpenMapButton.cursor = "pointer";

    this.BatterySprite.interactive = true;
    this.BatterySprite.cursor = "pointer";

    this.addChild(
      this.OpenItemButton,
      this.OpenMapButton,
      this.OpenWorkButton,
      this.BatterySprite
    );
    this.onWindowResize();
  }

  update(delta: number) {
    this.children.forEach((child) => (child as any).update?.(delta));
  }

  // Container內自己的寬度
  onWindowResize() {
    this.children.forEach((child) => (child as any).update?.(0));
    const gap = Math.min(
      128,
      Math.max($game.screen.width / (this.children.length - 1) / 2, 16)
    );

    // 選單按鈕們
    this.OpenItemButton.x = 0;
    this.OpenWorkButton.x =
      this.OpenItemButton.x + this.OpenWorkButton.width + gap;
    this.OpenMapButton.x =
      this.OpenWorkButton.x + this.OpenMapButton.width + gap;

    // 剩餘行動值
    this.BatterySprite.x = this.width / 2 - this.BatterySprite.width / 2;
    this.BatterySprite.y = 48;
  }
}
/** 練習做手機版介面用... */
export class Scene_Mobile extends Scene implements IResizeable {
  bg: Sprite;
  dragon: Sprite_FlyDragon;

  window_message: Window_Message;

  window_homeInvetory: Window_HomeInvetory;

  window_homeStatus: Window_HomeStatus;

  window_gold: Window_Gold;

  /** 在家時可使用的按鈕們*/
  homeUIContainer: HomeUIContainer;

  backButton: Sprite_Button;

  /** 進度文字 */
  progressText: Text;
  constructor() {
    super();
    // 背景
    this.bg = Sprite.from($R.Image.bgYellow);
    this.bg.anchor.set(0.5);

    // 乖龍龍
    this.dragon = new Sprite_FlyDragon();
    this.dragon.anchor.set(0.5);

    // 文字視窗
    this.window_message = new Window_Message();
    this.window_message.x = 8;

    // 道具視窗
    this.window_homeInvetory = new Window_HomeInvetory();

    // 能力視窗
    this.window_homeStatus = new Window_HomeStatus();
    // 金錢視窗
    this.window_gold = new Window_Gold();

    // 滑鼠事件綁定
    this.progressText = new Text("", $TextStyle.Window_Progress);
    this.progressText.interactive = true;
    this.progressText.cursor = "pointer";
    this.progressText.on("pointertap", () => {
      if (this.window_message.typing) {
        return;
      }

      this.window_message.appendText(
        "進行度, 每次經過一個小時的休息後即會推進."
      );
    });

    console.log(this);

    // 點擊乖龍龍說話
    this.dragon.on("pointertap", () => {
      if (!this.homeUIContainer.visible) {
        return;
      }
      this.window_message.appendText("飛飛乖！\n咕姆姆姆姆姆姆...");
    });
    this.dragon.interactive = true;
    this.dragon.cursor = "pointer";

    // 在自己家場景時能用的UI
    this.homeUIContainer = new HomeUIContainer();
    this.homeUIContainer.OpenItemButton.callback = (() => {
      if (this.window_message.typing) {
        return;
      }

      this.window_homeStatus.visible = true;
      this.window_homeInvetory.visible = true;
    }).bind(this);

    this.homeUIContainer.OpenMapButton.callback = async () => {
      if (this.window_message.typing) {
        return;
      }

      await ChangeScene((await import("@/Scenes/Scene_MobileMap")).default)
    };

    this.homeUIContainer.OpenWorkButton.callback = () => {
      if (this.window_message.typing) {
        return;
      }
      this.window_message.appendText("工作選單待用, 需消耗2體力");
      Game_Global_Mobile.energy -= 2;
    };

    this.homeUIContainer.BatterySprite.on("pointertap", () => {
      if (this.window_message.typing) {
        return;
      }
      Game_Global_Mobile.energy += 2;
      this.window_message.appendText(
        "能量值, 須等待現實世界中的一小時後才會恢復24單位."
      );
    });

    this.backButton = new Sprite_Button("返回", null, {
      width: 64,
      height: 64,
    });
    this.backButton.interactive = true;
    this.backButton.cursor = "pointer";
    this.backButton.visible = false;

    this.backButton.on("pointertap", () => {
      // 返回主頁面
      this.window_homeInvetory.visible = false;
      this.window_homeStatus.visible = false;
    });
    this.addChild(
      this.bg,
      this.dragon,
      this.homeUIContainer,
      this.window_homeInvetory,
      this.window_homeStatus,
      this.window_message,
      this.window_gold,
      this.backButton,
      this.progressText
    );

    /** 是否觸發下一個劇情 */
    this.progressText.text = `Time\n${Game_Global_Mobile.progress}/120`;
    if (Game_Global_Mobile.triggerNextProgress) {
      Game_Global_Mobile.triggerNextProgress = false;
      this.triggerNextProgress();
    }

    this.onWindowResize();
    console.log(this);

    sound.stopAll();
    sound.play(AudioKeys.BGM_Mobile, { loop: true });
  }
  destroy(options?: boolean | IDestroyOptions): void {
    document.removeEventListener(
      "resize",
      this.onWindowResize.bind(this),
      true
    );
    super.destroy(options);
  }

  update(delta: number) {
    super.update(delta);
    Game_Global_Mobile.update(delta);
    /** 目前文字視窗進行中, 或狀態顯示中 */
    this.homeUIContainer.visible = !(
      this.window_message.visible ||
      this.window_homeStatus.visible ||
      this.window_homeInvetory.visible
    );

    this.window_gold.visible = this.homeUIContainer.visible;
    this.progressText.visible = this.homeUIContainer.visible;
    /** 返回按鈕只在開啟功能選單時顯示 */
    this.backButton.visible =
      this.window_homeStatus.visible || this.window_homeInvetory.visible;

    // 龍龍的位置更新
    this.dragon.y = $game.screen.height / 2 + Math.sin(Date.now() / 4096) * 32;
  }
  triggerNextProgress() {
    this.window_message.appendText(`目前進度：${Game_Global_Mobile.progress}.`);
  }

  /** 遊戲視窗變更大小時 */
  onWindowResize() {
    console.log("resize");

    this.bg.x = $game.screen.width / 2;
    this.bg.y = $game.screen.height / 2;

    this.dragon.x = $game.screen.width / 2;
    this.dragon.y = $game.screen.height / 2;

    // HomeUI
    this.homeUIContainer.x =
      $game.screen.width / 2 - this.homeUIContainer.width / 2;
    this.homeUIContainer.y = $game.screen.height - this.homeUIContainer.height;

    this.window_gold.x = Math.max(16, $game.screen.width / 2 - 600);
    this.window_gold.y = 16;

    this.window_homeInvetory.x = 16;

    this.window_homeStatus.x = Math.max(
      $game.screen.width - 16 - this.window_homeStatus.width,
      $game.screen.width / 2
    );

    // this.window_message.y = $game.screen.height - this.window_message.height - 16;
    this.backButton.x = $game.screen.width - this.backButton.width - 16;
    this.backButton.y = $game.screen.height - this.backButton.height - 16;

    this.progressText.x = Math.max(
      $game.screen.width - this.progressText.width - 16,
      $game.screen.width / 2 - 600
    );
    this.progressText.y = 16;

    if (
      $game.screen.width < $game.screen.height ||
      $game.screen.width / $game.screen.height < 16 / 9
    ) {
      // 直向時, 直向填滿
      this.bg.height = $game.screen.height;
      this.bg.width = (this.bg.height / 9) * 16;
    } else {
      //橫向時, 橫向填滿
      this.bg.width = $game.screen.width;
      this.bg.height = (this.bg.width / 16) * 9;
    }
    super.onWindowResize();
  }

}
export default Scene_Mobile;