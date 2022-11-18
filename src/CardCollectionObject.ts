import * as PIXI from "pixi.js";
import { Card } from "./Card";
import { GameObject } from "./GameObject";

export class CardCollectionObject extends GameObject {
	_PIXIobj: PIXI.Container = new PIXI.Container();
	collection: Card[] = [];

	constructor() {
		super();
	}

	addCard(...cards: Card[]) {
		for (let card of cards) {
			card.position.x = this.collection.length * 20;
			this.collection.push(card);
			this._PIXIobj.addChild(card._PIXIobj);
		}
	}
	removeCard(...cards: Card[]) {
		for (let card of cards) {
			let i = this.collection.indexOf(card);
			this.collection.splice(i, 1);
			this._PIXIobj.removeChild(card._PIXIobj);
		}
		for (let i = 0; i < this.collection.length; i++) {
			let card = this.collection[i];
			card.position.x = i * 20;
		}
	}

}