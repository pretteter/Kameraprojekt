import * as THREE from 'three';

export class myViewCamera extends THREE.Camera {
  camera: THREE.PerspectiveCamera;
  constructor() {
    super();
    // this.camera = new THREE.PerspectiveCamera(
    //   45,
    //   window.innerWidth / window.innerHeight,
    //   0.25,
    //   20
    // );
    // this.camera.position.set(-1.8, 0.6, 2.7);
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;
    let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    this.camera = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 1, 10000 );
    this.camera.position.z = 2500;
  }
}
