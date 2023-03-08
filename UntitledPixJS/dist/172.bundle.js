"use strict";(self.webpackChunktemplate_pixijs=self.webpackChunktemplate_pixijs||[]).push([[172],{8172:(t,i,s)=>{s.r(i),s.d(i,{Scene_MobileMap:()=>l});var e=s(8519),a=s(1971),h=s(4972),n=s(9512),r=(s(7630),s(2694),s(6715));s(2599),s(3328),s(4794),s(2141),s(8683),s(5831),s(5274),s(1526),s(1690),s(816),s(6151),s(7553),s(7254);class l extends h.x{constructor(){super(),this.bg=a.jyi.from(n.ZP.Image.bgRed),this.bg.anchor.set(.5),this.addChild(this.bg),this.backButton=new r.E("回家",null,{width:64,height:64}),this.backButton.callback=async()=>{const t=await Promise.resolve().then(s.bind(s,8574)).then((t=>t.Scene_Mobile));e.Z.stage.children.forEach((t=>t.destroy({children:!0}))),e.Z.stage.removeChildren(),e.Z.stage.addChild(new t)},this.addChild(this.backButton),this.onWindowResize(),console.log(this)}update(t){}onWindowResize(){super.onWindowResize(),this.bg.x=e.Z.screen.width/2,this.bg.y=e.Z.screen.height/2,this.backButton.x=e.Z.screen.width-this.backButton.width-16,this.backButton.y=e.Z.screen.height-this.backButton.height-16}}},2694:(t,i,s)=>{s.d(i,{G:()=>a});var e=s(1971);class a extends e.KgH{constructor(){const t={};for(let i=1;i<=9;i++)for(let s=0;s<4;s++){if(5===i)continue;const a=`M_ ${i}_${s}.ase`;t[i]||(t[i]=[]),t[i].push({texture:e.xEZ.from(a),time:133})}super(t[2]),this.sprTextures=t,this.moveSpeed=4,this.anchor.set(.5),this.animationSpeed=1,this.target={x:0,y:0}}update(t){if(this.target){const i=Math.atan2(this.target.y-this.y,this.target.x-this.x),s=(this.target.x-this.x)*t*this.moveSpeed,e=(this.target.y-this.y)*t*this.moveSpeed;this.x+=s,this.y+=e;const a=(180*i/Math.PI+360)%360,h=[6,3,2,1,4,7,8,9][Math.floor(a/45)];this.setMovingAnim(h,!0)}else this.setMovingAnim(null,!1)}setMovingAnim(t,i){this.sprTextures[t]&&t>=0&&this.direction!=t&&(this.textures=this.sprTextures[t],this.animationSpeed=1,this.direction=t),this.moving!=i&&(i?this.play():this.stop()),this.moving=i}}},2599:(t,i,s)=>{s.d(i,{p:()=>h});var e=s(1971),a=s(9512);class h extends e.jyi{constructor(){super(e.xEZ.from(a.ZP.Image.closeBtn)),this.interactive=!0,this.on("pointerdown",this.onDown.bind(this))}onDown(){this.parent?this.parent.destroy():console.warn("無Parent可供關閉！")}}},3328:(t,i,s)=>{s.d(i,{i:()=>h});var e=s(1971),a=s(5601);class h extends e.W20{constructor(t,i,s){super(),this.animFrame=0;const a="number"==typeof t?Math.abs(t).toString():t;this.damageText=new e.xvT(a,this.getDamageStyle(t,i,s)),this.damageText.anchor.set(.5),this.addChild(this.damageText),s&&(this.criticalText=new e.xvT("Critical",this.getDamageStyle("Critical",i,s)),this.criticalText.anchor.set(.5),this.criticalText.y=-24,this.damageText.addChild(this.criticalText))}getDamageStyle(t,i,s){return"number"==typeof t?i?t>0?a.M.Sprite_Damage_SP:a.M.Sprite_Damage_SP_Plus:s&&t>0?a.M.Sprite_Damage_HP_Critical:t>0?a.M.Sprite_Damage_HP:a.M.Sprite_Damage_HP_Plus:s?a.M.Sprite_Damage_Critical:a.M.Sprite_Damage}update(t){if(this.animFrame>=72)return void this.destroy({children:!0});const i=Math.sin(Math.PI*this.animFrame/72),s=Math.cos(Math.PI/2*this.animFrame/72);this.damageText.x=128*(1-s),this.damageText.y=128*-i,this.damageText.scale.set(.75*s+.25),this.animFrame+=t}}},4794:(t,i,s)=>{s.d(i,{$:()=>a});var e=s(1971);class a extends e.jyi{constructor(){super(e.xEZ.from("imgs/5.png")),this.anchor.set(.5),this.target={x:0,y:0},this.startPos=null}update(){}}},2141:(t,i,s)=>{s.d(i,{_:()=>n});var e=s(1971),a=s(5601);const h=128;class n extends e.W20{constructor(t){super(),this.lastVal=0,this.maxVal=0,this.displayVal=0,this.animStartVal=0,this.animTime=0,this.battler=t,this.graphicVal=new e.TCu,this.graphicDelta=new e.TCu,this.text=new e.xvT("0",a.M.Sprite_HealthBar),this.text.anchor.set(1,0),this.text.x=h;const i=new e.TCu;i.beginFill(2236962),i.drawRect(0,0,h,8),i.endFill(),i.y=12,this.graphicVal.beginFill(43520),this.graphicVal.drawRect(0,0,h,8),this.graphicVal.endFill(),this.graphicDelta.beginFill(11141120),this.graphicDelta.drawRect(0,0,h,8),this.graphicDelta.endFill(),this.graphicVal.scale.x=0,this.graphicDelta.scale.x=0,this.graphicDelta.y=12,this.graphicVal.y=12,this.addChild(i,this.graphicVal,this.graphicDelta,this.text),console.log(this)}update(t){if(this.battler&&(this.maxVal=this.battler.maxhp,this.lastVal=this.battler.hp),!this.maxVal)return;this.animTime>0&&(this.animTime-=t,this.displayVal=this.animTime>0?this.animStartVal-(this.animStartVal-this.lastVal)*Math.cos(this.animTime*Math.PI/60/2):this.lastVal);const i=Math.min(1,this.lastVal/this.maxVal);this.graphicVal.scale.x=i;const s=Math.min((this.displayVal-this.lastVal)/this.maxVal);this.graphicDelta.scale.x=s,this.graphicDelta.x=this.graphicVal.x+h*i,this.text.text=Math.round(this.displayVal).toString()}setHealth(t,i){i&&(this.maxVal=i),this.lastVal=Math.min(this.maxVal,Math.max(0,t))}flush(){this.animStartVal=this.displayVal,this.animTime=60}}},8683:(t,i,s)=>{s.d(i,{l:()=>a});var e=s(1971);class a extends e.W20{constructor(t){super(),this.map=new t,this.sortableChildren=!0,this.width=this.map.width,this.height=this.map.height,this.map.items.forEach((t=>{const i=e.jyi.from(t.texture);i.x=t.x,i.y=t.y,i.zIndex=t.layer,t.onInteract&&(i.interactive=!0,i.on("pointerdown",(s=>t.onInteract.bind(s,i)))),t.update&&Object.defineProperty(i,"update",(s=>{t.update(i,s)})),this.addChild(i)}))}update(t){this.children.forEach((i=>{var s;return null===(s=i.update)||void 0===s?void 0:s.call(i,t)}))}}},5831:(t,i,s)=>{s.d(i,{k:()=>a});var e=s(1971);class a extends e.KgH{constructor(){const t={};for(let i=1;i<=9;i++)for(let s=0;s<4;s++){if(5===i)continue;const a=`M_ ${i}_${s}.ase`;t[i]||(t[i]=[]),t[i].push({texture:e.xEZ.from(a),time:133})}super(t[2]),this.sprTextures=t,this.moveSpeed=8,this.anchor.set(.5),this.animationSpeed=1,this.target={x:0,y:0}}update(t){if(this.target){const t=Math.atan2(this.target.y-this.y,this.target.x-this.x),i=Math.cos(t)*this.moveSpeed,s=Math.sin(t)*this.moveSpeed;this.x+=i,this.y+=s;const e=(180*t/Math.PI+360)%360,a=[6,3,2,1,4,7,8,9][Math.floor(e/45)];this.setMovingAnim(a,!0)}else this.setMovingAnim(null,!1)}setMovingAnim(t,i){this.sprTextures[t]&&t>=0&&this.direction!=t&&(this.textures=this.sprTextures[t],this.animationSpeed=1,this.play(),this.direction=t),this.moving!=i&&(i?this.play():this.stop()),this.moving=i}}},6151:(t,i,s)=>{s.d(i,{G:()=>r});var e=s(1971),a=s(5601),h=s(2599),n=s(9512);class r extends e.W20{constructor(){super();const t=new e.TCu;t.beginFill(5592405,.5),t.drawRect(0,0,320,120);const i=e.jyi.from(e.xEZ.from(n.ZP.Image.jewelRed));i.x=8,i.y=8,i.interactive=!0;const s=new e.xvT("1",a.M.Window_MapItem);i.addChild(s),s.anchor.set(1,1),s.x=24,s.y=32;const r=new h.p;r.anchor.set(.5),r.x=304,r.y=16,this.addChild(r),this.addChild(t),this.addChild(i)}update(){}}}}]);