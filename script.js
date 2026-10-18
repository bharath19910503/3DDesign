function generateDesign() {
  let kitchen = parseFloat(document.getElementById("kitchen").value) || 100;
  let bedroom = parseFloat(document.getElementById("bedroom").value) || 100;
  let tv = parseFloat(document.getElementById("tv").value) || 100;

  // Safe clearing of canvas
  const canvasDiv = document.getElementById("canvas");
  while (canvasDiv.firstChild) {
    canvasDiv.removeChild(canvasDiv.firstChild);
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(800, 600);
  renderer.shadowMap.enabled = true;
  canvasDiv.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const ceilingLight = new THREE.PointLight(0xffffff, 0.8, 100);
  ceilingLight.position.set(0, 18, 0);
  ceilingLight.castShadow = true;
  scene.add(ceilingLight);

  const spotlight = new THREE.SpotLight(0xffffff, 0.6);
  spotlight.position.set(-20, 25, 20);
  spotlight.angle = Math.PI / 6;
  spotlight.castShadow = true;
  scene.add(spotlight);

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshPhongMaterial({color: 0xdddddd})
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Walls
  const wallMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(50, 20), wallMaterial);
  backWall.position.set(0, 10, -25);
  scene.add(backWall);

  const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(50, 20), wallMaterial);
  frontWall.position.set(0, 10, 25);
  scene.add(frontWall);

  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(50, 20), wallMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-25, 10, 0);
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(50, 20), wallMaterial);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(25, 10, 0);
  scene.add(rightWall);

  // Ceiling
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshPhongMaterial({color: 0xf5f5f5})
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 20;
  scene.add(ceiling);

  // Test Cube (always visible)
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({color: 0x00ff00})
  );
  cube.position.set(0, 2.5, 0);
  cube.castShadow = true;
  scene.add(cube);

  // Furniture models
  const loader = new THREE.GLTFLoader();

  loader.load('models/kitchen.glb', function(gltf) {
    let kitchenModel = gltf.scene;
    kitchenModel.scale.set(kitchen/100, kitchen/100, kitchen/100);
    kitchenModel.position.set(-15, 0, 0);
    kitchenModel.traverse(child => { if (child.isMesh) child.castShadow = true; });
    scene.add(kitchenModel);
  });

  loader.load('models/bed.glb', function(gltf) {
    let bedModel = gltf.scene;
    bedModel.scale.set(bedroom/100, bedroom/100, bedroom/100);
    bedModel.position.set(15, 0, 0);
    bedModel.traverse(child => { if (child.isMesh) child.castShadow = true; });
    scene.add(bedModel);
  });

  loader.load('models/tv.glb', function(gltf) {
    let tvModel = gltf.scene;
    tvModel.scale.set(tv/100, tv/100, tv/100);
    tvModel.position.set(0, -5, 0);
    tvModel.traverse(child => { if (child.isMesh) child.castShadow = true; });
    scene.add(tvModel);
  });

  camera.position.set(0, 15, 40);
  camera.lookAt(0, 0, 0);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}