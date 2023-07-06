import * as THREE from "three";
import { myCamera } from "./myCamera";

import {
    scene,
    cameras,
    gui,
    player,
} from "src/app/Collection/globalVariables";

export class myPlayer extends myCamera {
    override fov: number;
    override aspect: number;
    override near: number;
    override far: number;
    override followPlayer = false;

    drone: boolean = true;

    constructor(
        position: THREE.Vector3,
        rotation: THREE.Euler,
        fov?: number,
        aspect?: number,
        near?: number,
        far?: number
    ) {
        super(position,rotation, fov, aspect, near, far);
        fov ? (this.fov = fov) : "";
        aspect ? (this.aspect = aspect) : "";
        near ? (this.near = near) : "";
        far ? (this.far = far) : "";
        position
            ? this.position.set(position.x, position.y, position.z)
            : this.position.set(0, 1, 20);
        rotation
            ? this.rotation.set(rotation.x, rotation.y, rotation.z)
            : this.rotation.set(0, 0, 0);
        this.addModel();
        this.buildGuiForPlayer();
    }

    setPosition(position) {
        this.position.set(position.x, position.y, position.z);
    }

    private addModel() {
        const geometry = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }

    private buildGuiForPlayer() {
        const x = gui.addFolder("Player " + this.instanceId + " Controls");
        x.add(this, "fov", 1, 180);
        // x.add(this, "near", 1, 50, 0.1);
        x.add(this, "far", 1, 50, 0.1);
        // x.add(this.rotation, "x", 0, 2 * Math.PI, 0.1);
        // x.add(this.rotation, "y", 0, 2 * Math.PI, 0.1);
        // x.add(this.rotation, "z", 0, 2 * Math.PI, 0.1);
        var params = { drone: this.drone };
        x.add(params, "drone").onChange(() => {
            this.drone = !this.drone;
        });

        x.close();
    }
}
