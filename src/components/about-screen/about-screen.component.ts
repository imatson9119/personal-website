import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { MainStyles } from '../../styles.js';
import { ComponentStyles } from './about-screen.styles.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';


@customElement('about-screen')
export class AboutScreenComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  @query('.main-container') mainContainer!: HTMLElement;
  @query('#canvas') canvas!: HTMLCanvasElement;

  constructor() {
    super();

    this.updateComplete.then(() => { 
      this.backgroundAnimation();
      this.init3JS();
    });
  }

  backgroundAnimation() {
    let mousePos = [0, 0];
    let backgroundPos = [0, 0];

    window.addEventListener('mousemove', (event) => {
      mousePos = [event.clientX, event.clientY];
    });

    const updateBackground = () => {
      const x = mousePos[0] / window.innerWidth;
      const y = mousePos[1] / window.innerHeight;

      // lerp background position
      backgroundPos[0] += (x - backgroundPos[0]) * 0.03;
      backgroundPos[1] += (y - backgroundPos[1]) * 0.03;
      this.mainContainer.style.backgroundPosition = `${-backgroundPos[0] * 50}px ${-backgroundPos[1] * 50}px`;

      requestAnimationFrame(updateBackground);
    }
    updateBackground();
  }

  static animateMug(mug: THREE.Object3D, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    const texture: THREE.Texture = new THREE.TextureLoader().load('assets/portrait.png');
    const materials = [
      new THREE.MeshStandardMaterial({color: 0xeaf0ce, flatShading: true, roughness: 0}),
      new THREE.MeshStandardMaterial({color: 0xeaf0ce, flatShading: true, roughness: 0}),
      new THREE.MeshStandardMaterial({color: 0xeaf0ce, flatShading: true, roughness: 0}), 
      new THREE.MeshStandardMaterial({color: 0xeaf0ce, flatShading: true, roughness: 0})
    ];
    let mousePos = [window.innerWidth/2, window.innerWidth/2];
    let cameraOffsetFactor = [.5, .5];
    const flicker_lower_bound = 0.1;
    const flicker_upper_bound = 0.4;
    const flicker_likelihood = 0.0015;
    const flickerShake = 1;
    let leftFace = null;
    let centerFace = null;
    let rightFace = null;
    let flickerTime = 0;

    window.addEventListener('mousemove', (event) => {
      mousePos = [event.clientX, event.clientY];
    });


    mug.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const color = Math.floor(Math.random()*16777215);
        console.log(child);
        console.log(color);
        switch (child.name) {
          case 'Cube001_2':
            rightFace = child;
            child.material = materials[3];
            break;
          case 'Cube001_3':
            centerFace = child;
            child.material = materials[2];
            break;
          case 'Cube001_4':
            leftFace = child;
            child.material = materials[1];
            break;
          default:
            child.material = materials[0];
            break;
        }
      }
    });

    scene.add(mug);
    mug.position.z = -5;
    mug.position.x = 0;
    mug.position.y = 0;


    const clock = new THREE.Clock();

    function animate() {
      const delta = clock.getDelta();
      const x = mousePos[0] / window.innerWidth;
      const y = mousePos[1] / window.innerHeight;

      cameraOffsetFactor[0] += (x - cameraOffsetFactor[0]) * 0.03;
      cameraOffsetFactor[1] += (y - cameraOffsetFactor[1]) * 0.03;

      camera.position.x = -3 * cameraOffsetFactor[0] + 1.5;
      camera.position.y = 5 + (3 * cameraOffsetFactor[1]) - 14 * (window.scrollY - window.innerHeight) / window.innerHeight;
      camera.lookAt(0, 0, 0);

      if (flickerTime > 0) {
        flickerTime -= delta;
        if (flickerTime <= 0) {
          mug.position.x = 0;
          mug.position.y = 0;
          mug.position.z = -5;
          materials.forEach((material) => {
            material.color.setHex(0xeaf0ce);
            material.wireframe = false;
          });
        } else {
          const r = Math.random() * 155 + 100;
          const g = Math.random() * 155 + 100;
          const b = Math.random() * 155 + 100;
          const color = (r << 16) | (g << 8) | b;

  
          materials.forEach((material) => {
            material.color.setHex(color);
          });
          mug.position.x = Math.random() * flickerShake;
          mug.position.y = Math.random() * flickerShake;
          mug.position.z = -5 + Math.random() * flickerShake;
        }
      } else if (Math.random() < flicker_likelihood) {
        materials.forEach((material) => {
          material.wireframe = true;
        });
        flickerTime = Math.random() * (flicker_upper_bound - flicker_lower_bound) + flicker_lower_bound;
      }

      renderer.render( scene, camera );
      mug.rotation.y += 0.5 * delta;
    }
    renderer.setAnimationLoop( animate );

  }

  init3JS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true});
    renderer.setSize(window.innerWidth - 6, window.innerHeight - 6);

    const loader = new GLTFLoader();
    loader.load( 'assets/mug.glb', function ( gltf ) {
      AboutScreenComponent.animateMug(gltf.scene, scene, camera, renderer);
    }, undefined, function ( error ) {
      console.error( error );
    });

    camera.position.z = isMobileViewport() ? 20 : 10;
    // set ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight);

    // set directional light
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 10, 5);
    scene.add(light);

    // Fix aspect ratio on resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth - 6, window.innerHeight - 6);
      camera.position.z = window.innerWidth > 768 ? 10 : 20;
    });
  }

  render() {
    return html`
      <div class='main-container'>
        <div class='html-content'>
          <div class='header'>
            about me<span class='accent'>.</span>
          </div>
          <div class='body'>
            <span>I'm a freelance <span class='accent'>software engineer</span> born and raised in <span class='accent'>Dallas, TX</span>. I'm always looking to <span class='accent'>learn</span>, and have a deep apprecitation for a <span class='accent'>good challenge</span>. Reach out and say hi!</span>
          </div>
        </div>
        <canvas id='canvas'></canvas>
      </div>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    `;
  }
}

function isMobileViewport() {
  return window.innerWidth < 768;
}

declare global {
  interface HTMLElementTagNameMap {
    'about-screen': AboutScreenComponent;
  }
}
