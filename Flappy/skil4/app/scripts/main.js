
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';
    var punchAudio = document.getElementsByTagName("audio")[0], backgroundAudio = document.getElementsByTagName("audio")[1], flapAudio = document.getElementsByTagName("audio")[2];
    var isMuted = false; 
    document.getElementById('toggle-audio').addEventListener('click', function() {	    
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
    });



    var game = new window.Game($('.GameCanvas'));
    game.start();
});
