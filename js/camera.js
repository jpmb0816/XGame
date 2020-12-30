class Camera {
	constructor(game, isConstrained) {
		this.game = game;
		this.ctx = this.game.ctx;
		this.x = 0;
		this.y = 0;
		this.entity = null;
		this.isConstrained = isConstrained;
	}

	update() {
		// Get the center position of entity
		let x = this.entity.x + this.entity.width / 2;
		let y = this.entity.y + this.entity.height / 2;

		// Get the center position of canvas
		let cx = -x + this.game.canvas.width / 2;
		let cy = -y + this.game.canvas.height / 2;

		if (this.isConstrained) {
			// Constraining camera x and y so it prevents going out of the map
			cx = this.game.constrain(cx, -(this.game.map.width - this.game.canvas.width), 0);
			cy = this.game.constrain(cy, -(this.game.map.height - this.game.canvas.height), 0);
		}

		if (cx != this.x || cy != this.cy) {
			// Translate canvas base on camera x and y
			this.ctx.translate(cx, cy);

			// Make camera x and y absolute value
			this.x = Math.abs(cx);
			this.y = Math.abs(cy);
		}
	}

	bind(entity) {
		this.entity = entity;
	}

	stop() {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}