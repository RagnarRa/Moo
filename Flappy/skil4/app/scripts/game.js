
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
        this.lastVolume = 1;

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

    /*document.getElementById('toggle-audio').addEventListener('click', function() {
        if (!isMuted) {
            punchAudio.volume = 0;
            backgroundAudio.volume = 0;
            flapAudio.volume = 0;
            isMuted = true;
        }
        else {
            punchAudio.volume = 1;
            backgroundAudio.volume = 1;
            flapAudio.volume = 1;
            isMuted = false;
        }
    });*/


    Game.prototype.VolumeChange = function(step){

        var vol = document.getElementsByTagName("audio")[0].volume;
        console.log('before vol:'+vol);
        vol += step;

        if (vol < 0){
            vol = 0;
        }
        if (vol > 1){
            vol = 1;
        }
        console.log('after  vol:'+vol);
        this.lastVolume = vol;
        this.setVolume(vol);

    };
    Game.prototype.setVolume = function(volume){
        var audios = document.getElementsByTagName("audio");
        for(var i = 0 ; i < audios.length; i++){
            audios[i].volume = volume;
        }
    };

    Game.prototype.pauseAnimations = function (){
        $('.animation').css('webkitAnimationPlayState', 'paused');
        this.lastVolume = document.getElementsByTagName("audio")[0].volume;
        this.setVolume(0);


    };
    Game.prototype.runAnimations = function (){
        $('.animation').css('webkitAnimationPlayState', 'running');
        this.setVolume(this.lastVolume);
    };
    /**
     * Signals that the game is over.
     */
    Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;

        var newHighScore = (this.scoreStats.score > this.scoreStats.highscore);
		var scoreboardEl = this.el.find('.Scoreboard');
        var parent = $( this ).parent();
        this.pauseAnimations();

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


