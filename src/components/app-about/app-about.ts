import { html, LitElement } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
import { MainStyles } from '../../styles.js';
import { ComponentStyles } from './app-about.styles.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const imageFaceNames = ['Cube001_2', 'Cube001_3', 'Cube001_4'];

@customElement('app-about')
export class AboutComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  @query('.about-container') mainContainer!: HTMLElement;
  @query('#canvas') canvas!: HTMLCanvasElement;

  spinSpeed = 0.5;
  spinBoostSpeed = 20;
  spinDeccelerationMultiplier = 0.98;
  storyMode = false;
  startedStoryMode = false;
  nTextures = 35;
  curStoryTexture = 0;
  nStoryTextures = 9;
  canvasHeight = 500;
  mugEvenHeight = 300;
  flickerEnabled = false;
  curTextureOrder: number[] = Array.from({length: this.nTextures - this.nStoryTextures}, (_, i) => i + this.nStoryTextures);
  curTextureIndex = 0;

  isDragging = false;
  hasMoved = false;
  previousMousePosition = { x: 0, y: 0 };
  targetRotation = { x: 0, y: -0.5 * Math.PI };
  currentRotation = { x: 0, y: -0.5 * Math.PI };
  rotationConvergenceSpeed = 2.0;

  mug: THREE.Object3D | null = null;
  textures = Array.from({length: this.nTextures}, (_, i) => i + 1).map((i) => getMugTexture(`${i}`));

  materials = [
    new THREE.MeshStandardMaterial({color: 0xe6e3b3, flatShading: true, roughness: 0}),
    new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true, roughness: 0, map: pickRandom(this.textures, this.nStoryTextures)}),
    new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true, roughness: 0, map: pickRandom(this.textures, this.nStoryTextures)}),
    new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true, roughness: 0, map: pickRandom(this.textures, this.nStoryTextures)}),
  ];

  @property({ type: Object })
  previousRotation = { y: 0 };

  constructor() {
    super();

    this.updateComplete.then(() => { 
      this.mugEvenHeight = this.mainContainer.clientHeight + 100;
      this.init3JS();
    });
  }

  animateMug(mug: THREE.Object3D, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    let mousePos = [window.innerWidth/2, window.innerWidth/2];
    mug.rotation.y = this.currentRotation.y;
    mug.rotation.x = this.currentRotation.x;
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
      
      if (this.isDragging) {
        const deltaX = (event.clientX - this.previousMousePosition.x) * 0.01;
        const deltaY = (event.clientY - this.previousMousePosition.y) * 0.01;
        
        if (Math.abs(deltaX) > 0.0001 || Math.abs(deltaY) > 0.0001) {
          this.hasMoved = true;
        }
        
        this.targetRotation.y += deltaX;
        this.targetRotation.x += deltaY;
        
        // Clamp x rotation to prevent flipping
        this.targetRotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.targetRotation.x));
        
        this.previousMousePosition = {
          x: event.clientX,
          y: event.clientY
        };
      }
    });

    this.canvas.addEventListener('mousedown', (event) => {
      this.isDragging = true;
      this.hasMoved = false;
      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging && !this.hasMoved) {
        this.boostSpin();
      }
      this.isDragging = false;
    });

    // Add touch event handlers
    this.canvas.addEventListener('touchstart', (event) => {
      event.preventDefault(); // Prevent scrolling
      this.isDragging = true;
      this.hasMoved = false;
      if (event.touches.length === 1) {
        this.previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
    });

    window.addEventListener('touchmove', (event) => {
      event.preventDefault(); // Prevent scrolling
      mousePos = [event.touches[0].clientX, event.touches[0].clientY];
      
      if (this.isDragging && event.touches.length === 1) {
        const deltaX = (event.touches[0].clientX - this.previousMousePosition.x) * 0.01;
        const deltaY = (event.touches[0].clientY - this.previousMousePosition.y) * 0.01;
        
        if (Math.abs(deltaX) > 0.0001 || Math.abs(deltaY) > 0.0001) {
          this.hasMoved = true;
        }
        
        this.targetRotation.y += deltaX;
        this.targetRotation.x += deltaY;
        
        // Clamp x rotation to prevent flipping
        this.targetRotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.targetRotation.x));
        
        this.previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
    });

    window.addEventListener('touchend', () => {
      if (this.isDragging && !this.hasMoved) {
        this.boostSpin();
      }
      this.isDragging = false;
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
      
      // Handle rotation convergence
      if (!ref.isDragging) {
        // Converge x rotation back to 0
        ref.targetRotation.x += (-ref.targetRotation.x * ref.rotationConvergenceSpeed * delta);
        
        // Apply automatic spin only when not dragging
        ref.targetRotation.y += -1 * ref.spinSpeed * delta;
      }

      // Smoothly interpolate current rotation to target rotation
      ref.currentRotation.x += (ref.targetRotation.x - ref.currentRotation.x) * 0.1;
      ref.currentRotation.y += (ref.targetRotation.y - ref.currentRotation.y) * 0.1;

      mug.rotation.x = ref.currentRotation.x;
      mug.rotation.y = ref.currentRotation.y;

      // Handle camera position updates
      const x = mousePos[0] / window.innerWidth;
      const y = mousePos[1] / window.innerHeight;

      cameraOffsetFactor[0] += (x - cameraOffsetFactor[0]) * 0.03;
      cameraOffsetFactor[1] += (y - cameraOffsetFactor[1]) * 0.03;

      camera.position.x = -3 * cameraOffsetFactor[0] + 1.5;
      camera.position.y = 2 + (3 * cameraOffsetFactor[1]) - 4000 * ((window.scrollY - ref.mugEvenHeight) / ref.mugEvenHeight) / window.innerHeight;
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
      } else if (Math.random() < flicker_likelihood && ref.spinSpeed === .5 && ref.flickerEnabled && !ref.isDragging) {
        ref.materials.forEach((material, index) => {
          material.wireframe = true;
          if (index !== 0) {
            material.map = ref.getNextTexture();  
          }
        });
        flickerTime = Math.random() * (flicker_upper_bound - flicker_lower_bound) + flicker_lower_bound;
      }

      [leftFace, centerFace, rightFace].forEach((face) => {
        if (face) {
          const currentAngle = ((mug.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const prevAngle = ((ref.previousRotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          
          let crossedThreshold = false;
          switch (face.name) {
            case 'Cube001_2': // Right face
              // Check if we crossed π (180°) in either direction
              crossedThreshold = (prevAngle < Math.PI && currentAngle >= Math.PI) || 
                                (prevAngle >= Math.PI && currentAngle < Math.PI);
              break;
            case 'Cube001_3': // Center face
              // Check if we crossed 3π/2 (270°) in either direction
              crossedThreshold = (prevAngle < 3*Math.PI/2 && currentAngle >= 3*Math.PI/2) || 
                                (prevAngle >= 3*Math.PI/2 && currentAngle < 3*Math.PI/2);
              break;
            case 'Cube001_4': // Left face
              // Check if we crossed π/2 (90°) in either direction
              crossedThreshold = (prevAngle < Math.PI/2 && currentAngle >= Math.PI/2) || 
                                (prevAngle >= Math.PI/2 && currentAngle < Math.PI/2);
              break;
          }

          // Calculate the smallest angle difference accounting for wraparound
          const angleDiff = Math.abs(currentAngle - prevAngle)
          // Only trigger if the angle difference is reasonable (prevents multiple triggers)
          if (crossedThreshold && angleDiff < Math.PI/2) {
            const material = (face.material as THREE.MeshStandardMaterial);
            const newMap = ref.getNextTexture();
            material.map = newMap;
            material.needsUpdate = true;
          }
        }
      });
      
      ref.previousRotation.y = mug.rotation.y;

      renderer.render(scene, camera);

      if (delta > 0 && ref.spinSpeed > .5) { 
        ref.spinSpeed = Math.max(.5, ref.spinSpeed * ref.spinDeccelerationMultiplier);
      }
      
      if (!ref.startedStoryMode && window.scrollY > 0) {
        ref.flickerEnabled = false;
        ref.storyMode = true;
        ref.startedStoryMode = true;
        mug.rotation.y = -0.5 * Math.PI;
        (leftFace!.material as THREE.MeshStandardMaterial).map = ref.textures[0];
        (centerFace!.material as THREE.MeshStandardMaterial).map = ref.textures[1];
        ref.curStoryTexture = 2;
      }
    }
    renderer.setAnimationLoop(animate);
  }

  init3JS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, this.getCanvasWidth() / this.canvasHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    const defaultCameraOffset = 10;
    const mobileCameraOffset = 10;

    renderer.setSize(this.getCanvasWidth(), this.canvasHeight);

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
      camera.aspect = this.getCanvasWidth() / this.canvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(this.getCanvasWidth(), this.canvasHeight);
      camera.position.z = isMobileViewport() ? mobileCameraOffset : defaultCameraOffset;
    });
  }

  boostSpin() {
    this.spinSpeed += this.spinBoostSpeed;
  }

  getCanvasWidth() {
    return isMobileViewport() ? this.mainContainer.clientWidth : this.mainContainer.clientWidth / 2;
  }

  shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getNextTexture(): THREE.Texture {
    if (this.storyMode) {
      const ret = this.textures[this.curStoryTexture];
      this.curStoryTexture++;
      if (this.curStoryTexture >= this.nStoryTextures) {
        this.storyMode = false;
        setTimeout(() => {
          this.flickerEnabled = true;
        }, 5000);
      }
      return ret;
    } else {
      const ret = this.textures[this.curTextureOrder[this.curTextureIndex]];
      this.curTextureIndex++;
      if (this.curTextureIndex >= this.curTextureOrder.length) {
        this.curTextureIndex = 0;
        this.shuffleArray(this.curTextureOrder);
      }
      return ret;
    }
  }

  render() {
    return html`
      <div class='about-container'>
        <canvas id='canvas'></canvas>
        <div class="text">
          <div class='title'>
            <h1>A little about me</h1>
          </div>
          <br>
          <p>I'm a freelance software engineer born and raised in Dallas, TX. I'm always looking to learn, and have a deep appreciation for a good challenge. Reach out and say hi!</p>
        </div>
      </div>
    `;
  }
}

function isMobileViewport() {
  return window.innerWidth < 1024;
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
    'app-about': AboutComponent;
  }
}
