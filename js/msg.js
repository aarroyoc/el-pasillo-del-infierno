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
	},
	notify: function(message){
		MessageBox.textContent=message;
		setTimeout(function(){
			this.clear();
		}.bind(this),5000);
	}
});