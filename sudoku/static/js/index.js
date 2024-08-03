import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let scene, camera, renderer;
let digits = [];
let font;

function init() {
    // Create the scene
    scene = new THREE.Scene();
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 5);
    spotLight.position.set(500, 500, 0);
    scene.add(spotLight);

    // Create the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    // Create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load font
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (loadedFont) {
        font = loadedFont;
        createDigits();
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function createDigits() {
    const digitColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffffff, 0x888888, 0xaaaaaa, 0x555555];

    for (let i = 0; i < 100; i++) {
        const digit = Math.floor(Math.random() * 10).toString();
        const geometry = new TextGeometry(digit, {
            font: font,
            size: Math.random() * 5 + 5,
            height: 1,
        });

        const material = new THREE.MeshPhongMaterial({ color: digitColors[Math.floor(Math.random() * 10)] });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = Math.random() * window.innerWidth - window.innerWidth / 2;
        mesh.position.y = Math.random() * window.innerHeight - window.innerHeight / 2;
        mesh.position.z = Math.random() * 50 - 25;

        mesh.userData = {
            speed: Math.random() * 2 + 1, // Slower speed
            rotationSpeedY: Math.random() * 0.1 // Only rotate around y-axis
        };

        scene.add(mesh);
        digits.push(mesh);
    }

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    digits.forEach(digit => {
        digit.position.x += digit.userData.speed;
        if (digit.position.x > window.innerWidth / 2) {
            digit.position.x = -window.innerWidth / 2;
            digit.position.y = Math.random() * window.innerHeight - window.innerHeight / 2;
        }

        digit.rotation.y += digit.userData.rotationSpeedY;
    });

    renderer.render(scene, camera);
}

// Initialize
init();








// import * as THREE from 'three';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// let scene, camera, renderer;
// let digits = [];
// let font;

// function init() {
//     // Create the scene
//     scene = new THREE.Scene();

//     // Create the camera
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 100;

//     // Create the renderer
//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Load font
//     const loader = new FontLoader();
//     loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (loadedFont) {
//         font = loadedFont;
//         createDigits();
//     });

//     // Handle window resize
//     window.addEventListener('resize', onWindowResize, false);
// }

// function createDigits() {
//     const digitColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffffff, 0x888888, 0xaaaaaa, 0x555555];

//     for (let i = 0; i < 100; i++) {
//         const digit = Math.floor(Math.random() * 10).toString();
//         const geometry = new TextGeometry(digit, {
//             font: font,
//             size: Math.random() * 5 + 5,
//             height: 1,
//         });

//         const material = new THREE.MeshBasicMaterial({ color: digitColors[Math.floor(Math.random() * 10)] });
//         const mesh = new THREE.Mesh(geometry, material);

//         mesh.position.x = Math.random() * window.innerWidth - window.innerWidth / 2;
//         mesh.position.y = Math.random() * window.innerHeight - window.innerHeight / 2;
//         mesh.position.z = Math.random() * 50 - 25;

//         mesh.userData = {
//             speed: Math.random() * 2 + 1,
//             rotationSpeedX: Math.random() * 0.02,
//             rotationSpeedY: Math.random() * 0.02
//         };

//         scene.add(mesh);
//         digits.push(mesh);
//     }

//     animate();
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate() {
//     requestAnimationFrame(animate);

//     digits.forEach(digit => {
//         digit.position.x += digit.userData.speed;
//         if (digit.position.x > window.innerWidth / 2) {
//             digit.position.x = -window.innerWidth / 2;
//         }

//         digit.rotation.x += digit.userData.rotationSpeedX;
//         digit.rotation.y += digit.userData.rotationSpeedY;
//     });

//     renderer.render(scene, camera);
// }

// // Initialize
// init();

