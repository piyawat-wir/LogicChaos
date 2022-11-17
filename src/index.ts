
import { Game } from './Game';
import { Card } from './Card';

const game = new Game(() => {
	let card = new Card('AND');
	
	game.addObject(card);
});
