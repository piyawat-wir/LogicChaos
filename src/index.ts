
import { Game } from './Game';
import { Card } from './Card';
import { Player } from './Player';

const game = new Game(() => {
	let card = new Card('AND');
	
	game.addObject(card);

});
