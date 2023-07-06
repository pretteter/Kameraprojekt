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
        // this.createHTMLElementsForCameras();
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

    // createHTMLElementsForCameras() {
    //     const div = document.querySelector(".split") as HTMLDivElement;
    //     this.cameras.forEach((cam) => {
    //         let camView = document.createElement("div") as HTMLDivElement;
    //         camView.id = "view" + cam.instanceId.toString();
    //         camView.setAttribute("tabindex", cam.instanceId.toString());
    //         div.appendChild(camView);
    //     });

    //     // div.innerHTML =
    //     //     "<div id='view1' tabindex='1'> <div id='blocker'> <div id='instructions'> <p style='font-size: xx-large'>Click to move</p>  <p style='font-size: large'>      Move: WASD<br />                    Jump: SPACE<br />                    Look: MOUSE<br />                    Stop: ESC                </p>            </div>        </div>    </div>    <div id='view2' tabindex='2'></div>    <div id='view3' tabindex='3'></div>";
    // }
}
