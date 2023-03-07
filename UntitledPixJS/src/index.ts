import Keyboard from 'pixi.js-keyboard';
import $game from "./game";
import { onResourceReady } from './resources';
import { IResizeable } from './Interfaces/IResizeable';

let $scene = null;
/**
  * 自URL的QueryString中取得預先開啟的遊戲
  */
function getGameFromQuery() {
	let params = (new URL(document.location.href)).searchParams
	let game = params.get("game");
	switch (game) {
		case 'eviat':
			return import('./Scenes/scene_eviat').then(m => m.Scene_Eviat);
		case 'map':
			return import('./Scenes/scene_map').then(m => m.Scene_Map);
		case 'mobile':
			/** 
			 * 遊戲自適應視窗的對應
			 * resize之後記得需要對應重新設定pivot, 不然對應的位置仍然會在原始視窗大小 
			 * https://github.com/pixijs/pixijs/discussions/7282
			*/
			$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);

			console.log('add resize listener')
			window.addEventListener("resize", (ev) => {
				$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
				($scene as IResizeable)?.onWindowResize?.()
			});
			return import('./Scenes/Scene_Mobile').then(m => m.Scene_Mobile);
		default:
			return import('./Scenes/Scene_Bubble').then(m => m.Scene_Bubble);
	}
}

onResourceReady.then(async () => {
	// 初始畫面
	let scene = getGameFromQuery()
	$scene = new (await scene)();
	$game.stage.addChild($scene);

	$game.ticker.add((delta) => {
		Keyboard.update();
		if ($scene) {
			$scene.update(delta);
		}
	});
	$game.start();
})

console.log($game);
