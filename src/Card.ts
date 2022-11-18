import * as PIXI from "pixi.js";
import { GameAssets } from "./GameAssets";
import { GameObject } from "./GameObject";

const cardResource = {
	AND: 	'card_and.png',
	OR: 	'card_or.png',
	XOR: 	'card_xor.png',
	NAND: 	'card_nand.png',
	NOR: 	'card_nor.png',
	XNOR: 	'card_xnor.png',
	NOT: 	'card_not.png',
	WIRE: 	'card_wire.png',
	SWITCH: 'card_switch.png',
}
export type CardEnum = keyof typeof cardResource;
const cardEnum = () => {
	let cardenum: {[Property in CardEnum]: string} = {} as {[Property in CardEnum]: string};
	let keys = Object.keys(cardResource) as CardEnum[];
	for (let k of keys) cardenum[k] = k;
	return cardenum;
}

const createCardPIXIobj = (cardname: CardEnum) => {
	let tex = GameAssets.registered.card[cardname];
	let card = new PIXI.Sprite(tex);
	card.anchor.set(0.5);

	let border: PIXI.Graphics;
	if (cardBorder) border = cardBorder.clone();
	else border = createCardBorder(card);

	let container = new PIXI.Container();
	container.addChild(border, card);
	container.interactive = true;
	container.hitArea = card.hitArea;

	return container;
}
const borderBlurFilter = new PIXI.filters.BlurFilter(5);
const createCardBorder = (card: PIXI.Sprite) => {
	let border = new PIXI.Graphics();
	border.lineStyle({ color: 0x000000, width: 5 });
	border.filters = [borderBlurFilter];
	border.drawRoundedRect(-card.texture.width / 2, -card.texture.height / 2, card.texture.width, card.texture.height, 10);
	return border;
}
let cardBorder: PIXI.Graphics;

export class Card extends GameObject {
	static cardList = cardEnum();
	static resourceLocation = cardResource;
	
	_PIXIobj: PIXI.DisplayObject;
	name: CardEnum;

	constructor(name: CardEnum) {
		super();
		this.name = name;
		this._PIXIobj = createCardPIXIobj(name);
	}
	
}