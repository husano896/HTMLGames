"use strict";(self.webpackChunktemplate_pixijs=self.webpackChunktemplate_pixijs||[]).push([[65],{5065:(t,e,i)=>{i.r(e),i.d(e,{Scene_Mobile:()=>x,default:()=>w});var s=i(1971),h=i(8194),n=i(6505),a=i(871),o=i(4972),r=i(5601),d=i(8519),l=i(9512),p=i(6846);const c=[{condition:()=>p.R.triggerNextProgress&&![3,99,100,119,120].find((t=>t===p.R.progress)),payload:async t=>{t.AddText(`目前進度：${p.R.progress}.`)}},{condition:()=>p.R.triggerNextProgress&&3===p.R.progress,payload:async t=>{t.AddText("目前在這個世界搭的還喜歡嗎？\n希望你有把飛飛照顧好！"),p.R.triggerNextProgress=!1}},{condition:()=>p.R.triggerNextProgress&&99===p.R.progress,payload:async t=>{h.eq.stopAll(),h.eq.play(l.HJ.BGM_Kaze2_Midnight,{loop:!0}),t.AddText("吶吶，是說你有聽過「龍死病」嗎？\n聽說在別的世界是跟人類的癌症一樣可怕的病，"),t.AddText("症狀像呼吸困難一樣越來越難呼吸，到最後會窒息而死。\n在當時帶走了很多像我一樣的龍族同伴。"),t.AddText("不知道在這個世界會不會有一樣的病呢？"),p.R.triggerNextProgress=!1}},{condition:()=>p.R.triggerNextProgress&&100===p.R.progress,payload:async t=>{h.eq.stopAll(),h.eq.play(l.HJ.BGM_Kaze2_Sakura,{loop:!0}),t.AddText("吶吶，後來關於「龍死病」，我後來又找到了新的資訊！"),t.AddText("聽說後來憑藉著龍族跟人類的羈絆，\n一起尋找到了根治方法，\n而且當時逃離龍死病的龍族還成為了醫生！"),t.AddText("只是後來，雖然方法流傳下來了，但龍醫就像傳說一樣跟著消失了"),t.AddText("希望我們也可以跟他們一樣厲害！"),p.R.triggerNextProgress=!1}},{condition:()=>p.R.triggerNextProgress&&119===p.R.progress,payload:async t=>{h.eq.stopAll(),h.eq.play(l.HJ.BGM_Kaze2_Midnight,{loop:!0}),0===p.R.cycle?t.AddText("嗚啊...看起來時間快到了...\n不知道會發生什麼事呢？"):t.AddText("時間又快到了呢，\n這次你會想做出什麼選擇呢？"),p.R.triggerNextProgress=!1}},{condition:()=>p.R.triggerNextProgress&&120===p.R.progress,payload:async t=>{h.eq.stopAll(),h.eq.play(l.HJ.BGM_Kaze2_Sakura,{loop:!0}),0===p.R.cycle?t.AddText("時間到了，究竟會發生什麼事情呀！？"):t.AddText("啊啊...時間到了呢...來吧！不管你的選擇是什麼！"),t.AddText("時間沙漏正在發光著！\n要接受他所發出的光芒嗎？"),await t.WaitForTextComplete(),confirm("是否要接受時間沙漏的光芒？")?(t.AddText("命運的時鐘完成了他的循環，\n同樣的歷史即將再度上演..."),await t.WaitForTextComplete(),p.R.NextCycle()):(t.AddText("打破時間沙漏後，\n迎來的是充滿不確定性的時間線。"),t.AddText("這次，沒有回頭路了，\n希望你在新的時間線能待得順利！"),await t.WaitForTextComplete(),p.R.NextCycle(!0)),p.R.triggerNextProgress=!1}}];class g extends s.W20{constructor(){super(),this.OpenItemButton=new a.EX("物品",null,{width:64,height:64}),this.OpenWorkButton=new a.EX("工作",null,{width:64,height:64}),this.OpenMapButton=new a.EX("地圖",null,{width:64,height:64}),this.BatterySprite=new a.o1,this.OpenItemButton.interactive=!0,this.OpenItemButton.cursor="pointer",this.OpenWorkButton.interactive=!0,this.OpenWorkButton.cursor="pointer",this.OpenMapButton.interactive=!0,this.OpenMapButton.cursor="pointer",this.BatterySprite.interactive=!0,this.BatterySprite.cursor="pointer",this.addChild(this.OpenItemButton,this.OpenMapButton,this.OpenWorkButton,this.BatterySprite),this.onWindowResize()}update(t){this.children.forEach((e=>{var i,s;return null===(s=(i=e).update)||void 0===s?void 0:s.call(i,t)}))}onWindowResize(){this.children.forEach((t=>{var e,i;return null===(i=(e=t).update)||void 0===i?void 0:i.call(e,0)}));const t=Math.min(128,Math.max(d.Z.screen.width/(this.children.length-1)/2,16));this.OpenItemButton.x=0,this.OpenWorkButton.x=this.OpenItemButton.x+this.OpenWorkButton.width+t,this.OpenMapButton.x=this.OpenWorkButton.x+this.OpenMapButton.width+t,this.BatterySprite.x=this.width/2-this.BatterySprite.width/2,this.BatterySprite.y=48}}class x extends o.x{constructor(){super(),this.interpreter={AddText:t=>{this.window_message.appendText(t)},WaitForTextComplete:()=>this.window_message.waitForEmpty()},this.bg=s.jyi.from(l.ZP.Image.bgYellow),this.bg.anchor.set(.5),this.dragon=new a._m,this.dragon.anchor.set(.5),this.window_message=new a.Kz,this.window_message.x=8,this.window_homeInvetory=new a.Z6,this.window_homeStatus=new a.JA,this.window_gold=new a.iL,this.progressText=new s.xvT("",r.MU.Window_Progress),this.progressText.interactive=!0,this.progressText.cursor="pointer",this.progressText.on("pointertap",(async()=>{if(!this.window_message.typing&&confirm("是否要變更時間?")){const t=Number(prompt("請輸入要調整到的時間."));t?(this.window_message.appendText(`將時間調整至 ${t}.`),n.RS.setProgress(t),await this.window_message.waitForEmpty(),(0,r.p4)(x)):this.window_message.appendText("未調整時間.")}})),console.log(this),this.dragon.on("pointertap",(()=>{this.homeUIContainer.visible&&this.window_message.appendText("飛飛乖！\n咕姆姆姆姆姆姆...")})),this.dragon.interactive=!0,this.dragon.cursor="pointer",this.homeUIContainer=new g,this.homeUIContainer.OpenItemButton.callback=(()=>{this.window_message.typing||(this.window_homeStatus.visible=!0,this.window_homeInvetory.visible=!0)}).bind(this),this.homeUIContainer.OpenMapButton.callback=async()=>{this.window_message.typing||((0,a.YC)(),await(0,r.p4)((await i.e(877).then(i.bind(i,8877))).default))},this.homeUIContainer.OpenWorkButton.callback=()=>{this.window_message.typing||(this.window_message.appendText("工作選單待用, 需消耗2體力, 且獲得20金錢"),n.RS.energy-=2,n.RS.gold+=20)},this.homeUIContainer.BatterySprite.on("pointertap",(()=>{this.window_message.typing||(n.RS.energy+=2,this.window_message.appendText("能量值, 須等待現實世界中的一小時後才會恢復24單位."))})),this.backButton=new a.EX("返回",null,{width:64,height:64}),this.backButton.interactive=!0,this.backButton.cursor="pointer",this.backButton.visible=!1,this.backButton.on("pointertap",(()=>{this.window_homeInvetory.visible=!1,this.window_homeStatus.visible=!1})),this.addChild(this.bg,this.dragon,this.homeUIContainer,this.window_homeInvetory,this.window_homeStatus,this.window_message,this.window_gold,this.backButton,this.progressText),this.progressText.text=`Time\n${n.RS.progress}/${n.RS.progress>120?"∞":120}`,this.onWindowResize(),console.log(this),h.eq.stopAll(),h.eq.play(l.HJ.BGM_Mobile,{loop:!0}),this.triggerHomeEvents()}destroy(t){document.removeEventListener("resize",this.onWindowResize.bind(this),!0),super.destroy(t)}update(t){super.update(t),n.RS.update(t),this.homeUIContainer.visible=!(this.window_message.visible||this.window_homeStatus.visible||this.window_homeInvetory.visible),this.window_gold.visible=this.homeUIContainer.visible,this.progressText.visible=this.homeUIContainer.visible,this.backButton.visible=this.window_homeStatus.visible||this.window_homeInvetory.visible,this.dragon.y=d.Z.screen.height/2+32*Math.sin(Date.now()/4096)}async triggerHomeEvents(){for(let t of c)t.condition()&&await t.payload(this.interpreter);n.RS.triggerNextProgress=!1}onWindowResize(){console.log("resize"),this.bg.x=d.Z.screen.width/2,this.bg.y=d.Z.screen.height/2,this.dragon.x=d.Z.screen.width/2,this.dragon.y=d.Z.screen.height/2,this.homeUIContainer.x=d.Z.screen.width/2-this.homeUIContainer.width/2,this.homeUIContainer.y=d.Z.screen.height-this.homeUIContainer.height,this.window_gold.x=Math.max(16,d.Z.screen.width/2-600),this.window_gold.y=16,this.window_homeInvetory.x=16,this.window_homeStatus.x=Math.max(d.Z.screen.width-16-this.window_homeStatus.width,d.Z.screen.width/2),this.backButton.x=d.Z.screen.width-this.backButton.width-16,this.backButton.y=d.Z.screen.height-this.backButton.height-16,this.progressText.x=Math.max(d.Z.screen.width-this.progressText.width-16,d.Z.screen.width/2-600),this.progressText.y=16,d.Z.screen.width<d.Z.screen.height||d.Z.screen.width/d.Z.screen.height<16/9?(this.bg.height=d.Z.screen.height,this.bg.width=this.bg.height/9*16):(this.bg.width=d.Z.screen.width,this.bg.height=this.bg.width/16*9),super.onWindowResize()}}const w=x},4972:(t,e,i)=>{i.d(e,{x:()=>h});var s=i(1971);class h extends s.W20{constructor(){super()}onInit(){}onDestroy(){this.destroy({children:!0})}update(t){this.children.forEach((e=>{var i,s;return null===(s=(i=e).update)||void 0===s?void 0:s.call(i,t)}))}onWindowResize(){this.children.forEach((t=>{var e,i;null===(i=(e=t).onWindowResize)||void 0===i||i.call(e)}))}}},6715:(t,e,i)=>{i.d(e,{E:()=>o});var s=i(1971),h=i(5601),n=i(9512),a=i(8194);class o extends s.TCu{constructor(t,e,i){super(),this.text=new s.xvT(t,h.MU.Sprite_Button),this.text.anchor.set(.5),this.beginFill(4491417,1),this.drawRect(0,0,Math.max(64,this.text.width+16,i.width),Math.max(32,this.text.height+8,i.height)),this.endFill(),this.callback=e,this.text.x=this.width/2,this.text.y=this.height/2,this.interactive=!0,this.on("pointerenter",this.onEnter.bind(this)),this.on("pointerleave",this.onLeave.bind(this)),this.on("pointertap",this.onDown.bind(this)),this.on("pointerup",this.onUp.bind(this)),this.addChild(this.text),this.hoverMask=new s.TCu,this.hoverMask.beginFill(0,1),this.hoverMask.drawRect(0,0,this.width,this.height),this.hoverMask.endFill(),this.hoverMask.alpha=0,this.addChild(this.hoverMask)}onDown(t){console.log(t),this._disabled||(this.hoverMask.alpha=0,this.callback&&this.callback(),a.eq.stop(n.HJ.cursor),a.eq.play(n.HJ.confirm),t.stopPropagation(),t.preventDefault())}onUp(t){this._disabled||(this.hoverMask.alpha=0,t.stopPropagation(),t.preventDefault())}onEnter(t){this._disabled||(this.hoverMask.alpha=.2,"mouse"===t.pointerType&&a.eq.play(n.HJ.cursor),t.stopPropagation(),t.preventDefault())}onLeave(t){this._disabled||(this.hoverMask.alpha=0,t.stopPropagation(),t.preventDefault())}}},2599:(t,e,i)=>{i.d(e,{p:()=>n});var s=i(1971),h=i(9512);class n extends s.jyi{constructor(){super(s.xEZ.from(h.ZP.Image.closeBtn)),this.interactive=!0,this.on("pointertap",this.onDown.bind(this))}onDown(){this.parent?this.parent.destroy():console.warn("無Parent可供關閉！")}}},3328:(t,e,i)=>{i.d(e,{i:()=>n});var s=i(1971),h=i(5601);class n extends s.W20{constructor(t,e,i){super(),this.animFrame=0;const h="number"==typeof t?Math.abs(t).toString():t;this.damageText=new s.xvT(h,this.getDamageStyle(t,e,i)),this.damageText.anchor.set(.5),this.addChild(this.damageText),i&&(this.criticalText=new s.xvT("Critical",this.getDamageStyle("Critical",e,i)),this.criticalText.anchor.set(.5),this.criticalText.y=-24,this.damageText.addChild(this.criticalText))}getDamageStyle(t,e,i){return"number"==typeof t?e?t>0?h.MU.Sprite_Damage_SP:h.MU.Sprite_Damage_SP_Plus:i&&t>0?h.MU.Sprite_Damage_HP_Critical:t>0?h.MU.Sprite_Damage_HP:h.MU.Sprite_Damage_HP_Plus:i?h.MU.Sprite_Damage_Critical:h.MU.Sprite_Damage}update(t){if(this.animFrame>=72)return void this.destroy({children:!0});const e=Math.sin(Math.PI*this.animFrame/72),i=Math.cos(Math.PI/2*this.animFrame/72);this.damageText.x=128*(1-i),this.damageText.y=128*-e,this.damageText.scale.set(.75*i+.25),this.animFrame+=t}}},4794:(t,e,i)=>{i.d(e,{$:()=>h});var s=i(1971);class h extends s.jyi{constructor(){super(s.xEZ.from("imgs/5.png")),this.anchor.set(.5),this.target={x:0,y:0},this.startPos=null}update(){}}},2141:(t,e,i)=>{i.d(e,{_:()=>a});var s=i(1971),h=i(5601);const n=128;class a extends s.W20{constructor(t){super(),this.lastVal=0,this.maxVal=0,this.displayVal=0,this.animStartVal=0,this.animTime=0,this.battler=t,this.graphicVal=new s.TCu,this.graphicDelta=new s.TCu,this.text=new s.xvT("0",h.MU.Sprite_HealthBar),this.text.anchor.set(1,0),this.text.x=n;const e=new s.TCu;e.beginFill(2236962),e.drawRect(0,0,n,8),e.endFill(),e.y=12,this.graphicVal.beginFill(43520),this.graphicVal.drawRect(0,0,n,8),this.graphicVal.endFill(),this.graphicDelta.beginFill(11141120),this.graphicDelta.drawRect(0,0,n,8),this.graphicDelta.endFill(),this.graphicVal.scale.x=0,this.graphicDelta.scale.x=0,this.graphicDelta.y=12,this.graphicVal.y=12,this.addChild(e,this.graphicVal,this.graphicDelta,this.text),console.log(this)}update(t){if(this.battler&&(this.maxVal=this.battler.maxhp,this.lastVal=this.battler.hp),!this.maxVal)return;this.animTime>0&&(this.animTime-=t,this.displayVal=this.animTime>0?this.animStartVal-(this.animStartVal-this.lastVal)*Math.cos(this.animTime*Math.PI/60/2):this.lastVal);const e=Math.min(1,this.lastVal/this.maxVal);this.graphicVal.scale.x=e;const i=Math.min((this.displayVal-this.lastVal)/this.maxVal);this.graphicDelta.scale.x=i,this.graphicDelta.x=this.graphicVal.x+n*e,this.text.text=Math.round(this.displayVal).toString()}setHealth(t,e){e&&(this.maxVal=e),this.lastVal=Math.min(this.maxVal,Math.max(0,t))}flush(){this.animStartVal=this.displayVal,this.animTime=60}}},8683:(t,e,i)=>{i.d(e,{l:()=>h});var s=i(1971);class h extends s.W20{constructor(t){super(),this.map=new t,this.sortableChildren=!0,this.width=this.map.width,this.height=this.map.height,this.map.items.forEach((t=>{const e=s.jyi.from(t.texture);e.x=t.x,e.y=t.y,e.zIndex=t.layer,t.onInteract&&(e.interactive=!0,e.on("pointertap",(i=>t.onInteract.bind(i,e)))),t.update&&Object.defineProperty(e,"update",(i=>{t.update(e,i)})),this.addChild(e)}))}update(t){this.children.forEach((e=>{var i;return null===(i=e.update)||void 0===i?void 0:i.call(e,t)}))}}},5831:(t,e,i)=>{i.d(e,{k:()=>h});var s=i(1971);class h extends s.KgH{constructor(){const t={};for(let e=1;e<=9;e++)for(let i=0;i<4;i++){if(5===e)continue;const h=`M_ ${e}_${i}.ase`;t[e]||(t[e]=[]),t[e].push({texture:s.xEZ.from(h),time:133})}super(t[2]),this.sprTextures=t,this.moveSpeed=8,this.anchor.set(.5),this.animationSpeed=1,this.target={x:0,y:0}}update(t){if(this.target){const t=Math.atan2(this.target.y-this.y,this.target.x-this.x),e=Math.cos(t)*this.moveSpeed,i=Math.sin(t)*this.moveSpeed;this.x+=e,this.y+=i;const s=(180*t/Math.PI+360)%360,h=[6,3,2,1,4,7,8,9][Math.floor(s/45)];this.setMovingAnim(h,!0)}else this.setMovingAnim(null,!1)}setMovingAnim(t,e){this.sprTextures[t]&&t>=0&&this.direction!=t&&(this.textures=this.sprTextures[t],this.animationSpeed=1,this.play(),this.direction=t),this.moving!=e&&(e?this.play():this.stop()),this.moving=e}}},5274:(t,e,i)=>{i.d(e,{U:()=>n});var s=i(1971),h=i(5601);class n extends s.W20{constructor(t){super(),this.typing=!1,this.bufferTexts=[],this.bufferText="",this.displayingText="",this._nextCharCooldown=0,this._typingPromise=null,this._typingPromiseResolver=null,this._text=new s.xvT("",h.MU.Window_Message),this.addChild(this._text),t&&(t.text&&this.appendText(t.text),t.texts&&t.texts.forEach((t=>this.appendText(t))))}update(t){var e,i;if(this.typing)if(this._nextCharCooldown>=0)this._nextCharCooldown-=t;else for(;this._nextCharCooldown<=0&&this.typing;)if(null===(e=this.bufferText)||void 0===e?void 0:e.length)this._text.text=`${this._text.text}${this.bufferText.at(0)}`,this.bufferText=this.bufferText.slice(1),this._nextCharCooldown+=1;else{if(!(null===(i=this.bufferTexts)||void 0===i?void 0:i.length))return this.typing=!1,void(this._typingPromiseResolver&&(this._typingPromiseResolver(),this._typingPromiseResolver=null,this._typingPromise=null));this.typing=!1}}nextSentence(){this.typing||(this._text.text="",this.bufferText=this.bufferTexts.shift(),this.typing=!0)}appendText(t){this.bufferTexts.push(t),this.typing||this.nextSentence(),this.typing=!0,this._typingPromise||(this._typingPromise=new Promise(((t,e)=>{this._typingPromiseResolver=t})))}waitForEmpty(){return this.typing||this.bufferTexts.length||this.bufferText?this._typingPromise:Promise.resolve()}IsEmpty(){var t,e;return!(null===(t=this.bufferTexts)||void 0===t?void 0:t.length)&&!(null===(e=this.bufferText)||void 0===e?void 0:e.length)}IsSentenceCompleted(){var t;return 0===(null===(t=this.bufferText)||void 0===t?void 0:t.length)}get textStyle(){return this._text.style}set textStyle(t){this._text.style=t}}},6151:(t,e,i)=>{i.d(e,{G:()=>o});var s=i(1971),h=i(5601),n=i(2599),a=i(9512);class o extends s.W20{constructor(){super();const t=new s.TCu;t.beginFill(5592405,.5),t.drawRect(0,0,320,120);const e=s.jyi.from(s.xEZ.from(a.ZP.Image.jewelRed));e.x=8,e.y=8,e.interactive=!0;const i=new s.xvT("1",h.MU.Window_MapItem);e.addChild(i),i.anchor.set(1,1),i.x=24,i.y=32;const o=new n.p;o.anchor.set(.5),o.x=304,o.y=16,this.addChild(o),this.addChild(t),this.addChild(e)}update(){}}},7553:(t,e,i)=>{i.d(e,{K:()=>r});var s=i(5274),h=i(1971),n=i(7254),a=i(9512),o=i(8519);class r extends n.r{constructor(){super(),this.animFrame=0,this.minWidth=288,this.sprite_typingText=new s.U,this.sprite_typingText.x=8,this.sprite_typingText.y=8,this.downIcon=new h.jyi(h.xEZ.from(a.ZP.Image.jewelBlueSmall)),this.downIcon.anchor.set(1,1),this.addChild(this.downIcon,this.sprite_typingText),this.on("pointertap",this.onPointerTap),this.on("pointerdown",this.onPointerDown),this.interactive=!0,this.cursor="pointer",this.visible=!1,this.onWindowResize(),console.log(this,"window_message")}update(t){super.update(t),this.animFrame+=t,this.typing||(this.downIcon.visible=!0,this.downIcon.y=128+4*Math.sin(this.animFrame/8))}onPointerDown(){this.alpha=.8}onPointerTap(){this.IsEmpty()?this.visible=!1:(this.nextSentence(),this.visible=!0)}get typing(){return this.sprite_typingText.typing}nextSentence(){return this.sprite_typingText.nextSentence()}appendText(t){return this.visible=!0,this.sprite_typingText.appendText(t)}waitForEmpty(){return this.sprite_typingText.waitForEmpty()}IsEmpty(){return this.sprite_typingText.IsEmpty()}IsSentenceCompleted(){return this.sprite_typingText.IsSentenceCompleted()}onWindowResize(){this.downIcon&&(super.onWindowResize(),this.bg.width=Math.min(640,o.Z.screen.width)-32,this.bg.height=144,console.log(this.bg,this.bg.width,this),this.downIcon.x=this.bg.width-16,this.downIcon.y=this.bg.height-16,this.sprite_typingText.textStyle.wordWrapWidth=this.bg.width-16,this.x=o.Z.screen.width/2-this.bg.width/2,this.y=o.Z.screen.height-this.height-16)}}},7254:(t,e,i)=>{i.d(e,{r:()=>n});var s=i(1971),h=i(8519);class n extends s.W20{constructor(){super(),this.bg=new s.TCu,this.addChild(this.bg),this.onWindowResize=this.onWindowResize.bind(this),window.addEventListener("resize",this.onWindowResize),this.onWindowResize()}onWindowResize(){this.onPreWindowResize(),this.onPostWindowResize()}onPreWindowResize(){this.bg.clear(),this.calculateBounds(),this.bg.beginFill(3355511,.5),this.bg.drawRect(0,0,this.width+(this.padding||0),this.height+(this.padding||0)),this.bg.endFill()}onPostWindowResize(){this.calculateBounds(),this.children.forEach((t=>{var e;return null===(e=t.onWindowResize)||void 0===e?void 0:e.call(t)}))}update(t){this.children.forEach((e=>{var i,s;return null===(s=(i=e).update)||void 0===s?void 0:s.call(i,t)})),this.visible!==this.lastVisible&&(this.lastVisible=this.visible),this.visible?this.alpha=Math.min(1,this.alpha+t*(1-this.alpha)/15):this.alpha=0}destroy(t){window.removeEventListener("resize",this.onWindowResize),super.destroy({children:!0})}centerWindow(){this.x=(h.Z.screen.width-this.width)/2,this.y=(h.Z.screen.height-this.height)/2}}},871:(t,e,i)=>{i.d(e,{YC:()=>l,o1:()=>a,EX:()=>o.E,_m:()=>c,iL:()=>T,Z6:()=>u,JA:()=>y,Kz:()=>v.K});var s=i(6505),h=i(1971),n=i(5601);class a extends h.TCu{constructor(){super(),this.text=new h.xvT("",n.MU.Sprite_Battery),this.text.anchor.set(.5,1),this.addChild(this.text)}update(t){const e=s.RS.energy;this.text.text!==String(e)&&this.updateValue(e)}updateValue(t){this.text.text=`${t}`,this.clear(),this.lineStyle(16,7829503,1),this.arc(64,64,64,Math.PI,Math.PI+Math.PI*Math.min(t/24,1)),this.text.x=64,this.text.y=64}}var o=i(6715),r=(i(2599),i(3328),i(4794),i(2141),i(8683),i(5831),i(5274),i(8519));class d extends h.W20{constructor(){super(),this.loadingText=new h.xvT("Loading",n.MU.Sprite_Loading),this.loadingText.y=(this.loadingText.width-this.loadingText.height)/2,this.particles=new h.W20,this.particles.x=this.loadingText.width/2,this.particles.y=this.loadingText.width/2;for(let t=0;t<6;t++){const t=new h.TCu;t.beginFill(13421772,.75),t.drawCircle(0,0,8),t.endFill(),t.beginFill(16777215,1),t.drawCircle(0,0,4),t.endFill(),this.particles.addChild(t)}this.addChild(this.loadingText,this.particles),console.log(this),this.interactive=!0,this.on("pointerdown",this.onPointerDown)}update(t){const e=(new Date).getTime();this.particles.children.forEach(((t,i)=>{t.scale.set(.75*Math.cos(2*Math.PI*i/this.particles.children.length+e/720)+1),t.x=this.loadingText.width/2*Math.sin(2*Math.PI*i/this.particles.children.length+e/720),t.y=this.loadingText.width/2*Math.sin(2*Math.PI*i/this.particles.children.length+e/720)})),this.particles.angle=e/72}onWindowResize(){this.x=r.Z.screen.width/2-this.width/2,this.y=r.Z.screen.height/2-this.width/2}onPointerDown(t){t.stopPropagation(),t.preventDefault()}}async function l(){const t=new d;t.visible=!0,t.x=(r.Z.screen.width-t.width)/2,t.y=(r.Z.screen.height-t.height)/2,r.Z.stage.addChild(t)}var p=i(9512);class c extends h.jyi{constructor(){super(),this.changeEmotion()}update(t){}changeEmotion(){const t=(new Date).getHours();this.texture=t>=22||t<6?h.xEZ.from(p.ZP.Image.dragonSleep):t>=6&&t<8?h.xEZ.from(p.ZP.Image.dragonWake):t>=8&&t<12?h.xEZ.from(p.ZP.Image.dragon):t>=12&&t<18?h.xEZ.from(p.ZP.Image.dragonFlying):t>=18&&t<20?h.xEZ.from(p.ZP.Image.dragonBack):h.xEZ.from(p.ZP.Image.dragonShy),this.width=Math.min(768,Math.min(r.Z.screen.width/2,r.Z.screen.height/2)),this.height=this.width}}i(1526);var g=i(6846),x=i(7254),w=i(9921);class m extends h.W20{constructor(t,e){super(),this.bg=new h.TCu,this.bg.beginFill(g.R.canUseItem(e)?170:69905,.5),this.bg.drawRect(0,0,128,128),this.bg.endFill(),this.itemNameText=new h.xvT(t.name,n.MU.Window_HomeInvetoryItemTitle),this.itemDescriptionText=new h.xvT(t.description,n.MU.Window_HomeInvetoryItemDescription),this.itemAmountText=new h.xvT("0",n.MU.Window_HomeInvetoryItemAmount),this.itemNameText.x=8,this.itemNameText.y=8,this.itemAmountText.x=this.width-8-this.itemAmountText.width,this.itemAmountText.y=this.itemNameText.y,this.itemDescriptionText.x=this.itemNameText.x,this.itemDescriptionText.y=this.itemNameText.y+24,this.addChild(this.bg,this.itemNameText,this.itemAmountText,this.itemDescriptionText),this.interactive=!0,this.on("pointertap",(t=>{t.preventDefault(),g.R.canUseItem(e)?g.R.useItem(e):alert("無法使用道具")})),this.onWindowResize()}onWindowResize(){var t;this.parent&&(this.bg.width=(null===(t=this.parent)||void 0===t?void 0:t.width)-16),this.itemAmountText.x=this.width-8-this.itemAmountText.width,this.itemDescriptionText.style.wordWrapWidth=this.width-16}}class u extends x.r{constructor(){super(),this.maxWidth=480,this.visible=!1,Object.entries(w.Z).forEach((([t,e],i)=>{const s=new m(e,t);s.x=8,s.y=8+136*i,this.addChild(s)})),this.onWindowResize()}update(t){super.update(t)}updateItemList(){}onWindowResize(){this.bg.clear(),this.bg.beginFill(3355511,.5),this.bg.drawRect(0,0,Math.min(480,r.Z.screen.width/2)-32,r.Z.screen.height-16-64),this.bg.endFill(),this.calculateBounds(),this.children.forEach((t=>{var e;return null===(e=t.onWindowResize)||void 0===e?void 0:e.call(t)}))}}class y extends x.r{constructor(){super(),this.stateTexts=new h.xvT("HP\n力量\n耐力\n敏捷",n.MU.Window_HomeWindow_Left),this.stateValues=new h.xvT("9999/9999\n9999\n9999\n9999",n.MU.Window_HomeWindow_Right),this.stateTexts.anchor.set(0,0),this.stateValues.anchor.set(1,0),this.stateElementTexts=new h.xvT("火\n木\n水\n光\n暗",n.MU.Window_HomeWindow_Left),this.stateElementValues=new h.xvT("100\n100\n100\n100\n100",n.MU.Window_HomeWindow_Right),this.stateElementTexts.anchor.set(0,1),this.stateElementValues.anchor.set(1,1),this.visible=!1,this.addChild(this.stateTexts,this.stateValues,this.stateElementTexts,this.stateElementValues),this.stateTexts.x=8,this.stateValues.x=this.width-8,this.stateTexts.y=8,this.stateValues.y=8,this.stateElementTexts.x=8,this.stateElementValues.x=this.width-8,this.stateElementTexts.y=40,this.stateElementValues.y=40,this.onWindowResize()}update(t){super.update(t);const e=s.RS.battler;this.stateValues.text=`${e.hp}/${e.maxhp}\n${e.atk}\n${e.def}\n${e.spd}`,n.MU.Window_HomeWindow_Right}onWindowResize(){this.stateElementTexts&&this.stateElementValues&&(super.onWindowResize(),this.bg.width=Math.min(480,r.Z.screen.width/2)-32,this.bg.height=r.Z.screen.height-16-64,this.stateValues.x=this.width-8,this.stateElementTexts.y=this.bg.height-8,this.stateElementValues.y=this.bg.height-8,this.stateElementValues.x=this.width-8)}}i(6151);var v=i(7553);class T extends x.r{constructor(){super(),this.minHeight=32,this.minWidth=192,this.padding=8,this.previousGold=void 0,this.goldText=new h.xvT("",n.MU.Window_Gold),this.goldText.x=this.padding,this.goldText.y=this.padding,this.addChild(this.goldText),this.onWindowResize()}update(t){super.update(t),s.RS.gold!==this.previousGold&&(this.previousGold=s.RS.gold,this.goldText.text=`${this.previousGold} G`)}}}}]);