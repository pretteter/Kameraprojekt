import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class myRenderer {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  cameraview: THREE.Camera | undefined;
  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,

  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene = scene;
    this.camera = camera;
    this.buildRenderer(this.renderer);
  }

  private buildRenderer(renderer: THREE.WebGLRenderer) {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    this.buildHTMLElements(renderer);
  }

  private buildHTMLElements(renderer: THREE.WebGLRenderer) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);
  }

  render() {
    this.renderer.clear();
    this.renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
    if (this.cameraview) {
      this.renderer.setViewport(
        window.innerWidth / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight
      );
      this.renderer.render(this.scene, this.cameraview);
    }
  }
}
