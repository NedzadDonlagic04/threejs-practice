// Importing all the needed modules
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// Creating an object that will represent the scene
const scene = new THREE.Scene();

// Creating an object that will represent the camera
// This type of camera (the perspective camera) is designed to mimic the way human eyes
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setting the background of the scene with an object that represents the color
// This does not need light to function
scene.background = new THREE.Color('#596d5e');

// Creating an object that will represent the renderer
// As it's constructor argument it takes an object with properties that change the behavior
// In this case I passed an object with the property canvas in which is stored our canvas element
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

// Setting the renderer's size to that of the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Creating an object that will represent the box (in this case a cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Creating an object that will represent the material that will surround the geometry
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00
});

// Creating an object that will represent the cube, it will be a combination of the geometry and material
const cube = new THREE.Mesh(geometry, material);

// Adding the cube to the scene
scene.add(cube);

// Moving the camera away from the cube so we can see it
camera.position.z = 5;

// Creating an object that will represent controls that will allow us to move the camera
// As constructor arguments we'll pass the camera and the renderer dom element which is just the canvas we're using
const controls = new OrbitControls(camera, renderer.domElement);

// Creating an object that will represent the ambient light
// This light will illuminate everything equally
const ambientLight = new THREE.AmbientLight(0xffffff);

// Adding the ambient light to the scene
scene.add(ambientLight);

// Defining an arrow function called animation
// The function will call the requestAnimationFrame function which will when called inform the browser of an animation that will occur
// As an argument it takes a callback which it will call to perform the animation
// It performs asynchronously, so the code under the function call will get executed before the callback is called, which means this will enter an infinite loop once called once  
const animation = () => {
    requestAnimationFrame(animation);
    controls.update();
    renderer.render(scene, camera);
}

// Calling the animation function
animation();