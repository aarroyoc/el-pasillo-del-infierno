/*
* main.js
*/
var start=true;

function deg2rad(deg)
{
	return deg*Math.PI/180;
}

Physijs.scripts.worker="libs/physijs_worker.js";
Physijs.scripts.ammo="ammo.js";

var lang=navigator.language.split("-");
if(lang!="en" && lang!="es")
{
	lang="en";
}

require.config({
	baseUrl: "js"
});

requirejs(["audio"],function(audio){
	audio.start(); /*FOR DEBUG */
});
requirejs(["webgl"],function(webgl){
	if(webgl.checkWebGL()==false)
	{
		start=false;
		require(["msg"],function(msg){
			msg.send("Your browser or your computer doesn't support WebGL. Please upgrade to Mozilla Firefox and install the latest video drivers.");
		});
	}
});
requirejs(["msg","three","translations"],function(msg,three,trans){
	if(start)
	{
		three.init();
		three.startScreen();
		msg.notify(trans[lang].original);
		setTimeout(function(){
			this.start();
			msg.notify(trans[lang].round+" 1");
			setInterval(function(){
				this.putFridges();
			}.bind(three),2000);
		}.bind(three),5000);
		setInterval(function()
		{
			if(this.points%1000==0)
			{
				var pox=this.points/1000;
				requirejs(["msg"],function(msg){
					msg.notify(trans[lang].round+" "+pox);
				});
				
			}
		}.bind(three),500);
	}
});
