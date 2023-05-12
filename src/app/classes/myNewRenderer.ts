import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { myNewControls } from './myNewControls';

export class myNewRenderer {
  renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private cameras: THREE.PerspectiveCamera[];
  private control: myNewControls;

  constructor(scene: THREE.Scene, cameras: THREE.PerspectiveCamera[]) {
    const canvas = document.querySelector('#c');

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.scene = scene;
    this.cameras = cameras;

    this.control = new myNewControls(
      this.scene,
      this.cameras[0],
      this.renderer
    );
  }

  startRender() {
    const loader = new GLTFLoader().setPath('../../assets/');
    loader.load('Cottage_FREE.gltf', (gltf) => {
      const farm = gltf.scene;
      farm.name = 'FARM';
      this.scene.add(farm);
      console.log(this.scene);
      console.log(this.scene.getObjectByName('FARM'));
    });
    this.setLight();
    this.myRender();
  }

  private setLight() {
    const light1 = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light1.position.set(0.5, 1, 0.75);
    this.scene.add(light1);

    this.scene.fog = new THREE.Fog(0xffffff, 0, 100);
    // const color = 0xffffff;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(0, 10, 0);
    // light.target.position.set(-5, 0, 0);
    // this.scene.add(light);
    // this.scene.add(light.target);
  }

  private myRender() {
    const view1Elem = document.querySelector('#view1') as HTMLDivElement;
    const view2Elem = document.querySelector('#view2') as HTMLDivElement;
    const view3Elem = document.querySelector('#view3') as HTMLDivElement;
    // const cameraHelper = new THREE.CameraHelper(this.cameras[0]);
    // const camera2Helper = new THREE.CameraHelper(this.cameras[1]);
    const camera3Helper = new THREE.CameraHelper(this.cameras[2]);
    // this.scene.add(cameraHelper);
    // this.scene.add(camera2Helper);
    this.scene.add(camera3Helper);
    this.resizeRendererToDisplaySize(this.renderer);

    // turn on the scissor
    this.renderer.setScissorTest(true);

    // render the original view
    {
      const aspect = this.setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      this.cameras[0].aspect = aspect;
      this.cameras[0].updateProjectionMatrix();
      // cameraHelper.update();

      // don't draw the camera helper in the original view
      // cameraHelper.visible = false;
      // camera2Helper.visible = false;
      // camera3Helper.visible = false;

      this.scene.background = new THREE.Color(0xffffff);

      // render

      this.renderer.render(this.scene, this.cameras[0]);
    }

    // render the offset view
    {
      const aspect = this.setScissorForElement(view3Elem);

      // adjust the camera for this aspect
      this.cameras[2].aspect = aspect;
      this.cameras[2].updateProjectionMatrix();
      camera3Helper.update();

      // don't draw the camera helper in the original view
      // cameraHelper.visible = false;
      // camera2Helper.visible = false;
      // camera3Helper.visible = false;

      this.scene.background = new THREE.Color(0xffffff);

      // render
      this.renderer.render(this.scene, this.cameras[2]);
    }

    // render from the 2nd camera
    {
      const aspect = this.setScissorForElement(view2Elem);

      // adjust the camera for this aspect
      this.cameras[1].aspect = aspect;
      this.cameras[1].updateProjectionMatrix();
      // camera2Helper.update();

      // draw the camera helper in the 2nd view
      // cameraHelper.visible = true;
      // camera2Helper.visible = true;
      camera3Helper.visible = true;

      this.scene.background = new THREE.Color(0x000040);
      this.control.start();
      this.renderer.render(this.scene, this.cameras[1]);
    }

    requestAnimationFrame(() => {
      this.myRender();
    });
  }

  private setScissorForElement(elem: Element | null) {
    const canvas = document.querySelector('#c');
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom =
      Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    const positiveYUpBottom = canvasRect.height - bottom;
    this.renderer.setScissor(left, positiveYUpBottom, width, height);
    this.renderer.setViewport(left, positiveYUpBottom, width, height);

    // return the aspect
    return width / height;
  }

  private resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}
