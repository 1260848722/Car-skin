// import './style.css'
import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 创建场景
const scent = new THREE.Scene();
// 创建相机
const camare = new THREE.PerspectiveCamera(
  75, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);
// 创建渲染器
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

// 创建几何体
const geomety = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格
const cube = new THREE.Mesh(geomety, meterial);

// 将网格添加到场景中
scent.add(cube);

// 设置相机位置
camare.position.z = 5;
camare.position.y = 2;
camare.position.x = 2;
camare.lookAt(0, 0, 0);
// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scent.add(axesHelper);
// 添加轨道控制器
const controls = new OrbitControls(camare, render.domElement);
// 添加阻尼惯性
controls.enableDamping = true;
// 添加阻尼系数
controls.dampingFactor = 0.05;
// 设置旋转系数
controls.rotateSpeed = 0.01;
// 渲染函数
function anmate() {
  controls.update();
  requestAnimationFrame(anmate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  render.render(scent, camare);
}
anmate();
// 渲染场景
render.render(scent, camare);