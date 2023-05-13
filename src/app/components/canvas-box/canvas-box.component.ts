import { Component, OnInit } from '@angular/core';

// import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GUI } from '../../scripts/dat.gui.module';
import { GUI } from 'dat.gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { myViewCamera } from 'src/app/classes/myViewCamera';
import { myNewRenderer } from 'src/app/classes/myNewRenderer';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { myCamera } from 'src/app/classes/myCamera';

import { scene, cameras } from 'src/app/Collection/globalVariables';

@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.scss'],
})
export class CanvasBoxComponent implements OnInit {
  scene = scene;
  cameras = cameras;

  constructor() {}

  ngOnInit(): void {
    this.main();
  }

  main() {
    const mainCamera = new myCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.cameras.push(mainCamera);
    this.cameras.push(new myCamera(60, 2, 0.1, 500));
    this.cameras.push(new myCamera());
    this.cameras[1].position.set(40, 10, 30);
    this.cameras[1].lookAt(0, 5, 0);
    this.cameras[2].position.set(10, 10, 20);

    this.cameras.forEach((element, index) => {
      if (element != mainCamera) {
        const x = new OrbitControls(
          this.cameras[index],
          document.querySelector('#view' + (index + 1)) as HTMLDivElement
        );
        x.target.set(0, 5, 0);
        x.update();
      }
      this.scene.add(element);
    });
    const newRenderer = new myNewRenderer();
    newRenderer.startRender();
  }
}
