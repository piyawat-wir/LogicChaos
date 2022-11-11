import * as PIXI from 'pixi.js';
import { LogicNode, LogicNodeDirection } from './LogicNode';

export abstract class LogicComponent {
	abstract PIXIObj: PIXI.Graphics;
	node : {
		input: Record<string, LogicNode>,
		output: Record<string, LogicNode>
	} = {
		input: {}, output: {}
	};

	static PIXI_linestyle = {
		color: 0xffffff,
		width: 8,
		join: PIXI.LINE_JOIN.ROUND,
		cap: PIXI.LINE_CAP.ROUND,
	};

	constructor() {}
	/**
	 * @param {LogicNodeDirection} direction Node direction 
	 * @param {string} name Name of the node
	 * @returns {boolean} Returns an existing node, else returns newly created node.
	 */
	addNode(direction: LogicNodeDirection, name: string) : LogicNode {
		if (!this.node[direction][name])
			this.node[direction][name] = new LogicNode(this);
		return this.node[direction][name];
	}
	/**
	 * @param {LogicNodeDirection} direction Node direction 
	 * @param {string} name Name of the node
	 * @returns {boolean} Returns boolean showing whether the operation runs successfully. True as success, False as failed
	 */
	removeNode(direction: LogicNodeDirection, name: string) : boolean {
		if (this.node[direction][name]){
			delete this.node[direction][name];
			return true;
		}
		return false;
	}

	abstract operate() : void;

}
