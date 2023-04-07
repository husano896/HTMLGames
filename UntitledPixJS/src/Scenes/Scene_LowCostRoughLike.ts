import Keyboard from "pixi.js-keyboard";
import $game from "../main";
import {
  Container,
  FederatedPointerEvent,
  Graphics,
  Text,
  TextStyle,
} from "pixi.js";

/** 用來處理遊戲難度的集合處 */
class Leveling {
  /// 玩家側
  /** 玩家的移動速度 */
  static playerMoveSpeed(scene: Scene_LowCostRoughLike) {
    return Math.min(16, (scene.currentTime - scene.startTime) / 60000 + 4);
  }
  /** 子彈的冷卻時間 */
  static shootCoolDown(scene: Scene_LowCostRoughLike) {
    return Math.max(1, 10 - (scene.currentTime - scene.startTime) / 30000);
  }
  /// 敵人側
  /** 敵人的攻擊力 */
  static enemyAttackPower(scene: Scene_LowCostRoughLike) {
    return (scene.currentTime - scene.startTime) / 60000;
  }

  /** 敵人移動速度 */
  static enemyMoveSpeed(scene: Scene_LowCostRoughLike) {
    return Math.min(8, (scene.currentTime - scene.startTime) / 60000 + 1);
  }

  /** 生怪的冷卻時間 */
  static spawnCoolDown(scene: Scene_LowCostRoughLike) {
    return Math.max(10, 20 - (scene.currentTime - scene.startTime) / 60000);
  }

  /** 生怪的數量 */
  static spawnCount(scene: Scene_LowCostRoughLike) {
    return Math.floor(
      Math.random() * ((scene.currentTime - scene.startTime) / 60000) +
        1 +
        (scene.currentTime - scene.startTime) / 180000
    );
  }

  /** 玩家評分 */
  static rank(scene: Scene_LowCostRoughLike) {
    const aliveTime = (scene.currentTime - scene.startTime) / 1000;
    if (aliveTime > 240) {
      return "S";
    }
    if (aliveTime > 210) {
      return "AAA";
    }
    if (aliveTime > 180) {
      return "AA";
    }
    if (aliveTime > 150) {
      return "A";
    }
    if (aliveTime > 120) {
      return "B";
    }
    if (aliveTime > 90) {
      return "C";
    }
    if (aliveTime > 60) {
      return "D";
    }
    if (aliveTime > 30) {
      return "E";
    }
    // 實測2000血放死可以撐90秒
    return "F";
  }
}
/** 文字風格 */
const fontStyle = new TextStyle({
  align: "center",
  fontFamily: "Arial",
  fontSize: 24,
  fill: ["#777777"], // gradient
  stroke: "#777777",
  strokeThickness: 1,
  dropShadowAngle: 180,
});

/** 文字風格大 */
const fontStyleLarge = new TextStyle({
  align: "center",
  fontFamily: "Arial",
  fontSize: 36,
  fill: ["#FFFFFF"], // gradient
  stroke: "#777777",
  strokeThickness: 1,
  dropShadowAngle: 180,
});

/** 子彈物件 */
export class Sprite_Ammo extends Graphics {
  /** 橫移動變量 */
  vecX: number;
  /** 縱移動變量 */
  vecY: number;

  constructor(vecX: number, vecY: number) {
    super();
    this.vecX = vecX;
    this.vecY = vecY;

    // 子彈是個8x8的小藍綠色框框
    this.beginFill(0x00cccc);
    this.drawRect(0, 0, 8, 8);
    this.endFill();
  }
}
/** 低成本RoughLike遊戲 */
export class Scene_LowCostRoughLike extends Container {
  bg: Graphics;

  /** 玩家物件 */
  player: Graphics;

  /** 玩家血量 */
  life: number;

  /** 敵人物件 */
  enemies: Container<Graphics>;

  /** 我方子彈 */
  playerAmmos: Container<Sprite_Ammo>;

  /** 文字_遊玩時間 */
  text_playTime: Text;

  /** 文字_血量 */
  text_health: Text;

  /** 文字_GG */
  text_gameover: Text;

  /** 開始時間 */
  startTime: number;

  /** 目前時間 */
  currentTime: number;

  /** 距離上次產生怪物的時間 */
  spawnCoolDown: number;

  /** 距離上次射擊的時間 */
  shootCoolDown: number;

  /** 滑鼠所在的位置 */
  mouseX: number = 0;
  mouseY: number = 0;

  constructor() {
    super();

    // 背景
    this.bg = new Graphics();
    this.bg.beginFill(0x0);
    this.bg.drawRect(0, 0, $game.screen.width, $game.screen.height);
    this.bg.endFill();

    this.bg.interactive = true;
    // 玩家物件
    this.player = new Graphics();

    // 玩家是個25x25的小白框框
    this.player.beginFill(0xfffffff);
    this.player.drawRect(0, 0, 25, 25);
    this.player.endFill();

    // 敵人物件容器
    this.enemies = new Container();

    // 玩家子彈容器
    this.playerAmmos = new Container();

    // 遊玩時間的文字
    this.text_playTime = new Text("", fontStyle);
    this.text_playTime.anchor.set(0.5);

    this.text_health = new Text("", fontStyle);
    this.text_health.anchor.set(0.5);

    // GG的文字
    this.text_gameover = new Text("Click to Start", fontStyleLarge);
    this.text_gameover.interactive = true;
    this.text_gameover.cursor = "pointer";
    this.text_gameover.anchor.set(0.5);

    this.addChild(
      this.bg,
      this.player,
      this.playerAmmos,
      this.enemies,
      this.text_playTime,
      this.text_health,
      this.text_gameover
    );
    this.on("pointermove", this.onPointerMove.bind(this));
    this.on("pointertap", this.onPointerTap.bind(this));
  }

  /** 開始遊戲 */
  startGame() {
    // 開始玩的時間
    this.startTime = new Date().getTime();

    // 設定為1000滴血
    this.Life = 1000;

    // 顯示玩家
    this.player.visible = true;

    // 怪物重生的時間
    this.spawnCoolDown = 0;

    // 射擊時間
    this.shootCoolDown = 0;

    // 玩家置中
    this.player.x = ($game.screen.width - this.player.width) / 2;
    this.player.y = ($game.screen.height - this.player.height) / 2;

    // 清乾淨上次的敵人 (如果還有活著的)
    this.enemies.removeChildren();
  }

  update(delta: number) {
    // 讓文字保持在畫面中央
    this.text_playTime.x = $game.screen.width / 2;
    this.text_playTime.y = $game.screen.height / 2;

    this.text_health.x = this.text_playTime.x;
    this.text_health.y = this.text_playTime.y + this.text_playTime.height + 8;

    this.text_gameover.x = $game.screen.width / 2;
    this.text_gameover.y = ($game.screen.height - this.text_gameover.height)/ 2;

    // GG惹
    if (this.life <= 0) {
      return;
    }

    // 目前時間
    this.currentTime = new Date().getTime();
    // 更新目前已遊玩時間的文字
    this.text_playTime.text = `${Math.floor(
      (this.currentTime - this.startTime) / 1000
    )}s`;

    // 更新玩家血量
    // 玩家操作
    this.playerThonk(delta);

    // 倒數子彈的冷卻時間
    this.shootCoolDown -= delta;

    // 如果生子彈的冷卻時間已到
    if (this.shootCoolDown < 0) {
      // 生子彈
      this.spawnPlayerAmmo();
      // 然後設定子彈的冷卻時間
      this.shootCoolDown += Leveling.shootCoolDown(this);
    }

    // 敵人操作
    this.enemies.children.forEach((enemy) => {
      this.enemyThonk(enemy, delta);
    });

    // 子彈操作
    this.playerAmmos.children.forEach((ammo) => {
      this.ammoThonk(ammo, delta);
    });

    // 倒數生怪的冷卻時間
    this.spawnCoolDown -= delta;

    // 如果生怪物的冷卻時間已到
    if (this.spawnCoolDown < 0) {
      const spawnCount = Leveling.spawnCount(this);
      // 生隨機數量的怪
      for (let i = 0; i < spawnCount; i++) {
        this.spawnEnemy();
      }
      // 然後設定生怪的冷卻時間
      this.spawnCoolDown += Leveling.spawnCoolDown(this);
    }
  }
  /**
   * 兩個物體是否重疊
   * @param a A物件
   * @param b B物件
   * @returns 是否重疊
   */
  collideCheck(a: Container, b: Container): boolean {
    const ab = a.getBounds();
    const bb = b.getBounds();
    return (
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height
    );
  }

  /** 生出一個怪物 */
  spawnEnemy() {
    const newEnemy = new Graphics();
    // 敵人是個10x10的小紅框框
    newEnemy.beginFill(0xcc0000);
    newEnemy.drawRect(0, 0, 10, 10);
    newEnemy.endFill();

    // 把敵人放在螢幕邊邊
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        // 放在上面
        newEnemy.x = $game.screen.width * Math.random();
        newEnemy.y = 0;
        break;
      case 1:
        // 放在右邊
        newEnemy.x = $game.screen.width;
        newEnemy.y = $game.screen.height * Math.random();
        break;
      case 2:
        // 放在下面
        newEnemy.x = $game.screen.width * Math.random();
        newEnemy.y = $game.screen.height;
        break;
      default:
        // 放在左邊
        newEnemy.x = 0;
        newEnemy.y = $game.screen.height * Math.random();
        break;
    }

    // 進戰場！
    this.enemies.addChild(newEnemy);
  }

  /** 生出玩家子彈 */
  spawnPlayerAmmo() {
    // 總之就是數學向量計算
    const dx = this.player.x + this.player.width / 2 - this.mouseX;
    const dy = this.player.y + this.player.height / 2 - this.mouseY;
    const dir = Math.atan2(dy, dx) - Math.PI / 2;

    const ammoSpeed = (this.currentTime - this.startTime) / 100000 + 4; // 子彈移動速度隨遊戲時間增高

    const vecX = Math.sin(dir) * ammoSpeed;
    const vecY = -Math.cos(dir) * ammoSpeed;

    const newAmmo = new Sprite_Ammo(vecX, vecY);

    // 把子彈的位置設定的跟玩家一樣
    newAmmo.x = this.player.x + this.player.width / 2;
    newAmmo.y = this.player.y + this.player.height / 2;

    // 子彈也進戰場！
    this.playerAmmos.addChild(newAmmo);
  }
  /** 玩家思考 */
  playerThonk(delta: number) {
    // 玩家移動速度也隨著時間增高
    const playMoveSpeed = Leveling.playerMoveSpeed(this);

    // 左
    if (Keyboard.isKeyDown("KeyA") || Keyboard.isKeyDown("ArrowLeft")) {
      this.player.x = Math.max(
        this.player.width,
        this.player.x - playMoveSpeed * delta
      );
    }
    // 右
    if (Keyboard.isKeyDown("KeyD") || Keyboard.isKeyDown("ArrowRight")) {
      this.player.x = Math.min(
        $game.screen.width - this.player.height,
        this.player.x + playMoveSpeed * delta
      );
    }
    // 上
    if (Keyboard.isKeyDown("KeyW") || Keyboard.isKeyDown("ArrowUp")) {
      this.player.y = Math.max(
        this.player.height,
        this.player.y - playMoveSpeed * delta
      );
    }
    // 下
    if (Keyboard.isKeyDown("KeyS") || Keyboard.isKeyDown("ArrowDown")) {
      this.player.y = Math.min(
        $game.screen.height - this.player.height,
        this.player.y + playMoveSpeed * delta
      );
    }
  }

  /** 敵人思考 */
  enemyThonk(enemy: Container, delta: number) {
    // 敵人移動速度隨遊戲時間增高
    const enemyMoveSpeed = Leveling.enemyMoveSpeed(this);

    // 朝玩家移動
    enemy.x +=
      enemyMoveSpeed *
      (this.player.x + this.player.width / 2 > enemy.x ? 1 : -1) *
      delta;
    enemy.y +=
      enemyMoveSpeed *
      (this.player.y + this.player.height / 2 > enemy.y ? 1 : -1) *
      delta;

    // 如果玩家和敵人疊在一起了
    if (this.collideCheck(this.player, enemy)) {
      // 扣玩家的血
      this.Life -= delta * Leveling.enemyAttackPower(this);
    }
  }

  /** 子彈思考 */
  ammoThonk(ammo: Sprite_Ammo, delta: number) {
    // 朝方向移動
    ammo.x += ammo.vecX * delta;
    ammo.y += ammo.vecY * delta;

    // 每個敵人都要做檢查！
    this.enemies.children.forEach((enemy) => {
      // 如果子彈和敵人疊在一起了
      if (this.collideCheck(ammo, enemy)) {
        // I guess I'll die
        enemy.removeFromParent();
        ammo.removeFromParent();
      }
    });

    // 子彈出界也掰掰
    if (
      ammo.x < 0 ||
      ammo.x > $game.screen.width ||
      ammo.y < 0 ||
      ammo.y > $game.screen.height
    ) {
      ammo.removeFromParent();
    }
  }
  /** 取得與設定玩家的生命 */
  get Life() {
    return this.life;
  }

  set Life(v: number) {
    this.life = Math.max(0, v);
    this.text_health.text = `${Math.ceil(this.life)} HP`;
    // 如果玩家死了
    if (this.life <= 0) {
      // 不顯示玩家
      this.player.visible = false;
      this.text_gameover.visible = true;
      this.text_gameover.text = `GAME OVER\n\nRank: ${Leveling.rank(this)}\n${
        this.text_playTime.text
      }\n\nClick to retry`;
      return;
    }
  }

  /** 指標移動事件 */
  onPointerMove(ev: FederatedPointerEvent) {
    console.log(ev);
    this.mouseX = ev.globalX;
    this.mouseY = ev.globalY;
  }

  /** 指標按下事件 */
  onPointerTap(ev: FederatedPointerEvent) {
    console.log(ev);
    // 如果GG了
    if (this.text_gameover.visible) {
      // 重來
      this.startGame();
      this.text_gameover.visible = false;
    }
  }
}

export default Scene_LowCostRoughLike;
