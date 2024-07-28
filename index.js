import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
const w = window.innerWidth;
const h = window.innerHeight;

const render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(w, h);

document.body.appendChild(render.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, render.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
const geo = new THREE.IcosahedronGeometry(0.7, 4);
const mat = new THREE.MeshStandardMaterial({
  color: "#F0F1F0",
  flatShading: true,
});
const hemLight = new THREE.HemisphereLight("#475569", "84231C");
scene.add(hemLight);
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
mesh.add(wireMesh);
function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  controls.update();
  render.render(scene, camera);
}
animate();
