// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});

// --- Three.js Boilerplate ---
let scene, camera, renderer, controls;

function init3D() {
    // 1. Get the container
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // 2. Setup Scene
    scene = new THREE.Scene();

    // 3. Setup Camera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // 4. Setup Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 5. Setup OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 6. Add Basic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 7. Add a placeholder object (to visualize the scene before the GLTF loads)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x00ffcc,
        wireframe: true 
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Placeholder for GLTFLoader setup
    /*
    const loader = new THREE.GLTFLoader();
    loader.load(
        'assets/3d/model.glb', // Path to your future 3D model
        function (gltf) {
            scene.add(gltf.scene);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened loading the model:', error);
        }
    );
    */

    // 8. Handle Window Resize
    window.addEventListener('resize', onWindowResize, false);

    // 9. Start Animation Loop
    animate();
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Optional: add some idle animation to the placeholder cube
    scene.children.forEach(child => {
        if(child.type === 'Mesh') {
            child.rotation.x += 0.005;
            child.rotation.y += 0.01;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init3D);
