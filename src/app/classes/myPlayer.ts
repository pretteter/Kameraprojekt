import * as THREE from "three";
import { myCamera } from "./myCamera";

export class myPlayer extends myCamera {
    override fov: number;
    override aspect: number;
    override near: number;
    override far: number;
    constructor(fov?: number, aspect?: number, near?: number, far?: number) {
        super();
        fov ? (this.fov = fov) : "";
        aspect ? (this.aspect = aspect) : "";
        near ? (this.near = near) : "";
        far ? (this.far = far) : "";
        this.setPosition(0, 1, 20);
        this.addModel();
    }

    setPosition(x: number, y: number, z: number) {
        this.position.set(x, y, z);
    }
}
