import * as PIXI from 'pixi.js'

export abstract class GameObject {
	abstract _PIXIobj: PIXI.DisplayObject;
	
	constructor() {}

	remove = () => this._PIXIobj.destroy()

	start() {}
	update() {}
	lateupdate() {}

	get visible() { return this._PIXIobj.visible; }
	set visible(val: boolean) {	this._PIXIobj.visible = val;	}
	get position() { return this._PIXIobj.position; }
	get rotation() { return this._PIXIobj.rotation; }
	get angle() { return this._PIXIobj.angle; }
	get pivot() { return this._PIXIobj.pivot; }
	get scale() { return this._PIXIobj.scale; }
}