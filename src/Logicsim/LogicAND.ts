import * as PIXI from 'pixi.js'
import { LogicComponent } from "./LogicComponent";
import { LogicNodeDirection } from "./LogicNode";

export class LogicAND extends LogicComponent {

	static PIXI_prefab = drawANDGate(LogicComponent.PIXI_linestyle);
	PIXIObj = LogicAND.PIXI_prefab.clone();

	constructor() {
		super();
		this.addNode(LogicNodeDirection.IN, 'a');
		this.addNode(LogicNodeDirection.IN, 'b');
		this.addNode(LogicNodeDirection.OUT, 'y');
	}
	operate(): void {
		this.node.output.y.value = this.node.input.a.value && this.node.input.b.value;
	}
}

function drawANDGate(linestyle: PIXI.ILineStyleOptions, fill = 0xffee8a): PIXI.Graphics {
	let g = new PIXI.Graphics();
	let s = 20;

	g.lineStyle(linestyle);
	g.beginFill(fill, 0.5);
	g.moveTo((Math.sqrt(12) - 5) * s, -2 * s);
	g.lineTo((Math.sqrt(12) - 2) * s, -2 * s);
	g.arc((Math.sqrt(12) - 2) * s, 0, 2 * s, -Math.PI / 2, Math.PI / 2);
	g.lineTo((Math.sqrt(12) - 5) * s, 2 * s);
	g.closePath();
	g.endFill();
	return g;
}