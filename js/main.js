/*
* main.js
*/
require.config({
	baseUrl: "js"
});

requirejs(["audio"],function(audio){
	audio.start();
});
requirejs(["three"],function(three){
	three.start();
});
requirejs(["msg"],function(msg){
	msg.send("Adrianix");
});