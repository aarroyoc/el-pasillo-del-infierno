/*
three.js : Not the lib, the manager
*/
define({
	camera: new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100),
	scene: new THREE.Scene(),
	renderer: new THREE.WebGLRenderer(),
	mesh: {
		cube: new THREE.Mesh(new THREE.CubeGeometry(2,2,2),new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}))
	},
	loop: function(){
		requestAnimationFrame(this.loop.bind(this));
		this.mesh.cube.rotation.x += 0.01;
		this.mesh.cube.rotation.y += 0.01;
		this.renderer.render(this.scene,this.camera);
	},
	start: function(){
		this.camera.position.z=10;
		this.scene.add(this.mesh.cube);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById("main").appendChild(this.renderer.domElement);
		requestAnimationFrame(this.loop.bind(this));
	}
});