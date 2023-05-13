import * as THREE from 'three';
import { myViewCamera } from './myViewCamera';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { myNewRenderer } from './myNewRenderer';

import { scene, cameras } from 'src/app/Collection/globalVariables';

export class myNewControls {
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;

  objects = [];
  vertex = new THREE.Vector3();
  color = new THREE.Color();

  prevTime = performance.now();
  velocity = new THREE.Vector3();
  direction = new THREE.Vector3();

  playerCamera = cameras[0];
  scene = scene;
  renderer: THREE.WebGLRenderer;
  controls: PointerLockControls;

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;

    this.controls = new PointerLockControls(
      this.playerCamera,
      document.querySelector('#view1') as HTMLDivElement
    );
    this.addEventListeners();
  }

  start() {
    this.animateControls();
  }

  private animateControls() {
    const time = performance.now();

    if (this.controls.isLocked === true) {
      const delta = (time - this.prevTime) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.velocity.y -= 75.0 * delta; // 75.0 = mass

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize(); // this ensures consistent movements in all directions

      if (this.moveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * 40.0 * delta;
      if (this.moveLeft || this.moveRight)
        this.velocity.x -= this.direction.x * 40.0 * delta;

      this.controls.moveRight(-this.velocity.x * delta);
      this.controls.moveForward(-this.velocity.z * delta);

      this.controls.getObject().position.y += this.velocity.y * delta; // new behavior

      if (this.controls.getObject().position.y < 1) {
        this.velocity.y = 0;
        this.controls.getObject().position.y = 1;

        this.canJump = true;
      }
    }
    this.prevTime = time;
    this.renderer.render(this.scene, this.playerCamera);
  }

  addEventListeners() {
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', () => {
      this.controls.lock();
    });

    this.controls.addEventListener('lock', () => {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
    });

    this.controls.addEventListener('unlock', () => {
      blocker.style.display = 'block';
      instructions.style.display = '';
    });

    const onKeyDown = (event: { code: any }) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = true;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = true;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = true;
          break;

        case 'Space':
          if (this.canJump === true) this.velocity.y += 20;
          this.canJump = false;
          break;
      }
    };

    const onKeyUp = (event: { code: any }) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = false;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = false;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = false;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }
}
