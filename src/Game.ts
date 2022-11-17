import * as PIXI from 'pixi.js'
import { GameAssets } from './GameAssets';
import { GameObject } from './GameObject';
import { Renderer } from "./Renderer";

type LoadedAssets = Awaited<ReturnType<typeof GameAssets.loadAssets>>;

export class Game {

	renderer: Renderer;
	app: PIXI.Application;
	mainScene: PIXI.Container;
	fpsCounter: PIXI.Text | null = null;
	assets: LoadedAssets = {} as LoadedAssets;
	assetsLoaded = false;
	
	gameObjects: GameObject[] = [];

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
		console.log(this.assets);
	}
	addFPSCounter() {
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
}