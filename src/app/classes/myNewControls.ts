import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { scene, cameras } from 'src/app/Collection/globalVariables';
import { myCamera } from './myCamera';

export class myNewControls extends PointerLockControls {
  private isMoveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private isMoveRight = false;
  private canJump = false;

  private prevTime = performance.now();
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();

  constructor(cameraToControll?: myCamera, divElement?: HTMLDivElement) {
    super(
      cameraToControll ? cameraToControll : cameras[0],
      divElement
        ? divElement
        : (document.querySelector('#view1') as HTMLDivElement)
    );
  }

  startControlls() {
    this.addEventListeners();
    this.movement();
  }

  private movement() {
    const time = performance.now();

    if (this.isLocked === true) {
      const delta = (time - this.prevTime) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.velocity.y -= 75.0 * delta; // 75.0 = mass

      this.direction.z = Number(this.isMoveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.isMoveRight) - Number(this.moveLeft);
      this.direction.normalize(); // this ensures consistent movements in all directions

      if (this.isMoveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * 40.0 * delta;
      if (this.moveLeft || this.isMoveRight)
        this.velocity.x -= this.direction.x * 40.0 * delta;

      this.moveRight(-this.velocity.x * delta);
      this.moveForward(-this.velocity.z * delta);

      this.getObject().position.y += this.velocity.y * delta; // new behavior

      if (this.getObject().position.y < 1) {
        this.velocity.y = 0;
        this.getObject().position.y = 1;

        this.canJump = true;
      }
    }
    this.prevTime = time;
    // this.renderer.render(this.scene, this.playerCamera);
  }

  private addEventListeners() {
    this.addMovementBlocker();
    this.addKeyBindings();
  }

  private addMovementBlocker() {
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', () => {
      this.lock();
    });

    this.addEventListener('lock', () => {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
    });

    this.addEventListener('unlock', () => {
      blocker.style.display = 'block';
      instructions.style.display = '';
    });
  }

  private addKeyBindings() {
    const onKeyDown = (event: { code: any }) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.isMoveForward = true;
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
          this.isMoveRight = true;
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
          this.isMoveForward = false;
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
          this.isMoveRight = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }
}
