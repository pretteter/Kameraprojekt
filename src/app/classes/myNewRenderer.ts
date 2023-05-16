import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { myNewControls } from "./myNewControls";


import {
    scene,
    cameras,
    gui,
    player,
} from "src/app/Collection/globalVariables";

export class myNewRenderer extends THREE.WebGLRenderer {
    private scene = scene;
    private cameras = cameras;
    private control: myNewControls;
    private player = player;

    constructor(HTMLElement?: Element) {
        let canvas: Element = HTMLElement
            ? HTMLElement
            : document.querySelector("#c");
        super({ canvas });
        this.control = new myNewControls();
    }

    startRender() {
        this.loadGLTFObject("../../assets/", "Cottage_FREE");
        this.setLight();
        this.myRender();
        gui.show();
    }

    private loadGLTFObject(path: string, name: string) {
        const loader = new GLTFLoader().setPath(path);
        loader.load(name + ".gltf", (gltf) => {
            const farm = gltf.scene;
            farm.name = "FARM";
            this.scene.add(farm);
        });
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
        this.clear();
        this.resizeRendererToDisplaySize(this);

        // turn on the scissor
        this.setScissorTest(true);
        this.control.startControlls();

        // render the original view
        {
            const aspect = this.setScissorForElement(
                document.querySelector("#view1") as HTMLDivElement
            );

            // adjust the camera for this aspect
            this.player.aspect = aspect;
            this.player.updateProjectionMatrix();
            this.player.helper.update();

            // don't draw the camera helper in the original view

            this.scene.background = new THREE.Color(0xffffff);
            this.render(this.scene, this.player);
        }

        // render from the 2nd camera
        {
            const aspect = this.setScissorForElement(
                document.querySelector("#view2") as HTMLDivElement
            );

            // adjust the camera for this aspect
            this.cameras[1].aspect = aspect;
            this.cameras[1].updateProjectionMatrix();
            this.cameras[1].helper.update();

            // draw the camera helper in the 2nd view
            this.player.helper.visible = true;
            this.cameras[2].helper.visible = true;

            this.scene.background = new THREE.Color(0x000040);
            this.render(this.scene, this.cameras[1]);
        }

        // render the offset view
        {
            const aspect = this.setScissorForElement(
                document.querySelector("#view3") as HTMLDivElement
            );

            // adjust the camera for this aspect
            this.cameras[2].aspect = aspect;
            this.cameras[2].updateProjectionMatrix();
            this.cameras[2].helper.update();

            // don't draw the camera helper in the original view
            this.player.helper.visible = false;
            this.cameras[2].helper.visible = false;

            this.scene.background = new THREE.Color(0x99999);

            // renders
            this.render(this.scene, this.cameras[2]);
   
        }

        requestAnimationFrame(() => {
            this.myRender();
        });
    }

    private setScissorForElement(elem: Element | null) {
        const canvas = document.querySelector("#c");
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
        this.setScissor(left, positiveYUpBottom, width, height);
        this.setViewport(left, positiveYUpBottom, width, height);

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
