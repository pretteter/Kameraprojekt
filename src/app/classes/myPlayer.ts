import * as THREE from "three";
import { myCamera } from "./myCamera";

export class myPlayer extends myCamera {
    override fov: number;
    override aspect: number;
    override near: number;
    override far: number;
    constructor(
        position: THREE.Vector3,
        rotation: THREE.Euler,
        fov?: number,
        aspect?: number,
        near?: number,
        far?: number
    ) {
        super(position, rotation, fov, aspect, near, far);
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
    }

    setPosition(position) {
        this.position.set(position.x, position.y, position.z);
    }
}
