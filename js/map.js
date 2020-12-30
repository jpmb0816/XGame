class Map {
	constructor(cols, rows, gridSize) {
		this.cols = cols;
		this.rows = rows;
		this.gridSize = gridSize;
		this.width = this.cols * this.gridSize;
		this.height = this.rows * this.gridSize;

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext('2d');

		this.init(this.ctx);
	}

	init(ctx) {
		let count = 0;

		// Render map
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				const gx = x * this.gridSize;
				const gy = y * this.gridSize;

				ctx.fillStyle = 'brown';
				ctx.fillRect(gx, gy, this.gridSize, this.gridSize);

				ctx.strokeStyle = 'black';
				ctx.strokeRect(gx, gy, this.gridSize, this.gridSize);

				ctx.font = '10px sans-serif';
				ctx.fillStyle = 'black';
				ctx.fillText(++count, gx + 5, gy + 10);
			}
		}
	}

	render(ctx) {
		ctx.drawImage(this.canvas, 0, 0);
	}
}