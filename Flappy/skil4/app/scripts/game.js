
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		var pipes = [{ "Pipe" : this.el.find('.GameCanvas-Pipe1'), "Pos" : { "x" : 0, "y" : 0}, "UpperHeight" : 0, "LowerHeight" : 0 }, { "Pipe" : this.el.find('.GameCanvas-Pipe2'), "Pos" : { "x" : 0, "y" : 0}, "UpperHeight" : 0, "LowerHeight" : 0 }];
		//this.pipe = new window.Pipe(this.el.find('.GameCanvas-Pipe1'), this);
		this.pipe = new window.Pipe(pipes, this);
		this.player = new window.Player(this.el.find('.Player'), this, this.pipe);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.pipe.onFrame(delta);
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.pipe.reset();
		this.player.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants. / 1 em
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
	Game.prototype.DIRT_HEIGHT = 4;
	Game.prototype.GRASS_HEIGHT = 6;
	Game.prototype.GAP = 15; //Space between moving bars 
	Game.prototype.SPACE_BETWEEN_BARS = 40; 

	return Game;
})();


