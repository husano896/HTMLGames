import Mouse from 'pixi.js-mouse';
import Keyboard from 'pixi.js-keyboard';
import $game from "./game";
import { onResourceReady } from './resources';

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
		case 'map':
			/** 遊戲自適應視窗的對應 */
			$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
			window.addEventListener("resize", () => {
				$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
			});
			return import('./Scenes/Scene_Mobile').then(m => m.Scene_Mobile);
		default:
			return import('./Scenes/Scene_Bubble').then(m => m.Scene_Bubble);
	}
}

onResourceReady.then(async () => {
	// 初始畫面
	let scene = getGameFromQuery()
	let $scene = new (await scene)();
	$game.stage.addChild($scene);

	$game.ticker.add((delta) => {
		if ($scene) {
			Keyboard.update();
			Mouse.update();
			$scene.update(delta);
		}
	});
	$game.start();
})

console.log($game);
