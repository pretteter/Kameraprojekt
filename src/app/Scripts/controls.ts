import * as THREE from 'three';
import { myViewCamera } from './camera';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { myRenderer } from './renderer';

export class myControls {
  controls: OrbitControls;
  constructor(camera: THREE.Camera, myRenderer: myRenderer) {
    this.controls = new OrbitControls(camera, myRenderer.renderer.domElement);
    this.controls.addEventListener('change', function () {
      myRenderer.render();
    }); // use if there is no animation loop
    this.controls.minDistance = -50;
    this.controls.maxDistance = 20;
    this.controls.target.set(0, 0, -0.2);
    this.controls.update();
  }
}
