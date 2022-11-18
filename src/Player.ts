import { Card } from "./Card";



export class Player {
	holdingCard: Set<Card> = new Set();

	constructor() {}

	addCard(card: Card) { this.holdingCard.add(card); }
	removeCard(card: Card) { this.holdingCard.delete(card);	}
	useCard(card: Card) {

	}
}