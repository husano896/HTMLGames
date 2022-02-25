import * as PIXI from 'pixi.js';
import { $TextStyle } from '../constants';

const animLength = 72;
export class Sprite_Damage extends PIXI.Container {

  damageText: PIXI.Text;
  criticalText: PIXI.Text;
  animFrame = 0;
  constructor(damage: number | string, sp?: boolean, critical?: boolean) {
    super();
    const dmgText = typeof(damage) === 'number' ? Math.abs(damage).toString() : damage;
    this.damageText = new PIXI.Text(dmgText, this.getDamageStyle(damage, sp, critical));
    this.damageText.anchor.set(0.5);
    this.addChild(this.damageText);
    if (critical) {
      this.criticalText = new PIXI.Text('Critical', this.getDamageStyle('Critical', sp, critical));
      this.criticalText.anchor.set(0.5);
      this.criticalText.y = -24;
      this.damageText.addChild(this.criticalText);
    }
  }

  getDamageStyle(damage?: number | string, sp?: boolean, critical?: boolean) {
    if (typeof (damage) === 'number') {
      if (sp) {
        return damage > 0 ? $TextStyle.Sprite_Damage_SP : $TextStyle.Sprite_Damage_SP_Plus;
      }
      if (critical && damage > 0) {
        return $TextStyle.Sprite_Damage_HP_Critical;
      }
      return damage > 0 ? $TextStyle.Sprite_Damage_HP : $TextStyle.Sprite_Damage_HP_Plus;
    } else if (critical) {
      return $TextStyle.Sprite_Damage_Critical;
    }
    return $TextStyle.Sprite_Damage;
  }
  update(delta: number) {
    if (this.animFrame >= animLength) {
      this.destroy();
      return;
    }
    const percent = Math.sin(Math.PI * this.animFrame / animLength);
    const percent2 = Math.cos(Math.PI / 2 * this.animFrame / animLength);
    this.damageText.x = (1 - percent2)* 128;
    this.damageText.y = - percent * 128;
    this.damageText.scale.set(percent2 * 0.75 + 0.25);

    this.animFrame += delta;
  }
}