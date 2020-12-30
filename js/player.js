class Player extends Shape {
	constructor(game, x, y, width, height, color) {
		super(x, y, width, height, color);
		this.game = game;
		this.xLimit = { min: 0, max: this.game.map.width - this.width };
		this.yLimit = { min: 0, max: this.game.map.height - this.height };
		this.velocity = { x: 0, y: 0 };
		this.speed = 4;
		this.gravity = 1;
		this.friction = 0.9;

		this.jumping = false;
		this.jumpForce = -20;
	}

	update() {
		// Update x and y based on velocity
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		// Update y velocity based on gravity
		this.velocity.y += this.gravity;

		this.keepPlayerInsideBorders();
	}

	render(ctx) {
		// Draw player
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	keepPlayerInsideBorders() {
		// Constrain X
		if (this.x < this.xLimit.min) {
			this.x = this.xLimit.min;
		}
		else if (this.x > this.xLimit.max) {
			this.x = this.xLimit.max;
		}

		// Constrain Y
		if (this.y < this.yLimit.min) {
			this.y = this.yLimit.min;
		}
		else if (this.y > this.yLimit.max) {
			this.y = this.yLimit.max;
			this.velocity.y = 0;

			if (this.jumping) {
				this.jumping = false;
			}
		}
	}

	moveLeft() {
		this.velocity.x = -this.speed;
	}

	moveRight() {
		this.velocity.x = this.speed;
	}

	stopX() {
		this.velocity.x = 0;
	}

	jump() {
		if (!this.jumping) {
			this.jumping = true;
			this.velocity.y = this.jumpForce;
		}
	}
}