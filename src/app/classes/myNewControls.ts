import * as THREE from 'three';
import { myViewCamera } from './myViewCamera';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { myNewRenderer } from './myNewRenderer';

export class myNewControls {
  raycaster: THREE.Raycaster;

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

  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  controls: PointerLockControls;
  constructor(
    scene: THREE.Scene,
    mainCamera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    this.scene = scene;
    this.camera = mainCamera;
    this.renderer = renderer;
    // this.raycaster = new THREE.Raycaster(
    //   new THREE.Vector3(),
    //   new THREE.Vector3(0, -1, 0),
    //   0,
    //   10
    // );
    this.controls = new PointerLockControls(
      this.camera,
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
      // this.raycaster.ray.origin.copy(this.controls.getObject().position);
      // this.raycaster.ray.origin.y -= 10;
      // if (this.scene.getObjectByName('FARM')) {
      //   this.objects.push(this.scene.getObjectByName('FARM'));
      // }
      // const intersections = this.raycaster.intersectObjects(
      //   this.objects,
      //   false
      // );

      // const onObject = intersections.length > 0;
      const delta = (time - this.prevTime) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.velocity.y -=  75.0 * delta; // 75.0 = mass

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize(); // this ensures consistent movements in all directions

      if (this.moveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * 40.0 * delta;
      if (this.moveLeft || this.moveRight)
        this.velocity.x -= this.direction.x * 40.0 * delta;

      // if (onObject === true) {
      //   this.velocity.y = Math.max(0, this.velocity.y);
      //   this.canJump = true;
      // }

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
    this.renderer.render(this.scene, this.camera);
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

  addObjects() {
    this.raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      10
    );

    // floor

    let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(-Math.PI / 2);

    // vertex displacement

    let position = floorGeometry.attributes['position'];

    for (let i = 0, l = position.count; i < l; i++) {
      this.vertex.fromBufferAttribute(position, i);

      this.vertex.x += Math.random() * 20 - 10;
      this.vertex.y += Math.random() * 2;
      this.vertex.z += Math.random() * 20 - 10;

      position.setXYZ(i, this.vertex.x, this.vertex.y, this.vertex.z);
    }

    // floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes['position'];
    const colorsFloor = [];

    for (let i = 0, l = position.count; i < l; i++) {
      this.color.setHSL(
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75,
        THREE.SRGBColorSpace
      );
      colorsFloor.push(this.color.r, this.color.g, this.color.b);
    }

    floorGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colorsFloor, 3)
    );

    const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.scene.add(floor);

    // objects

    const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();

    position = boxGeometry.attributes['position'];
    const colorsBox = [];

    for (let i = 0, l = position.count; i < l; i++) {
      this.color.setHSL(
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75,
        THREE.SRGBColorSpace
      );
      colorsBox.push(this.color.r, this.color.g, this.color.b);
    }

    boxGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colorsBox, 3)
    );

    for (let i = 0; i < 500; i++) {
      const boxMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        flatShading: true,
        vertexColors: true,
      });
      boxMaterial.color.setHSL(
        Math.random() * 0.2 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75,
        THREE.SRGBColorSpace
      );

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
      box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
      box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

      this.scene.add(box);
      this.objects.push(box);
    }

    //

    // this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    // this.renderer.setPixelRatio( window.devicePixelRatio );
    // this.renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( this.renderer.domElement );
  }
}
