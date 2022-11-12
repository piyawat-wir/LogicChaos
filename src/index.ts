import * as PIXI from 'pixi.js';
import * as Logic from './LogicSim'

const main = async () => {
	// Main app
	let app = new PIXI.Application({
		resizeTo: window,
		// powerPreference: "high-performance",
		antialias: true,
	});
	let cv: HTMLCanvasElement = <HTMLCanvasElement>app.renderer.view;

	// Display application properly
	document.body.style.margin = '0';
	document.body.style.overflow = 'hidden';
	cv.style.position = 'absolute';
	cv.style.display = 'block';
	document.body.appendChild(cv);

	// Load Assets
	PIXI.Assets.init({ basePath: "assets" });

	const cardSet = {
		cardAND: 'card_and.png',
		cardOR: 'card_or.png',
		cardXOR: 'card_xor.png',
		cardNOT: 'card_not.png',
		cardNAND: 'card_nand.png',
		cardNOR: 'card_nor.png',
		cardXNOR: 'card_xnor.png',
		cardSWITCH: 'card_switch.png',
		cardWIRE: 'card_wire.png',
	}

	PIXI.Assets.addBundle('cardSet', cardSet);
	let assets = await PIXI.Assets.loadBundle('cardSet');

	// Load Filters
	let diagonalStripeShaderFrag: string = await (await fetch('assets/diagonalStripe.frag')).text();
	const diagonalStripeFilter = new PIXI.Filter(undefined, diagonalStripeShaderFrag, { time: 0 });
	const FXAAFilter = new PIXI.filters.FXAAFilter();

	// Setup World Components
	let camera = new PIXI.Point(0, 0);
	let world = new PIXI.Container();
	world.sortableChildren = true;
	app.stage.addChild(world);

	/* 	
		// Create curves 
		let curves: PIXI.Graphics[] = [];
		curves.push(await makeCurve(0,0,100,200, 0xff0000));
		curves.push(await makeCurve(0,0,100,300, 0xff0000));
		curves.push(await makeCurve(0,-100,100,400));
		curves.push(await makeCurve(-100,-100,200,400));
		curves.push(await makeCurve(200,400, 400, 100));
		curves.push(await makeCurve(0,400, 100, 100));
	
		// Apply filter
		curves[0].filters = [diagonalStripeFilter];
		curves[1].filters = [diagonalStripeFilter];
		curves[5].filters = [diagonalStripeFilter];
	
		// Add curves to world
		curves.forEach(c => world.addChild(c));
	 */
	// world.filters = [FXAAFilter];

	let fps = new PIXI.Text('0', new PIXI.TextStyle({
		fill: '#ffffff',
		fontSize: 16,
	}));
	fps.position.set(10, 10);
	app.stage.addChild(fps);

	/* 	let orGate = new Logic.LogicOR();
		orGate.PIXIObj.position.set(1000,200);
		app.stage.addChild(orGate.PIXIObj);
	
		let norGate = new Logic.LogicNOR();
		norGate.PIXIObj.position.set(1000,300);
		app.stage.addChild(norGate.PIXIObj);
	
		let andGate = new Logic.LogicAND();
		andGate.PIXIObj.position.set(1000,400);
		app.stage.addChild(andGate.PIXIObj);
	
		let nandGate = new Logic.LogicNAND();
		nandGate.PIXIObj.position.set(1000,500);
		app.stage.addChild(nandGate.PIXIObj);
	
		let xorGate = new Logic.LogicXOR();
		xorGate.PIXIObj.position.set(1000,600);
		app.stage.addChild(xorGate.PIXIObj);
	
		let notGate = new Logic.LogicNOT();
		notGate.PIXIObj.position.set(1000,700);
		app.stage.addChild(notGate.PIXIObj);

		let xnorGate = new Logic.LogicXNOR();
		xnorGate.PIXIObj.position.set(1000, 100);
		app.stage.addChild(xnorGate.PIXIObj); */
	/* 
	let xnorGate = new Logic.LogicXNOR();
	xnorGate.PIXIObj.position.set(0, 0);
	world.addChild(xnorGate.PIXIObj); */

	let board = new PIXI.Container();
	board.position.set(150, 100);

	for (let y = 0; y < 7; y++)
		for (let x = 0; x < 3; x++) {
			let slot = makeSlot();
			slot.position.set(x * 300, y * 110);
			board.addChild(slot);
		}

	// world.addChild(board);

	const makeCardWheel = async () => {
		let nCard = 90;
		for (let i = 0; i < nCard; i++) {
			let card = await makeCard(cardSet);
			card.pivot.y = 800;
			card.angle = (i / nCard) * 350;
			world.addChild(card);
		}
	}
	makeCardWheel();

	world.scale.set(0.4);
	// world.removeChildren();

	window.addEventListener('keyup', (e) => {
		e.preventDefault();
		if (e.code == 'KeyA') {
			world.removeChildren();
			makeCardWheel();
		}
	})

	// Rendering Runtime
	app.ticker.add(delta => {
		world.position.set(app.screen.width / 2 + camera.x, app.screen.height / 2 + camera.y);
		diagonalStripeFilter.uniforms.time += delta;
		fps.text = `FPS: ${Math.round(app.ticker.FPS)}`;
	})

};

main();

async function makeCurve(sx: number, sy: number, ex: number, ey: number, c?: number): Promise<PIXI.Graphics> {
	let curve = new PIXI.Graphics();
	curve.blendMode = PIXI.BLEND_MODES.ADD;
	curve.alpha = 0.3;
	curve.zIndex = 0;

	let startPt = new PIXI.Point(sx, sy);
	let endPt = new PIXI.Point(ex, ey);
	let sMul = 1.2;
	let dx = (ex - sx) * sMul;
	let anchorPt1 = new PIXI.Point(startPt.x + dx, startPt.y);
	let anchorPt2 = new PIXI.Point(endPt.x - dx, endPt.y);

	let points: PIXI.Point[] = [];
	// points.push(startPt, endPt, anchorPt1, anchorPt2);
	points.push(startPt, endPt);

	let color = c || Math.floor(Math.random() * 0x555555) + 0xaaaaaa;

	curve.lineStyle({});
	curve.beginFill(Math.min(color * 1.05, 0xffffff));
	points.forEach(p => curve.drawCircle(p.x, p.y, 12));
	curve.endFill();

	curve.lineTextureStyle({
		width: 10,
		color: color,
		cap: PIXI.LINE_CAP.ROUND,
		join: PIXI.LINE_JOIN.ROUND,
	});

	curve.moveTo(startPt.x, startPt.y);
	curve.bezierCurveTo(anchorPt1.x, anchorPt1.y, anchorPt2.x, anchorPt2.y, endPt.x, endPt.y);

	curve.interactive = true;
	curve.on("mouseenter", e => {
		curve.alpha = 1;
		curve.zIndex = 1;
		// curve.parent.sortChildren();
	})
	curve.on("mouseleave", e => {
		curve.alpha = 0.3;
		curve.zIndex = 0;
		// curve.parent.sortChildren();
	})

	return curve;
}

function makeSlot(): PIXI.Graphics {
	let slot = new PIXI.Graphics();
	slot.beginFill(0x77bbff, 0.2);
	slot.drawRoundedRect(-100, -50, 200, 105, 10);
	slot.endFill();
	slot.zIndex = -1;
	return slot;
}

async function makeCard(set: object): Promise<PIXI.DisplayObject> {
	let list = Object.keys(set);
	let i = Math.floor(Math.random() * list.length);
	let tex = await PIXI.Assets.get(list[i]);
	let card = new PIXI.Sprite(tex);
	card.anchor.set(0.5);
	let border = new PIXI.Graphics();
	border.lineStyle({ color: 0x000000, width: 5 })
	border.filters = [new PIXI.filters.BlurFilter(5)]
	border.drawRoundedRect(-card.texture.width / 2, -card.texture.height / 2, card.texture.width, card.texture.height, 10);
	let container = new PIXI.Container();
	container.addChild(border, card);
	container.interactive = true;
	container.hitArea = card.hitArea;
	container.on('mouseenter', e => {
		container.pivot.set(50,850);
	});
	container.on('mouseleave', e => {
		container.pivot.set(0,800);
	});
	return container;
}
