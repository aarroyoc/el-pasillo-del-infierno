/*
* webgl.js
*/
define({
	checkWebGL: function(){
		var gl;
		var canvas=document.createElement("canvas");
		try {
			gl = canvas.getContext("webgl"); 
		}catch (x) { gl = null; }

		if (gl === null) {
			try { gl = canvas.getContext("experimental-webgl");}
			catch (x) { gl = null; }
		}

		if(gl === null)
		{
			return false;
		}else{
			return true;
		}
	}
});
