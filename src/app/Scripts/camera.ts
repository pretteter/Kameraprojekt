import * as THREE from 'three';

export class myCamera extends THREE.Camera {
  camera: THREE.Camera;
  constructor() {
    super();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    this.camera.position.set(-1.8, 0.6, 2.7);
  }
}
