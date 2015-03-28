
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
        this.lastVolume = 1;
        // Cache a bound onFrame since we need it each frame.
        this.onFrame = this.onFrame.bind(this);
        this.scoreStats = {
            score :0,
            highscore:0
        };
        var saved = localStorage.getItem('highscore');
        if (saved !== undefined){
            this.scoreStats.highscore = saved;
        }

    };

    Game.prototype.addScore = function(){
        this.setScore(++this.scoreStats.score);
        console.log('addScore - Score now:' + this.scoreStats.score );

    };
    Game.prototype.setScore = function(newScore){
        this.scoreStats.score = newScore;
        document.getElementById("DisplayScore").innerHTML=this.scoreStats.score.toString();
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
        this.runAnimations();
        //this.setScore(this.scoreStats.highscore+1);
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.pipe.reset();
        this.setScore(0);
		this.player.reset();
	};

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

            if (audios[i].id === 'song'){
                audios[i].volume = (volume/15); //background music must be lower
            }
            else{
                audios[i].volume = volume;
            }
            console.log("setvol á " + audios[i].id + " = " + volume);
        }
    };

    Game.prototype.pauseAnimations = function (){
        $('.animation').css('webkitAnimationPlayState', 'paused');
        //save the
        this.lastVolume = document.getElementsByTagName("audio")[0].volume;
        this.setVolume(0);
        $('#audioSpeedflap').stop();
    };
    Game.prototype.runAnimations = function (){
        $('.animation').css('webkitAnimationPlayState', 'running');
        this.setVolume(this.lastVolume);
        document.getElementById('audioSpeedflap').play();
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
        this.pauseAnimations();
        var sound = document.getElementById('hit');
        scoreboardEl.find('#Score').html(this.scoreStats.score);
        if (newHighScore === true){
            sound = document.getElementById('audioHighscore');
            scoreboardEl.find('.newHighscore').show();
            this.scoreStats.highscore = this.scoreStats.score;
            localStorage.setItem('highscore', this.scoreStats.highscore);
        }
        else {
            scoreboardEl.find('.newHighscore').hide();
        }
        sound.volume = this.lastVolume;
        sound.play();
        scoreboardEl.find('#HighScore').html(this.scoreStats.highscore);
        scoreboardEl
            .addClass('is-visible')
            .find('.Scoreboard-restart')
            .one('click touchstart', function() {
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


