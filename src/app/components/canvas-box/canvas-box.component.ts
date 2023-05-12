import { Component, OnInit } from '@angular/core';

// import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from '../../scripts/dat.gui.module.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { myViewCamera } from 'src/app/classes/myViewCamera';
import { myNewRenderer } from 'src/app/classes/myNewRenderer';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.scss'],
})
export class CanvasBoxComponent implements OnInit {
  camera: THREE.Camera = new myViewCamera().camera;
  scene: THREE.Scene = new THREE.Scene();
  cameras: THREE.PerspectiveCamera[];

  constructor() {
    this.cameras = [];
  }

  ngOnInit(): void {
    this.test();
  }

  test() {
    const view2Elem = document.querySelector('#view2') as HTMLDivElement;
    const view3Elem = document.querySelector('#view3') as HTMLDivElement;

    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 5;
    const far = 100;

    const mainCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    // mainCamera.add(
    //   new THREE.Mesh(
    //     new THREE.SphereGeometry(100, 16, 8),
    //     new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    //   )
    // );

    var geometry = new THREE.BoxGeometry(2, 2, 2).toNonIndexed();

    var material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    var mesh = new THREE.Mesh(geometry, material);

    mainCamera.add(mesh);

    this.cameras.push(mainCamera);
    this.cameras.push(new THREE.PerspectiveCamera(60, 2, 0.1, 500));
    this.cameras.push(new THREE.PerspectiveCamera(fov, aspect, near, far));

    this.cameras[0].position.set(0, 1, 20);
    this.cameras[1].position.set(40, 10, 30);
    this.cameras[1].lookAt(0, 5, 0);
    this.cameras[2].position.set(10, 10, 20);


    this.cameras.forEach((element, index) => {
      if (element!=mainCamera) {
        const x = new OrbitControls(
          this.cameras[index],
          eval('view' + (index + 1) + 'Elem')
        );
        x.target.set(0, 5, 0);
        x.update();
      }
      this.scene.add(element);
    });

    const newRenderer = new myNewRenderer(this.scene, this.cameras);
    newRenderer.startRender();
  }
}
