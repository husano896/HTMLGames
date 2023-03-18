import Keyboard from 'pixi.js-keyboard';
import $game from "@/main";
import { onResourceReady } from './resources';
import { IResizeable } from './Interfaces/IResizeable';
import { Game_Global_Mobile } from './Game';

/**
  * 自URL的QueryString中取得預先開啟的遊戲
  */
function getGameFromQuery() {
	let params = (new URL(document.location.href)).searchParams
	let game = params.get("game");
	switch (game) {
		case 'eviat':
			return import('@/Scenes/Scene_Eviat').then(m => m.Scene_Eviat);
		case 'map':
			return import('@/Scenes/Scene_Map').then(m => m.Scene_Map);
		default: // 'mobile':
			/** 
			 * 遊戲自適應視窗的對應
			 * resize之後記得需要對應重新設定pivot, 不然對應的位置仍然會在原始視窗大小 
			 * https://github.com/pixijs/pixijs/discussions/7282
			*/
			$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);

			console.log('add resize listener')
			window.addEventListener("resize", (ev) => {
				$game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
				$game.stage.children.forEach(c=> (c as unknown as IResizeable)?.onWindowResize?.())
			});
			Game_Global_Mobile.init()
			return import('@/Scenes/Scene_Mobile').then(m => m.Scene_Mobile);
	}
}

onResourceReady.then(async () => {
	// 初始畫面
	let scene = await getGameFromQuery()
	$game.stage.addChild(new scene());

	$game.ticker.add((delta) => {
		Keyboard.update();
		
		$game.stage.children.forEach(c=> (c as any).update(delta));
		
	});
	$game.start();
})

console.log($game);
