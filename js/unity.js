/*
* unity.js:Integrate with Ubuntu 
*/
if(window.external != undefined)
{
	if(external.getUnityObject != undefined)
	{
		var Unity = external.getUnityObject(1.0);
		 
		Unity.init({name: "El Pasillo del Infierno",
					iconUrl: "http://adrianarroyocalle.github.io/el-pasillo-del-infierno/icons/tiny.png",
					onInit: function(){
						Unity.Notification.showNotification("El Pasillo del Infierno", "Are you ready for the action?");
						Unity.Launcher.addAction("Source Code", function(){
							window.open("http://github.com/AdrianArroyoCalle/el-pasillo-del-infierno");
						});
					}});
	}
}
