import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

$(window).on("load", function () {
  $(".canvasContainer").each(function (i, el) {
    new CanvasContainer(el);
  });
});

function CanvasContainer(el) {
  var self = this;
  self.el = el;
  self.$el = $(el);
  var data = self.$el.data();
  self.castShadow = data.castshadow;
  self.sceneName = data.scenename;
  self.hdri = data.hdri;
  self.lights = data.lights;

  console.log(self.hdri);

  self.init();
}

CanvasContainer.prototype.init = function () {
  var self = this;

  var renderer = self.getRenderer({
    castShadow: self.castShadow,
    antialias: true,
  });
  self.el.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  // let mode = THREE.EquirectangularRefractionMapping;
  var data = {};
  if (self.hdri) {
    data = self.addBackground({ scene });
  }

  console.log("scene Name", self.sceneName);

  // console.log("scene", scene);

  {
    self.lightSetUp({
      scene,
      castShadow: self.castShadow,
    });
  }

  //ADD MODEL
  const loader = new GLTFLoader();
  loader.load(
    "../app/themes/threeWp/dist/images/" + self.sceneName + ".glb", //In order to set up the loader, use relative href
    function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          // console.log(node.name);

          if (data.texture && data.mode) {
            node.material.envMap = data.texture;
            node.material.envMap.mapping = data.mode;
          }

          if (node.material.name.includes("Glass")) {
            const textureCube = new THREE.CubeTextureLoader()
              .setPath("../app/themes/threeWp/dist/images/pillars/")
              .load([
                "px.png",
                "nx.png",
                "py.png",
                "ny.png",
                "pz.png",
                "nz.png",
              ]);

            textureCube.mapping = THREE.CubeReflectionMapping;

            node.material = new THREE.MeshPhongMaterial({
              color: node.material.color,
              envMap: textureCube,
              reflectivity: 0.4,
              transparent: true,
              opacity: 0.4,
            });
            node.material.envMap.mapping = THREE.CubeReflectionMapping;
          }

          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const camera = self.cameraSetUp({ renderer });
  const controls = self.controlsSettings({
    camera,
    renderer,
    minAzimuthAngle: Infinity,
    maxAzimuthAngle: Infinity,
  });

  var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    const width = self.$el.innerWidth();
    const proportion = window.innerWidth / window.innerHeight;

    if (window.innerWidth < 770) {
      renderer.setSize(width, width / proportion);
      camera.aspect = window.innerWidth / (window.innerHeight * 2);
      camera.updateProjectionMatrix();
    } else {
      renderer.setSize((width * 2) / 3, (width * 2) / (3 * proportion));
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
  }
};

CanvasContainer.prototype.addBackground = function ({ scene }) {
  const self = this;
  if (self.hdri.is_cube) {
    const textureCube = new THREE.CubeTextureLoader()
      .setPath("../app/themes/threeWp/dist/images/" + self.hdri.name + "/")
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

    textureCube.mapping = THREE.CubeReflectionMapping;
    scene.background = textureCube;
    return { texture: textureCube, mode: THREE.CubeRefractionMapping };
  } else {
    var loader = new THREE.TextureLoader();
    const texture1 = loader.load(
      "../app/themes/threeWp/dist/images/" + self.hdri.name + ".jpg"
    );
    texture1.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = texture1;

    return { texture: texture1, mode: THREE.EquirectangularRefractionMapping };
  }
};

CanvasContainer.prototype.getRenderer = function ({ castShadow }) {
  var self = this;
  const width = self.$el.innerWidth();
  // const height = self.$el.innerHeight();
  const proportion = window.innerWidth / window.innerHeight;
  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0xfffffff, 0); // the default
  renderer.autoClear = true;
  if (window.innerWidth < 770) {
    renderer.setSize(width, width / (2 * proportion));
    self.$el.css("display", "block");
  } else {
    renderer.setSize((width * 2) / 3, (width * 2) / (3 * proportion));
  }
  //allow shadows
  if (castShadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  }

  return renderer;
};

CanvasContainer.prototype.lightSetUp = function ({
  scene,
  castShadow,
  debug,
  bias,
  spotLightPosition,
}) {
  const lights = this.lights;
  const directional = lights.directional;
  const light = new THREE.DirectionalLight(
    directional.light_color,
    directional.light_intensity
  );
  light.position.set(-1, 6, 6);

  const spotlight = lights.spotlight;

  const spotLight = new THREE.SpotLight(
    spotlight.light_color,
    spotlight.light_intensity
  );
  spotLight.position.set(2, 3, 1);
  if (spotLightPosition) {
    spotLight.position.set(
      spotLightPosition[0],
      spotLightPosition[1],
      spotLightPosition[2]
    );
  }
  spotLight.penumbra = 1;

  const ambient = lights.ambient;

  const hlight = new THREE.AmbientLight(
    ambient.light_color,
    ambient.light_intensity
  ); // soft white light

  if (castShadow) {
    light.castShadow = true;
    // white spotlight shining from the side, casting a shadow

    light.shadow.bias = bias ? bias : -0.001;
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.1; // camera settings
    light.shadow.camera.far = 100; // camera settings

    spotLight.castShadow = true;
    spotLight.shadow.bias = bias ? bias : -0.002;
    spotLight.shadow.camera.near = 0.1; // camera settings
    spotLight.shadow.camera.far = 100; // camera settings
  }
  if (debug) {
    //shadow helper
    const helperDirectional = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helperDirectional);
    const helperSpotLight = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(helperSpotLight);
  }
  scene.add(light);
  scene.add(spotLight);
  scene.add(hlight);
};

CanvasContainer.prototype.cameraSetUp = function () {
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1, 1.5);
  camera.lookAt(400, 400, 0);
  // camera.up.set(0, 0, 0);
  // camera.view((0, 6, 0));
  // camera.position.y = 3;

  window.addEventListener(
    "resize",
    function () {
      if (window.innerWidth < 770) {
        camera.aspect = window.innerWidth / (window.innerHeight * 2);
        camera.updateProjectionMatrix();
      } else {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      //renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  return camera;
};

CanvasContainer.prototype.controlsSettings = function ({
  camera,
  renderer,
  minDistance,
  maxDistance,
  minPolarAngle,
  maxPolarAngle,
  minAzimuthAngle,
  maxAzimuthAngle,
}) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0.5, 0);
  controls.rotateSpeed = 0.7;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = minDistance ? minDistance : 1;
  controls.maxDistance = maxDistance ? maxDistance : 5;
  //limit vertical rotation
  controls.minPolarAngle = minPolarAngle ? minPolarAngle : 0; // radians
  controls.maxPolarAngle = maxPolarAngle ? maxPolarAngle : Math.PI / 2 - 0.1; // radians
  // //limit horizontal rotation
  controls.minAzimuthAngle = minAzimuthAngle ? minAzimuthAngle : -Math.PI / 2; // radians
  controls.maxAzimuthAngle = maxAzimuthAngle ? maxAzimuthAngle : Math.PI / 2; // radians

  return controls;
};
