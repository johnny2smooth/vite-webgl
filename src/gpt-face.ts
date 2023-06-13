import * as THREE from 'three';
// Scene, camera, and renderer setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Resize the canvas when the window size changes
window.addEventListener('resize', function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Create face using geometries
// Create a sphere for the head
var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshPhongMaterial({ color: 0xff4422 });
var head = new THREE.Mesh(geometry, material);
scene.add(head);

// Create two smaller spheres for the eyes
var eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
var eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
var eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
eye1.position.set(0.3, 0.2, 0.9);
var eye2 = eye1.clone();
eye2.position.x = -0.3;
head.add(eye1, eye2);

// Create a cone for the nose
var noseGeometry = new THREE.ConeGeometry(0.2, 0.3, 32);
var noseMaterial = new THREE.MeshPhongMaterial({ color: 0x442200 });
var nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, -0.2, 1);
nose.rotation.y = Math.PI;
head.add(nose);

// Add some lighting
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 10, 10);
scene.add(light);

// Move camera back so we can see the objects
camera.position.z = 5;

// Animation loop
var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
