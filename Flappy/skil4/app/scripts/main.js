
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';
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

