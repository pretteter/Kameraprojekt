import { Component, OnInit } from '@angular/core';

// import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from '../../scripts/dat.gui.module.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { myRenderer } from 'src/app/classes/renderer';
import { myViewCamera } from 'src/app/classes/myViewCamera';
import { my_GLTF_Loader } from 'src/app/classes/loader';
import { myControls } from 'src/app/classes/controls';
import { physicalCamera } from 'src/app/classes/camera';
import { myNewRenderer } from 'src/app/classes/newRenderer';

@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.scss'],
})
export class CanvasBoxComponent implements OnInit {
  camera: THREE.Camera = new myViewCamera().camera;
  scene: THREE.Scene = new THREE.Scene();
  myRenderer: myRenderer;
  myLoader: my_GLTF_Loader;
  myControls: myControls;
  cameras: THREE.PerspectiveCamera[];

  constructor() {
    // this.myRenderer = new myRenderer(this.scene, this.camera);
    // this.myLoader = new my_GLTF_Loader(this.scene, this.myRenderer);
    // this.myControls = new myControls(this.camera, this.myRenderer);
    this.cameras = [];
  }

  ngOnInit(): void {
    // this.main();
    this.test();
  }

  main() {
    let cameraRig: THREE.Group;
    cameraRig = new THREE.Group();
    let physicalCamera1 = new physicalCamera();
    cameraRig.add(physicalCamera1.cameraPerspective);
    cameraRig.add(physicalCamera1.cameraPerspective);

    this.myLoader.loadRGBE();
    this.myRenderer.render();
  }

  test() {
    const canvas = document.querySelector('#c');
    const view1Elem = document.querySelector('#view1') as HTMLDivElement;
    const view2Elem = document.querySelector('#view2') as HTMLDivElement;
    const view3Elem = document.querySelector('#view3') as HTMLDivElement;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 5;
    const far = 100;

    const mainCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const camera2 = new THREE.PerspectiveCamera(
      60, // fov
      2, // aspect
      0.1, // near
      500 // far
    );
    const camera3 = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.cameras.push(mainCamera);
    this.cameras.push(camera2);
    this.cameras.push(camera3);

    this.cameras[0].position.set(0, 10, 20);
    this.cameras[1].position.set(40, 10, 30);
    this.cameras[1].lookAt(0, 5, 0);
    this.cameras[2].position.set(10, 10, 20);

    const cameraHelper = new THREE.CameraHelper(this.cameras[0]);
    const camera3Helper = new THREE.CameraHelper(this.cameras[2]);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    // var axesHelper = new THREE.AxesHelper(40);
    // scene.add(axesHelper);
    scene.add(cameraHelper);
    scene.add(camera3Helper);

    const controls = new OrbitControls(this.cameras[0], view1Elem);
    controls.target.set(0, 5, 0);
    controls.update();

    const controls2 = new OrbitControls(this.cameras[1], view2Elem);
    controls2.target.set(0, 5, 0);
    controls2.update();

    const controls3 = new OrbitControls(this.cameras[2], view3Elem);
    controls3.target.set(0, 5, 0);
    controls3.update();

    const newRenderer = new myNewRenderer(this.scene, this.cameras);
    newRenderer.startRender();
  }
}
