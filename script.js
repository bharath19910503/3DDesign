<<<<<<< HEAD
function generateDesign() {
  let kitchen = parseFloat(document.getElementById("kitchen").value) || 0;
  let bedroom = parseFloat(document.getElementById("bedroom").value) || 0;
  let tv = parseFloat(document.getElementById("tv").value) || 0;

  document.getElementById("canvas").innerHTML = "";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(800, 600);
  document.getElementById("canvas").appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const ceilingLight = new THREE.PointLight(0xffffff, 0.8, 100);
  ceilingLight.position.set(0, 18, 0);
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

  // Textures
  const textureLoader = new THREE.TextureLoader();
  const floorTexture = textureLoader.load('textures/floor.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);

  const wallTexture = textureLoader.load('textures/wall.jpg');
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(2, 2);

  // Floor
  const floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture});
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Walls
  const wallMaterial = new THREE.MeshPhongMaterial({map: wallTexture, side: THREE.DoubleSide});
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
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({color: 0xf5f5f5}));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 20;
  scene.add(ceiling);

  // Furniture models
  const loader = new THREE.GLTFLoader();

  loader.load('models/kitchen.glb', function(gltf) {
    let kitchenModel = gltf.scene;
    kitchenModel.scale.set(kitchen/100, kitchen/100, kitchen/100);
    kitchenModel.position.set(-15, 0, 0);
    scene.add(kitchenModel);
  });

  loader.load('models/bed.glb', function(gltf) {
    let bedModel = gltf.scene;
    bedModel.scale.set(bedroom/100, bedroom/100, bedroom/100);
    bedModel.position.set(15, 0, 0);
    scene.add(bedModel);
  });

  loader.load('models/tv.glb', function(gltf) {
    let tvModel = gltf.scene;
    tvModel.scale.set(tv/100, tv/100, tv/100);
    tvModel.position.set(0, -5, 0);
    scene.add(tvModel);
  });

  camera.position.set(0, 15, 40);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
=======
function generateDesign() {
  let kitchen = parseFloat(document.getElementById("kitchen").value) || 0;
  let bedroom = parseFloat(document.getElementById("bedroom").value) || 0;
  let tv = parseFloat(document.getElementById("tv").value) || 0;

  document.getElementById("canvas").innerHTML = "";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(800, 600);
  document.getElementById("canvas").appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const ceilingLight = new THREE.PointLight(0xffffff, 0.8, 100);
  ceilingLight.position.set(0, 18, 0);
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

  // Textures
  const textureLoader = new THREE.TextureLoader();
  const floorTexture = textureLoader.load('textures/floor.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);

  const wallTexture = textureLoader.load('textures/wall.jpg');
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(2, 2);

  // Floor
  const floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture});
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Walls
  const wallMaterial = new THREE.MeshPhongMaterial({map: wallTexture, side: THREE.DoubleSide});
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
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({color: 0xf5f5f5}));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 20;
  scene.add(ceiling);

  // Furniture models
  const loader = new THREE.GLTFLoader();

  loader.load('models/kitchen.glb', function(gltf) {
    let kitchenModel = gltf.scene;
    kitchenModel.scale.set(kitchen/100, kitchen/100, kitchen/100);
    kitchenModel.position.set(-15, 0, 0);
    scene.add(kitchenModel);
  });

  loader.load('models/bed.glb', function(gltf) {
    let bedModel = gltf.scene;
    bedModel.scale.set(bedroom/100, bedroom/100, bedroom/100);
    bedModel.position.set(15, 0, 0);
    scene.add(bedModel);
  });

  loader.load('models/tv.glb', function(gltf) {
    let tvModel = gltf.scene;
    tvModel.scale.set(tv/100, tv/100, tv/100);
    tvModel.position.set(0, -5, 0);
    scene.add(tvModel);
  });

  camera.position.set(0, 15, 40);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
>>>>>>> dbd88b30c7ed528d6cac06a1a8237c2351473077
