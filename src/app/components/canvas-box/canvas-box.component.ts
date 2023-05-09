import { Component, OnInit } from '@angular/core';

// import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from '../../scripts/dat.gui.module.js';
import * as THREE from '../../scripts/three.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { myRenderer } from 'src/app/classes/renderer';
import { myViewCamera } from 'src/app/classes/myViewCamera';
import { my_GLTF_Loader } from 'src/app/classes/loader';
import { myControls } from 'src/app/classes/controls';
import { physicalCamera } from 'src/app/classes/camera';

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

  constructor() {
    // this.myRenderer = new myRenderer(this.scene, this.camera);
    // this.myLoader = new my_GLTF_Loader(this.scene, this.myRenderer);
    // this.myControls = new myControls(this.camera, this.myRenderer);
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
    mainCamera.position.set(0, 10, 20);

    const cameraHelper = new THREE.CameraHelper(mainCamera);

    // class MinMaxGUIHelper {
    //   obj: { [x: string]: any };
    //   minProp: any;
    //   maxProp: any;
    //   minDif: any;
    //   constructor(
    //     obj: THREE.PerspectiveCamera,
    //     minProp: string,
    //     maxProp: string,
    //     minDif: number
    //   ) {
    //     this.obj = obj;
    //     this.minProp = minProp;
    //     this.maxProp = maxProp;
    //     this.minDif = minDif;
    //   }
    //   get min() {
    //     return this.obj[this.minProp];
    //   }
    //   set min(v) {
    //     this.obj[this.minProp] = v;
    //     this.obj[this.maxProp] = Math.max(
    //       this.obj[this.maxProp],
    //       v + this.minDif
    //     );
    //   }
    //   get max() {
    //     return this.obj[this.maxProp];
    //   }
    //   set max(v) {
    //     this.obj[this.maxProp] = v;
    //     this.min = this.min; // this will call the min setter
    //   }
    // }

    // const gui = new GUI();

    // const f1 = gui.addFolder('Camera 1 Controls');
    // f1.add(camera, 'fov', 1, 180);
    // const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
    // f1.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near');
    // f1.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far');
    // f1.close();

    const controls = new OrbitControls(mainCamera, view1Elem);
    controls.target.set(0, 5, 0);
    controls.update();

    const camera2 = new THREE.PerspectiveCamera(
      60, // fov
      2, // aspect
      0.1, // near
      500 // far
    );
    camera2.position.set(40, 10, 30);
    camera2.lookAt(0, 5, 0);

    const controls2 = new OrbitControls(camera2, view2Elem);
    controls2.target.set(0, 5, 0);
    controls2.update();

    const camera3 = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera3.position.set(10, 10, 20);
    const camera3Helper = new THREE.CameraHelper(camera3);

    // const f3 = gui.addFolder('Camera 2 Controls');
    // f3.add(camera3, 'fov', 1, 180);
    // const minMaxGUIHelper3 = new MinMaxGUIHelper(camera3, 'near', 'far', 0.1);
    // f3.add(minMaxGUIHelper3, 'min', 0.1, 50, 0.1).name('near');
    // f3.add(minMaxGUIHelper3, 'max', 0.1, 50, 0.1).name('far');
    // f3.close();

    const controls3 = new OrbitControls(camera3, view3Elem);
    controls3.target.set(0, 5, 0);
    controls3.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    var axesHelper = new THREE.AxesHelper(40);
    scene.add(axesHelper);
    scene.add(cameraHelper);
    scene.add(camera3Helper);

    // {
    //   const planeSize = 40;

    //   const loader = new THREE.TextureLoader();
    //   const texture = loader.load(
    //     'https://threejsfundamentals.org/threejs/resources/images/checker.png'
    //   );
    //   texture.wrapS = THREE.RepeatWrapping;
    //   texture.wrapT = THREE.RepeatWrapping;
    //   texture.magFilter = THREE.NearestFilter;
    //   const repeats = planeSize / 2;
    //   texture.repeat.set(repeats, repeats);

    //   const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    //   const planeMat = new THREE.MeshPhongMaterial({
    //     map: texture,
    //     side: THREE.DoubleSide,
    //   wireframe: true
    //   });
    //   const mesh = new THREE.Mesh(planeGeo, planeMat);
    //   mesh.rotation.x = Math.PI * -0.5;
    //   scene.add(mesh);
    // }
    // {
    //   const cubeSize = 4;
    //   const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    //   const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
    //   const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    //   mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    //   scene.add(mesh);
    // }
    {
      const sphereRadius = 3;
      const sphereWidthDivisions = 32;
      const sphereHeightDivisions = 16;
      const sphereGeo = new THREE.SphereBufferGeometry(
        sphereRadius,
        sphereWidthDivisions,
        sphereHeightDivisions
      );
      const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
      scene.add(mesh);

      const loader = new GLTFLoader().setPath('../../../assets/');
      loader.load('Cottage_FREE.gltf', (gltf) => {
        const model = gltf.scene;
        // model.position.setX(10)
        // model.position.setZ(10)
        scene.add(gltf.scene);
        // this.myRenderer.render();
      });
    }

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }

    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function setScissorForElement(elem: Element | null) {
      const canvasRect = canvas.getBoundingClientRect();
      const elemRect = elem.getBoundingClientRect();

      // compute a canvas relative rectangle
      const right =
        Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
      const left = Math.max(0, elemRect.left - canvasRect.left);
      const bottom =
        Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
      const top = Math.max(0, elemRect.top - canvasRect.top);

      const width = Math.min(canvasRect.width, right - left);
      const height = Math.min(canvasRect.height, bottom - top);

      // setup the scissor to only render to that part of the canvas
      const positiveYUpBottom = canvasRect.height - bottom;
      renderer.setScissor(left, positiveYUpBottom, width, height);
      renderer.setViewport(left, positiveYUpBottom, width, height);

      // return the aspect
      return width / height;
    }

    function render() {
      resizeRendererToDisplaySize(renderer);

      // turn on the scissor
      renderer.setScissorTest(true);

      // render the original view
      {
        const aspect = setScissorForElement(view1Elem);

        // adjust the camera for this aspect
        mainCamera.aspect = aspect;
        mainCamera.updateProjectionMatrix();
        cameraHelper.update();

        // don't draw the camera helper in the original view
        cameraHelper.visible = false;
        camera3Helper.visible = false;

        scene.background.set(0x000000);

        // render
        renderer.render(scene, mainCamera);
      }

      // render the offset view
      {
        const aspect = setScissorForElement(view3Elem);

        // adjust the camera for this aspect
        camera3.aspect = aspect;
        camera3.updateProjectionMatrix();
        camera3Helper.update();

        // don't draw the camera helper in the original view
        cameraHelper.visible = false;
        camera3Helper.visible = false;

        scene.background.set(0x000000);

        // render
        renderer.render(scene, camera3);
      }

      // render from the 2nd camera
      {
        const aspect = setScissorForElement(view2Elem);

        // adjust the camera for this aspect
        camera2.aspect = aspect;
        camera2.updateProjectionMatrix();

        // draw the camera helper in the 2nd view
        cameraHelper.visible = true;
        camera3Helper.visible = true;

        scene.background.set(0x000040);

        renderer.render(scene, camera2);
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
}
