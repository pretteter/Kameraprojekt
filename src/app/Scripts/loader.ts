import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as THREE from 'three';

import { myRenderer } from 'src/app/Scripts/renderer';

export class my_GLTF_Loader {
  scene: THREE.Scene;
  myRenderer: myRenderer;
  constructor(scene: THREE.Scene, myRenderer: myRenderer) {
    this.scene = scene;
    this.myRenderer = myRenderer;
  }

  loadRGBE() {
    new RGBELoader()
      .setPath('../../../assets/equirectangular.png')
      .load('../../../assets/royal_esplanade_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        this.scene.background = texture;
        this.scene.environment = texture;

        this.myRenderer.render();

        // model

        const loader = new GLTFLoader().setPath('../../../assets/');
        loader.load('Cottage_FREE.gltf', (gltf) => {
          const model = gltf.scene;
          model.position.setX(10)
          model.position.setZ(10)
          this.scene.add(gltf.scene);
          this.myRenderer.render();
        });
      });
  }
}
