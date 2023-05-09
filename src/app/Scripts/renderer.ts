import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class myRenderer {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  constructor(scene: THREE.Scene, camera: THREE.Camera) {
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
    this.renderer.render(this.scene, this.camera);
  }
}
