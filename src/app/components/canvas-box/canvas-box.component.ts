import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from "@angular/core";

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
    cameras = cameras;
    private player = player;

    

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.buildCameraArray();
        this.cameras.forEach((cam) => cam.addControls());

        const newRenderer = new myNewRenderer();
        newRenderer.startRender();

    }

    buildCameraArray() {
        // this.cameras.push(new myCamera(new THREE.Vector3(40, 5, 30)));
        // this.cameras.push(new myCamera(new THREE.Vector3(10, 5, 20)));

        // this.cameras.push(new myCamera(new THREE.Vector3(20, 5, 20)));
        // this.cameras.push(new myCamera(new THREE.Vector3(30, 5, 20)));
        this.cdr.detectChanges();
    }
}
