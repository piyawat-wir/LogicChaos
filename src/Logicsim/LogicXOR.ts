import * as PIXI from 'pixi.js'
import { LogicComponent } from "./LogicComponent";
import { LogicNodeDirection } from "./LogicNode";
import { LogicOR } from './LogicOR';

export class LogicXOR extends LogicComponent {

	PIXIObj = LogicXOR.PIXI_prefab.clone();
	static PIXI_prefab = drawXORGate(LogicComponent.PIXI_linestyle);

	constructor() {
		super();
		this.addNode(LogicNodeDirection.IN, 'a');
		this.addNode(LogicNodeDirection.IN, 'b');
		this.addNode(LogicNodeDirection.OUT, 'y');
	}
	operate(): void {
		this.node.output.y.value = this.node.input.a.value != this.node.input.b.value;
	}
}

function drawXORGate(linestyle: PIXI.ILineStyleOptions, fill = 0xffee8a): PIXI.Graphics {
	let g = new PIXI.Graphics();
	let s = 20;

	g.lineStyle(linestyle);
	g.beginFill(fill, 0.5);
	g.moveTo((Math.sqrt(12) - 5) * s, -2 * s);
	g.lineTo(0, -2 * s);
	g.arc(0, 2 * s, 4 * s, -Math.PI / 2, -Math.PI / 6);
	g.arc(0, -2 * s, 4 * s, Math.PI / 6, Math.PI / 2);
	g.lineTo((Math.sqrt(12) - 5) * 1 * s, 2 * s);
	g.arc(-5 * s, 0, 4 * s, Math.PI / 6, -Math.PI / 6, true);
	g.closePath();
	g.endFill();
	g.moveTo((Math.sqrt(12) - 5.75) * s, -2 * s);
	g.arc(-5.75 * s, 0, 4 * s, -Math.PI / 6, Math.PI / 6);
	return g;
}