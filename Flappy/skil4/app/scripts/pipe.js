window.Pipe = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 0;
	var INITIAL_POSITION_Y = 0;

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
		
		if (this.pos.x < (this.game.WORLD_WIDTH * -1)) {
			this.reset(); 
		} 
		/* Update UI*/
		this.pipe1.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	return Pipe;

})();
