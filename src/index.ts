import * as PIXI from 'pixi.js';

const main = async () => {
    // Main app
    let app = new PIXI.Application();

	let cv : HTMLCanvasElement = (app.renderer.view as HTMLCanvasElement);

	let catSprite = PIXI.Sprite.from('assets/cat.png');

    // Display application properly
    document.body.style.margin = '0';
    cv.style.position = 'absolute';
    cv.style.display = 'block';

	app.stage.addChild(catSprite);

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', (e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(cv);

	console.log(catSprite.scale.x = 1.5);

};

main();