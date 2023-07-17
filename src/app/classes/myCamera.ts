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
    followPlayer: boolean = false;
    helper: THREE.CameraHelper = new THREE.CameraHelper(this);

    static amountOfInstances: number = 0;
    instanceId: number;

    constructor(
        position: THREE.Vector3,
        rotation?: THREE.Euler,
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

        // rotation ? (this.rotation = rotation) : "";
        if (rotation) {
            this.rotation.x = rotation.x;
            this.rotation.y = rotation.y;
            this.rotation.z = rotation.z;
        }
        fov ? (this.fov = fov) : "";
        aspect ? (this.aspect = aspect) : "";
        near ? (this.near = near) : "";
        far ? (this.far = far) : "";

        this.scene = scene;

        // this.addControls();

        this.addCameraHelper();
        // this.addModel();
        this instanceof myPlayer
            ? ""
            : this.loadGLTFObject("../../assets/", "streetCamera_1");
        this.buildGui();
        this.scene.add(this);
    }

    addControls() {
        if (!(this instanceof myPlayer)) {
            this.orbitControls = new OrbitControls(
                this,
                document.querySelector(
                    "#view" + this.instanceId
                ) as HTMLDivElement
            );
            this.orbitControls.target.set(
                this.position.x + 1,
                this.position.y,
                this.position.z
            );
            this.orbitControls.enabled = true;
            this.orbitControls.enableZoom = false;
        }
    }

    private addCameraHelper() {
        this.helper.visible = false;
        this.scene.add(this.helper);
    }

    private buildGui() {
        if (!(this instanceof myPlayer)) {
            const x = gui.addFolder("Camera " + this.instanceId + " Controls");
            x.add(this, "fov", 1, 180);
            // x.add(this, "near", 1, 50, 0.1);
            x.add(this, "far", 1, this.far, 0.1);
            // x.add(this.rotation, "x", 0, 2 * Math.PI, 0.1);
            // x.add(this.rotation, "y", 0, 2 * Math.PI, 0.1);
            // x.add(this.rotation, "z", 0, 2 * Math.PI, 0.1);
            const params = {
                followPlayer: this.followPlayer,
                helper: this.helper.visible,
            };
            x.add(params, "followPlayer").onChange(() => {
                this.followPlayer = !this.followPlayer;

                this.followPlayer === true
                    ? this.disableControls()
                    : this.enableControls();
            });
            x.add(params, "helper").onChange(() => {
                this.helper.visible = !this.helper.visible;
            });
            const obj = {
                delete: () => {
                    let index = this.cameras.findIndex((cam) => this === cam);
                    this.cameras.splice(index, 1);
                    gui.removeFolder(x);
                },
            };

            x.add(obj, "delete");
            x.close();
        }
    }

   private convertFovToFocalLength(fov: number, sensorWidth: number): number {
        // Horizontaler Bildwinkel in Grad für Vollformat (35mm Sensorbreite)
        const fullFrameHorizontalFov = 54.4;
        
        // Berechnung der Brennweite für Vollformat
        const focalLength = (sensorWidth / fullFrameHorizontalFov) * fov;
        
        return focalLength;
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
