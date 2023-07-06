import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { myNewControls } from "./myNewControls";

import {
    scene,
    cameras,
    gui,
    player,
} from "src/app/Collection/globalVariables";
import { myCamera } from "./myCamera";

export class myNewRenderer extends THREE.WebGLRenderer {
    private scene = scene;
    private cameras = cameras;
    private control: myNewControls;
    private player = player;

    private raycaster = new THREE.Raycaster();

    constructor(HTMLElement?: Element) {
        let canvas: Element = HTMLElement
            ? HTMLElement
            : document.querySelector("#c");
        super({ canvas });
        this.control = new myNewControls();
        // this.createHTMLElementsForCameras();
    }

    startRender() {
        this.loadGLTFObject("../../assets/", "Cottage_FREE");
        this.setLight();
        // this.cameras[1].rotation.y = Math.PI;
        // console.log("vor Render   " + this.cameras[1].rotation.y);
        // this.cameras[1].children.forEach((c) => {
        //     console.log(c);
        // });
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
    }

    private myRender() {
        this.clear();
        this.resizeRendererToDisplaySize(this);

        this.setScissorTest(true);
        this.control.startControlls();

        gui.updateDisplay();

        this.renderPlayerView();
        this.renderAllCameraViews();

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

    manageCameraControls() {
        this.cameras.forEach((cam) => {
            if (cam.followPlayer) {
                cam.disableControls();
            } else cam.enableControls();
        });
    }

    // createHTMLElementsForCameras() {
    //     const div = document.querySelector(".split") as HTMLDivElement;
    //     this.cameras.forEach((cam) => {
    //         let camView = document.createElement("div");
    //         camView.id = "view" + cam.instanceId.toString();
    //         camView.setAttribute("tabindex", cam.instanceId.toString());
    //         div.appendChild(camView);
    //     });
    // }

    renderAllCameraViews() {
        this.cameras.forEach((cam) => {
            this.renderCameraView(cam);
        });
    }

    private renderPlayerView() {
        const aspect = this.setScissorForElement(
            document.querySelector("#view1") as HTMLDivElement
        );

        // adjust the camera for this aspect
        this.player.aspect = aspect;
        // this.player.aspect = 16 / 9;
        this.player.updateProjectionMatrix();
        this.player.helper.update();

        // don't draw the camera helper in the original view

        this.scene.background = new THREE.Color(0xffffff);
        // this.cameras[1].getObjectByName("CAM")
        //     ? (this.cameras[1].getObjectByName("CAM").visible = true)
        //     : "";
        this.addCamerasObjectFromPlayerView();
        this.render(this.scene, this.player);
    }

    private renderCameraView(cam: myCamera) {
        const aspect = this.setScissorForElement(
            document.querySelector("#view" + cam.instanceId) as HTMLDivElement
        );
        // const cam = this.cameras[1];

        // adjust the camera for this aspect
        cam.aspect = aspect;
        // cam.aspect = 9/16;
        cam.updateProjectionMatrix();
        cam.helper.update();

        this.scene.background = new THREE.Color(0x99999);
        cam.followPlayer ? cam.lookAt(player.position) : "";

        this.removeCameraObjectFromOwnView(cam);

        // renders
        this.render(this.scene, cam);
    }

    private removeCameraObjectFromOwnView(cam: myCamera) {
        cam.getObjectByName("CAM")
            ? (cam.getObjectByName("CAM").visible = false)
            : "";
        // cam.getObjectByName("CAM")
        //     ? (cam.getObjectByName("CAM").visible = true)
        //     : "";
    }

    private addCamerasObjectFromPlayerView() {
        this.cameras.forEach((cam) => {
            cam.getObjectByName("CAM")
                ? (cam.getObjectByName("CAM").visible = true)
                : "";
        });
    }
}
