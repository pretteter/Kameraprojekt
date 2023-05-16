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

        this.cameras.forEach((element, index) => {
            if (element != cameras[0]) {
                const x = new OrbitControls(
                    this.cameras[index],
                    document.querySelector(
                        "#view" + (index + 1)
                    ) as HTMLDivElement
                );
                x.target.set(0, 5, 0);
                x.update();
            }
            this.scene.add(element);
        });
        const newRenderer = new myNewRenderer();
        newRenderer.startRender();
    }

    buildCameraArray() {
        // const mainCamera = new myCamera(
        //   75,
        //   window.innerWidth / window.innerHeight,
        //   1,
        //   1000
        // );

        this.cameras.push(this.player);
        this.cameras.push(new myCamera(60, 2, 0.1, 500));
        this.cameras.push(new myCamera());
        this.cameras[1].position.set(40, 10, 30);
        this.cameras[2].position.set(10, 10, 20);
        // const x = this.cameras[2].getWorldPosition(this.scene.position);
        // this.cameras[2].lookAt(this.player.position);
        // this.cameras[2].
        this.cameras[1].lookAt(20, 0, 0);
    }
}
