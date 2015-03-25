window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	//Delta er timi i sekundumf ra sidasta frame
	Player.prototype.onFrame = function(delta) {
		/*
		if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		} */

		if (Controls.didJump()) {
			this.pos.y -= delta * SPEED * 10;
            //.Player-Wing { animation: 0.4s flap alternate infinite;
            //animation: 0.4s flap alternate infinite
          //  console.log(document.getElementById('wwing'));//.css('background-color', 'red');
          //  this.el.css('background-color', 'yellow');
          //  document.getElementById("wwing").css('background-color', 'red');
            // /document.getElementById('wwing').css('background-color', 'red');
            //document.getElementById('wwing').firstChild.css('background-color', 'red');

            //this.el.childNodes[0].css('background-color', 'blue');
		}
		else {
			/*Gravity*/
			this.pos.y += delta * SPEED / 3;
		}

		this.checkCollisionWithBounds();

		/* Update UI*/
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > (this.game.WORLD_HEIGHT - this.game.DIRT_HEIGHT - this.game.GRASS_HEIGHT + 3)) {
			return this.game.gameover();
		}
	};

	return Player;

})();
