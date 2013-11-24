/*
audio.js
*/
define({
	audio: new Audio("music/Andrey_Avkhimovich_-_Zombie.ogg"),
	start: function(){
		this.audio.loop=true;
		this.audio.play();
	},
	stop: function(){
		this.audio.pause();
	}
});