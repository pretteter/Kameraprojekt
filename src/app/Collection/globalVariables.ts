import * as THREE from 'three';
import { myCamera } from '../classes/myCamera';
import { GUI } from 'dat.gui';

export const scene: THREE.Scene = new THREE.Scene();
export const cameras: myCamera[] = [];
// export const cameras: THREE.PerspectiveCamera[] = [];
export const gui = new GUI();
gui.hide();
// const canvas = document.querySelector('#c');
// export const renderer = new THREE.WebGLRenderer({ canvas });
