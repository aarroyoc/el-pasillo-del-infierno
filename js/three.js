/*
three.js : Not the lib, the manager
*/
define({
	camera: new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100),
	scene: new Physijs.Scene(),
	renderer: new THREE.WebGLRenderer(),
	ambient: new THREE.AmbientLight(0x550000),
	light: new THREE.DirectionalLight(0x000000,0.5),
	clock: new THREE.Clock(),
	mesh: {
		cube: new THREE.Mesh(new THREE.CubeGeometry(2,2,2),new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})),
		floor: new Physijs.PlaneMesh(new THREE.PlaneGeometry(100,100), new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/floor.jpg")}),0)
	},
	init: function()
	{
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById("main").appendChild(this.renderer.domElement);
	},
	loop: function(){
		var delta=this.clock.getDelta();
		requestAnimationFrame(this.loop.bind(this));
		this.scene.simulate();
		this.mesh.cube.rotation.x += delta*1;
		this.mesh.cube.rotation.y += delta*1;
		this.renderer.render(this.scene,this.camera);
	},
	start: function(){
		/* Remove previous */
		this.scene.remove(this.mesh.cube);
		/* Load a the game 3D*/
		this.light.position.set(0.0,-1.0,0.0);
		this.mesh.floor.position.set(0.0,-1.0,0.0);
		this.mesh.floor.rotation.x=deg2rad(270);
		
		this.scene.add(this.light)
		this.scene.add(this.ambient);
		this.scene.add(this.mesh.floor);
	},
	startScreen: function()
	{
		this.camera.position.z=10;
		this.scene.add(this.mesh.cube);
		requestAnimationFrame(this.loop.bind(this));
	}
});