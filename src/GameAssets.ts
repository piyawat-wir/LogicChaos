import * as PIXI from 'pixi.js'
import { Card } from './Card';

export class GameAssets {
	static loaded = false;
	static resource = {
		card: Card.resourceLocation,
		customfilter: <Record<string, CustomFilterConfig>> {
			diagonalStripe: {src:'diagonalStripe.frag', uniform: {time: 0}},
		}
	}
	static registered: {
		card: {[Property in keyof typeof Card.cardList]: PIXI.Texture},
		customfilter: Record<string, PIXI.Filter>
	} = {} as typeof GameAssets.registered;

	static async loadAssets() {
		if (!GameAssets.loaded) {
			PIXI.Assets.init({ basePath: "assets" });
			PIXI.Assets.addBundle('cardlist', GameAssets.resource.card);
			GameAssets.registered.card = {} as typeof GameAssets.registered.card;
			GameAssets.registered.card = await PIXI.Assets.loadBundle('cardlist');

			// Load Filters
			GameAssets.registered.customfilter = {};
			for (let i in GameAssets.resource.customfilter) {
				let config = GameAssets.resource.customfilter[i];
				let frag: string = await (await fetch('assets/' + config.src)).text();
				GameAssets.registered.customfilter[i] = new PIXI.Filter(undefined, frag, config.uniform);
			}
			
			GameAssets.loaded = true;
		}
		return GameAssets.registered;
	}

}

interface CustomFilterConfig {
	src: string;
	uniform: Record<string, any>;
}