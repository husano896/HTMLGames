"use strict";(self.webpackChunktemplate_pixijs=self.webpackChunktemplate_pixijs||[]).push([[574],{8574:(t,e,i)=>{i.r(e),i.d(e,{Scene_Mobile:()=>g});var s=i(3514),n=i(1971),h=i(816),o=i(1690),r=i(2903),a=i(6715),d=i(7553),l=i(7630),p=i(4972),u=i(8519),w=i(9512);class c extends n.W20{constructor(){super(),this.OpenItemButton=new a.E("物品",null,{width:64,height:64}),this.OpenWorkButton=new a.E("工作",null,{width:64,height:64}),this.OpenMapButton=new a.E("地圖",null,{width:64,height:64}),this.BatterySprite=new l.o,this.OpenItemButton.interactive=!0,this.OpenItemButton.cursor="pointer",this.OpenWorkButton.interactive=!0,this.OpenWorkButton.cursor="pointer",this.OpenMapButton.interactive=!0,this.OpenMapButton.cursor="pointer",this.BatterySprite.interactive=!0,this.BatterySprite.cursor="pointer",this.addChild(this.OpenItemButton,this.OpenMapButton,this.OpenWorkButton,this.BatterySprite),this.onWindowResize()}update(t){this.children.forEach((e=>{var i,s;return null===(s=(i=e).update)||void 0===s?void 0:s.call(i,t)}))}onWindowResize(){this.children.forEach((t=>{var e,i;return null===(i=(e=t).update)||void 0===i?void 0:i.call(e,0)}));const t=Math.min(128,Math.max(u.Z.screen.width/(this.children.length-1)/2,16));this.OpenItemButton.x=0,this.OpenWorkButton.x=this.OpenItemButton.x+this.OpenWorkButton.width+t,this.OpenMapButton.x=this.OpenWorkButton.x+this.OpenMapButton.width+t,this.BatterySprite.x=this.width/2-this.BatterySprite.width/2,this.BatterySprite.y=48}}class g extends p.x{constructor(){super(),this.bg=n.jyi.from(w.ZP.Image.bgYellow),this.bg.anchor.set(.5),this.dragon=n.jyi.from(w.ZP.Image.dragon),this.dragon.anchor.set(.5),this.window_message=new d.K,this.window_message.x=8,this.window_homeInvetory=new o.Z,this.window_homeStatus=new h.J,this.window_gold=new r.i,console.log(this),this.dragon.on("pointerdown",(()=>{this.homeUIContainer.visible&&this.window_message.appendText("飛飛乖！\n咕姆姆姆姆姆姆...")})),this.dragon.interactive=!0,this.dragon.cursor="pointer",this.homeUIContainer=new c,this.homeUIContainer.OpenItemButton.callback=(()=>{this.window_message.typing||(this.window_homeStatus.visible=!0,this.window_homeInvetory.visible=!0)}).bind(this),this.homeUIContainer.OpenMapButton.callback=async()=>{if(this.window_message.typing)return;const t=await i.e(172).then(i.bind(i,8172)).then((t=>t.Scene_MobileMap));u.Z.stage.children.forEach((t=>t.destroy({children:!0}))),u.Z.stage.removeChildren(),u.Z.stage.addChild(new t)},this.homeUIContainer.OpenWorkButton.callback=()=>{this.window_message.typing||(this.window_message.appendText("工作選單待用, 需消耗2體力"),s.RS.energy-=2)},this.homeUIContainer.BatterySprite.on("pointerdown",(()=>{this.window_message.typing||(s.RS.energy+=2,this.window_message.appendText("能量值, 須等待現實世界中的一小時後才會恢復24單位."))})),this.backButton=new a.E("返回",null,{width:64,height:64}),this.backButton.interactive=!0,this.backButton.cursor="pointer",this.backButton.visible=!1,this.backButton.on("pointerdown",(()=>{this.window_homeInvetory.visible=!1,this.window_homeStatus.visible=!1})),this.addChild(this.bg,this.dragon,this.homeUIContainer,this.window_homeInvetory,this.window_homeStatus,this.window_message,this.window_gold,this.backButton),this.onWindowResize(),console.log(this)}destroy(t){document.removeEventListener("resize",this.onWindowResize.bind(this),!0),super.destroy(t)}update(t){super.update(t),s.RS.update(t),this.homeUIContainer.visible=!(this.window_message.visible||this.window_homeStatus.visible||this.window_homeInvetory.visible),this.window_gold.visible=this.homeUIContainer.visible,this.backButton.visible=this.window_homeStatus.visible||this.window_homeInvetory.visible,s.RS.postUpdate(t)}onWindowResize(){super.onWindowResize(),console.log("resize"),this.bg.x=u.Z.screen.width/2,this.bg.y=u.Z.screen.height/2,this.dragon.x=u.Z.screen.width/2,this.dragon.y=u.Z.screen.height/2,this.homeUIContainer.x=u.Z.screen.width/2-this.homeUIContainer.width/2,this.homeUIContainer.y=u.Z.screen.height-this.homeUIContainer.height,this.window_gold.x=Math.max(16,u.Z.screen.width/2-600),this.window_gold.y=16,this.backButton.x=u.Z.screen.width-this.backButton.width-16,this.backButton.y=u.Z.screen.height-this.backButton.height-16}}},4972:(t,e,i)=>{i.d(e,{x:()=>n});var s=i(1971);class n extends s.W20{constructor(){super()}onInit(){}onDestroy(){this.destroy({children:!0})}update(t){this.children.forEach((e=>{var i,s;return null===(s=(i=e).update)||void 0===s?void 0:s.call(i,t)}))}onWindowResize(){this.children.forEach((t=>{var e,i;null===(i=(e=t).onWindowResize)||void 0===i||i.call(e)}))}}},7630:(t,e,i)=>{i.d(e,{o:()=>o});var s=i(3514),n=i(1971),h=i(5601);class o extends n.TCu{constructor(){super(),this.text=new n.xvT("",h.M.Sprite_Battery),this.addChild(this.text)}update(t){const e=s.RS.energy;this.text.text!==String(e)&&this.updateValue(e)}updateValue(t){this.text.text=`${t}`,this.clear(),this.lineStyle(16,7829503,1),this.arc(64,64,64,Math.PI,Math.PI+Math.PI*t/24),this.text.x=64-this.text.width/2}}},6715:(t,e,i)=>{i.d(e,{E:()=>r});var s=i(1971),n=i(5601),h=i(9512),o=i(8194);class r extends s.TCu{constructor(t,e,i){super(),this.text=new s.xvT(t,n.M.Sprite_Button),this.text.anchor.set(.5),this.beginFill(4491417,1),this.drawRect(0,0,Math.max(64,this.text.width+16,i.width),Math.max(32,this.text.height+8,i.height)),this.endFill(),this.callback=e,this.text.x=this.width/2,this.text.y=this.height/2,this.interactive=!0,this.on("pointerenter",this.onEnter.bind(this)),this.on("pointerleave",this.onLeave.bind(this)),this.on("pointerdown",this.onDown.bind(this)),this.on("pointerup",this.onUp.bind(this)),this.addChild(this.text),this.hoverMask=new s.TCu,this.hoverMask.beginFill(0,1),this.hoverMask.drawRect(0,0,this.width,this.height),this.hoverMask.endFill(),this.hoverMask.alpha=0,this.addChild(this.hoverMask)}onDown(t){console.log(t),this._disabled||(this.hoverMask.alpha=0,this.callback&&this.callback(),o.eq.play(h.HJ.confirm),t.stopPropagation(),t.preventDefault())}onUp(t){this._disabled||(this.hoverMask.alpha=0,t.stopPropagation(),t.preventDefault())}onEnter(t){this._disabled||(this.hoverMask.alpha=.2,o.eq.play(h.HJ.cursor),t.stopPropagation(),t.preventDefault())}onLeave(t){this._disabled||(this.hoverMask.alpha=0,t.stopPropagation(),t.preventDefault())}}},5274:(t,e,i)=>{i.d(e,{U:()=>h});var s=i(1971),n=i(5601);class h extends s.W20{constructor(t){super(),this.typing=!1,this.bufferTexts=[],this.bufferText="",this.displayingText="",this._nextCharCooldown=0,this._typingPromise=null,this._typingPromiseResolver=null,this._text=new s.xvT("",n.M.Window_Message),this.addChild(this._text),t&&(t.text&&this.appendText(t.text),t.texts&&t.texts.forEach((t=>this.appendText(t))))}update(t){var e,i;if(this.typing)if(this._nextCharCooldown>=0)this._nextCharCooldown-=t;else for(;this._nextCharCooldown<=0&&this.typing;)if(null===(e=this.bufferText)||void 0===e?void 0:e.length)this._text.text=`${this._text.text}${this.bufferText.at(0)}`,this.bufferText=this.bufferText.slice(1),this._nextCharCooldown+=1;else{if(!(null===(i=this.bufferTexts)||void 0===i?void 0:i.length))return this.typing=!1,void(this._typingPromiseResolver&&(this._typingPromiseResolver(),this._typingPromiseResolver=null,this._typingPromise=null));this.typing=!1}}nextSentence(){this.typing||(this._text.text="",this.bufferText=this.bufferTexts.shift(),this.typing=!0)}appendText(t){this.bufferTexts.push(t),this.typing||this.nextSentence(),this.typing=!0,this._typingPromise||(this._typingPromise=new Promise(((t,e)=>{this._typingPromiseResolver=t})))}waitForEmpty(){return this.typing||this.bufferTexts.length||this.bufferText?this._typingPromise:Promise.resolve()}IsEmpty(){var t,e;return!(null===(t=this.bufferTexts)||void 0===t?void 0:t.length)&&!(null===(e=this.bufferText)||void 0===e?void 0:e.length)}IsSentenceCompleted(){var t;return 0===(null===(t=this.bufferText)||void 0===t?void 0:t.length)}get textStyle(){return this._text.style}set textStyle(t){this._text.style=t}}},2903:(t,e,i)=>{i.d(e,{i:()=>r});var s=i(3514),n=i(7254),h=i(1971),o=i(5601);class r extends n.r{constructor(){super(),this.previousGold=void 0,this.bg.width=256,this.bg.height=32,this.goldText=new h.xvT("",o.M.Window_HomeWindow_Left),this.addChild(this.goldText),this.onWindowResize(),this.interactive=!0,this.on("pointerdown",(()=>{s.RS.gold++}))}update(t){super.update(t),s.RS.gold!==this.previousGold&&(this.previousGold=s.RS.gold,this.goldText.text=`${this.previousGold} G`)}}},1690:(t,e,i)=>{i.d(e,{Z:()=>h});var s=i(7254),n=i(8519);class h extends s.r{constructor(){super(),this.visible=!1}update(t){super.update(t)}onWindowResize(){super.onWindowResize(),this.bg.width=Math.min(320,n.Z.screen.width/2)-32,this.bg.height=n.Z.screen.height-16-64}}},816:(t,e,i)=>{i.d(e,{J:()=>a});var s=i(7254),n=i(1971),h=i(8519),o=i(5601);const r=16;class a extends s.r{constructor(){super(),this.stateTexts=new n.xvT("HP\n力量\n敏捷\n耐力",o.M.Window_HomeWindow_Left),this.stateValues=new n.xvT("9999/9999\n9999\n9999\n9999",o.M.Window_HomeWindow_Right),this.stateTexts.anchor.set(0,0),this.stateValues.anchor.set(1,0),this.stateElementTexts=new n.xvT("火\n木\n水\n光\n暗",o.M.Window_HomeWindow_Left),this.stateElementValues=new n.xvT("100\n100\n100\n100\n100",o.M.Window_HomeWindow_Right),this.stateElementTexts.anchor.set(0,1),this.stateElementValues.anchor.set(1,1),this.visible=!1,this.addChild(this.stateTexts,this.stateValues,this.stateElementTexts,this.stateElementValues),this.stateTexts.x=r,this.stateValues.x=this.width-r,this.stateTexts.y=r,this.stateValues.y=r,this.stateElementTexts.x=r,this.stateElementValues.x=this.width-r,this.stateElementTexts.y=48,this.stateElementValues.y=48,this.onWindowResize()}update(t){super.update(t)}onWindowResize(){this.stateElementTexts&&this.stateElementValues&&(super.onWindowResize(),this.bg.width=Math.min(320,h.Z.screen.width/2)-32,this.bg.height=h.Z.screen.height-32-64,this.stateValues.x=this.width-r,this.stateElementTexts.y=this.bg.height-r,this.stateElementValues.y=this.bg.height-r,this.stateElementValues.x=this.width-r)}}},7553:(t,e,i)=>{i.d(e,{K:()=>a});var s=i(5274),n=i(1971),h=i(7254),o=i(9512),r=i(8519);class a extends h.r{constructor(){super(),this.animFrame=0,this.sprite_typingText=new s.U,this.sprite_typingText.x=8,this.sprite_typingText.y=8,this.downIcon=new n.jyi(n.xEZ.from(o.ZP.Image.jewelBlueSmall)),this.downIcon.anchor.set(1,1),this.addChild(this.downIcon,this.sprite_typingText),this.on("pointerdown",this.onPointerDown),this.interactive=!0,this.cursor="pointer",this.visible=!1,this.onWindowResize()}update(t){super.update(t),this.animFrame+=t,this.typing||(this.downIcon.visible=!0,this.downIcon.y=128+4*Math.sin(this.animFrame/8))}onPointerDown(){this.IsEmpty()?this.visible=!1:(this.nextSentence(),this.visible=!0)}get typing(){return this.sprite_typingText.typing}nextSentence(){return this.sprite_typingText.nextSentence()}appendText(t){return this.visible=!0,this.sprite_typingText.appendText(t)}waitForEmpty(){return this.sprite_typingText.waitForEmpty()}IsEmpty(){return this.sprite_typingText.IsEmpty()}IsSentenceCompleted(){return this.sprite_typingText.IsSentenceCompleted()}onWindowResize(){this.downIcon&&(super.onWindowResize(),this.bg.width=Math.min(640,r.Z.screen.width)-32,this.bg.height=144,this.x=r.Z.screen.width/2-this.bg.width/2,this.y=r.Z.screen.height-this.height-16,this.downIcon.x=this.bg.width-16,this.downIcon.y=this.bg.height-16,this.sprite_typingText.textStyle.wordWrapWidth=this.bg.width-16)}}},7254:(t,e,i)=>{i.d(e,{r:()=>n});var s=i(1971);class n extends s.W20{constructor(){super(),this.bg=new s.TCu,this.addChild(this.bg),window.addEventListener("resize",this.onWindowResize.bind(this)),this.onWindowResize()}onWindowResize(){this.bg.clear(),this.bg.beginFill(3355511,.5),this.bg.drawRect(0,0,this.width,this.height)}update(t){this.children.forEach((e=>{var i,s;return null===(s=(i=e).update)||void 0===s?void 0:s.call(i,t)})),this.visible!==this.lastVisible&&(this.lastVisible=this.visible),this.visible?this.alpha=Math.min(1,this.alpha+t*(1-this.alpha)/15):this.alpha=0}destroy(t){window.removeEventListener("resize",this.onWindowResize.bind(this)),super.destroy(t)}}}}]);