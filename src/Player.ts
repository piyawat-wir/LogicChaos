import { Card, CardEnum } from "./Card";
import { CardCollectionObject } from "./CardCollectionObject";
import { Game } from "./Game";

export class Player {
	game: Game;
	holdingCard: CardCollectionObject = new CardCollectionObject();

	constructor(game: Game) {
		this.game = game;
	}

	drawCard(n: number) {
		let cardnamelist: CardEnum[] = Object.values(Card.cardList) as CardEnum[];
		let cards: Card[] = [];
		for (let i = 0; i < n; i++) {
			let r = Math.floor(Math.random()*cardnamelist.length);
			let card = new Card(cardnamelist[r]);
			cards.push(card);
		}
		this.holdingCard.addCard(...cards);
	}
	useCard(card: Card) {

	}
}