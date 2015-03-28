# HTML5 CSS-based Game

This game project has the following:

* 1024x768 pixel game canvas.
* All positions and sizes defined using a 10px em. This means that the game could be scaled up and down by changing the base font-size. This is one way to make the graphics responsive.
* A simple game loop which calculates delta and can be started and stopped.
* A player entity which can be moved around the canvas using the arrow keys.
* A "Game Over" screen when player is moved outside bounds, where the game can be restarted.

## Setup
Before installing this package you will need to have set up git, Node JS with npm, grunt, bower, ruby, sass and compass.  If you don't have that installed, this is how you do it on windows.
*   install Git [from here](http://git-scm.com/download/win "Download and install it from here") see:
*   install Node JS with npm [from here]( https://nodejs.org/ "Download and install it from here") with all features.  You will need npm install as administrator.
*   install [Ruby](https://www.ruby-lang.org/en/documentation/installation/ "Many Ruby installers for various systems"). Here is the [windows installer](http://rubyinstaller.org/downloads/ "Download and install the windows installer it from here").  Be sure when installing Ruby, to add Ruby executables to your PATH. 

*   Run command line promt as Administrator

    install grunt, bower, sass and compass:
 ```sh
	  npm install -g grunt-cli
	  npm install -g bower
	  gem install sass
	  gem install compass
```

### finally in the command prompt do:
#### on windows
```
install.bat
```
#### on Unix/Linux

```
npm install
bower install
grunt compass
grunt server
```

# Responsive
We tested the game on various devices with different resolutions, iphone 6, ipad mini and galaxy s4

# CSS Precompiler
We used SASS for CSS components throughout the assignment
