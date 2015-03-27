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

	var Pipe = function(pipes, game) {
		//this.pipe1 = pipe1;
		//console.log("Pipe1: ");
		//console.log(this.pipe1);
		this.pipes = pipes;
		this.game = game;
		//this.pos = { x: 0, y: 0 };
		for (var i = 0; i < pipes.length; i++) {
			this.pipes[i].UpperHeight = 23;
			this.pipes[i].LowerHeight = 15.6;
		}
	};

	/**
	 * Resets the state of the pipe for a new pipe.
	 */
	/*
	Pipe.prototype.reset = function() {
		//this.pos.x = INITIAL_POSITION_X;
		//this.pos.y = INITIAL_POSITION_Y;
		this.pipes[0].Pos.x = INITIAL_POSITION_X;
		this.pipes[0].Pos.y = INITIAL_POSITION_Y;
	}; */

	Pipe.prototype.reset = function(index) {
		//this.pos.x = INITIAL_POSITION_X;
		//this.pos.y = INITIAL_POSITION_Y;
		if (index !== undefined) {
			this.pipes[index].Pos.x = INITIAL_POSITION_X; // + (index * this.game.SPACE_BETWEEN_BARS);
			this.pipes[index].Pos.y = INITIAL_POSITION_Y;
		}
		else { //Reset all, i.e. reset both bars
			console.log("Reset all!");
			/*for (var i = 0; i < this.pipes.length; i++) {
				this.pipes[i].Pos.x = INITIAL_POSITION_X; 
				this.pipes[i].Pos.y = INITIAL_POSITION_Y; 
			}*//*
			this.pipes[0].Pos.x = INITIAL_POSITION_X;
			this.pipes[0].Pos.y = INITIAL_POSITION_Y;
			this.pipes[1].Pos.x = INITIAL_POSITION_X + this.game.SPACE_BETWEEN_BARS; 
			this.pipes[1].Pos.y = INITIAL_POSITION_Y; */
			for (var i = 0; i < this.pipes.length; i++) {
				this.pipes[i].Pos.x = INITIAL_POSITION_X + (i * this.game.SPACE_BETWEEN_BARS);
				this.pipes[i].Pos.y = INITIAL_POSITION_Y; 
			}
		}
	};

	//Delta er timi i sekundumf ra sidasta frame
	Pipe.prototype.onFrame = function(delta) {
		//this.pos.x -= delta * SPEED;
		//this.pipes[0].Pos.x -= delta * SPEED; 
		var i = 0; 
		for (i = 0; i < this.pipes.length; i++) {
			this.pipes[i].Pos.x -= delta * SPEED; 
		}

		//if (this.pos.x < (0 - WIDTH)) {
			//this.reset(); 
		//}

		for (i = 0; i < this.pipes.length; i++) {
			//reset pipe[i].. 
			if (this.pipes[i].Pos.x < (0 - WIDTH)) {
				this.reset(i);
			}
			/*
			if (this.pipes[i].Pos.x < (0 - WIDTH)) {
				this.reset(i);
			} */
		}
		/*k.
		if (this.pipes[0].Pos.x < (0 - WIDTH)) {
			this.reset();
		} */
		/* Update UI*/
		//this.pipe1.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//this.pipes[0].Pipe.css('transform', 'translateZ(0) translate(' + this.pipes[0].Pos.x + 'em, ' + this.pipes[0].Pos.y + 'em)');
		for (i = 0; i < this.pipes.length; i++) {
			this.pipes[i].Pipe.css('transform', 'translateZ(0) translate(' + this.pipes[i].Pos.x + 'em, ' + this.pipes[i].Pos.y + 'em)');
		}
	};

	Pipe.prototype.collidesWithPlayer = function(playerX, playerY, playerWidth, playerHeight) {
		//var pipeStartX = this.pos.x, pipeEndX = this.pos.x + WIDTH; 
		//var pipeStartX = this.pipes[0].Pos.x, pipeEndX = this.pipes[0].Pos.x + WIDTH; 
		var pipeStartX = 0, pipeEndX = 0;
		for (var i = 0; i < this.pipes.length; i++) {
			pipeStartX = this.pipes[i].Pos.x, pipeEndX = this.pipes[i].Pos.x + WIDTH;

			if ((playerX + playerWidth) > pipeStartX && playerX < pipeEndX && 
			   ( (playerY < UPPERHEIGHT) || ( (playerY + playerHeight) > (UPPERHEIGHT + this.game.GAP)) )) {
				return true;
			} 
		}

		//Ef byrjunarX players + vidd hans er >= byrjun pipu.. og byrjunarX hans er <= endi pipu.. 
		//Og byrjunarY players (toppur) <= UPPERHEIGHT EDA (byrjunarY + playerHeight) >= (UPPERHEIGHT + 5em)
		//( (playerY < UPPERHEIGHT) || ( (playerY + playerHeight) > (UPPERHEIGHT + 5)) )) {
		/*if ((playerX + playerWidth) > pipeStartX && playerX < pipeEndX && 
			 ( (playerY < UPPERHEIGHT) || ( (playerY + playerHeight) > (UPPERHEIGHT + this.game.GAP)) )) {
			return true;
		} */

		return false; 
	};

	return Pipe;

})();
