class GameEngine {
	constructor() {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.lastTime = this.getCurrentTimeMillis();
		this.timer = this.getCurrentTimeMillis();
		this.deltaTime = 0;

		this.targetUPS = 60;
		this.targetFPS = 60;

		this.updates = 0;
		this.frames = 0;

		this.UPS = 0;
		this.FPS = 0;

		this.updateTime = 1000 / this.targetUPS;

		this.running = false;

		this.keyState = [];

		this.map = new Map(30, 30, 32);

		this.player = new Player(this, 100, 100, 32, 32, 'yellow');
		this.camera = new Camera(this, false);
		this.camera.bind(this.player);
	}

	start() {
		if (!this.running) {
			this.running = true;
			this.tick();
		}
	}

	stop() {
		if (this.running) {
			this.running = false;
		}
	}

	update() {
		// Update the game
		this.player.update();
	}
	
	render(ctx) {
		// Clear canvas
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Update camera view based on player position
		this.camera.update();

		// Render map
		this.map.render(ctx);

		// Render player
		this.player.render(ctx);

		// This area is not affected by camera
		this.camera.stop();

		// Display UPS and FPS
		ctx.font = '15px sans-serif';
		ctx.fillStyle = 'yellow';
		ctx.fillText('FPS: ' + this.FPS, 20, 30);
		ctx.fillText('UPS: ' + this.UPS, 20, 50);
	}

	getInput() {
		if (this.keyState[65]) {
			this.player.moveLeft();
		}
		else if (this.keyState[68]) {
			this.player.moveRight();
		}
		else {
			this.player.stopX();
		}

		if (this.keyState[87] || this.keyState[32]) {
			this.player.jump();
		}
	}

	tick() {
		if (!this.running) return;

		// Get current time in milliseconds
		let currentTime = this.getCurrentTimeMillis();
		// Get delta time based on current and update time
		this.deltaTime += (currentTime - this.lastTime) / this.updateTime;
		// Make last time equal to current time
		this.lastTime = currentTime;

		// Update the game based on how many delta time passed
		while (this.deltaTime >= 1) {
			this.getInput();
			this.update();
			this.deltaTime--;
			this.updates++;

			// Update the delta time
			currentTime = this.getCurrentTimeMillis();
			this.deltaTime += (currentTime - this.lastTime) / this.updateTime;
			this.lastTime = currentTime;
		}

		// Render
		this.render(this.ctx);
		this.frames++;

		// Show UPS and FPS
		while (this.getCurrentTimeMillis() - this.timer >= 1000) {
			this.FPS = this.frames;
			this.UPS = this.updates;
			this.timer += 1000;
			this.frames = 0;
			this.updates = 0;
		}

		const self = this;

		// Call tick every 1000 milliseconds divided by the target FPS
		setTimeout(() => { self.tick() }, 1000 / self.targetFPS);
 	}

	setUPS(UPS) {
		this.UPS = UPS;
		this.updateTime = 1000 / this.UPS;
	}

	setFPS(FPS) {
		this.FPS = FPS;
	}

	getCurrentTimeMillis() {
		return new Date().getTime();
	}

	random(min, max) {
		return Math.floor((Math.random() * (max - min)) + min);
	}

	constrain(value, min, max) {
		if (value < min) {
			return min;
		}
		else if (value > max) {
			return max;
		}

		return value;
	}
}