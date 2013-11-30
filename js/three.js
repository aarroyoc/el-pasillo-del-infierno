/*
three.js : Not the lib, the manager
*/
define({
	keys:{
		LEFT: false,
		RIGHT: false,
		BACK: false,
		SPACE: false,
		ESC: false,
		R: false
	},
	points: 1,
	camera: new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100),
	scene: new Physijs.Scene(),
	renderer: new THREE.WebGLRenderer(),
	ambient: new THREE.AmbientLight(0x550000),
	light: new THREE.DirectionalLight(0xffffff,0.5),
	clock: new THREE.Clock(),
	skybox: new THREE.Mesh(new THREE.CubeGeometry(100,100,100),new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/sky.jpg"), side: THREE.BackSide})),
	mesh: {
		cube: new THREE.Mesh(new THREE.CubeGeometry(2,2,2),new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})),
		floor: new Physijs.PlaneMesh(new THREE.PlaneGeometry(100,100), new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/floor.jpg")}),0),
		fridge: new Physijs.BoxMesh(new THREE.CubeGeometry(1,2,1), new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/fridge.png")}),10),
		wall: new Physijs.PlaneMesh(new THREE.PlaneGeometry(25,10),new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/wall.jpg"), side: THREE.DoubleSide}),0),
		bullet: new Physijs.BoxMesh(new THREE.CubeGeometry(1,1,1),new THREE.MeshLambertMaterial({color: 0xffffff})),
		line: new Physijs.PlaneMesh(new THREE.PlaneGeometry(20,20), new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}))
	},
	init: function()
	{
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById("main").appendChild(this.renderer.domElement);
	},
	loop: function(){
		if(this.keys.LEFT==true)
		{
			if(this.camera.position.x > -9.5)
				this.camera.position.x -= 0.5;
		}
		if(this.keys.RIGHT==true)
		{
			if(this.camera.position.x < 9.5)
				this.camera.position.x += 0.5;
		}
		if(this.keys.BACK==true)
		{
			this.camera.position.z += 0.5; /* Only on DEBUG*/
		}
		if(this.keys.SPACE==true)
		{
			var bala=new Physijs.BoxMesh(new THREE.CubeGeometry(.2,.2,.2),new THREE.MeshBasicMaterial({color: 0xffffff}));
			bala.position.set(this.camera.position.x,this.camera.position.y, this.camera.position.z);
			bala.setCcdMotionThreshold(.2);
			bala.setCcdSweptSphereRadius(.1);
			this.scene.add(bala);
			bala.setLinearVelocity(new THREE.Vector3(0.0,3.0,-10.0));
			bala.infierno=true;
			bala.addEventListener("collision",function(other_obj,relative_velocity,relative_rotation,contact_normal){
				this.scene.remove(bala);
			}.bind(this));
		}
		var delta=this.clock.getDelta();
		requestAnimationFrame(this.loop.bind(this));
		this.scene.simulate();
		this.mesh.cube.rotation.x += delta*1;
		this.mesh.cube.rotation.y += delta*1;
		this.renderer.render(this.scene,this.camera);
	},
	start: function(){
		/* Key listener */
		window.addEventListener("keydown",function(event){
			var code=event.keyCode;
			switch(code)
			{
				case 65:
				case 37:this.keys.LEFT=true;break;
				case 68:
				case 39:this.keys.RIGHT=true;break;
				case 32:this.keys.SPACE=true;break;
				case 83:
				case 40:this.keys.BACK=true;break;
			}
		}.bind(this));
		window.addEventListener("keyup",function(event){
			var code=event.keyCode;
			switch(code)
			{
				case 65:
				case 37:this.keys.LEFT=false;break;
				case 68:
				case 39:this.keys.RIGHT=false;break;
				case 32:this.keys.SPACE=false;break;
				case 83:
				case 40:this.keys.BACK=false;break;
			}
		}.bind(this));
		/* Remove previous */
		this.scene.remove(this.mesh.cube);
		/* Load a the game 3D*/
		this.light.position.set(0.0,-1.0,0.0);
		this.mesh.floor.position.set(0.0,-3.0,0.0);
		this.mesh.floor.rotation.x=deg2rad(270);
		var leftWall=this.mesh.wall.clone();
		var rightWall=this.mesh.wall.clone();
		leftWall.position.set(10.0,-3.0,0.0);
		leftWall.rotation.y=deg2rad(90);
		rightWall.position.set(-10.0,-3.0,0.0);
		rightWall.rotation.y=deg2rad(270);
		this.skybox.position.set(0.0,0.0,0.0);
		this.mesh.line.position.set(0.0,0.0,5.0);
		this.mesh.line.line=true;
		
		this.scene.add(this.mesh.floor);
		this.scene.add(this.skybox);
		this.scene.add(leftWall);
		this.scene.add(rightWall);
		this.scene.add(this.mesh.line);
		this.scene.add(this.light);
		this.scene.add(this.ambient);
	},
	endGame: function()
	{
		requirejs(["msg"],function(msg){
			msg.send("Game Over. Score: "+this.points);
		});
		this.scene=new THREE.Scene();
	},
	putFridges: function(){
		with(Math){
			var rnd=random();
			console.log(rnd);
			if(rnd>0.5)
			{
				rnd+=1.0;
				rnd*this.points/1000;
				var intrnd=floor(rnd);
				console.log(intrnd);
				for(var i=0;i<intrnd.length;i++)
				{
					var fridge=new Physijs.BoxMesh(new THREE.CubeGeometry(1,2,1), new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/fridge.png")}),10);
					fridge.setLinearVelocity(0.0,0.0,25.0+this.points/1000);
					fridge.position.set(0.0,0.0,-30.0);
					fridge.addEventListener("collision",function(obj){
						console.log("Fridge removed");
						if(obj.infierno != undefined)
						{
							this.scene.remove(fridge);
							this.points+=100;
							console.log("Points are:"+this.points);
						}else if(obj.line != undefined)
						{
							this.scene.remove(fridge);
							this.endGame();
						}
					});
					fridge.addEventListener("ready",function(){
						console.log("Fridge ready "+fridge);
					});
					this.scene.add(fridge);
				}
			}
		}
	},
	startScreen: function()
	{
		this.camera.position.z=10;
		this.scene.add(this.mesh.cube);
		requestAnimationFrame(this.loop.bind(this));
	}
});
