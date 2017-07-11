var Defmech = Defmech || {};

Defmech.SceneController = (function() {


	var scene;

	var material = new THREE.LineBasicMaterial({
		color: 0xffffff
	});

	var materialForPoints = new THREE.PointsMaterial({
		color: 0xffffff,
		size: 0.1,
	});

	var superContainer;
	var superContainerStartZ = -60;;

	var howMany = 100;

	var distanceBetweenContainers = 5;

	var theme;

	var textureSeamless;

	var materialForPlane = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.3,
		side: THREE.DoubleSide,
		depthWrite: false
	});

	function init() {
		scene = this.el;
		superContainer = new THREE.Object3D();
		scene.object3D.add(superContainer);
		theme = document.querySelector('[sound]');
    theme.poolSize = 2;

		addCylinder();

		document.querySelector('a-scene').addEventListener('enter-vr', function() {
			console.log('https://github.com/babaganoooosh/hello-world/blob/master/main.js', 'enter-vr');
			reset();
		});

		document.querySelector('a-scene').addEventListener('exit-vr', function() {
			console.log('https://github.com/babaganoooosh/hello-world/blob/master/main.js', 'exit-vr');
			reset();
		});

		reset();

    window.onclick = handleClick;
	}

  function handleClick(event) {
    console.log('https://github.com/babaganoooosh/hello-world/blob/master/main.js', 'handleWindowClick');
  }

	function addCylinder() {
		console.log('https://github.com/babaganoooosh/hello-world/blob/master/main.js', 'addCylinder');

		textureSeamless = new THREE.TextureLoader().load('https://cdn.glitch.com/f8c77299-b94a-417e-82ce-7e5bdf7114d5%2Fseamless.jpg?1499811346574');
		textureSeamless.wrapS = textureSeamless.wrapT = THREE.RepeatWrapping;
		textureSeamless.repeat.set(1, 1);

		var material = new THREE.MeshLambertMaterial({
			color: 0x011C9E,
			map: textureSeamless,
			side: THREE.BackSide,
		});

		var geometry = new THREE.CylinderBufferGeometry(25, 25, 200, 24, 1, true);

		var cylinder = new THREE.Mesh(geometry, material);
    cylinder.y = -100;
		cylinder.rotation.x = Math.PI/2;

		scene.object3D.add(cylinder);

	}

	function reset() {
		superContainer.position.z = superContainerStartZ

		addRandomLines();
		addFilledObjects();
		addPoints();

		theme.components.sound.stopSound();
		theme.components.sound.playSound();
	}

	function addPoints() {
		var gap = 5;
		for (var i = 0; i < howMany / gap; i++) {
			createPointObject(i * gap);
		}
	}

	function createPointObject(index) {
		var container = new THREE.Object3D();

		var offset = Defmech.Utils.randomInt(10, 12);

		container.position.x = (Defmech.Utils.randomInt(0, 1) ? -offset : offset);
		container.position.y = (Defmech.Utils.randomInt(0, 1) ? -offset : offset);
		container.position.z = (index + 1) * -distanceBetweenContainers;

		superContainer.add(container);

		var howManyPoints = 10;

		var geometry = new THREE.Geometry();

		for (var i = 0; i < howManyPoints; i++) {
			var point = new THREE.Vector3();
			point.z = i * 1;

			geometry.vertices.push(point);
		}

		var points = new THREE.Points(geometry, materialForPoints);

		container.add(points);
	}

	function addRandomLines() {
		for (var i = 0; i < howMany; i++) {
			createLinesObject(i);
		}
	}

	function addFilledObjects() {
		var gap = 10;
		for (var i = 0; i < howMany / gap; i++) {
			createFilledObject(i * gap);
		}
	}

	function createFilledObject(index) {
		var container = new THREE.Object3D();

		var offset = Defmech.Utils.randomInt(8, 14);

		container.position.x = (Defmech.Utils.randomInt(0, 1) ? -offset : offset);
		container.position.y = (Defmech.Utils.randomInt(0, 1) ? -offset : offset);
		container.position.z = (index + 1) * -distanceBetweenContainers;

		superContainer.add(container);

		var howManyPlanes = Defmech.Utils.randomInt(3, 7);

		var width = Defmech.Utils.randomInt(2, 5);
		var height = Defmech.Utils.randomInt(2, 5);

		var geometry = new THREE.PlaneBufferGeometry(width, height);

		for (var i = 0; i < howManyPlanes; i++) {
			var plane = new THREE.Mesh(geometry, materialForPlane);
			plane.position.z = i * -3;
			container.add(plane);
		}
	}



	function createLinesObject(index) {
		var type = Defmech.Utils.randomInt(0, 1);

		var container = new THREE.Object3D();

		var offset = Defmech.Utils.randomInt(12, 20);

		container.position.z = (index + 1) * -distanceBetweenContainers;

		if (type == 0) {
			container.position.x = (Defmech.Utils.randomInt(0, 1) ? -offset : offset);
		} else {
			container.position.y = (Defmech.Utils.randomInt(0, 1) ? -offset : offset);
		}


		var geometry = new THREE.Geometry();

		var point = new THREE.Vector3();

		geometry.vertices.push(point);

		for (var i = 0; i < Defmech.Utils.randomInt(10, 20); i++) {
			var curPoint = geometry.vertices[i];

			var newPoint;

			var distance = Defmech.Utils.randomInt(0, 5);

			var direction = Defmech.Utils.randomInt(0, 3);

			if (type == 0) {

				switch (direction) {
					case 0:
						newPoint = new THREE.Vector3(curPoint.x, curPoint.y + distance, curPoint.z);
						break;
					case 1:
						newPoint = new THREE.Vector3(curPoint.x, curPoint.y - distance, curPoint.z);
						break;
					case 2:
						newPoint = new THREE.Vector3(curPoint.x, curPoint.y, curPoint.z + distance);
						break;
					case 3:
						newPoint = new THREE.Vector3(curPoint.x, curPoint.y, curPoint.z - distance);
						break;
				}
			} else {
				switch (direction) {
					case 0:
						newPoint = new THREE.Vector3(curPoint.x + distance, curPoint.y, curPoint.z);
						break;
					case 1:
						newPoint = new THREE.Vector3(curPoint.x - distance, curPoint.y, curPoint.z);
						break;
					case 2:
						newPoint = new THREE.Vector3(curPoint.x, curPoint.y, curPoint.z + distance);
						break;
					case 3:
						newPoint = new THREE.Vector3(curPoint.x, curPoint.y, curPoint.z - distance);
						break;
				}
			}

			geometry.vertices.push(newPoint);

		}

		var line = new THREE.Line(geometry, material);

		container.add(line);

		superContainer.add(container);

	}


	function update() {
		superContainer.position.z += 0.545;

    textureSeamless.offset.x = (textureSeamless.offset.x < 1) ? textureSeamless.offset.x - 0.001 : 0;
    textureSeamless.offset.y = (textureSeamless.offset.y < 1) ? textureSeamless.offset.y + 0.003 : 0;


		if (superContainer.position.z > (howMany * distanceBetweenContainers)) {
			superContainer.position.z = superContainerStartZ;
			// console.log('https://github.com/babaganoooosh/hello-world/blob/master/main.js', 'RESET');
			theme.components.sound.playSound();
		}
	}

	AFRAME.registerComponent('scene-controller', {
		schema: {},
		init: init,
		tick: update,
	});
})();
