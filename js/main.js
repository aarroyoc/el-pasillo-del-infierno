/*
* main.js
*/
function deg2rad(deg)
{
	return deg*Math.PI/180;
}

Physijs.scripts.worker="libs/physijs_worker.js";
Physijs.scripts.ammo="ammo.js";

var lang=navigator.language.split("-");
if(lang!="en" || lang!="es")
{
	lang="en";
}

require.config({
	baseUrl: "js"
});

requirejs(["audio"],function(audio){
	/*audio.start(); FOR DEBUG */
});
requirejs(["msg","three","translations"],function(msg,three,trans){
	three.init();
	three.startScreen();
	msg.notify(trans[lang].original);
	setTimeout(function(){
		this.start();
	}.bind(three),5000);
});
