import { Component, OnInit } from "@angular/core";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { myNewRenderer } from "src/app/classes/myNewRenderer";
import { myCamera } from "src/app/classes/myCamera";

import { scene, cameras, player } from "src/app/Collection/globalVariables";
import * as THREE from "three";

@Component({
    selector: "app-canvas-box",
    templateUrl: "./canvas-box.component.html",
    styleUrls: ["./canvas-box.component.scss"],
})
export class CanvasBoxComponent implements OnInit {
    private scene = scene;
    private cameras = cameras;
    private player = player;

    constructor() {}

    ngOnInit(): void {
        this.buildCameraArray();

        const newRenderer = new myNewRenderer();
        newRenderer.startRender();
    }

    buildCameraArray() {
        this.cameras.push(
            new myCamera(
                new THREE.Vector3(40, 10, 30),
                new THREE.Euler(0, 1, 0)
            )
        );
        this.cameras.push(
            new myCamera(
                new THREE.Vector3(10, 10, 20),
                new THREE.Euler(0, 1, 0)
            )
        );
    }
}
