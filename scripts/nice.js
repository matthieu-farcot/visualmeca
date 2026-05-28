const THREE = (typeof AFRAME !== 'undefined' && AFRAME.THREE) || window.THREE;

// Composant pour l'environnement HDR
AFRAME.registerComponent("hdr-env", {
  init: function () {
    const scene = this.el.sceneEl.object3D;
    const loader = new THREE.TextureLoader();
    loader.setPath("./objets/");

    loader.load("cadre.jpg", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
//      scene.background = texture;
      scene.environment = texture;
    });
  }
});
