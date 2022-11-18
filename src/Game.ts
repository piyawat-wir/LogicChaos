import * as PIXI from 'pixi.js'
import { GameAssets } from './GameAssets';
import { GameObject } from './GameObject';
import { Player } from './Player';
import { Renderer } from "./Renderer";

type LoadedAssets = Awaited<ReturnType<typeof GameAssets.loadAssets>>;

const binTo7SegMap = [
	0b1111110, 0b0110000, 0b1101101, 0b1111001,
	0b0110011, 0b1011011, 0b1011111, 0b1110000,
	0b1111111, 0b1111011, 0b1110111, 0b0011111,
	0b1001110, 0b0111101, 0b1001111, 0b1000111,
]
export class Game {

	renderer: Renderer;
	app: PIXI.Application;
	mainScene: PIXI.Container;
	fpsCounter: PIXI.Text | null = null;
	assets: LoadedAssets = {} as LoadedAssets;
	assetsLoaded = false;
	
	gameObjects: GameObject[] = [];

	iPlayerTurn = 0;
	players: Player[] = [];
	objective: Map<Player, number> = new Map();

	constructor(onReady?: () => void) {
		let app = new PIXI.Application({
			resizeTo: window,
			// powerPreference: "high-performance",
			antialias: true,
			autoStart: false,
		});
		this.app = app;
		app.ticker.autoStart = false;
		let cv: HTMLCanvasElement = <HTMLCanvasElement>app.renderer.view;

		// Display application properly
		document.body.style.margin = '0';
		document.body.style.overflow = 'hidden';
		cv.style.position = 'absolute';
		cv.style.display = 'block';
		document.body.appendChild(cv);

		// Initialize main scene
		const scene = new PIXI.Container();
		scene.sortableChildren = true;
		app.stage.addChild(scene);
		this.mainScene = scene;

		this.renderer = new Renderer(this);

		this.addFPSCounter();
		let promiseLoad = this.loadAssets();
		promiseLoad.then(() => {
			this.assetsLoaded = true;
			if (onReady) onReady();
			this.start();
		})
	}

	start() { 
		this.app.start();
		
		let nPlayer = 2;
		for (let i = 0; i < nPlayer; i++) {
			let p = new Player(this);
			this.addPlayer(p);
			p.drawCard(8);
			this.assignObjective(p, this.createObjective());
			
			p.holdingCard.position.set(300,150*(i+1));
		}

	}
	private addFPSCounter() {
		let fps = new PIXI.Text('0', new PIXI.TextStyle({
			fill: '#ffffff',
			fontSize: 16,
		}));
		fps.position.set(10, 10);
		this.fpsCounter = fps;
		this.app.stage.addChild(fps);
	}
	displayFPS() {
		if (this.fpsCounter != null)
			this.fpsCounter.text = `FPS: ${Math.round(this.app.ticker.FPS)}`;
	}
	async loadAssets() {
		this.assets = await GameAssets.loadAssets();
	}

	addObject(obj: GameObject) {
		this.mainScene.addChild(obj._PIXIobj);
		console.log(this.mainScene);
	}

	addPlayer(p: Player) {
		this.players.push(p);
		this.addObject(p.holdingCard);
	}
	createObjective() {
		let r = Math.floor(Math.random()*binTo7SegMap.length);
		return binTo7SegMap[r];
	}
	assignObjective(p: Player, o: number) {
		this.objective.set(p, o);
	}
}