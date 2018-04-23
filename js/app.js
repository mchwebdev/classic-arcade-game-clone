// Enemy class
class Enemy {
	constructor(x, y, speed) {
			this.x = x;
			this.y = y;
			this.speed = speed;
			this.sprite = 'images/enemy-bug.png';
	}

	// Update the enemy's position
	// Parameter: dt, a time delta between ticks
	update(dt) {
			// You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
			this.x += this.speed * dt;

			// Resets the position of each enemy to the start when they reach the end of the canvas
			if (this.x > 520) {
					this.x = -100;
					this.speed = 111 + Math.floor(Math.random() * 333);
			}
	}

	// Ckecks for collisions between player and enemies and resets the player position if collision happened
	checkCollisions() {
			if (player.x < this.x + 75 &&
					player.x + 75 > this.x &&
					player.y < this.y + 50 &&
					50 + player.y > this.y) {
					player.x = 200;
					player.y = 390;
			}
	}

	// Draw the enemy on the screen
	render() {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Player class
class Player {
	constructor(x, y) {
			this.x = x;
			this.y = y;
			this.sprite = 'images/char-cat-girl.png';
	}

	update(dt) {
			this.reset();
	}

	// Draw the player on the screen
	render() {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	// To move the player on the canvas
	handleInput(keydown) {
			if (keydown === 'left' && this.x > 0) {
					this.x -= 100;
			}
			if (keydown === 'up' && this.y > 0) {
					this.y -= 80;
			}
			if (keydown === 'right' && this.x < 400) {
					this.x += 100;
			}
			if (keydown === 'down' && this.y < 350) {
					this.y += 80;
			}
	}

	// Resets the position of the player to the start when the top of the canvas has been reached, therefore the player has won
	reset() {
			if (this.y < 0) {
					setTimeout(() => {
							this.x = 200;
							this.y = 390;
					}, 400);
			}
	}
}

// Array that stores all the enemies
const allEnemies = [];

// Array that stores location on the y axis of enemies
const enemyLocationY = [63, 147, 230];

// Instantiate a new player object
const player = new Player(200, 390);

// Instantiate new enemy objects, using the enemyLocation array to locate them on the y axis and generate a random speed for each of them
enemyLocationY.forEach(locationY => {
	const enemy = new Enemy(0, locationY, 111 + Math.floor(Math.random() * 333));
	allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to the player.handleInput() method.
document.addEventListener('keydown', e => {
	const allowedKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});