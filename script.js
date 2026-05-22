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

// --- Model Viewer Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('model-viewer');
    const progress = document.querySelector('.progress-bar');
    const updateBar = document.querySelector('.update-bar');

    if (modelViewer && progress && updateBar) {
        modelViewer.addEventListener('progress', (event) => {
            const progressRatio = event.detail.totalProgress;
            updateBar.style.width = `${progressRatio * 100}%`;
            
            if (progressRatio === 1) {
                progress.classList.add('hide');
            } else {
                progress.classList.remove('hide');
            }
        });

        modelViewer.addEventListener('error', (event) => {
            console.error("Error loading 3D model:", event);
            let errorMessage = "Error desconocido";
            if (event.detail && event.detail.type) {
                errorMessage = event.detail.type;
            }
            alert(`Error al cargar el modelo 3D (${errorMessage}). Asegúrate de estar usando Live Server y no abriendo el archivo localmente con doble click.`);
            progress.classList.add('hide');
        });
    }
});


