// import './style.css'
import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 导入补间动画
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
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
// 创建GUI
const gui = new GUI()

// 创建一个球
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({
        color: 0x00FF00
    })
)
sphere1.position.x = -2
scent.add(sphere1)

const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({
        color: 0x0000FF
    })
)
sphere2.position.x = 2
scent.add(sphere2)
const sphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({
        color: 0xFF0000
    })
)
sphere3.position.x = 0
scent.add(sphere3)
// 创建补间对象
const tween = new TWEEN.Tween(sphere1.position)
tween.to({ x: 4 }, 2000)
// tween.repeat(Infinity)
// tween.yoyo(true)
tween.easing(TWEEN.Easing.Quadratic.InOut)
// 启动补间动画
// tween.start();

let tween2 = new TWEEN.Tween(sphere1.position)
tween2.to({ x: -4 }, 1000)
tween.chain(tween2)
tween2.chain(tween)
tween.start()



// 创建射线
const raycaster = new THREE.Raycaster();
// 创建鼠标向量
const mouse = new THREE.Vector2();


// 
window.addEventListener('click', (event) => {
    console.log(event.clientX, event.clientY)
    mouse.x = ((event.clientX / window.innerWidth) * 2) - 1
    mouse.y = ((event.clientY / window.innerHeight) * 2) - 1
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camare)
    // 计算物体和射线焦点
    const inersects = raycaster.intersectObjects([sphere1, sphere2, sphere3])
    if (inersects.length > 0) {
        inersects[0].object.material.color.set(0xff0000)
        inersects[0].object._isSelect = true
    }
    console.log(inersects)
})


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


// 渲染函数
function anmate() {
    controls.update();
    requestAnimationFrame(anmate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    render.render(scent, camare);
    TWEEN.update()
}
anmate();
// 渲染场景
render.render(scent, camare);


