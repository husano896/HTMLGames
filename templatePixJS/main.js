// Create the application helper and add its render target to the page
const $game = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild($game.view);

let $scene = null;

const sprite_window = new Sprite_Window();
$game.stage.addChild(sprite_window);
$game.loader.load(() => {
	$game.ticker.add((delta) => {
		if ($scene) {
			$scene.update();
		}
	});
});
console.log($game);


