import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { MainStyles } from '../../styles.js';
import { ComponentStyles } from './splash-screen.styles.js';
import * as THREE from 'three';
import { GUI } from 'dat.gui'


@customElement('splash-screen')
export class SplashScreenComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  @query('.main-container') mainContainer!: HTMLElement;
  @query('#canvas') canvas!: HTMLCanvasElement;
  mouse: THREE.Vector2 = new THREE.Vector2(0, 0); 
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  mouseLight = new THREE.PointLight(0xffffff, 1);
  raycaster = new THREE.Raycaster();

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.threeJSInit();
    });
  }
  
  threeJSInit() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.camera.position.set(0, 0, 1);
    this.renderer.setSize( window.innerWidth - 6, window.innerHeight - 6);
    
    const geometry = new THREE.BoxGeometry( 100, 100, 100 );
    const material = new THREE.MeshStandardMaterial( { color: 0x333333 } );
    const cube = new THREE.Mesh( geometry, material );


    cube.position.set(0, 0, -51);
    this.scene.add( cube );

    const light = new THREE.DirectionalLight( 0xffffff, 4 );
    light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( light );
    this.scene.add(this.mouseLight);

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.onresize = () => {
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    };
  
    this.camera.position.z = 5;
    const clock = new THREE.Clock();
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;
    const mouseLight = this.mouseLight;
    const mouse = this.mouse;
    const raycaster = this.raycaster;
    const targetPosition = new THREE.Vector3();
    function threeJSRender() {
      const timeSinceLastFrame = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      const lerpFactor = 1 - Math.exp(-5 * timeSinceLastFrame);
      console.log(lerpFactor);
      raycaster.setFromCamera(mouse, camera);
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), .5);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersection)!;
      targetPosition.copy(intersection);
      mouseLight.position.lerp(targetPosition, Math.min(1, lerpFactor * 2));
      const distance = mouseLight.position.distanceTo(targetPosition);
      mouseLight.intensity = distance * 3;
      const color = new THREE.Color();
      color.setHSL(Math.min(distance * .06, .5), 1, 0.5);
      mouseLight.color = color;

      renderer.render( scene, camera ); 
    }

    renderer.setAnimationLoop( threeJSRender );
  }

  render() {
    return html`
      <div class='main-container'>
        <canvas id="canvas"></canvas>
        <div class = 'name-text'>
          <h1>IAN<br>MAT<br>SON.</h1>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'splash-screen': SplashScreenComponent;
  }
}
