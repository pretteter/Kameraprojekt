import * as THREE from 'three';

export class physicalCamera extends THREE.Camera {
  camera: THREE.OrthographicCamera;
  cameraPerspective: THREE.PerspectiveCamera;
  constructor() {
    super();
    const frustumSize = 600;
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;
    let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    this.camera = new THREE.OrthographicCamera(
      (0.5 * frustumSize * aspect) / -2,
      (0.5 * frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      150,
      1000
    );
    this.cameraPerspective = new THREE.PerspectiveCamera(
      50,
      0.5 * aspect,
      150,
      1000
    );
    // this.camera.rotation.y = Math.PI;
    // this.cameraPerspective.rotation.y = Math.PI;
  }
}
