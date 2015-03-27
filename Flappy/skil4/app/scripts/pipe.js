window.Pipe = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 7.5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 102.4;
	var INITIAL_POSITION_Y = 0;

	//40px i dirt.  536px eftir.. tokum 150px í gat.. 386px eftir sem deilist a upper og lower.. account f. 2px border
	var UPPERHEIGHT = 23;
	var LOWERHEIGHT = 15.6;

	var Pipe = function(pipe1, game) {
		this.pipe1 = pipe1;
		console.log("Pipe1: ");
		console.log(this.pipe1);
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the pipe for a new pipe.
	 */
	Pipe.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	//Delta er timi i sekundumf ra sidasta frame
	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;

		if (this.pos.x < (0 - WIDTH)) {
			this.reset(); 
		} 
		/* Update UI*/
		this.pipe1.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.collidesWithPlayer = function(playerX, playerY, playerWidth, playerHeight) {
		var pipeStartX = this.pos.x, pipeEndX = this.pos.x + WIDTH; 
		//console.log("PlayerY: " + playerY + ", UPPERHEIGHT: " + UPPERHEIGHT + ", playerY + height: " + (playerY + playerHeight));

		//Ef byrjunarX players + vidd hans er >= byrjun pipu.. og byrjunarX hans er <= endi pipu.. 
		//Og byrjunarY players (toppur) <= UPPERHEIGHT EDA (byrjunarY + playerHeight) >= (UPPERHEIGHT + 5em)
		//( (playerY < UPPERHEIGHT) || ( (playerY + playerHeight) > (UPPERHEIGHT + 5)) )) {
		if ((playerX + playerWidth) > pipeStartX && playerX < pipeEndX && 
			 ( (playerY < UPPERHEIGHT) || ( (playerY + playerHeight) > (UPPERHEIGHT + this.game.GAP)) )) {
			return true;
		}

		return false; 
	};

	return Pipe;

})();
