import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    scene,
    cameras,
    gui,
    player,
} from "src/app/Collection/globalVariables";
import { myPlayer } from "./myPlayer";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class myCamera extends THREE.PerspectiveCamera {
    override fov: number;
    override aspect: number;
    override near: number;
    override far: number;
    override rotation: THREE.Euler;

    private scene = scene;
    private cameras = cameras;
    orbitControls: OrbitControls;
    followPlayer: boolean = true;
    helper: THREE.CameraHelper = new THREE.CameraHelper(this);

    static amountOfInstances: number = 0;
    instanceId: number;

    constructor(
        position: THREE.Vector3,
        fov?: number,
        aspect?: number,
        near?: number,
        far?: number,
        player?: boolean
    ) {
        super();
        this.instanceId = ++myCamera.amountOfInstances;
        // this.rotation.x = rotation.x;
        // this.rotation.y = rotation.y;
        // this.rotation.z = rotation.z;
        this.position.set(position.x, position.y, position.z);
        // this.rotation.set(rotation.x, rotation.y, rotation.z);

        fov ? (this.fov = fov) : "";
        aspect ? (this.aspect = aspect) : "";
        near ? (this.near = near) : "";
        far ? (this.far = far) : "";

        this.scene = scene;

        if (!(this instanceof myPlayer)) {
            this.orbitControls = new OrbitControls(
                this,
                document.querySelector(
                    "#view" + myCamera.amountOfInstances
                ) as HTMLDivElement
            );
            this.orbitControls.target.set(
                this.position.x + 1,
                this.position.y,
                this.position.z
            );
            this.orbitControls.enabled = false;
            this.orbitControls.enableZoom = false;
        }

        this.addCameraHelper();
        // this.addModel();
        this instanceof myPlayer
            ? ""
            : this.loadGLTFObject("../../assets/", "streetCamera_1");
        this.buildGui();
        this.scene.add(this);
    }

    private addCameraHelper() {
        this.helper.visible = false;
        this.scene.add(this.helper);
    }

    private buildGui() {
        const x = gui.addFolder("Camera" + this.instanceId + " Controls");
        x.add(this, "fov", 1, 180);
        x.add(this, "near", 1, 50, 0.1);
        x.add(this, "far", 1, 50, 0.1);
        x.add(this.rotation, "x", 0, 2 * Math.PI, 0.1);
        x.add(this.rotation, "y", 0, 2 * Math.PI, 0.1);
        x.add(this.rotation, "z", 0, 2 * Math.PI, 0.1);
        var params = { followPlayer: this.followPlayer };
        x.add(params, "followPlayer").onChange(() => {
            this.followPlayer = !this.followPlayer;

            this.followPlayer === true
                ? this.disableControls()
                : this.enableControls();
        });

        x.close();
    }

    addModel() {
        const geometry = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }

    private loadGLTFObject(path: string, name: string) {
        const loader = new GLTFLoader().setPath(path);
        loader.load(name + ".gltf", (gltf) => {
            const cam = gltf.scene;
            cam.name = "CAM";
            this.add(cam);
            console.log(this.getObjectByName("CAM"));
        });
    }

    disableControls() {
        this.orbitControls.enabled = false;
    }

    enableControls() {
        this.orbitControls.enabled = true;
    }
}
