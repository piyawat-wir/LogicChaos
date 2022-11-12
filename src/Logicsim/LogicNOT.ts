import * as PIXI from 'pixi.js'
import { LogicComponent } from "./LogicComponent";
import { LogicNodeDirection } from "./LogicNode";

export class LogicNOT extends LogicComponent {

	PIXIObj = LogicNOT.PIXI_prefab.clone();
	static PIXI_prefab = drawNOTGate(LogicComponent.PIXI_linestyle);

	constructor() {
		super();
		this.addNode(LogicNodeDirection.IN, 'a');
		this.addNode(LogicNodeDirection.OUT, 'y');
	}
	operate(): void {
		this.node.output.y.value = !this.node.input.a.value;
	}
}

function drawNOTGate(linestyle: PIXI.ILineStyleOptions, fill = LogicComponent.PIXI_fill): PIXI.Graphics {
	let g = new PIXI.Graphics();
	let s = 20;
	let r = 0.5;

	g.lineStyle(linestyle);
	g.beginFill(fill, 0.5);
	g.moveTo(0, -1.875 * s);
	g.lineTo((1.75 * Math.sqrt(3)) * s, 0);
	g.lineTo(0, 1.875 * s);
	g.closePath();
	g.drawCircle((1.75 * Math.sqrt(3) + r) * s, 0, r * s);
	g.endFill();
	return g;
}