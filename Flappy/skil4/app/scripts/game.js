
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
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
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();
        this.runAnimations();
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
        this.scoreStats.score = 0;
		this.player.reset();
	};

	/**
	 * Signals that the game is over.
	 */
    Game.prototype.pauseAnimations = function (){
        $('#x1').css('webkitAnimationPlayState', 'paused');
        $('#x2').css('webkitAnimationPlayState', 'paused');
        $('#x3').css('webkitAnimationPlayState', 'paused');
    };
    Game.prototype.runAnimations = function (){
        $('#x1').css('webkitAnimationPlayState', 'running');
        $('#x2').css('webkitAnimationPlayState', 'running');
        $('#x3').css('webkitAnimationPlayState', 'running');
    };
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;

        var newHighScore = (this.scoreStats.score > this.scoreStats.highscore);
		var scoreboardEl = this.el.find('.Scoreboard');
        var parent = $( this ).parent();
        this.pauseAnimations();

/*
        $('#x1').css('webkitAnimationPlayState', 'paused');
        $('#x2').css('webkitAnimationPlayState', 'paused');
        $('#x3').css('webkitAnimationPlayState', 'paused');
*/
        scoreboardEl.find('#Score').html(this.scoreStats.score);
        if (newHighScore === true){
            scoreboardEl.find('.new').show();
            this.scoreStats.highscore = this.scoreStats.score;
        }
        else {
            scoreboardEl.find('.newHighscore').hide();
        }
        scoreboardEl.find('#HighScore').html(this.scoreStats.highscore);
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

    Game.prototype.scoreStats = {
        score :0,
        highscore:1
    };

	return Game;
})();


