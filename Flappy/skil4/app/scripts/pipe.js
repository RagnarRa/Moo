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
		this.pipes = pipes;
		this.game = game;
		for (var i = 0; i < pipes.length; i++) {
			this.pipes[i].UpperHeight = 23;
			this.pipes[i].LowerHeight = 15.6;
		}
	};

	 /**
	 * Resets the state of the pipes.
	 */
	Pipe.prototype.reset = function(index) {
		if (index !== undefined) {
			this.pipes[index].Pos.x = INITIAL_POSITION_X; 
			this.pipes[index].Pos.y = INITIAL_POSITION_Y;
		}
		else { //Reset all, i.e. reset both bars
			for (var i = 0; i < this.pipes.length; i++) {
				this.pipes[i].Pos.x = INITIAL_POSITION_X + (i * this.game.SPACE_BETWEEN_BARS);
				this.pipes[i].Pos.y = INITIAL_POSITION_Y; 
			}
		}
	};

	//Delta er timi i sekundumf ra sidasta frame
	Pipe.prototype.onFrame = function(delta) {
		var i = 0; 
		for (i = 0; i < this.pipes.length; i++) {
			this.pipes[i].Pos.x -= delta * SPEED; 
		}

		for (i = 0; i < this.pipes.length; i++) {
			//reset pipe[i].. 
			if (this.pipes[i].Pos.x < (0 - WIDTH)) {
				this.reset(i);
			}
		}
		/* Update UI*/
		for (i = 0; i < this.pipes.length; i++) {
			this.pipes[i].Pipe.css('transform', 'translateZ(0) translate(' + this.pipes[i].Pos.x + 'em, ' + this.pipes[i].Pos.y + 'em)');
		}
	};

	Pipe.prototype.collidesWithPlayer = function(playerX, playerY, playerWidth, playerHeight) {
		var pipeStartX = 0, pipeEndX = 0;
		for (var i = 0; i < this.pipes.length; i++) {
			pipeStartX = this.pipes[i].Pos.x, pipeEndX = this.pipes[i].Pos.x + WIDTH;
			//Ef byrjunarX players + vidd hans er >= byrjun pipu.. og byrjunarX hans er <= endi pipu.. 
			//Og byrjunarY players (toppur) <= UPPERHEIGHT EDA (byrjunarY + playerHeight) >= (UPPERHEIGHT + 5em)
			if ((playerX + playerWidth) > pipeStartX && playerX < pipeEndX && 
			   ( (playerY < UPPERHEIGHT) || ( (playerY + playerHeight) > (UPPERHEIGHT + this.game.GAP)) )) {
				return true;
			} 
		}

		return false; 
	};

	return Pipe;

})();
