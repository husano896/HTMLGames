"use strict";(self.webpackChunktemplate_pixijs=self.webpackChunktemplate_pixijs||[]).push([[256],{8002:(t,e,i)=>{i.d(e,{G:()=>a});var s,r=i(5601),h=i(9512);!function(t){t[t.Layer_None=0]="Layer_None",t[t.Layer_Normal=5]="Layer_Normal",t[t.Layer_High=10]="Layer_High"}(s||(s={}));class a{constructor(){this.name="Map01",this.width=r.V.width,this.height=r.V.height,this.frame=0,this.items=[{layer:s.Layer_None,texture:h.ZP.Image.bg,width:800,height:600,x:0,y:0},{layer:s.Layer_Normal,texture:h.ZP.Image.jewelBlue,x:400,y:400,update:(t,e)=>{}}]}}},7256:(t,e,i)=>{i.r(e),i.d(e,{Scene_Bubble:()=>d});var s=i(2694),r=i(8002),h=i(8683),a=i(569),n=i.n(a),o=i(4972);class d extends o.x{constructor(){super(),this.map=new h.l(r.G),this.addChild(this.map),this.sprite_seto=new s.G,this.interactive=!0,this.holding=!1,this.addChild(this.sprite_seto),console.log(this)}easeOutSine(t){return Math.sin(t*Math.PI/2)}easeOutSineFunc(t,e,i){return e+(i-e)*Math.sin(t*Math.PI/2)}update(t){(new Date).getTime(),this.children.forEach((e=>{var i;return null===(i=e.update)||void 0===i?void 0:i.call(e,t)}));const e={x:0,y:0};n().isKeyDown("ArrowUp")?e.y=-1:n().isKeyDown("ArrowDown")&&(e.y=1),n().isKeyDown("ArrowLeft")?e.x=-1:n().isKeyDown("ArrowRight")&&(e.x=1),0!==e.x||0!==e.y?this.sprite_seto.target={x:this.sprite_seto.x+e.x,y:this.sprite_seto.y+e.y}:e.x&&e.y||(this.sprite_seto.target=null)}}},4972:(t,e,i)=>{i.d(e,{x:()=>r});var s=i(1971);class r extends s.W20{constructor(){super()}onInit(){}onDestroy(){this.destroy({children:!0})}update(t){this.children.forEach((e=>{var i,s;return null===(s=(i=e).update)||void 0===s?void 0:s.call(i,t)}))}onWindowResize(){this.children.forEach((t=>{var e,i;null===(i=(e=t).onWindowResize)||void 0===i||i.call(e)}))}}},2694:(t,e,i)=>{i.d(e,{G:()=>r});var s=i(1971);class r extends s.KgH{constructor(){const t={};for(let e=1;e<=9;e++)for(let i=0;i<4;i++){if(5===e)continue;const r=`M_ ${e}_${i}.ase`;t[e]||(t[e]=[]),t[e].push({texture:s.xEZ.from(r),time:133})}super(t[2]),this.sprTextures=t,this.moveSpeed=4,this.anchor.set(.5),this.animationSpeed=1,this.target={x:0,y:0}}update(t){if(this.target){const e=Math.atan2(this.target.y-this.y,this.target.x-this.x),i=(this.target.x-this.x)*t*this.moveSpeed,s=(this.target.y-this.y)*t*this.moveSpeed;this.x+=i,this.y+=s;const r=(180*e/Math.PI+360)%360,h=[6,3,2,1,4,7,8,9][Math.floor(r/45)];this.setMovingAnim(h,!0)}else this.setMovingAnim(null,!1)}setMovingAnim(t,e){this.sprTextures[t]&&t>=0&&this.direction!=t&&(this.textures=this.sprTextures[t],this.animationSpeed=1,this.direction=t),this.moving!=e&&(e?this.play():this.stop()),this.moving=e}}},8683:(t,e,i)=>{i.d(e,{l:()=>r});var s=i(1971);class r extends s.W20{constructor(t){super(),this.map=new t,this.sortableChildren=!0,this.width=this.map.width,this.height=this.map.height,this.map.items.forEach((t=>{const e=s.jyi.from(t.texture);e.x=t.x,e.y=t.y,e.zIndex=t.layer,t.onInteract&&(e.interactive=!0,e.on("pointertap",(i=>t.onInteract.bind(i,e)))),t.update&&Object.defineProperty(e,"update",(i=>{t.update(e,i)})),this.addChild(e)}))}update(t){this.children.forEach((e=>{var i;return null===(i=e.update)||void 0===i?void 0:i.call(e,t)}))}}}}]);