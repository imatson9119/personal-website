import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { MainStyles } from '../../styles.js';
import { ComponentStyles } from './about-screen.styles.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const imageFaceNames = ['Cube001_2', 'Cube001_3', 'Cube001_4'];

@customElement('about-screen')
export class AboutScreenComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  @query('.main-container') mainContainer!: HTMLElement;
  @query('#canvas') canvas!: HTMLCanvasElement;

  spinSpeed = 0.5;
  storyMode = false;
  startedStoryMode = false;
  nTextures = 32;
  curStoryTexture = 0;
  nStoryTextures = 9;
  mug: THREE.Object3D | null = null;
  textures = Array.from({length: this.nTextures}, (_, i) => i + 1).map((i) => getMugTexture(`${i}`));
  materials = [
    new THREE.MeshStandardMaterial({color: 0xe6e3b3, flatShading: true, roughness: 0}),
    new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true, roughness: 0, map: pickRandom(this.textures, this.nStoryTextures)}),
    new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true, roughness: 0, map: pickRandom(this.textures, this.nStoryTextures)}),
    new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true, roughness: 0, map: pickRandom(this.textures, this.nStoryTextures)}),
  ];


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

 animateMug(mug: THREE.Object3D, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {

    let mousePos = [window.innerWidth/2, window.innerWidth/2];
    let cameraOffsetFactor = [.5, .5];
    const flicker_lower_bound = 0.2;
    const flicker_upper_bound = 0.5;
    const flicker_likelihood = 0.0015;
    const flickerShake = 1;
    let leftFace: THREE.Mesh | null = null;
    let centerFace: THREE.Mesh | null = null;
    let rightFace: THREE.Mesh | null = null;
    let flickerTime = 0;

    window.addEventListener('mousemove', (event) => {
      mousePos = [event.clientX, event.clientY];
    });


    mug.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const color = Math.floor(Math.random()*16777215);
        switch (child.name) {
          case 'Cube001_2':
            rightFace = child;
            child.material = this.materials[3];
            break;
          case 'Cube001_3':
            centerFace = child;
            child.material = this.materials[2];
            break;
          case 'Cube001_4':
            leftFace = child;
            child.material = this.materials[1];
            break;
          default:
            child.material = this.materials[0];
            break;
        }
      }
    });

    scene.add(mug);
    mug.position.z = -5;
    mug.position.x = 0;
    mug.position.y = 0;
    

    const clock = new THREE.Clock();
    const ref = this;

    function animate() {
      const delta = clock.getDelta();
      const x = mousePos[0] / window.innerWidth;
      const y = mousePos[1] / window.innerHeight;

      cameraOffsetFactor[0] += (x - cameraOffsetFactor[0]) * 0.03;
      cameraOffsetFactor[1] += (y - cameraOffsetFactor[1]) * 0.03;

      camera.position.x = -3 * cameraOffsetFactor[0] + 1.5;
      camera.position.y = 2 + (3 * cameraOffsetFactor[1]) - 14 * (window.scrollY - window.innerHeight) / window.innerHeight;
      camera.lookAt(0, 0, 0);

      if (flickerTime > 0) {
        flickerTime -= delta;
        if (flickerTime <= 0) {
          mug.position.x = 0;
          mug.position.y = 0;
          mug.position.z = -5;
          ref.materials.forEach((material, index) => {
            index === 0 ? material.color.setHex(0xe6e3b3) : material.color.setHex(0xffffff);
            material.wireframe = false;
          });
        } else {
          const r = Math.random() * 155 + 100;
          const g = Math.random() * 155 + 100;
          const b = Math.random() * 155 + 100;
          const color = (r << 16) | (g << 8) | b;

  
          ref.materials.forEach((material) => {
            material.color.setHex(color);
          });
          mug.position.x = Math.random() * flickerShake;
          mug.position.y = Math.random() * flickerShake;
          mug.position.z = -5 + Math.random() * flickerShake;
        }
      } else if (Math.random() < flicker_likelihood && ref.spinSpeed === .5 && !ref.storyMode) {
        ref.materials.forEach((material, index) => {
          material.wireframe = true;
          if (index !== 0) {
            material.map = ref.getNextTexture();  
          }
        });
        flickerTime = Math.random() * (flicker_upper_bound - flicker_lower_bound) + flicker_lower_bound;
      }

      renderer.render( scene, camera );
      const rotation = mug.rotation.y / Math.PI % 2;
      mug.rotation.y += -1 * ref.spinSpeed * delta;
      const newRotation =  mug.rotation.y / Math.PI % 2;

      if (delta > 0 && ref.spinSpeed > .5){ 
        ref.spinSpeed = Math.max(.5,  ref.spinSpeed * .99);
      }

      if (rotation < newRotation) {
        const material = (leftFace!.material as THREE.MeshStandardMaterial);
        material.map = ref.getNextTexture();
        material.needsUpdate = true;
      } else if (rotation > -0.5 && newRotation < -0.5) {
        const material = (centerFace!.material as THREE.MeshStandardMaterial);
        material.map = ref.getNextTexture();
        material.needsUpdate = true;
      } else if (rotation > -1 && newRotation < -1) {
        const material = (rightFace!.material as THREE.MeshStandardMaterial);
        material.map = ref.getNextTexture();
        material.needsUpdate = true;
      } 
      
      if (!ref.startedStoryMode && window.scrollY > 0) {
        ref.storyMode = true;
        ref.startedStoryMode = true;
        mug.rotation.y = -0.5 * Math.PI;
        (leftFace!.material as THREE.MeshStandardMaterial).map = ref.textures[0];
        (centerFace!.material as THREE.MeshStandardMaterial).map = ref.textures[1];
        ref.curStoryTexture = 2;
      }
    }
    renderer.setAnimationLoop( animate );

  }

  init3JS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    const defaultCameraOffset = 10;
    const mobileCameraOffset = 10;

    renderer.setSize(window.innerWidth - 6, window.innerHeight - 6);

    const loader = new GLTFLoader();
    const x = this;
    loader.load( 'assets/mug.glb', function ( gltf ) {
      x.animateMug(gltf.scene, scene, camera, renderer);
      x.mug = gltf.scene;
    }, undefined, function ( error ) {
      console.error( error );
    });

    camera.position.z = isMobileViewport() ? mobileCameraOffset : defaultCameraOffset;
    // set ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff,1);
    scene.add(ambientLight);

    // set directional light
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 10, 5);
    scene.add(light);

    // Fix aspect ratio on resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth - 6, window.innerHeight - 6);
      camera.position.z = isMobileViewport() ? mobileCameraOffset : defaultCameraOffset;
    });
  }

  boostSpin() {
    this.spinSpeed = 30;
  }

  getNextTexture(): THREE.Texture {
    if (this.storyMode) {
      const ret = this.textures[this.curStoryTexture];
      this.curStoryTexture++;
      if (this.curStoryTexture >= this.nStoryTextures) {
        this.storyMode = false;
      }
      return ret;
    } else {
      return pickRandom(this.textures, this.nStoryTextures);
    }
  }

  render() {
    return html`
      <div class='main-container'>
        <div class='html-content'>
          <div class='header'>
            about me<span class='accent'>.</span>
          </div>
          <div class='body'>
            <span>I'm a freelance <span class='accent'>software engineer</span> born and raised in <span class='accent'>Dallas, TX</span>. I'm always looking to <span class='accent'>learn</span>, and have a deep appreciation for a <span class='accent'>good challenge</span>. Reach out and say hi!</span>
          </div>
        </div>
        <canvas id='canvas' @click=${this.boostSpin}></canvas>
      </div>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    `;
  }
}

function isMobileViewport() {
  return window.innerWidth < 768;
}

function pickRandom<T>(array: T[], low: number = 0, high: number = array.length): T {
  return array[Math.floor(Math.random() * (high - low)) + low];
}

function getMugTexture(name: string) {
  const texture = new THREE.TextureLoader().load(`assets/mugs/${name}.png`);
  texture.flipY = false;  
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

declare global {
  interface HTMLElementTagNameMap {
    'about-screen': AboutScreenComponent;
  }
}
