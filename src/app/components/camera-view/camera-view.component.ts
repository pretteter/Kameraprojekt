import { Component, OnInit } from "@angular/core";

import { scene, cameras, player } from "src/app/Collection/globalVariables";
import { myCamera } from "src/app/classes/myCamera";
import * as THREE from "three";

@Component({
    selector: "app-camera-view",
    templateUrl: "./camera-view.component.html",
    styleUrls: ["./camera-view.component.scss"],
})
export class CameraViewComponent extends THREE.WebGLRenderer implements OnInit {
    private scene = scene;
    private cameras = cameras;
    private player = player;

    private cameraToRender: myCamera;

    constructor(camera: myCamera) {
        super();
    }

    ngOnInit(): void {
        this.renderView();
    }

    renderView() {
        const aspect = this.setScissorForElement(
            document.querySelector("#test1") as HTMLDivElement
        );

        // adjust the camera for this aspect
        this.player.aspect = aspect;
        this.player.updateProjectionMatrix();
        this.player.helper.update();

        // don't draw the camera helper in the original view

        this.scene.background = new THREE.Color(0xffffff);
        this.cameras[1].getObjectByName("CAM")
            ? (this.cameras[1].getObjectByName("CAM").visible = true)
            : "";
        this.render(this.scene, this.player);
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
