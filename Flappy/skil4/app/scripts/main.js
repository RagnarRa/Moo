
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';
   /* var punchAudio = document.getElementsByTagName("audio")[0], backgroundAudio = document.getElementsByTagName("audio")[1];
    var isMuted = false;
    document.getElementById('toggle-audio').addEventListener('click', function() {
	    if (!isMuted) {
	    	punchAudio.volume = 0;
	    	backgroundAudio.volume = 0;
	    	isMuted = true;
		}
		else {
			punchAudio.volume = 1;
			backgroundAudio.volume = 1;
			isMuted = false;
		}
    });*/

    document.getElementById('volume-up').addEventListener('click', function() {

        if (game !== undefined) {
            game.VolumeChange(0.2);
        }
    });
    document.getElementById('volume-down').addEventListener('click', function() {

        if (game !== undefined) {
            game.VolumeChange(-0.2);
        }
    });

    var game = new window.Game($('.GameCanvas'));
    game.start();
});

