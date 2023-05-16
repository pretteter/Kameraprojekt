import * as THREE from "three";
import { myCamera } from "../classes/myCamera";
import { myPlayer } from "../classes/myPlayer";
import { GUI } from "dat.gui";

export const scene: THREE.Scene = new THREE.Scene();
export const gui = new GUI();
gui.hide();
export const cameras: myCamera[] = [];
export const player: myPlayer = new myPlayer(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
