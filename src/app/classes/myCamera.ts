import * as THREE from "three";
import { scene, cameras, gui } from "src/app/Collection/globalVariables";

export class myCamera extends THREE.PerspectiveCamera {
    override fov: number;
    override aspect: number;
    override near: number;
    override far: number;

    private scene = scene;
    private cameras = cameras;
    helper: THREE.CameraHelper = new THREE.CameraHelper(this);

    static amountOfInstances: number = 0;
    instanceId: number;

    constructor(fov?: number, aspect?: number, near?: number, far?: number) {
        super();
        this.instanceId = ++myCamera.amountOfInstances;
        // fov ? (this.fov = fov) : "";
        // aspect ? (this.aspect = aspect) : "";
        near ? (this.near = near) : "";
        far ? (this.far = far) : "";

        this.scene = scene;

        this.addCameraHelper();
        this.addModel();
        this.buildGui();
    }
    addCameraHelper() {
        this.helper.visible = false;
        this.scene.add(this.helper);
    }

    private buildGui() {
        const x = gui.addFolder("Camera" + this.instanceId + " Controls");
        x.add(this, "fov", 1, 180);
        const minMaxGUIHelper = new MinMaxGUIHelper(this, "near", "far", 0.1);
        x.add(minMaxGUIHelper, "min", 0.1, 50, 0.1).name("near");
        x.add(minMaxGUIHelper, "max", 0.1, 50, 0.1).name("far");
        x.close();
    }

    addModel() {
        const geometry = new THREE.BoxGeometry(2, 2, 2).toNonIndexed();
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

class MinMaxGUIHelper {
    obj: any;
    minProp: string;
    maxProp: string;
    minDif: number;
    constructor(obj: any, minProp: string, maxProp: string, minDif: number) {
        this.obj = obj;
        this.minProp = minProp;
        this.maxProp = maxProp;
        this.minDif = minDif;
    }
    get min() {
        return this.obj[this.minProp];
    }
    set min(v) {
        this.obj[this.minProp] = v;
        this.obj[this.maxProp] = Math.max(
            this.obj[this.maxProp],
            v + this.minDif
        );
    }
    get max() {
        return this.obj[this.maxProp];
    }
    set max(v) {
        this.obj[this.maxProp] = v;
        this.min = this.min; // this will call the min setter
    }
}
