import { Component, OnInit } from '@angular/core';

import * as THREE from 'three';

import { myRenderer } from 'src/app/Scripts/renderer';
import { myCamera } from 'src/app/Scripts/camera';
import { myLoader } from 'src/app/Scripts/loader';
import { myControls } from 'src/app/Scripts/controls';

@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.scss'],
})
export class CanvasBoxComponent implements OnInit {
  camera: THREE.Camera = new myCamera().camera;
  scene: THREE.Scene = new THREE.Scene();
  myRenderer: myRenderer;
  myLoader: myLoader;
  myControls: myControls;

  constructor() {
    this.myRenderer = new myRenderer(this.scene, this.camera);
    this.myLoader = new myLoader(this.scene, this.myRenderer);
    this.myControls = new myControls(this.camera, this.myRenderer);
  }

  ngOnInit(): void {
    this.test();
  }

  test() {
    this.myLoader.loadRGBE();
    this.myRenderer.render();
  }
}
