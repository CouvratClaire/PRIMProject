/* -------------------------
    COMPOSANT JS GÉRANT L'INTÉGRATION 3D
------------------------- */

// THREE créé la scène / GLTFLoader permet l'import des modèles / OrbitControls permet à l'utilisateur de se déplacer dans la fenêtre.
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

$(window).on("load", function () {
  // Créé une class CanvasContainer par classe ".canvasContainer" (nécessaire si plusieurs image avec 3D dans une page)
  $(".canvasContainer").each(function (i, el) {
    new CanvasContainer(el);
  });
});

function CanvasContainer(el) {
  // Initialise les variables
  var self = this;
  self.el = el;
  self.$el = $(el);
  var data = self.$el.data();
  self.castShadow = data.castshadow;
  self.sceneName = data.scenename;
  self.hdri = data.hdri;
  self.lights = data.lights;
  self.image = $(".canvasImage")[0];
  self.$image = $(self.image);
  self.$closeButton = $(".closeCanvas");
  self.width = self.$image.width();
  self.height = self.$image.height();

  // Lorsqu'on clique sur l'image -> Initialise la 3D
  self.$image.on("click", function () {
    self.$image.css("display", "none");
    self.$closeButton.css("display", "block");
    self.init();
  });

  // Lorsqu'on clique sur closeButton -> Détruit la 3D
  self.$closeButton.on("click", function () {
    console.log("close");
    $("canvas").remove();
    self.$image.css("display", "block");
    self.$closeButton.css("display", "none");
  });
}

CanvasContainer.prototype.init = function () {
  var self = this;

  // Créé la fenêtre de rendu. Option : Avec ombre
  var renderer = self.getRenderer({
    castShadow: self.castShadow,
    antialias: true,
  });

  // Ajoute la fenêtre dans le DOM : NECESSAIRE
  self.el.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  var data = {};

  // Si présence d'une image d'environnement -> Ajoute à la scène
  if (self.hdri) {
    data = self.addBackground({ scene });
  }

  console.log("scene Name", self.sceneName);

  // Initialise les lumières
  {
    self.lightSetUp({
      scene,
      castShadow: self.castShadow,
    });
  }

  // Charge et ajoute le modèle
  const loader = new GLTFLoader();
  loader.load(
    "../app/themes/threeWp/dist/images/" + self.sceneName + ".glb", // Pour que le loader fonctionne bien : Besoin du relative href.
    function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          // Si présence d'une environnement map -> Ajoute en variable aux textures du modèle
          if (data.texture && data.mode) {
            node.material.envMap = data.texture;
            node.material.envMap.mapping = data.mode;
          }

          // Technique pour essayer d'avoir du verre plus réaliste
          if (node.material.name.includes("Glass")) {
            // Ajoute une map d'environnement avec beaucoup de reflets.
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

            // Initialise une texture
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

  // Initialise la caméra
  const camera = self.cameraSetUp({ renderer });

  //Initialise les contrôles
  const controls = self.controlsSettings({
    camera,
    renderer,
    minAzimuthAngle: Infinity,
    maxAzimuthAngle: Infinity,
  });

  // A chaque frame : Mets à jour les position et rerender.
  var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  // On resize fenêtre -> Update size fenêtre.
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

// --- FONCTION AJOUT BACKGROUND ---
CanvasContainer.prototype.addBackground = function ({ scene }) {
  const self = this;

  // Si la texture est un cube
  if (self.hdri.is_cube) {
    const textureCube = new THREE.CubeTextureLoader()
      .setPath("../app/themes/threeWp/dist/images/" + self.hdri.name + "/")
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

    // Type de mapping
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

// --- FONCTION CREATION DE LA FENETRE 3D ---
CanvasContainer.prototype.getRenderer = function ({ castShadow }) {
  var self = this;

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0xfffffff, 0);
  renderer.autoClear = true;
  if (window.innerWidth < 770) {
    renderer.setSize(self.width, self.height);
    self.$el.css("display", "block");
  } else {
    renderer.setSize(self.width, self.height);
  }
  if (castShadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  }

  return renderer;
};

// --- FONCTION INITIALISATION DES LUMIÈRES  ---
CanvasContainer.prototype.lightSetUp = function ({ scene, castShadow }) {
  // Va chercher les variables du WP
  const lights = this.lights;

  // Créé la lumière directionnelle
  const directional = lights.directional;
  const light = new THREE.DirectionalLight(
    directional.light_color,
    directional.light_intensity
  );
  light.position.set(-1, 6, 6);

  // Créé le spotlight
  const spotlight = lights.spotlight;

  const spotLight = new THREE.SpotLight(
    spotlight.light_color,
    spotlight.light_intensity
  );
  spotLight.position.set(2, 3, 1);
  spotLight.penumbra = 1;

  // Créé la lumière ambiante
  const ambient = lights.ambient;

  const hlight = new THREE.AmbientLight(
    ambient.light_color,
    ambient.light_intensity
  );

  // Si présence d'ombre -> Ajout de paramètres pour lumière directionnelle et spotlight
  if (castShadow) {
    light.castShadow = true;

    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.1; // camera settings
    light.shadow.camera.far = 100; // camera settings

    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.002;
    spotLight.shadow.camera.near = 0.1; // camera settings
    spotLight.shadow.camera.far = 100; // camera settings
  }
  scene.add(light);
  scene.add(spotLight);
  scene.add(hlight);
};

// --- FONCTION INITIALISATION DE LA CAMÈRA ---
CanvasContainer.prototype.cameraSetUp = function () {
  const self = this;
  const fov = 75;
  const aspect = self.width / self.height; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1, 1.5);
  camera.lookAt(400, 400, 0);

  // window.addEventListener(
  //   "resize",
  //   function () {
  //     // if (window.innerWidth < 770) {
  //     //   camera.aspect = window.innerWidth / (window.innerHeight * 2);
  //     //   camera.updateProjectionMatrix();
  //     // } else {
  //     //   camera.aspect = window.innerWidth / window.innerHeight;
  //     //   camera.updateProjectionMatrix();
  //     // }
  //     //renderer.setSize(window.innerWidth, window.innerHeight);
  //   },
  //   false
  // );

  return camera;
};

// --- FONCTION CONTRÔLE DES DÉPLACEMENTS ---
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
  // Limite la rotation verticale
  controls.minPolarAngle = minPolarAngle ? minPolarAngle : 0; // radians
  controls.maxPolarAngle = maxPolarAngle ? maxPolarAngle : Math.PI / 2 - 0.1; // radians
  // Limite la rotation horizontale
  controls.minAzimuthAngle = minAzimuthAngle ? minAzimuthAngle : -Math.PI / 2; // radians
  controls.maxAzimuthAngle = maxAzimuthAngle ? maxAzimuthAngle : Math.PI / 2; // radians

  return controls;
};
