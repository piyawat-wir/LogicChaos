import { LogicComponent } from './LogicComponent'

export class LogicNode {
	parent: LogicComponent;
	target: LogicNode | null;
	value: boolean = false;

	constructor(p: LogicComponent, tar: LogicNode | null = null) {
		this.parent = p;
		this.target = tar;
	}

	connect(tar: LogicNode) { this.target = tar; }
	disconnect() { this.target = null; }
	set() { this.value = true; }
	clear() { this.value = false; }
	toggle() { this.value = !this.value; }
}

export enum LogicNodeDirection {
	IN = 'input',
	OUT = 'output'
}