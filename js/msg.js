/*
msg.js
*/
define({
	MessageBox: document.getElementById("MessageBox"),
	send: function(message){
		MessageBox.textContent=message;
	},
	clear: function(){
		MessageBox.textContent="";
	}
});