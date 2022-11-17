import * as PIXI from 'pixi.js'
import { Game } from './Game';

export class Renderer {
	game: Game;

	constructor(game: Game) {
		this.game = game;
		game.app.ticker.add(delta => {
			(game.assets.customfilter.diagonalStripe as PIXI.Filter).uniforms.time += delta;
			game.displayFPS();

			for (let obj of game.gameObjects) {
				obj.update();
				obj.lateupdate();
			}
		})
	}
}