/*
* main.js
*/
require.config({
	baseUrl: "js"
});

requirejs(["audio"],function(audio){
	audio.start();
});