/*
* main.js
*/
function deg2rad(deg)
{
	return deg*Math.PI/180;
}
Physijs.scripts.worker="libs/physijs_worker.js";
Physijs.scripts.ammo="ammo.js";


require.config({
	baseUrl: "js"
});

requirejs(["audio"],function(audio){
	/*audio.start(); FOR DEBUG */
});
requirejs(["msg","three"],function(msg,three){
	three.init();
	three.startScreen();
	msg.notify("Original game by Adrián Arroyo Calle");
	setTimeout(function(){
		this.start()
	}.bind(three),5000);
});