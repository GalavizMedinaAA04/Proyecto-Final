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

// --- Intercept console.error to get the exact error message ---
let lastConsoleError = "";
const originalConsoleError = console.error;
console.error = function(...args) {
    lastConsoleError = args.map(a => {
        if (a instanceof Error) return a.message + '\n' + a.stack;
        if (typeof a === 'object') {
            try { return JSON.stringify(a); } catch(e) { return String(a); }
        }
        return String(a);
    }).join(' ');
    originalConsoleError.apply(console, args);
};

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
            let errorMessage = "Error desconocido";
            if (event.detail && event.detail.type) {
                errorMessage = event.detail.type;
            }
            
            // Show the exact internal error that caused the loadfailure
            alert(`Error interno del modelo: ${errorMessage}\n\nMotivo exacto: ${lastConsoleError.substring(0, 400)}`);
            progress.classList.add('hide');
        });
    }
});


