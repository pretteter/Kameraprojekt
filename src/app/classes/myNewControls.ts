import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { scene, cameras, player } from "src/app/Collection/globalVariables";
import { myCamera } from "./myCamera";

export class myNewControls extends PointerLockControls {
    private isMoveForward = false;
    private moveBackward = false;
    private moveLeft = false;
    private isMoveRight = false;
    private canJump = false;

    private prevTime = performance.now();
    private velocity = new THREE.Vector3();
    private direction = new THREE.Vector3();

    private raycaster = new THREE.Raycaster();
    private sceneMeshes: THREE.Mesh[] = [];

    constructor(cameraToControll?: myCamera, divElement?: HTMLDivElement) {
        super(
            cameraToControll ? cameraToControll : player,
            divElement
                ? divElement
                : (document.querySelector("#view1") as HTMLDivElement)
        );
        this.addEventListeners();
    }

    startControlls() {
        this.movement();
    }

    private movement() {
        const time = performance.now();

        if (this.isLocked === true) {
            const delta = (time - this.prevTime) / 1000;

            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;

            player.drone ? "" : (this.velocity.y -= 75.0 * delta); // 75.0 = mass

            this.direction.z =
                Number(this.isMoveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.isMoveRight) - Number(this.moveLeft);
            this.direction.normalize(); // this ensures consistent movements in all directions

            if (this.isMoveForward || this.moveBackward)
                this.velocity.z -= this.direction.z * 40.0 * delta;
            if (this.moveLeft || this.isMoveRight)
                this.velocity.x -= this.direction.x * 40.0 * delta;

            this.moveRight(-this.velocity.x * delta);
            this.moveForward(-this.velocity.z * delta);

            this.getObject().position.y += this.velocity.y * delta; // new behavior

            if (this.getObject().position.y < 1) {
                this.velocity.y = 0;
                this.getObject().position.y = 1;

                this.canJump = true;
            }
        }
        this.prevTime = time;
        // this.renderer.render(this.scene, this.playerCamera);
    }

    private addEventListeners() {
        this.addMovementBlocker();
        this.addKeyBindings();
    }

    private addMovementBlocker() {
        const blocker = document.getElementById("blocker");
        const instructions = document.getElementById("instructions");

        instructions.addEventListener("click", () => {
            this.lock();
        });

        this.addEventListener("lock", () => {
            instructions.style.display = "none";
            blocker.style.display = "none";
        });

        this.addEventListener("unlock", () => {
            blocker.style.display = "block";
            instructions.style.display = "";
        });
    }

    createNewCamFromPlayerView() {
        cameras.push(
            new myCamera(
                new THREE.Vector3(
                    player.position.x,
                    player.position.y,
                    player.position.z
                ),
                player.rotation,
                player.fov
            )
        );
    }

    private addKeyBindings() {
        const onKeyDown = (event: { code: any }) => {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    this.isMoveForward = true;
                    break;

                case "ArrowLeft":
                case "KeyA":
                    this.moveLeft = true;
                    break;

                case "ArrowDown":
                case "KeyS":
                    this.moveBackward = true;
                    break;

                case "ArrowRight":
                case "KeyD":
                    this.isMoveRight = true;
                    break;

                case "Space":
                    if (!player.drone) {
                        if (this.canJump === true) {
                            this.velocity.y += 20;
                            this.canJump = false;
                        }
                    } else {
                        this.velocity.y = 5;
                    }

                    console.log("vel in Sprung " + this.velocity.y);

                    break;

                case "ControlLeft":
                    if (!player.drone) break;
                    this.velocity.y = -5;
                    break;
            }
        };

        const onKeyUp = (event: { code: any }) => {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    this.isMoveForward = false;
                    break;

                case "ArrowLeft":
                case "KeyA":
                    this.moveLeft = false;
                    break;

                case "ArrowDown":
                case "KeyS":
                    this.moveBackward = false;
                    break;

                case "ArrowRight":
                case "KeyD":
                    this.isMoveRight = false;
                    break;

                case "Space":
                case "ControlLeft":
                    if (!player.drone) break;
                    // if (this.canJump === true)
                    this.velocity.y = 0;
                    break;

                case "Enter":
                    this.createNewCamFromPlayerView();
                    break;
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
    }
}
