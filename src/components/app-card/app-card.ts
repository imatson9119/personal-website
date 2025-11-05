import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { ComponentStyles } from './app-card.styles.js';
import { MainStyles, isMobileDevice } from '../../styles.js';

@customElement('app-card')
export class CardComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  @query('#canvas') canvas!: HTMLCanvasElement;

  private scene?: THREE.Scene;

  private camera?: THREE.PerspectiveCamera;

  private renderer?: THREE.WebGLRenderer;

  private cardMesh?: THREE.Mesh;

  private mousePos = { x: 0, y: 0 };

  private targetRotation = { x: 0, y: 0 };

  private currentRotation = { x: 0, y: 0 };

  private animationId?: number;

  private lastFrameTime = 0;

  private mouseMoveHandler?: (e: MouseEvent) => void;

  private mouseLeaveHandler?: (e: MouseEvent) => void;

  private resizeHandler?: () => void;

  private clickHandler?: (e: MouseEvent) => void;

  private touchStartHandler?: (e: TouchEvent) => void;

  private touchMoveHandler?: (e: TouchEvent) => void;

  private touchEndHandler?: (e: TouchEvent) => void;

  private touchCancelHandler?: (e: TouchEvent) => void;

  private orientationHandler?: (e: DeviceOrientationEvent) => void;

  private resizeTimeout?: number;

  private toastContainer?: HTMLDivElement;

  private touchStartPos = { x: 0, y: 0 };

  private isTouching = false;

  private initialRotation = { x: 0, y: 0 };

  private touchStartTime = 0;

  private hasMoved = false;

  private raycaster?: THREE.Raycaster;

  private mouse = new THREE.Vector2();

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.toastContainer = this.shadowRoot?.querySelector(
        '.toast-container',
      ) as HTMLDivElement;
      this.init3D();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Reset cursor when component is removed
    document.body.style.cursor = 'default';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    if (this.mouseLeaveHandler && this.canvas) {
      this.canvas.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.clickHandler && this.canvas) {
      this.canvas.removeEventListener('click', this.clickHandler);
    }
    if (this.touchStartHandler && this.canvas) {
      this.canvas.removeEventListener('touchstart', this.touchStartHandler);
    }
    if (this.touchMoveHandler && this.canvas) {
      this.canvas.removeEventListener('touchmove', this.touchMoveHandler);
    }
    if (this.touchEndHandler && this.canvas) {
      this.canvas.removeEventListener('touchend', this.touchEndHandler);
    }
    if (this.touchCancelHandler && this.canvas) {
      this.canvas.removeEventListener('touchcancel', this.touchCancelHandler);
    }
    if (this.orientationHandler) {
      window.removeEventListener('deviceorientation', this.orientationHandler);
    }
    if (this.resizeTimeout) {
      window.clearTimeout(this.resizeTimeout);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private async createCardTexture(): Promise<THREE.CanvasTexture> {
    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const width = 2000;
    const height = 1143;
    canvas.width = width;
    canvas.height = height;

    const cornerRadius = 60; // Increased from 40 for more rounded corners
    const headerFont = '"Krona One", sans-serif';
    const bodyFont = '"Fira Mono", monospace';

    // MODERN CREAM PREMIUM DESIGN
    // Soft cream base with vibrant accent
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#eaf0ce');
    bgGradient.addColorStop(0.5, '#e5ebc9');
    bgGradient.addColorStop(1, '#eaf0ce');

    ctx.fillStyle = bgGradient;
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);
    ctx.lineTo(width - cornerRadius, 0);
    ctx.quadraticCurveTo(width, 0, width, cornerRadius);
    ctx.lineTo(width, height - cornerRadius);
    ctx.quadraticCurveTo(width, height, width - cornerRadius, height);
    ctx.lineTo(cornerRadius, height);
    ctx.quadraticCurveTo(0, height, 0, height - cornerRadius);
    ctx.lineTo(0, cornerRadius);
    ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
    ctx.closePath();
    ctx.fill();

    // Accent color bar on left edge - darker shade of card body
    const accentGradient = ctx.createLinearGradient(0, 0, 0, height);
    accentGradient.addColorStop(0, '#b5c099'); // darker cream
    accentGradient.addColorStop(0.5, '#a5b089'); // darker cream middle
    accentGradient.addColorStop(1, '#b5c099'); // darker cream
    ctx.fillStyle = accentGradient;
    ctx.fillRect(0, 0, width * 0.04, height);

    // Subtle geometric pattern overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    for (let i = 0; i < 20; i++) {
      const x = width * 0.1 + i * width * 0.04;
      const y = height * 0.15 + Math.sin(i * 0.5) * 20;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Name - Large, bold, dark, left-aligned with proper spacing
    ctx.fillStyle = '#2d2537'; // Dark color for white background
    ctx.font = `bold ${width * 0.11}px ${headerFont}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const nameLineHeight = width * 0.11 * 1.1; // Proper line height
    ctx.fillText('IAN', width * 0.08, height * 0.12);
    ctx.fillText('MATSON', width * 0.08, height * 0.12 + nameLineHeight);

    // Title - Purple color from main page
    ctx.fillStyle = '#443850'; // Main page purple color
    ctx.font = `bold ${width * 0.022}px ${bodyFont}`;
    ctx.letterSpacing = '1px'; // Reduced from 2px for better readability
    const subtitleY = height * 0.12 + nameLineHeight * 2 + height * 0.02;
    ctx.fillText('TECHNICAL PRODUCT PARTNER', width * 0.08, subtitleY);
    ctx.letterSpacing = '0px';

    // Tagline - Subtle, refined with better line spacing
    ctx.fillStyle = 'rgba(45, 37, 55, 0.8)'; // Dark color with slight transparency
    ctx.font = `${width * 0.024}px ${bodyFont}`;
    const taglineLineHeight = width * 0.024 * 1.4; // Better line spacing
    const taglineStartY = height * 0.12 + nameLineHeight * 2 + height * 0.08;
    ctx.fillText('Turning ideas into', width * 0.08, taglineStartY);
    ctx.fillText(
      'high-quality products',
      width * 0.08,
      taglineStartY + taglineLineHeight,
    );
    ctx.fillText(
      'that ship.',
      width * 0.08,
      taglineStartY + taglineLineHeight * 2,
    );

    // Contact section - Right side, aligned with subtitle
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(45, 37, 55, 0.9)'; // Dark color for white background
    ctx.font = `${width * 0.026}px ${bodyFont}`; // Increased from 0.021 to 0.026
    const contactLineHeight = width * 0.026 * 1.5; // Proper line spacing for contact info

    // Email - aligned with subtitle
    const contactStartY = subtitleY;
    ctx.fillText('howdy@ian-matson.com', width * 0.92, contactStartY);

    // Phone
    ctx.fillText(
      '(469) 751-2467',
      width * 0.92,
      contactStartY + contactLineHeight,
    );

    // Portfolio link - Bottom right, purple color from main page
    ctx.fillStyle = '#443850'; // Main page purple color
    ctx.font = `500 ${width * 0.025}px ${bodyFont}`; // Increased from 0.02 to 0.025
    ctx.fillText('portfolio →', width * 0.92, height * 0.85);

    // Subtle highlight on accent bar
    const highlightGradient = ctx.createLinearGradient(0, 0, width * 0.04, 0);
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlightGradient;
    ctx.fillRect(0, 0, width * 0.04, height);

    // Premium border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'; // Subtle dark border for white card
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);
    ctx.lineTo(width - cornerRadius, 0);
    ctx.quadraticCurveTo(width, 0, width, cornerRadius);
    ctx.lineTo(width, height - cornerRadius);
    ctx.quadraticCurveTo(width, height, width - cornerRadius, height);
    ctx.lineTo(cornerRadius, height);
    ctx.quadraticCurveTo(0, height, 0, height - cornerRadius);
    ctx.lineTo(0, cornerRadius);
    ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
    ctx.closePath();
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  private calculateZoom(): number {
    // Calculate zoom based on device width (proportional scaling)
    // Base width: 1920px (desktop) = zoom 5
    // Narrower screens = further zoom out (higher z = more zoomed out, card appears smaller)
    const baseWidth = 1920;
    const currentWidth = this.canvas?.clientWidth || window.innerWidth;
    const zoomBase = 5;
    const zoomScale = baseWidth / currentWidth;
    // Wider range: very narrow screens zoom out more, wide screens stay close
    let minZoom = 10; // Increased for very narrow screens
    let maxZoom = 5; // Stay close on wide screens

    // Additional zoom out for mobile devices to make card smaller
    if (isMobileDevice()) {
      minZoom = 14; // Further zoom out on mobile
      // Apply additional mobile scaling factor
      const mobileMultiplier = 1.3; // Makes card 30% smaller on mobile
      return Math.max(
        minZoom,
        Math.min(maxZoom, zoomBase * zoomScale * mobileMultiplier),
      );
    }

    return Math.max(minZoom, Math.min(maxZoom, zoomBase * zoomScale));
  }

  private async init3D() {
    if (!this.canvas) return;

    // Wait a frame to ensure canvas is properly sized
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Create scene
    this.scene = new THREE.Scene();

    // Create camera - zoom proportional to device width
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    this.camera.position.z = this.calculateZoom();

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // Create card geometry (business card ratio: 3.5" x 2" = 1.75:1)
    // Made larger for better visibility with premium thickness
    const cardWidth = 5;
    const cardHeight = 2.86;
    const cardThickness = 0.08; // Increased thickness for premium feel
    const cornerRadius = 0.25; // Rounded corners (increased from 0.15 for more rounded corners)
    const segments = 8; // Smoothness of rounded corners

    const geometry = new RoundedBoxGeometry(
      cardWidth,
      cardHeight,
      cardThickness,
      segments,
      cornerRadius,
    );

    // Create material with texture (wait for fonts to load)
    const texture = await this.createCardTexture();
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.25, // More reflective for premium feel
      metalness: 0.15, // Enhanced metallic sheen
      envMapIntensity: 1.2, // Better environment reflections
    });

    // Create mesh
    this.cardMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.cardMesh);

    // Add click handler with raycasting
    this.raycaster = new THREE.Raycaster();

    this.clickHandler = (event: MouseEvent) => {
      if (
        !this.canvas ||
        !this.camera ||
        !this.scene ||
        !this.cardMesh ||
        !this.raycaster
      )
        return;

      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.cardMesh);

      if (intersects.length > 0) {
        this.handleCardInteraction(intersects[0]);
      }
    };

    this.canvas.addEventListener('click', this.clickHandler);

    // Premium lighting setup for enhanced depth and dimension
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(ambientLight);

    // Main key light - brighter and more directional
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(6, 6, 6);
    keyLight.castShadow = false;
    this.scene.add(keyLight);

    // Secondary light for balance
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.3);
    fillLight.position.set(-5, 4, 4);
    this.scene.add(fillLight);

    // Rim light for edge definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(-3, -3, -5);
    this.scene.add(rimLight);

    // Subtle back light for depth
    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(0, 0, -8);
    this.scene.add(backLight);

    // Mouse move handler (only on desktop)
    if (!isMobileDevice()) {
      this.mouseMoveHandler = (e: MouseEvent) => {
        if (!this.canvas || !this.camera || !this.cardMesh || !this.raycaster)
          return;

        // Normalize mouse position to -1 to 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;

        // Set target rotation (slight tilt based on mouse position)
        // Slightly reduced max rotation for smoother feel
        this.targetRotation.y = x * 0.25; // Max 0.25 radians (~14 degrees, was 0.3)
        this.targetRotation.x = y * 0.25;

        // Check if hovering over clickable areas using raycasting
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.cardMesh);

        if (intersects.length > 0) {
          const intersection = intersects[0];
          let u = 0.5;
          let v = 0.5;

          if (intersection.uv) {
            u = intersection.uv.x;
            v = 1 - intersection.uv.y;
          } else {
            const localPoint = intersection.point.clone();
            this.cardMesh.worldToLocal(localPoint);
            const cardWidth = 5;
            const cardHeight = 2.86;
            u = (localPoint.x + cardWidth / 2) / cardWidth;
            v = (localPoint.y + cardHeight / 2) / cardHeight;
          }

          // Check if hovering over clickable areas
          // Text is right-aligned at u = 0.92, estimate left edge based on text width
          const emailTop = 0.54; // Shifted down a bit more
          const emailBottom = 0.62;
          const emailLeft = 0.55; // Email text starts around here (expanded left)
          const emailRight = 0.95; // Right edge with padding

          const phoneTop = 0.61; // Shifted down a bit more
          const phoneBottom = 0.69;
          const phoneLeft = 0.6; // Phone text is shorter (expanded left)
          const phoneRight = 0.95;

          const portfolioTop = 0.82; // Shifted down to align with actual text position
          const portfolioBottom = 0.92;
          const portfolioLeft = 0.65; // Portfolio text is shorter (expanded left)
          const portfolioRight = 0.95;

          const isOverEmail =
            v >= emailTop &&
            v < emailBottom &&
            u >= emailLeft &&
            u <= emailRight;
          const isOverPhone =
            v >= phoneTop &&
            v < phoneBottom &&
            u >= phoneLeft &&
            u <= phoneRight;
          const isOverPortfolio =
            v >= portfolioTop &&
            v < portfolioBottom &&
            u >= portfolioLeft &&
            u <= portfolioRight;

          if (isOverEmail || isOverPhone || isOverPortfolio) {
            document.body.style.cursor = 'pointer';
          } else {
            document.body.style.cursor = 'default';
          }
        } else {
          document.body.style.cursor = 'default';
        }
      };
      window.addEventListener('mousemove', this.mouseMoveHandler);

      // Reset cursor when mouse leaves canvas
      this.mouseLeaveHandler = () => {
        document.body.style.cursor = 'default';
      };
      this.canvas.addEventListener('mouseleave', this.mouseLeaveHandler);
    } else {
      // Mobile touch handlers for interactive 3D card
      this.touchStartHandler = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          this.isTouching = true;
          this.hasMoved = false;
          this.touchStartTime = Date.now();
          const rect = this.canvas?.getBoundingClientRect();
          if (rect) {
            this.touchStartPos.x = e.touches[0].clientX - rect.left;
            this.touchStartPos.y = e.touches[0].clientY - rect.top;
            // Store initial rotation so we can accumulate changes
            this.initialRotation.x = this.currentRotation.x;
            this.initialRotation.y = this.currentRotation.y;
          }
        }
      };

      this.touchMoveHandler = (e: TouchEvent) => {
        if (e.touches.length > 0 && this.isTouching && this.canvas) {
          const rect = this.canvas.getBoundingClientRect();
          const currentX = e.touches[0].clientX - rect.left;
          const currentY = e.touches[0].clientY - rect.top;

          // Calculate delta from initial touch position
          const deltaX = currentX - this.touchStartPos.x;
          const deltaY = currentY - this.touchStartPos.y;

          // Check if movement is significant (more than 10px = drag, not tap)
          const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (moveDistance > 10) {
            this.hasMoved = true;
            e.preventDefault(); // Prevent scrolling while dragging
          }

          if (this.hasMoved) {
            // Normalize based on canvas size and apply rotation
            // Use canvas dimensions for better accuracy
            const normalizedX = (deltaX / rect.width) * 2;
            const normalizedY = (deltaY / rect.height) * 2;

            // Accumulate rotation from initial touch position
            this.targetRotation.y = this.initialRotation.y + normalizedX * 0.4;
            this.targetRotation.x = this.initialRotation.x - normalizedY * 0.4;

            // Clamp rotation to prevent excessive spinning
            this.targetRotation.y = Math.max(
              -0.5,
              Math.min(0.5, this.targetRotation.y),
            );
            this.targetRotation.x = Math.max(
              -0.5,
              Math.min(0.5, this.targetRotation.x),
            );
          }
        }
      };

      this.touchEndHandler = (e: TouchEvent) => {
        if (this.isTouching) {
          const touchDuration = Date.now() - this.touchStartTime;
          const wasTap = !this.hasMoved && touchDuration < 300; // Tap if no movement and < 300ms

          this.isTouching = false;

          if (wasTap && e.changedTouches.length > 0 && this.canvas) {
            // Handle tap as click - trigger raycasting
            const touch = e.changedTouches[0];
            const rect = this.canvas.getBoundingClientRect();
            const mouse = new THREE.Vector2();
            mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, this.camera!);
            const intersects = raycaster.intersectObject(this.cardMesh!);

            if (intersects.length > 0) {
              this.handleCardInteraction(intersects[0]);
            }
          } else if (this.hasMoved) {
            // Smoothly return card to center when drag ends
            this.targetRotation.x = 0;
            this.targetRotation.y = 0;
          }

          // Reset for next touch
          this.initialRotation.x = 0;
          this.initialRotation.y = 0;
          this.hasMoved = false;
        }
      };

      this.touchCancelHandler = (e: TouchEvent) => {
        // Handle touch cancellation (e.g., system gesture interrupts)
        if (this.isTouching) {
          this.isTouching = false;
          this.targetRotation.x = 0;
          this.targetRotation.y = 0;
          this.initialRotation.x = 0;
          this.initialRotation.y = 0;
        }
      };

      // Wait for canvas to be ready, then attach touch handlers
      if (this.canvas) {
        // Use setTimeout to ensure canvas is fully initialized
        setTimeout(() => {
          if (
            this.canvas &&
            this.touchStartHandler &&
            this.touchMoveHandler &&
            this.touchEndHandler &&
            this.touchCancelHandler
          ) {
            this.canvas.addEventListener('touchstart', this.touchStartHandler, {
              passive: false,
            });
            this.canvas.addEventListener('touchmove', this.touchMoveHandler, {
              passive: false,
            });
            this.canvas.addEventListener('touchend', this.touchEndHandler, {
              passive: false,
            });
            this.canvas.addEventListener(
              'touchcancel',
              this.touchCancelHandler,
              {
                passive: false,
              },
            );
          }
        }, 100);
      }

      // Device orientation support for tilt-based rotation (optional enhancement)
      // Check if requestPermission exists (iOS 13+)
      const DeviceOrientationEventConstructor =
        window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
          requestPermission?: () => Promise<PermissionState>;
        };

      if (
        DeviceOrientationEventConstructor &&
        typeof DeviceOrientationEventConstructor.requestPermission ===
          'function'
      ) {
        // iOS 13+ requires permission
        DeviceOrientationEventConstructor.requestPermission()
          .then((response: PermissionState) => {
            if (response === 'granted') {
              this.setupDeviceOrientation();
            }
          })
          .catch(() => {
            // Permission denied or not available, that's okay
          });
      } else {
        // Android and older iOS
        this.setupDeviceOrientation();
      }
    }

    // Handle resize - debounced to prevent excessive updates
    const handleResize = () => {
      if (!this.canvas || !this.camera || !this.renderer) return;

      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;

      // Recalculate zoom based on current canvas width
      // Narrower screens = further zoom out (card appears smaller)
      const newZoom = this.calculateZoom();

      this.camera.position.z = newZoom;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    this.resizeHandler = () => {
      if (this.resizeTimeout) {
        window.clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = window.setTimeout(() => {
        handleResize();
      }, 100); // Reduced debounce delay for more responsive updates
    };
    window.addEventListener('resize', this.resizeHandler);

    // Also listen to orientation changes on mobile
    window.addEventListener('orientationchange', () => {
      // Wait for orientation change to complete
      setTimeout(() => {
        handleResize();
      }, 200);
    });

    // Initial resize to ensure correct sizing
    // Use a small delay to ensure canvas is fully rendered
    setTimeout(() => {
      handleResize();
    }, 100);

    // Animation loop with frame-rate independent easing
    const animate = (currentTime: number) => {
      this.animationId = requestAnimationFrame(animate);

      if (!this.cardMesh) return;

      // Calculate delta time for frame-rate independent animation
      const deltaTime = this.lastFrameTime
        ? Math.min((currentTime - this.lastFrameTime) / 16.67, 2) // Cap at 2x normal frame time
        : 1;
      this.lastFrameTime = currentTime;

      // Smooth interpolation with easing - slower and smoother
      // Using lower interpolation factor (0.06) for smoother, slower response
      const interpolationFactor = 0.06 * deltaTime;

      // Calculate rotation differences
      const rotXDiff = this.targetRotation.x - this.currentRotation.x;
      const rotYDiff = this.targetRotation.y - this.currentRotation.y;

      // Apply smooth easing interpolation
      this.currentRotation.x += rotXDiff * interpolationFactor;
      this.currentRotation.y += rotYDiff * interpolationFactor;

      // Apply rotation
      this.cardMesh.rotation.x = this.currentRotation.x;
      this.cardMesh.rotation.y = this.currentRotation.y;

      // Automatic rotation back to center when idle (slower decay)
      // Apply to both desktop and mobile for smooth return
      if (!this.isTouching) {
        this.targetRotation.x *= 0.98; // Slower decay (was 0.95)
        this.targetRotation.y *= 0.98;
      }

      // Render
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };

    animate(performance.now());
  }

  private handleCardInteraction(intersection: THREE.Intersection): void {
    if (!this.cardMesh) return;

    // Use UV coordinates from intersection for accurate texture mapping
    // UV coordinates range from 0-1, where (0,0) is bottom-left
    let u = 0.5; // Default to center
    let v = 0.5;

    if (intersection.uv) {
      u = intersection.uv.x;
      v = 1 - intersection.uv.y; // Flip Y since UV is bottom-left, but our texture is top-left
    } else {
      // Fallback: use local coordinates
      const localPoint = intersection.point.clone();
      this.cardMesh.worldToLocal(localPoint);
      const cardWidth = 5;
      const cardHeight = 2.86;
      u = (localPoint.x + cardWidth / 2) / cardWidth;
      v = (localPoint.y + cardHeight / 2) / cardHeight;
    }

    // Determine which area was clicked/tapped based on V position (Y on texture)
    // Email and phone are aligned with subtitle (at subtitleY)
    // Portfolio is at height * 0.85

    // Calculate actual positions based on texture coordinates
    // subtitleY is approximately at height * 0.12 + nameLineHeight * 2 + height * 0.02
    // With height = 1143, nameLineHeight ≈ 220, subtitleY ≈ 0.525
    // Email is at subtitleY, Phone is at subtitleY + contactLineHeight
    // Portfolio is at height * 0.85 = 0.85

    const emailTop = 0.54; // Shifted down a bit more
    const emailBottom = 0.62; // Email area
    const emailLeft = 0.55; // Email text starts around here (expanded left)
    const emailRight = 0.95; // Right edge with padding

    const phoneTop = 0.61; // Shifted down a bit more
    const phoneBottom = 0.69; // Phone area
    const phoneLeft = 0.6; // Phone text is shorter (expanded left)
    const phoneRight = 0.95;

    const portfolioTop = 0.82; // Shifted down to align with actual text position
    const portfolioBottom = 0.92; // Portfolio area
    const portfolioLeft = 0.65; // Portfolio text is shorter (expanded left)
    const portfolioRight = 0.95;

    if (v >= emailTop && v < emailBottom && u >= emailLeft && u <= emailRight) {
      // Email area - copy to clipboard
      this.copyEmailToClipboard();
    } else if (
      v >= phoneTop &&
      v < phoneBottom &&
      u >= phoneLeft &&
      u <= phoneRight
    ) {
      // Phone area
      window.location.href = 'tel:+14697512467';
    } else if (
      v >= portfolioTop &&
      v < portfolioBottom &&
      u >= portfolioLeft &&
      u <= portfolioRight
    ) {
      // Portfolio link area
      window.location.href = '/';
    }
    // No default action - only specific areas are clickable
  }

  private setupDeviceOrientation(): void {
    this.orientationHandler = (e: DeviceOrientationEvent) => {
      if (!this.isTouching && e.beta !== null && e.gamma !== null) {
        // Convert device orientation to card rotation
        // beta: front-to-back tilt (-180 to 180)
        // gamma: left-to-right tilt (-90 to 90)
        const normalizedBeta = (e.beta || 0) / 90; // Normalize to -1 to 1
        const normalizedGamma = (e.gamma || 0) / 90; // Normalize to -1 to 1

        // Apply subtle rotation based on device tilt
        // Clamp to prevent extreme rotations
        this.targetRotation.x = Math.max(
          -0.2,
          Math.min(0.2, normalizedBeta * 0.15),
        );
        this.targetRotation.y = Math.max(
          -0.2,
          Math.min(0.2, normalizedGamma * 0.15),
        );
      }
    };
    if (this.orientationHandler) {
      window.addEventListener('deviceorientation', this.orientationHandler);
    }
  }

  private handleEmailClick = (e: Event): void => {
    e.preventDefault();
    this.copyEmailToClipboard();
  };

  private async copyEmailToClipboard(): Promise<void> {
    const email = 'howdy@ian-matson.com';
    try {
      await navigator.clipboard.writeText(email);
      this.showToast('Email copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        this.showToast('Email copied to clipboard!');
      } catch (fallbackErr) {
        this.showToast('Failed to copy email', 'error');
      }
      document.body.removeChild(textArea);
    }
  }

  private showToast(
    message: string,
    type: 'success' | 'error' = 'success',
  ): void {
    if (!this.toastContainer) {
      this.toastContainer = this.shadowRoot?.querySelector(
        '.toast-container',
      ) as HTMLDivElement;
    }
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    this.toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
    });

    // Remove toast after animation
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => {
        if (toast.parentNode === this.toastContainer) {
          this.toastContainer?.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  render() {
    return html`
      <div class="card-container">
        <div class="top-content">
          <div class="content-wrapper">
            <h2 class="section-title">Digital Business Card</h2>
            <p class="section-description">
              Hover over the card to interact, or click on contact information to connect.
            </p>
          </div>
        </div>
        <canvas id="canvas"></canvas>
        <div class="toast-container"></div>
        <div class="bottom-content">
          <div class="content-wrapper">
            <div class="bottom-grid">
              <div class="bottom-item">
                <h3 class="bottom-title">Let's Connect</h3>
                <p class="bottom-text">
                  Looking to collaborate on a project or have a question? 
                  Click the card above to copy my email or call directly.
                </p>
              </div>
              <div class="bottom-item">
                <h3 class="bottom-title">Explore More</h3>
                <p class="bottom-text">
                  Check out my portfolio, read my blog, or connect on LinkedIn 
                  to see more of my work and thoughts on software development.
                </p>
                <div class="bottom-links">
                  <a href="/" class="bottom-link">View Portfolio</a>
                  <a href="/blog" class="bottom-link">Read Blog</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-overlay">
          <div class="card-header">
            <h1 class="card-name">Ian Matson</h1>
            <p class="card-title">Technical Product Partner</p>
          </div>
          <p class="card-blurb">
            Turning ideas into high-quality products that ship.
          </p>
          <div class="card-contact">
            <div class="contact-item">
              <svg
                class="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="#" @click=${this.handleEmailClick}
                >howdy@ian-matson.com</a
              >
            </div>
            <div class="contact-item">
              <svg
                class="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                ></path>
              </svg>
              <a href="tel:+14697512467">(469)-751-2467</a>
            </div>
          </div>
          <div class="portfolio-link">
            <a href="/">View Portfolio →</a>
          </div>
        </div>
      </div>
    `;
  }
}
