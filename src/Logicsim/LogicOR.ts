import * as PIXI from 'pixi.js'
import { LogicComponent } from "./LogicComponent";
import { LogicNodeDirection } from "./LogicNode";

export class LogicOR extends LogicComponent {

	PIXIObj = LogicOR.PIXI_prefab.clone();
	static PIXI_prefab = drawORGate(LogicComponent.PIXI_linestyle);

	constructor() {
		super();
		this.addNode(LogicNodeDirection.IN, 'a');
		this.addNode(LogicNodeDirection.IN, 'b');
		this.addNode(LogicNodeDirection.OUT, 'y');
	}
	operate(): void {
		this.node.output.y.value = this.node.input.a.value || this.node.input.b.value;
	}
}

function drawORGate(linestyle: PIXI.ILineStyleOptions, fill = LogicComponent.PIXI_fill): PIXI.Graphics {
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
	return g;
}