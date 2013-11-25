/*
* main.js
*/

Physijs.scripts.worker="libs/physijs_worker.js";
Physijs.scripts.ammo="libs/ammo.js";


require.config({
	baseUrl: "js"
});

requirejs(["audio"],function(audio){
	audio.start();
});
requirejs(["msg","three"],function(msg,three){
	three.init();
	three.startScreen();
	msg.notify("Original game by Adrián Arroyo Calle");
	setTimeout(function(){
		three.start()
	},5000);
});